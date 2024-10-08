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
import { useState } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import axios from "axios";
import { RootState, useAppDispatch } from "../../redux/store";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import LoginInput from "../../types/inputs/user/LoginInput";
import {
  attemptLogin,
  attemptRegister,
  clearUser,
  fetchUser,
} from "../../redux/slices/authSlice";
import RegisterInput from "../../types/inputs/user/RegisterInput";
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

function SignUp() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit } = useForm<RegisterInput>();
  const { user, role } = useSelector((state: RootState) => state.auth);
  const [passwordValidationMessage, setPasswordValidationMessage] = useState<string | null>(null);
  const [registrationType, setRegistrationType] = useState("");
  const ageOptions = Array.from({ length: 48 }, (_, index) => 18 + index);


  const onSubmit = (response: RegisterInput) => {
    if (!passwordValidationMessage) {
      dispatch(attemptRegister(response));
    }
  };

  const validatePassword = (password: string) => {
    // Add your password validation logic here
    let message = null;

    if (password.length < 8) {
      message = "Zaporka mora imati najmanje 8 znakova.";
    } else if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
      message = "Zaporka mora sadržavati kombinaciju slova i brojeva.";
    }

    // Update the state with the validation message
    setPasswordValidationMessage(message);
  };

  React.useEffect(() => {
    if (localStorageUtility.getAuthToken() !== null && user === undefined) {
      dispatch(fetchUser());
    } else if (
      user !== undefined &&
      localStorageUtility.getAuthToken() !== null &&
      location.pathname !== "/signup"
    ) {
      console.log(location);
      navigate(`${location.state.from.pathname}`);
    } else if (localStorageUtility.getAuthToken() === null) {
      dispatch(clearUser());
    } else if (
      user !== undefined &&
      localStorageUtility.getAuthToken() !== null &&
      location.pathname === "/signup"
    ) {
      navigate(`/${role}/${user.id}`);
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
            Registriraj se kao donor{" "}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("firstName")}
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="Ime"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  {...register("lastName")}
                  required
                  fullWidth
                  id="lastName"
                  label="Prezime"
                  name="lastName"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("email")}
                  required
                  fullWidth
                  id="email"
                  label="Email Adresa"
                  name="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("password")}
                  required
                  fullWidth
                  id="password"
                  type="password"
                  label="Lozinka"
                  name="password"
                  autoComplete="password"
                  onChange={(e) => { validatePassword(e.target.value); }}
                  helperText={passwordValidationMessage}
                  error={Boolean(passwordValidationMessage)}
                />
              </Grid>
              <Grid item xs={12}>
                <InputLabel>Dob</InputLabel>
                <Select
                  {...register("age", { required: true })}
                  required
                  fullWidth
                  id="age"
                  label="Dob"
                  name="age"
                >
                  {ageOptions.map((age) => (
                    <MenuItem key={age} value={age}>
                      {age}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("gender")}
                  select
                  required
                  fullWidth
                  id="gender"
                  label="Spol"
                  name="gender"
                >
                  <MenuItem value="M"> M </MenuItem>
                  <MenuItem value="F"> F </MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("transfusionInstitute")}
                  select
                  required
                  fullWidth
                  id="transfusionInstitute"
                  label="Ime Zavoda"
                  name="transfusionInstitute"
                >
                  <MenuItem value="KBC Osijek">KBC Osijek</MenuItem>
                  <MenuItem value="KBC Rijeka">KBC Rijeka</MenuItem>
                  <MenuItem value="KBC Split">KBC Split</MenuItem>
                  <MenuItem value="OB Dubrovnik">OB Dubrovnik</MenuItem>
                  <MenuItem value="OB Varaždin">OB Varaždin</MenuItem>
                  <MenuItem value="OB Zadar">OB Zadar</MenuItem>
                  <MenuItem value="Hrvatski zavod za transfuzijsku medicinu Zagreb">
                    Hrvatski zavod za transfuzijsku medicinu Zagreb
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("bloodType")}
                  select
                  required
                  fullWidth
                  id="bloodType"
                  label="Krvna grupa"
                  name="bloodType"
                >
                  <MenuItem value="A+">A+</MenuItem>
                  <MenuItem value="A-">A-</MenuItem>
                  <MenuItem value="B+">B+</MenuItem>
                  <MenuItem value="B-">B-</MenuItem>
                  <MenuItem value="AB+">AB+</MenuItem>
                  <MenuItem value="AB-">AB-</MenuItem>
                  <MenuItem value="0+">0+</MenuItem>
                  <MenuItem value="0-">0-</MenuItem>
                </TextField>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Registriraj se
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Već imate račun? Prijavite se
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </ThemeProvider>
  );
}

export default SignUp;
