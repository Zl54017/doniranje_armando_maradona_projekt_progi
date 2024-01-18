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
import Main from "../Main";
import Map from "./map";
import localStorageUtility from "../../utils/localStorage/auth";
import News from "./news";

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

function ContentBox({ activeTab }: { activeTab: string }) {
  return (
    <div>
      {activeTab === "personalInfo" ? (
        <PersonalInfo />
      ) : activeTab == "faq" ? (
        <Faq />
      ) : activeTab==="news" ? (
        <News />
      ): (
        <Map />
      )}
    </div>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Donor() {
  const { register, handleSubmit } = useForm();

  const dispatch = useAppDispatch();
  const { user, role } = useSelector((state: RootState) => state.auth);
  const [activeTab, setActiveTab] = React.useState("map");

  const [error, setError] = useState<string | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  const onSubmit = () => {
    dispatch(attemptLogout());
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles
        styles={{ ul: { margin: 1, padding: 1, listStyle: "none" } }}
      />
      <CssBaseline />
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography
            align="left"
            variant="h3"
            color="#b2102f"
            noWrap
            sx={{ flexGrow: 1 }}
          >
            <Link
              href="#"
              align="left"
              variant="h3"
              color="#b2102f"
              noWrap
              sx={{ flexGrow: 1, textDecoration: "none" }}
              onClick={() => {
                setActiveTab("map");
              }}
            >
              Donori krvi{" "}
            </Link>
          </Typography>
          <Link
            variant="button"
            color="text.primary"
            href="#"
            sx={{ my: 1, mx: 1.5 }}
            onClick={() => {
              setActiveTab("map");
            }}
          >
            Početna
          </Link>
          <Link
            variant="button"
            color="text.primary"
            href="#"
            sx={{ my: 1, mx: 1.5 }}
            onClick={() => {
              setActiveTab("faq");
            }}
          >
            FAQ
          </Link>
          <Link
            variant="button"
            color="text.primary"
            href="#"
            sx={{ my: 1, mx: 1.5 }}
            onClick={() => {
              setActiveTab("news")
            }}
          >
            Novosti
          </Link>
          <Link
            variant="button"
            color="text.primary"
            href="#"
            sx={{ my: 1, mx: 1.5 }}
            onClick={() => {
              setActiveTab("personalInfo");
            }}
          >
            Osobni podatci
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

      <ContentBox activeTab={activeTab} />
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
    </ThemeProvider>
  );
}
