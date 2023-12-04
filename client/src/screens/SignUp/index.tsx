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

export default function SignUp() {
  const [registrationType, setRegistrationType] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (registrationType === 'donor') {
      console.log({
        type: 'Donor',
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
        email: data.get('email'),
        bloodGroup: data.get('bloodGroup'),
      });
      // Dodajte logiku za registraciju kao donor
    } else if (registrationType === 'zavod') {
      console.log({
        type: 'Zavod',
        firstName: data.get('firstName'),
        lastName: data.get('lastName'),
        email: data.get('email'),
        institutionName: data.get('institutionName'),
      });
      // Dodajte logiku za registraciju kao djelatnik zavoda
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '#b2102f' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Registriraj se {' '}
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
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
                  name: 'registrationType',
                  id: 'registrationType',
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
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
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
                  required
                  fullWidth
                  id="lastName"
                  label="Prezime"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Adresa"
                  name="email"
                  autoComplete="email"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  select
                  required
                  fullWidth
                  id="institutionName"
                  label="Ime Zavoda"
                  name="institutionName"
                >
                  <MenuItem value ="KBC Osijek">KBC Osijek</MenuItem>
                  <MenuItem value ="KBC Rijeka">KBC Rijeka</MenuItem>
                  <MenuItem value ="KBC Split">KBC Split</MenuItem>
                  <MenuItem value ="OB Dubrovnik">OB Dubrovnil</MenuItem>
                  <MenuItem value ="OB Varaždin">OB Varaždin</MenuItem>
                  <MenuItem value ="OB Zadar">OB Zadar</MenuItem>
                  <MenuItem value ="Hrvatski zavod za transfuzijsku medicinu Zagreb">Hrvatski zavod za transfuzijsku medicinu Zagreb</MenuItem>

                </TextField>
              </Grid>

              {registrationType === 'donor' && (
                <Grid item xs={12}>
                  <TextField
                    select
                    required
                    fullWidth
                    id="bloodGroup"
                    label="Krvna grupa"
                    name="bloodGroup"
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
    </ThemeProvider>
  );
}