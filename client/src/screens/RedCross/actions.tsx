import React, { useState, useEffect } from 'react';
import { Container, Select, MenuItem, Typography, SelectChangeEvent, Grid, TextField, InputAdornment, Box } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, StaticTimePicker, TimePicker } from '@mui/x-date-pickers';
import { renderTimeViewClock } from '@mui/x-date-pickers/timeViewRenderers';
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from 'react-redux';
import bloodBankInfo from "../../types/inputs/user/bloodBankInfo";
import { attemptChange, attemptDelete, retrievePrevActions } from '../../redux/slices/authSlice';

//TODO : SPREMANJE SKCIJA KAO GODISNJE ( DA IMAMO PREDLOZAK SKROZ PUN)
//TODO : VIDIT TRIBA LI NAP OD DO U TRAJANJU AKCIJU

const Actions: React.FC = () => {


    const [selectedQuestion, setSelectedQuestion] = useState<number | ''>('');



    const handleQuestionChange = (event: SelectChangeEvent<number | ''>) => {
        setSelectedQuestion(event.target.value as number | '');
    };
    const [selectedDate, setSelectedDate] = useState(null);

    useEffect(() => {
        setSelectedDate(null);
    }, []);

    const handleDateChange = (date: any) => {
        setSelectedDate(date);
    }

    // const today = new Date();

    const [selectedTime, setSelectedTime] = useState<Date | null>(null);

    const handleTimeChange = (time: Date | null) => {
        setSelectedTime(time);

    };

    const [showForm, setShowForm] = useState(false);

    const handleClick = () => {
        setShowForm(prevState => !prevState); // Invertiramo trenutno stanje
    };
    return (
        <Container>
            <Box mt={5} ml={10} style={{ display: "flex" }}>
                <Box style={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant="h4" mb={2} color="#b2102f">
                        Prijašnje akcije
                    </Typography>
                    <ul>
                        <li>Element 1</li>
                        <li>Element 2</li>
                        <li>Element 3</li>
                    </ul>
                </Box>
                <Box style={{ display: "flex", flexDirection: "column" }}>
                    <h5>Akcije u tijeku</h5>
                    <ul>
                        <li>Element 1</li>
                        <li>Element 2</li>
                        <li>Element 3</li>
                    </ul>
                </Box>
                <Box style={{ display: "flex", flexDirection: "column" }}>
                    <button onClick={handleClick}>
                        {showForm ? 'Sakrij formu' : 'Prikaži formu'}
                    </button>
                    <Box>
                        {showForm && (
                            <Container>
                                <Select
                                    value={selectedQuestion}
                                    onChange={handleQuestionChange}
                                    displayEmpty
                                    fullWidth
                                    variant="outlined"
                                >
                                    <MenuItem value="" disabled>
                                        Odaberi zavod
                                    </MenuItem>
                                    <MenuItem value={0}>KBC Osijek</MenuItem>
                                    <MenuItem value={1}>KBC Rijeka</MenuItem>
                                    <MenuItem value={2}>KBC Split</MenuItem>
                                    <MenuItem value={3}>OB Dubrovnik</MenuItem>
                                    <MenuItem value={4}>OB Varaždin</MenuItem>
                                    <MenuItem value={5}>OB Zadar</MenuItem>
                                    <MenuItem value={6}>Hrvatski zavod za transfuzijsku medicinu Zagreb</MenuItem>
                                </Select>

                                {selectedQuestion !== '' && (
                                    <Typography variant="body1">
                                        {selectedQuestion !== null && (
                                            <>
                                                <Container>
                                                    <React.Fragment>
                                                        <Typography variant="h6" gutterBottom>
                                                            Akcija
                                                        </Typography>
                                                        <Grid container spacing={3}>
                                                            <Grid item xs={12} sm={6}>
                                                                <label style={{ display: 'block', fontSize: '15px', color: 'grey' }}>
                                                                    Grad
                                                                </label>
                                                                {selectedQuestion === 0 && (
                                                                    <>
                                                                        <TextField
                                                                            required
                                                                            id="city"
                                                                            name="city"
                                                                            fullWidth
                                                                            autoComplete="given-name"
                                                                            variant="standard"
                                                                            value={"Osijek"}
                                                                        />
                                                                    </>
                                                                )}
                                                            </Grid>
                                                            <Grid item xs={12} sm={6}>
                                                                <label style={{ display: 'block', fontSize: '15px', color: 'grey' }}>
                                                                    Adresa zavoda
                                                                </label>
                                                                {selectedQuestion === 0 && (
                                                                    <>
                                                                        <TextField
                                                                            required
                                                                            id="adress"
                                                                            name="adress"
                                                                            fullWidth
                                                                            autoComplete="family-name"
                                                                            variant="standard"
                                                                            value={"Ulica Josipa Huttlera 4"}
                                                                        />
                                                                    </>)}
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <label style={{ display: 'block', fontSize: '15px', color: 'grey' }}>
                                                                    Ime zavoda
                                                                </label>
                                                                {selectedQuestion === 0 && (
                                                                    <>
                                                                        <TextField
                                                                            required
                                                                            id="transfisionInstitute"
                                                                            name="transfisionInstitute"
                                                                            fullWidth
                                                                            autoComplete="family-name"
                                                                            variant="standard"
                                                                            value={"KBC Osijek"}
                                                                        />
                                                                    </>
                                                                )}
                                                            </Grid>
                                                            <Grid item xs={12}>
                                                                <label htmlFor="datepicker" style={{ display: 'block', fontSize: '15px', color: 'grey' }}>
                                                                    Odaberi datum akcije *
                                                                </label>
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
                                                    </React.Fragment>
                                                </Container>
                                            </>
                                        )}
                                    </Typography>
                                )}
                            </Container>
                        )}
                    </Box>
                </Box>
            </Box>
        </Container>

    );
};

export default Actions;


