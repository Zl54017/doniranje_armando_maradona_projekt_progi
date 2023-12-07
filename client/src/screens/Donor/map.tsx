import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  AppBar,
  Button,
  CssBaseline,
  Toolbar,
  Box,
  Typography,
  Link,
  Container,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import GlobalStyles from "@mui/material/GlobalStyles";
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
import PersonalInfo from "./personalInfo";
import Faq from "./faq";

const defaultTheme = createTheme();

function Map() {
  const { user, role } = useSelector((state: RootState) => state.auth);

  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<L.Map | null>(null);
  useEffect(() => {
    const container = document.getElementById("leaflet-map");

    if (!container) {
      console.error("Map container not found.");
      return;
    }

    if (!mapRef.current) {
      var mapInstance = L.map(container).setView([0, 0], 2);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(mapInstance);

      mapRef.current = mapInstance;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        if (mapRef.current) {
          mapRef.current.setView([latitude, longitude], 15);

          L.circleMarker([latitude, longitude]).addTo(mapInstance);
        }
      },
      (error) => {
        console.error("Error getting geolocation:", error);
      }
    );
    const fixedLocations = [
      { lat: 45.558042202768455, lng: 18.71365045228026 }, //KBC Osijek
      { lat: 43.503911289394324, lng: 16.45792246443381 }, //KBC Split
      { lat: 45.332834054047154, lng: 14.425599994595334 }, //KBC Rijeka
      { lat: 42.64782497663791, lng: 18.075890982807405 }, // OB Dubrovnik
      { lat: 46.30263721672062, lng: 16.325257294377536 }, //OB Varaždin
      { lat: 44.10745411911505, lng: 15.23451962336266 }, //OB Zadar
      { lat: 45.81617537849029, lng: 15.99113679462288 }, //Hrvatski zavod za transfuzijsku medicinu Zagreb
      //
    ];
    if (mapRef.current) {
      fixedLocations.forEach((fixedLocation) => {
        L.circle([fixedLocation.lat, fixedLocation.lng], {
          color: "red",
          fillColor: "#f03",
          fillOpacity: 0.5,
          radius: 100,
        }).addTo(mapInstance);
      });
    }
    return () => {
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
        <Box border={1} borderColor="black" p={2} padding={5} margin={5}>
          {" "}
          <Typography variant="h6" gutterBottom color="text.secondary">
            Kalendar nadolazećih akcija darivanja krvi:
          </Typography>
          <List>
            <ListItem>
              <ListItemText
                color="text.secondary"
                primary="Dobrovoljno darivanje krvi 25.12.2023., FER"
              />
            </ListItem>
            <ListItem>
              <ListItemText
                color="text.secondary"
                primary="Dobrovoljno darivanje krvi 25.12.2023., PMF"
              />
            </ListItem>
            {/* Add more ListItems as needed */}
          </List>
        </Box>
      </Container>
      {/* Footer */}
    </ThemeProvider>
  );
}

export default Map;
