import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, TextField, Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, TimePicker } from '@mui/x-date-pickers';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';

function Actions() {
  const [selectedQuestion, setSelectedQuestion] = useState<number | ''>('');
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState<Date | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleClick = () => setShowForm((prevState) => !prevState);

  useEffect(() => setSelectedDate(null), []);

  const handleDateChange = (date: any) => setSelectedDate(date);
  const handleTimeChange = (time: Date | null) => setSelectedTime(time);

  return (
    <Container>
      <Box mt={5} ml={5} style={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Box style={{ display: 'flex', flexDirection: 'column', marginRight: '5%' }}>
          <Typography variant="h4" mb={2} color="#b2102f">
            Prijašnje akcije
          </Typography>
          <ul>
            <li>Element 1</li>
            <li>Element 2</li>
            <li>Element 3</li>
          </ul>
        </Box>
        <Box style={{ display: 'flex', flexDirection: 'column', marginRight: '5%' }}>
          <Typography variant="h4" mb={2} color="#b2102f">
            Trenutne akcije
          </Typography>
          <ul>
            <li>Element 1</li>
            <li>Element 2</li>
            <li>Element 3</li>
          </ul>
        </Box>
        <Box style={{ display: 'flex', flexDirection: 'column', marginRight: '5%', flexGrow: 1 }}>
          <button onClick={handleClick}>
            {showForm ? 'Otkaži' : 'Nova akcija'}
          </button>
          {showForm && (
            <Container style= {{maxWidth: '500px'}}>
            <Typography variant="body1">
              {selectedQuestion !== null && (
                <Container>
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
                    </Grid>
                  </Box>
                </Container>
              )}
            </Typography>
            </Container>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default Actions;
