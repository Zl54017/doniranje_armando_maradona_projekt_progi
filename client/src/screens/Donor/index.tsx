import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import PlaceIcon from "@mui/icons-material/Place";

import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import {
  attemptLogout,
  clearUser,
  fetchUser,
} from "../../redux/slices/authSlice";
import { useForm } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Donori krvi
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

interface Location {
  lat: number;
  lng: number;
}
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Donor() {
  const { register, handleSubmit } = useForm();

  const dispatch = useAppDispatch();
  const { user, role } = useSelector((state: RootState) => state.auth);

  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  const onSubmit = () => {
    dispatch(attemptLogout());
  };

  useEffect(() => {
    const container = document.getElementById("leaflet-map");

    if (!container) {
      console.error("Map container not found.");
      return;
    }

    if (!mapRef.current) {
      // Initialize the map
      const mapInstance = L.map(container).setView([0, 0], 2);

      // Add a tile layer (you can choose a different tile layer provider)
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(mapInstance);

      mapRef.current = mapInstance;
    }

    // Use navigator.geolocation to get the user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        if (mapRef.current) {
          mapRef.current.setView([latitude, longitude], 15);
          const svgString = renderToStaticMarkup(
            <PlaceIcon style={{ fontSize: "2rem" }} />
          );
          const locationIcon = L.divIcon({
            className: "leaflet-div-icon",
            iconSize: [32, 32],
            //iconAnchor: [16, 32],
            //popupAnchor: [0, -32],
            html: `<div>${svgString}</div>`,
          });

          L.marker([latitude, longitude], { icon: locationIcon }).addTo(
            mapRef.current
          );
        }
      },
      (error) => {
        console.error("Error getting geolocation:", error);
      }
    );

    return () => {
      // Cleanup: Remove the map instance when the component is unmounted
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles
        styles={{ ul: { margin: 1, padding: 1, listStyle: "none" } }}
      />
      <CssBaseline />
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        // sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography
            align="left"
            variant="h3"
            color="#b2102f"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            Donori krvi
          </Typography>

          <Link
            variant="button"
            color="text.primary"
            href="#"
            sx={{ my: 1, mx: 1.5 }}
          >
            FAQ
          </Link>
          <Link
            variant="button"
            color="text.primary"
            href="#"
            sx={{ my: 1, mx: 1.5 }}
          >
            Novosti
          </Link>
          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Button
              type="submit"
              variant="outlined"
              color="inherit"
              sx={{ my: 1, mx: 1.5 }}
            >
              Odjavite se
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      {/* Hero unit */}
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          Pozdrav {user !== undefined ? user.name : ""}. Ova aplikacija će Vam
          olakšati proces darivanja krvi!
        </Typography>
      </Container>
      <Container style={{ display: "flex" }}>
        <Box id="leaflet-map" style={{ height: "400px", width: "60%" }}></Box>
      </Container>
      {/* Footer */}
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <Copyright sx={{ mt: 5 }} />
      </Container>
      {/* End footer */}
    </ThemeProvider>
  );
}
