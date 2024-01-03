import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { attemptLogout, clearUser } from "../../redux/slices/authSlice";
import localStorageUtility from "../../utils/localStorage/auth";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Actions from './actions';
import Statistics from './statistics';
import ListOfDonors from './listOfDonors';
import AddEmployee from './addEmployee';
import FaqEmployee from "./faqEmployee";
import { ReactNode } from "react";






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

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

type Props = {
  state: ReactNode;
};


function ContentBox({ activeTab }: { activeTab: string }) {
  return (
    <div>
      {activeTab === 'listOfDonors' ? (
        <ListOfDonors />
      ) : activeTab === 'actions' ? (
        <Actions />
      ) : activeTab === 'statistics' ? (
        <Statistics />
      ) : activeTab === 'faqEmployee' ? (
        <FaqEmployee />
      ) : (
        <AddEmployee />
      )}
    </div>
  );
}

export default function BloodBank() {
  const { register, handleSubmit } = useForm();
  const dispatch = useAppDispatch();
  const { user, role } = useSelector((state: RootState) => state.auth);
  const onSubmit = () => {
    dispatch(attemptLogout());
  };
  const [activeTab, setActiveTab] = React.useState('listOfDonors');
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

          <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Link
              variant="button"
              color="text.primary"
              href='#'
              sx={{ my: 1, mx: 1.5 }}
              onClick={() => { setActiveTab('listOfDonors'); }}
            >
              Popis Donora
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
              onClick={() => { setActiveTab('actions'); }}
            >
              Akcije
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href='#'
              sx={{ my: 1, mx: 1.5 }}
              onClick={() => { setActiveTab('addEmployee'); }}
            >
              Dodaj Zaposlenika
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
              onClick={() => { setActiveTab('statistics'); }}
            >
              Statistika
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
              onClick={() => { setActiveTab('faqEmployee'); }}
            >
              Uredi FAQ
            </Link>
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
      <ContentBox activeTab={activeTab} />
      {/* End hero unit */}
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
