import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { Container, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { attempChangePassword, attemptChange, attemptDelete, attemptRegister, fetchData, fetchUser, retrieveAwards, retrievePrevActions } from "../../redux/slices/authSlice";
import RegisterInput from "../../types/inputs/user/RegisterInput";
import { useForm } from "react-hook-form";

import { BlobProvider } from "@react-pdf/renderer";
import certificatePDF from "./certificatePdf";
import donationsPdf from "./donationsPdf";


function PersonalInfo() {
  const dispatch = useAppDispatch();
  const ageOptions = Array.from({ length: 48 }, (_, index) => 18 + index);
  const { user, role } = useSelector((state: RootState) => state.auth);
  const { register, handleSubmit } = useForm<RegisterInput>();
  const [passwordValidationMessage, setPasswordValidationMessage] = useState<string | null>(null);


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

  const [openChangePasswordDialog, setOpenChangePasswordDialog] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [passwordChangeMessage, setPasswordChangeMessage] = useState<string | null>(null);


  const [prevActions, setPrevActions] = useState<any[]>([]);
  useEffect(() => {
    // Fetch actions when component mounts
    dispatch(retrievePrevActions())
      .then((response: any) => {
        setPrevActions(response.payload || []);
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

  const handleOpenChangePasswordDialog = () => {
    setOpenChangePasswordDialog(true);
  };

  const handleCloseChangePasswordDialog = () => {
    setOpenChangePasswordDialog(false);
    // Clear password fields when the dialog is closed
    setOldPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
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

  const handleChangePassword = () => {
    // Check if the password is valid
    if (!passwordValidationMessage) {
      const passwords = {
        oldPassword: "",
        newPassword1: "",
        newPassword2: "",
      };
      passwords.oldPassword = oldPassword;
      passwords.newPassword1 = newPassword;
      passwords.newPassword2 = confirmNewPassword;
  
      dispatch(attempChangePassword(passwords))
        .then((response: any) => {
          const message = response.payload.message;
          setPasswordChangeMessage(message);
        })
        .catch((error: any) => {
          console.error("Error changing password:", error);
          const message = error.message;
          setPasswordChangeMessage(message);
        });
  
      handleCloseChangePasswordDialog();
    }
  };
  

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
              <Button onClick={handleOpenChangePasswordDialog} variant="contained" style={{ backgroundColor: "#b2102f", color: "white" }}>
                Promjeni lozinku
              </Button>
            </Box>
          </Box>
        </Box>
        <Dialog open={openChangePasswordDialog} onClose={handleCloseChangePasswordDialog}>
          <DialogTitle>Promjeni lozinku</DialogTitle>
          <DialogContent>
            <TextField
              label="Stara lozinka"
              type={showPassword ? "text" : "password"}
              fullWidth
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <TextField
              label="Nova lozinka"
              type={showPassword ? "text" : "password"}
              fullWidth
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                // Add password validation logic here
                validatePassword(e.target.value);
              }}
              // Add helper text and error state
              helperText={passwordValidationMessage}
              error={Boolean(passwordValidationMessage)}
            />
            <TextField
              label="Potvrdi novu lozinku"
              type={showPassword ? "text" : "password"}
              fullWidth
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseChangePasswordDialog}>Odustani</Button>
            <Button onClick={handleChangePassword}>Promjeni lozinku</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={Boolean(passwordChangeMessage)} onClose={() => setPasswordChangeMessage(null)}>
          <DialogTitle>Promjena lozinke</DialogTitle>
          <DialogContent>
            <Typography>{passwordChangeMessage}</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setPasswordChangeMessage(null)}>OK</Button>
          </DialogActions>
        </Dialog>
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
                    <BlobProvider
                      document={donationsPdf({
                        donorName: user?.name,
                        donation: donation
                      })}>
                      {({ url }) => (
                        <a href={url || undefined} target='_blank'>
                          <Button style={{ backgroundColor: "white", color: "#b2102f" }}>Izvezi u PDF</Button>
                        </a>
                      )}
                    </BlobProvider>
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
                    {/* <Button onClick={generatePDF} style={{ backgroundColor: "white", color: "black" , display: "flex", flexDirection:"column"}}> */}
                    <Typography variant="body1">
                      Naziv nagrade: {award.name}
                    </Typography>
                    <Typography variant="body1">
                      Datum dodjele: {new Date(award.createdAt).toLocaleDateString()}
                    </Typography>
                    <BlobProvider
                      document={certificatePDF({
                        donorName: user?.name,
                        award: award
                      })}>
                      {({ url }) => (
                        <a href={url || undefined} target='_blank'>
                          <Button style={{ backgroundColor: "white", color: "#b2102f" }}>Izvezi u PDF</Button>
                        </a>
                      )}
                    </BlobProvider>

                    {/* </Button> */}
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
