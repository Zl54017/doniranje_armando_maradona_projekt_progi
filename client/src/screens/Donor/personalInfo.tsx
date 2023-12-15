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
import { attemptChange, attemptDelete, attemptRegister, fetchData, fetchUser, retrieveAwards, retrievePrevActions } from "../../redux/slices/authSlice";
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
    bloodType: "",
    transfusionInstitute: "",
    gender: "",
    age: 0,
  });

  const [prevActions, setPrevActions] = useState<any[]>([]);
  useEffect(() => {
    // Fetch actions when component mounts
    dispatch(retrievePrevActions())
      .then((response: any) => {
        setPrevActions(response.payload || []);
        console.log(prevActions);
      })
      .catch((error: any) => {
        console.error("Error retrieving actions:", error);
      });
  }, [dispatch]);

  const [awards, setAwards] = useState<any[]>([]);
  useEffect(() => {
    // Fetch actions when component mounts
    dispatch(retrieveAwards())
      .then((response: any) => {
        setAwards(response.payload || []);
        console.log(awards);
      })
      .catch((error: any) => {
        console.error("Error retrieving actions:", error);
      });
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      const [firstName, lastName] = user.name.split(' ');
      setUserInfo({
        firstName: firstName || "",
        lastName: lastName || "",
        email: user.email || "",
        password: user.password || "",
        gender: user.gender,
        transfusionInstitute: user.transfusionInstitute,
        bloodType: user.bloodType,
        age: user.age,
      });
    }
  }, [user]);

  const handleChange = (key: string, value: any) => {
    setUserInfo({ ...userInfo, [key]: value });
  };

  const handleChangeUser = () => {
    dispatch(attemptChange(userInfo));
  };

  const handleDeleteAccount = () => {
    dispatch(attemptDelete());
  };

  const handleChangePassword = () => {
    console.log("Brisi pass");
  }

  return (
    <Container>
      <Box mt={5} ml={10} style={{ display: "flex" }}>
        <Box style={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h4" mb={2} color="#b2102f">
            Osobni Podaci:
          </Typography>
          <Box style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Box style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="subtitle1" color="#b2102f" style={{ width: "120px" }}>
                Ime:
              </Typography>
              <TextField
                {...register("firstName")}
                id="firstName"
                value={userInfo.firstName}
                onChange={(e) => handleChange("firstName", e.target.value)}
              />
            </Box>
            <Box style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="subtitle1" color="#b2102f" style={{ width: "120px" }}>
                Prezime:
              </Typography>
              <TextField
                {...register("lastName")}
                id="lastName"
                value={userInfo.lastName}
                onChange={(e) => handleChange("lastName", e.target.value)}
              />
            </Box>
            <Box style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="subtitle1" color="#b2102f" style={{ width: "120px" }}>
                Email:
              </Typography>
              <TextField
                {...register("email")}
                id="email"
                value={userInfo.email}
                onChange={(e) => handleChange("email", e.target.value)}
              />
            </Box>
            <Box style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="subtitle1" color="#b2102f" style={{ width: "120px" }}>
                Dob:
              </Typography>
              <Select
                {...register("age", { required: true })}
                id="age"
                value={userInfo.age}
                style={{ minWidth: "200px" }}
                onChange={(e) => handleChange("age", e.target.value)}
              >
                {ageOptions.map((age) => (
                  <MenuItem key={age} value={age}>
                    {age}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            <Box style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="subtitle1" color="#b2102f" style={{ width: "120px" }}>
                Spol:
              </Typography>
              <Select
                {...register("gender")}
                id="gender"
                value={userInfo.gender}
                style={{ minWidth: "200px" }}
                onChange={(e) => handleChange("gender", e.target.value)}
              >
                <MenuItem value="M">M</MenuItem>
                <MenuItem value="F">F</MenuItem>
              </Select>
            </Box>
            <Box style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="subtitle1" color="#b2102f" style={{ width: "120px" }}>
                Zavod:
              </Typography>
              <Select
                {...register("transfusionInstitute")}
                id="transfusionInstitute"
                value={userInfo.transfusionInstitute}
                style={{ minWidth: "200px" }}
                onChange={(e) => handleChange("transfusionInstitute", e.target.value)}
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
            </Box>
            <Box style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="subtitle1" color="#b2102f" style={{ width: "120px" }}>
                Krvna Grupa:
              </Typography>
              <Select
                {...register("bloodType")}
                id="bloodType"
                value={userInfo.bloodType}
                style={{ minWidth: "200px" }}
                onChange={(e) => handleChange("bloodType", e.target.value)}
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
            </Box>
            <Box style={{ display: "flex", gap: "10px" }}>
              <Button onClick={handleChangeUser} variant="contained" style={{ backgroundColor: "#b2102f", color: "white" }}>
                Spremi Promjene
              </Button>
              <Button onClick={handleDeleteAccount} variant="contained" style={{ backgroundColor: "#b2102f", color: "white" }}>
                Obriši Račun
              </Button>
            </Box>
            <Box style={{ display: "flex", gap: "10px" }}>
              <Button onClick={handleChangePassword} variant="contained" style={{ backgroundColor: "#b2102f", color: "white" }}>
                Promjeni lozinku
              </Button>
            </Box>
          </Box>
        </Box>
        <Box style={{ display: "flex", flexDirection: "column", maxWidth: "1000px" }} >
          <Box ml={30} style={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h4" mb={2} color="#b2102f">
              Popis Prijašnjih Donacija:
            </Typography>
            {prevActions.length > 0 ? (
              <Box style={{ maxHeight: "200px", overflowY: "auto" }}>
                {prevActions.map((donation: any, index: number) => (
                  <Box key={index} marginBottom={2} padding={2} border="1px solid #b2102f" borderRadius={5}>
                    <Typography variant="body1">
                      Mjesto donacije: {donation.address}
                    </Typography>
                    <Typography variant="body1">
                      Datum donacije: {new Date(donation.date).toLocaleDateString()}
                    </Typography>
                  </Box>
                ))}
              </Box>
            ) : (
              <Typography variant="body1">Nema zabilježenih donacija.</Typography>
            )}
          </Box>
          <Box mt={5} ml={30} style={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h4" mb={2} color="#b2102f">
              Nagrade:
            </Typography>
            {awards.length > 0 ? (
              <Box style={{ maxHeight: "200px", overflowY: "auto" }}>
                {awards.map((award: any, index: number) => (
                  <Box key={index} marginBottom={2} padding={2} border="1px solid #b2102f" borderRadius={5}>
                    <Typography variant="body1">
                      Naziv nagrade: {award.name}
                    </Typography>
                    <Typography variant="body1">
                      Datum dodjele: {new Date(award.date).toLocaleDateString()}
                    </Typography>
                    {/* Add any additional award information you want to display */}
                  </Box>
                ))}
              </Box>
            ) : (
              <Typography variant="body1">Nema zabilježenih nagrada.</Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default PersonalInfo;
