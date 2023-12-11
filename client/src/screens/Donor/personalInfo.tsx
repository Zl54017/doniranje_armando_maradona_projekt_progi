import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Container } from "@mui/material";

function PersonalInfo() {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmedPassword: "",
    gender: "",
    organization: "",
    bloodType: "",
    donations: [],
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setUserInfo((prev) => ({ ...prev, [field]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSaveChanges = () => {
    console.log("Changes saved:", userInfo);
  };

  const handleDeleteAccount = () => {
    console.log("Account deleted");
  };

  return (
    <Container >    
    <Box mt={5} ml={10} style={{ display: "flex" , flexDirection:"column" }} >
      <Typography variant="h4" mb={2} color="#b2102f">
        Osobni Podaci:
      </Typography>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography variant="subtitle1"  color="#b2102f" style={{ width: "120px" }}>
            Ime:
          </Typography>
          <TextField
            id="firstName"
            value={userInfo.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography variant="subtitle1"  color="#b2102f" style={{ width: "120px" }}>
            Prezime:
          </Typography>
          <TextField
            id="lastName"
            value={userInfo.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography variant="subtitle1"  color="#b2102f" style={{ width: "120px" }}>
            Email:
          </Typography>
          <TextField
            id="email"
            value={userInfo.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography variant="subtitle1"  color="#b2102f" style={{ width: "120px" }}>
            Lozinka:
          </Typography>
          <TextField
            id="password"
            type={showPassword ? "text" : "password"}
            value={userInfo.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
          />
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography variant="subtitle1"  color="#b2102f" style={{ width: "120px" }}>
            Zavod:
          </Typography>
          <Select
            id="organization"
            value={userInfo.organization}
            onChange={(e) => handleInputChange("organization", e.target.value)}
            style={{ minWidth: "200px" }}
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
          </Select>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography variant="subtitle1"  color="#b2102f" style={{ width: "120px" }}>
            Krvna Grupa:
          </Typography>
          <Select
            id="bloodType"
            value={userInfo.bloodType}
            onChange={(e) => handleInputChange("bloodType", e.target.value)}
            style={{ minWidth: "200px" }}
          >
            <MenuItem value="A+">A+</MenuItem>
            <MenuItem value="A-">A-</MenuItem>
            <MenuItem value="B+">B+</MenuItem>
            <MenuItem value="B-">B-</MenuItem>
            <MenuItem value="AB+">AB+</MenuItem>
            <MenuItem value="AB-">AB-</MenuItem>
            <MenuItem value="0+">0+</MenuItem>
            <MenuItem value="0-">0-</MenuItem>
          </Select>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <Button onClick={handleSaveChanges} variant="contained" color="error">
            Spremi Promjene
          </Button>
          <Button onClick={handleDeleteAccount} variant="contained" color="error">
            Obriši Račun
          </Button>
        </div>
      </div>
    </Box>
    </Container>
  );
}

export default PersonalInfo;
