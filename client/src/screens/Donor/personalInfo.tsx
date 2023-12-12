import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Container } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { attemptRegister, fetchData, fetchUser } from "../../redux/slices/authSlice";
import RegisterInput from "../../types/inputs/user/RegisterInput";
import { useForm } from "react-hook-form";

function PersonalInfo() {
  const dispatch = useAppDispatch();
  const ageOptions = Array.from({ length: 48 }, (_, index) => 18 + index);
  const { user, role } = useSelector((state: RootState) => state.auth);
  const { register, handleSubmit } = useForm<RegisterInput>();

  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    organization: "",
    bloodType: "",
    age: 0,
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (user) {
      const [firstName, lastName] = user.name.split(' ');
      setUserInfo({
        firstName: firstName || "",
        lastName: lastName || "",
        email: user.email || "",
        password: user.password || "",
        gender: user.gender,
        organization: user.transfusionInstitute,
        bloodType: user.bloodType,
        age: user.age,
      });
    }
  }, [user]);

  const onSubmit = (response: RegisterInput) => {
    dispatch(attemptRegister(response))
    console.log("Promjene spremljene:", userInfo);
  };

  const handleDeleteAccount = () => {
    console.log("Račun obrisan");
    // Dodaj logiku za brisanje računa iz baze podataka putem Redux akcije
  };

  return (
    <Container >
      <Box mt={5} ml={10} style={{ display: "flex" }}>
        <Box style={{ display: "flex", flexDirection: "column" }} >
          <Typography variant="h4" mb={2} color="#b2102f">
            Osobni Podaci:
          </Typography>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="subtitle1" color="#b2102f" style={{ width: "120px" }}>
                Ime:
              </Typography>
              <TextField
                {...register("firstName")}
                id="firstName"
                value={userInfo.firstName}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="subtitle1" color="#b2102f" style={{ width: "120px" }}>
                Prezime:
              </Typography>
              <TextField
                {...register("lastName")}
                id="lastName"
                value={userInfo.lastName}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="subtitle1" color="#b2102f" style={{ width: "120px" }}>
                Email:
              </Typography>
              <TextField
                {...register("email")}
                id="email"
                value={userInfo.email}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="subtitle1" color="#b2102f" style={{ width: "120px" }}>
                Lozinka:
              </Typography>
              <TextField
                {...register("password")}
                id="password"
                type={showPassword ? "text" : "password"}
                value={userInfo.password}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="subtitle1" color="#b2102f" style={{ width: "120px" }}>
                Dob:
              </Typography>
              <Select
                {...register("age", { required: true })}
                id="age"
                value={userInfo.age}
                style={{ minWidth: "200px" }}
              >
                {ageOptions.map((age) => (
                  <MenuItem key={age} value={age}>
                    {age}
                  </MenuItem>
                ))}
              </Select>
            </div>

            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="subtitle1" color="#b2102f" style={{ width: "120px" }}>
                Spol:
              </Typography>
              <Select
                {...register("gender")}
                id="gender"
                value={userInfo.gender}
                style={{ minWidth: "200px" }}
              >
                <MenuItem value="m">Muško</MenuItem>
                <MenuItem value="ž">Žensko</MenuItem>
              </Select>
            </div>
            <div style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="subtitle1" color="#b2102f" style={{ width: "120px" }}>
                Zavod:
              </Typography>
              <Select
                {...register("transfusionInstitute")}
                id="organization"
                value={userInfo.organization}
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
              <Typography variant="subtitle1" color="#b2102f" style={{ width: "120px" }}>
                Krvna Grupa:
              </Typography>
              <Select
                {...register("bloodType")}
                id="bloodType"
                value={userInfo.bloodType}
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
              <Button onClick={handleSubmit(onSubmit)} variant="contained" color="error">
                Spremi Promjene
              </Button>
              <Button onClick={handleDeleteAccount} variant="contained" color="error">
                Obriši Račun
              </Button>
            </div>
          </div>
        </Box>
        <Box style={{ display: "flex", flexDirection: "column", maxWidth: "1000px"}} >
          <Box ml={30} style={{ display: "flex", flexDirection: "column"}}>
            <Typography variant="h4" mb={2} color="#b2102f">
              Popis Prijašnjih Donacija:
            </Typography>
            <Box style={{maxHeight: "200px", overflowY: "auto" }}>
              //TODO for petlja za renderanje donacija
              <Box>Item 1</Box>
              <Box>Item 2</Box>
              <Box>Item 1</Box>
              <Box>Item 2</Box>
              <Box>Item 1</Box>
              <Box>Item 2</Box>
              <Box>Item 1</Box>
              <Box>Item 2</Box>
              <Box>Item 1</Box>
              <Box>Item 2</Box>
            </Box>
          </Box>
          <Box mt={5} ml={30} style={{ display: "flex", flexDirection: "column"}}>
            <Typography variant="h4" mb={2} color="#b2102f">
              Nagrade:
            </Typography>
            <Box style = {{maxHeight: "200px", overflowY: "auto" }}>
              //TODO for petlja za renderanje nagrada
              <Box>Item 1</Box>
              <Box>Item 2</Box>
              <Box>Item 1</Box>
              <Box>Item 2</Box>
              <Box>Item 1</Box>
              <Box>Item 2</Box>
              <Box>Item 1</Box>
              <Box>Item 2</Box>
              <Box>Item 1</Box>
              <Box>Item 2</Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default PersonalInfo;
