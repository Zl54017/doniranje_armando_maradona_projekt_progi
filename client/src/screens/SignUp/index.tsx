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

  const [registrationType, setRegistrationType] = useState("");

  const onSubmit = (response: RegisterInput) => {
    dispatch(attemptRegister(response));
  };

  /*React.useEffect(() => {
      navigate(`/${role}`);
      console.log(role);
  }, [user]);*/

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
            Registriraj se{" "}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel
                htmlFor="registrationType"
                shrink={Boolean(registrationType)}
              >
                Odabir uloge
              </InputLabel>
              <Select
                value={registrationType}
                onChange={(event) => setRegistrationType(event.target.value)}
                fullWidth
                inputProps={{
                  name: "registrationType",
                  id: "registrationType",
                }}
              >
                <MenuItem value="" disabled>
                  Odabir uloge
                </MenuItem>
                <MenuItem value="donor">Donor</MenuItem>
                <MenuItem value="zavod">Djelatnik zavoda</MenuItem>
              </Select>
            </FormControl>
            <Grid container spacing={2}>
              {(registrationType === "donor" ||
                registrationType === "zavod") && (
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
              )}

              {(registrationType === "donor" ||
                registrationType === "zavod") && (
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
              )}

              {(registrationType === "donor" ||
                registrationType === "zavod") && (
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
              )}

              {(registrationType === "donor" ||
                registrationType === "zavod") && (
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
                  />
                </Grid>
              )}

              {(registrationType === "donor" ||
                registrationType === "zavod") && (
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
              )}

              {registrationType === "donor" && (
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
              )}
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
