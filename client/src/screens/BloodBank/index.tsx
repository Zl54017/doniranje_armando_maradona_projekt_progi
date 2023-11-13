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

export default function BloodBank() {
  const { register, handleSubmit } = useForm();
  const dispatch = useAppDispatch();
  const { user, role } = useSelector((state: RootState) => state.auth);
  const onSubmit = () => {
    dispatch(attemptLogout());
  };

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
          olakšati praćenje zaliha krvi i korisnika!
        </Typography>
      </Container>
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
