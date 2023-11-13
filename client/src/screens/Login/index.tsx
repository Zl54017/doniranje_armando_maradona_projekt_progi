import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import localStorageUtility from "../../utils/localStorage/auth";
import { RootState, useAppDispatch } from "../../redux/store";
import {
  attemptLogin,
  clearUser,
  fetchUser,
} from "../../redux/slices/authSlice";
import LoginInput from "../../types/inputs/user/LoginInput";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";

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

export default function Login() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit } = useForm<LoginInput>();
  const { user, role } = useSelector((state: RootState) => state.auth);

  const onSubmit = (response: LoginInput) => {
    dispatch(attemptLogin(response));
  };

  React.useEffect(() => {
    if (localStorageUtility.getAuthToken() !== null && user === undefined) {
      dispatch(fetchUser());
    } else if (
      user !== undefined &&
      localStorageUtility.getAuthToken() !== null &&
      location.pathname !== "/login"
    ) {
      console.log(location);
      navigate(`${location.state.from.pathname}`);
    } else if (localStorageUtility.getAuthToken() === null) {
      dispatch(clearUser());
    } else if (
      user !== undefined &&
      localStorageUtility.getAuthToken() !== null &&
      location.pathname === "/login"
    ) {
      navigate(`/${role}`);
      console.log(role);
    }
  }, [user]);

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#b2102f" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Prijavi se
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              {...register("email")}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Adresa"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              {...register("password")}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Lozinka"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Prijavi se
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Registriraj se"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
