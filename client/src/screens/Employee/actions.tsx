import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, TextField, Box, Button } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { RootState, useAppDispatch } from '../../redux/store';
import { useDispatch, useSelector } from "react-redux";
import { attemptChange, attemptGetActiveActions, attemptGetPreviousActions } from '../../redux/slices/authSlice';
import { attemptNewAction } from "../../redux/slices/authSlice";
import { Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import dayjs from 'dayjs';

function Actions() {
  const dispatch = useAppDispatch();
  const { user, role } = useSelector((state: RootState) => state.auth);
  const [selectedQuestion, setSelectedQuestion] = useState<number | ''>('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [showForm, setShowForm] = useState(false);


  const handleClick = () => setShowForm((prevState) => !prevState);
  const [actionInfo, setActionInfo] = useState({
    name: "",
    city: "",
    address: "",
    date: new Date(),
    time: "",
  });



  useEffect(() => setSelectedDate(null), []);

  const handleDateChange = (date: any) => setSelectedDate(date);
  const handleTimeChange = (time: Date | null) => setSelectedTime(time);
  const [listOfPrevious, setListOfPrevious] = useState<any[]>([]);
  const [listOfActive, setListOfActive] = useState<any[]>([]);
  const handleNewAction = () => {
    dispatch(attemptNewAction(actionInfo));
    setShowForm(false);
  };

  const [dialogContent, setDialogContent] = useState('Nova akcija');

  const handleToggleDialog = () => {
    setShowForm(!showForm);
    if (showForm) {
      setDialogContent('Nova akcija');
    } else {
      setDialogContent('Otkaži');
    }
  };
  const handleCloseDialog = () => {
    setShowForm(false);
    setDialogContent('Nova akcija');
  };

  useEffect(() => {
    if (user) {
      dispatch(attemptGetPreviousActions(user))
        .then((response: any) => {
          setListOfPrevious(response.payload || []);
        })
        .catch((error: any) => {
          console.error("Error", error);
        });
    }
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      dispatch(attemptGetActiveActions(user))
        .then((response: any) => {
          setListOfActive(response.payload || []);
        })
        .catch((error: any) => {
          console.error("Error", error);
        });
    }
  }, [dispatch]);


  return (
    <Container>
      <Box mt={5} ml={5} style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginRight: '2%', flexGrow: 1 }}>
          <Typography variant="h4" mb={2} color="#b2102f">
            Prijašnje akcije
          </Typography>
          {listOfPrevious.length > 0 ? (
            <Box style={{ maxHeight: "200px", overflowY: "auto" }}>
              {listOfPrevious.map((actions: any) => (
                <Box marginBottom={2} padding={2} border="1px solid #b2102f" borderRadius={5}>
                  <Typography variant="body1">
                    Ime akcije: {actions.date}
                  </Typography>
                </Box>
              ))}
            </Box>
          ) : (
            <Typography variant="body1">Nema prijašnjih akcija.</Typography>
          )}
        </Box>
        <Box style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginRight: '2%', flexGrow: 1 }}>
          <Typography variant="h4" mb={2} color="#b2102f">
            Trenutne akcije
          </Typography>
          {listOfActive.length > 0 ? (
            <Box style={{ maxHeight: "200px", overflowY: "auto" }}>
              {listOfActive.map((actions: any) => (
                <Box marginBottom={2} padding={2} border="1px solid #b2102f" borderRadius={5}>
                  <Typography variant="body1">
                    Ime akcije: {actions.date}
                  </Typography>
                </Box>
              ))}
            </Box>
          ) : (
            <Typography variant="body1">Nema trenutnih akcija.</Typography>
          )}
        </Box>
        <Box style={{ display: 'flex', flexDirection: 'column', marginRight: '5%', flexGrow: 1 }}>
          <Button onClick={handleToggleDialog} variant="contained" style={{ backgroundColor: "#b2102f", color: "white", gap: "10px", fontSize: '0.8rem', width: '200px', height: '30px' }}>
            {showForm ? 'Otkaži' : 'Nova akcija'}
          </Button>
          {showForm && (
            <Dialog open={showForm} onClose={handleToggleDialog} fullWidth maxWidth="sm">
              <DialogContent dividers>
                <Container style={{ maxWidth: '500px', maxHeight: '80vh', overflowY: 'auto', padding: '16px' }}>
                  <Typography variant="body1">
                    {selectedQuestion !== null && (
                      <Container style={{ padding: '8px' }}>
                        <Box style={{ display: "flex", flexDirection: "column" }}>
                          <Typography variant="h6" gutterBottom>
                            Akcija
                          </Typography>
                          <Grid container spacing={3}>
                            <Grid item xs={12} sm={6}>
                              <label style={{ display: 'block', fontSize: '15px', color: 'grey' }}>Grad</label>
                              <TextField required id="city" name="city" fullWidth autoComplete="given-name" variant="standard" value={"Osijek"} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <label style={{ display: 'block', fontSize: '15px', color: 'grey' }}>Adresa zavoda</label>
                              <TextField required id="adress" name="adress" fullWidth autoComplete="family-name" variant="standard" value={"Ulica Josipa Huttlera 4"} />
                            </Grid>
                            <Grid item xs={12}>
                              <label style={{ display: 'block', fontSize: '15px', color: 'grey' }}>Ime zavoda</label>
                              <TextField required id="transfisionInstitute" name="transfisionInstitute" fullWidth autoComplete="family-name" variant="standard" value={"KBC Osijek"} />
                            </Grid>
                            <Grid item xs={12}>
                              <label htmlFor="datepicker" style={{ display: 'block', fontSize: '15px', color: 'grey' }}>Odaberi datum akcije *</label>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker />
                              </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12}>
                              <label style={{ display: 'block', fontSize: '15px', color: 'grey' }}>Odaberite vrijeme akcije*</label>
                              <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                  label="With Time Clock"
                                  viewRenderers={{
                                    hours: renderTimeViewClock,
                                    minutes: renderTimeViewClock,
                                    seconds: renderTimeViewClock,
                                  }}
                                />
                              </LocalizationProvider>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Button onClick={handleNewAction} variant="contained" style={{ backgroundColor: "#b2102f", color: "white", gap: "10px" }}>
                                Spremi Akciju
                              </Button>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                              <Button onClick={handleCloseDialog} variant="contained" style={{ backgroundColor: "#b2102f", color: "white", gap: "30px" }}>
                                Otkaži
                              </Button>
                            </Grid>
                          </Grid>
                        </Box>
                      </Container>
                    )}
                  </Typography>
                </Container>
              </DialogContent>
            </Dialog>
          )}

        </Box>
      </Box>
    </Container>
  );
}

export default Actions;
