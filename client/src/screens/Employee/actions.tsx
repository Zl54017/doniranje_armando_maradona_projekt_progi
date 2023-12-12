import React, { useState, useEffect } from 'react';
import { Container, Select, MenuItem, Typography, SelectChangeEvent, Grid, TextField, InputAdornment } from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider, StaticTimePicker, TimePicker } from '@mui/x-date-pickers';
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

    const [selectedTime, setSelectedTime] = useState<Date | null>(null);

    const handleTimeChange = (time: Date | null) => {
        setSelectedTime(time);
    };

    return (
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
                    {/* Sadržaj za odabrano pitanje */}
                    {/* Prilagodite sadržaj prema potrebama */}
                    {selectedQuestion === 0 && (
                        <>
                            <Container>
                                <React.Fragment>
                                    <Typography variant="h6" gutterBottom>
                                        Akcija
                                    </Typography>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="grad"
                                                name="grad"
                                                label="Grad"
                                                fullWidth
                                                autoComplete="given-name"
                                                variant="standard"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="adresa"
                                                name="adresa"
                                                label="Adresa"
                                                fullWidth
                                                autoComplete="family-name"
                                                variant="standard"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                id="imeZavoda"
                                                name="imeZavoda"
                                                label="Ime zavoda"
                                                fullWidth
                                                autoComplete="shipping address-line1"
                                                variant="standard"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <label htmlFor="datepicker" style={{ display: 'block', fontSize: '15px', color: 'grey' }}>
                                                Odaberi datum akcije *
                                            </label>
                                            <DatePicker
                                                required
                                                id="datepicker"
                                                selected={selectedDate}
                                                onChange={handleDateChange}
                                                dateFormat="dd/MM/yyyy"
                                                minDate={new Date()}
                                                showMonthDropdown
                                                showYearDropdown
                                                dropdownMode="select"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <StaticTimePicker orientation="landscape" />
                                            </LocalizationProvider>
                                        </Grid>
                                    </Grid>
                                </React.Fragment>
                            </Container>
                        </>
                    )}
                    {selectedQuestion === 1 && (
                        <>
                            <Container>
                                <React.Fragment>
                                    <Typography variant="h6" gutterBottom>
                                        Akcija
                                    </Typography>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="grad"
                                                name="grad"
                                                label="Grad"
                                                fullWidth
                                                autoComplete="given-name"
                                                variant="standard"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="adresa"
                                                name="adresa"
                                                label="Adresa"
                                                fullWidth
                                                autoComplete="family-name"
                                                variant="standard"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                id="imeZavoda"
                                                name="imeZavoda"
                                                label="Ime zavoda"
                                                fullWidth
                                                autoComplete="shipping address-line1"
                                                variant="standard"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <label htmlFor="datepicker" style={{ display: 'block', fontSize: '15px', color: 'grey' }}>
                                                Odaberi datum akcije *
                                            </label>
                                            <DatePicker
                                                required
                                                id="datepicker"
                                                selected={selectedDate}
                                                onChange={handleDateChange}
                                                dateFormat="dd/MM/yyyy"
                                                minDate={new Date()}
                                                showMonthDropdown
                                                showYearDropdown
                                                dropdownMode="select"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="vrijeme"
                                                name="vrijeme"
                                                label="Vrijeme održavanja akcije"
                                                fullWidth
                                                autoComplete="shipping address-level2"
                                                variant="standard"
                                            />
                                        </Grid>
                                        {/* <Grid item xs={12}>
                                            <FormControlLabel
                                                control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                                                label="Spremi akciju kao kao godišnju"
                                            />
                                        </Grid> */}
                                    </Grid>
                                </React.Fragment>
                            </Container>
                            {/* Dodajte sadržaj za prvo pitanje */}
                        </>
                    )}
                    {selectedQuestion === 2 && (
                        <>
                            <Container>
                                <React.Fragment>
                                    <Typography variant="h6" gutterBottom>
                                        Akcija
                                    </Typography>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="grad"
                                                name="grad"
                                                label="Grad"
                                                fullWidth
                                                autoComplete="given-name"
                                                variant="standard"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="adresa"
                                                name="adresa"
                                                label="Adresa"
                                                fullWidth
                                                autoComplete="family-name"
                                                variant="standard"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                id="imeZavoda"
                                                name="imeZavoda"
                                                label="Ime zavoda"
                                                fullWidth
                                                autoComplete="shipping address-line1"
                                                variant="standard"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <label htmlFor="datepicker" style={{ display: 'block', fontSize: '15px', color: 'grey' }}>
                                                Odaberi datum akcije *
                                            </label>
                                            <DatePicker
                                                required
                                                id="datepicker"
                                                selected={selectedDate}
                                                onChange={handleDateChange}
                                                dateFormat="dd/MM/yyyy"
                                                minDate={new Date()}
                                                showMonthDropdown
                                                showYearDropdown
                                                dropdownMode="select"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="vrijeme"
                                                name="vrijeme"
                                                label="Vrijeme održavanja akcije"
                                                fullWidth
                                                autoComplete="shipping address-level2"
                                                variant="standard"
                                            />
                                        </Grid>
                                        {/* <Grid item xs={12}>
                                            <FormControlLabel
                                                control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                                                label="Spremi akciju kao kao godišnju"
                                            />
                                        </Grid> */}
                                    </Grid>
                                </React.Fragment>
                            </Container>
                            {/* Dodajte sadržaj za prvo pitanje */}
                        </>
                    )}
                    {selectedQuestion === 3 && (
                        <>
                            <Container>
                                <React.Fragment>
                                    <Typography variant="h6" gutterBottom>
                                        Akcija
                                    </Typography>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="grad"
                                                name="grad"
                                                label="Grad"
                                                fullWidth
                                                autoComplete="given-name"
                                                variant="standard"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="adresa"
                                                name="adresa"
                                                label="Adresa"
                                                fullWidth
                                                autoComplete="family-name"
                                                variant="standard"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                id="imeZavoda"
                                                name="imeZavoda"
                                                label="Ime zavoda"
                                                fullWidth
                                                autoComplete="shipping address-line1"
                                                variant="standard"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <label htmlFor="datepicker" style={{ display: 'block', fontSize: '15px', color: 'grey' }}>
                                                Odaberi datum akcije *
                                            </label>
                                            <DatePicker
                                                required
                                                id="datepicker"
                                                selected={selectedDate}
                                                onChange={handleDateChange}
                                                dateFormat="dd/MM/yyyy"
                                                minDate={new Date()}
                                                showMonthDropdown
                                                showYearDropdown
                                                dropdownMode="select"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="vrijeme"
                                                name="vrijeme"
                                                label="Vrijeme održavanja akcije"
                                                fullWidth
                                                autoComplete="shipping address-level2"
                                                variant="standard"
                                            />
                                        </Grid>
                                        {/* <Grid item xs={12}>
                                            <FormControlLabel
                                                control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                                                label="Spremi akciju kao kao godišnju"
                                            />
                                        </Grid> */}
                                    </Grid>
                                </React.Fragment>
                            </Container>
                            {/* Dodajte sadržaj za prvo pitanje */}
                        </>
                    )}
                    {selectedQuestion === 4 && (
                        <>
                            <Container>
                                <React.Fragment>
                                    <Typography variant="h6" gutterBottom>
                                        Akcija
                                    </Typography>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="grad"
                                                name="grad"
                                                label="Grad"
                                                fullWidth
                                                autoComplete="given-name"
                                                variant="standard"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="adresa"
                                                name="adresa"
                                                label="Adresa"
                                                fullWidth
                                                autoComplete="family-name"
                                                variant="standard"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                id="imeZavoda"
                                                name="imeZavoda"
                                                label="Ime zavoda"
                                                fullWidth
                                                autoComplete="shipping address-line1"
                                                variant="standard"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <label htmlFor="datepicker" style={{ display: 'block', fontSize: '15px', color: 'grey' }}>
                                                Odaberi datum akcije *
                                            </label>
                                            <DatePicker
                                                required
                                                id="datepicker"
                                                selected={selectedDate}
                                                onChange={handleDateChange}
                                                dateFormat="dd/MM/yyyy"
                                                minDate={new Date()}
                                                showMonthDropdown
                                                showYearDropdown
                                                dropdownMode="select"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="vrijeme"
                                                name="vrijeme"
                                                label="Vrijeme održavanja akcije"
                                                fullWidth
                                                autoComplete="shipping address-level2"
                                                variant="standard"
                                            />
                                        </Grid>
                                        {/* <Grid item xs={12}>
                                            <FormControlLabel
                                                control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                                                label="Spremi akciju kao kao godišnju"
                                            />
                                        </Grid> */}
                                    </Grid>
                                </React.Fragment>
                            </Container>
                            {/* Dodajte sadržaj za prvo pitanje */}
                        </>
                    )}
                    {selectedQuestion === 5 && (
                        <>
                            <Container>
                                <React.Fragment>
                                    <Typography variant="h6" gutterBottom>
                                        Akcija
                                    </Typography>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="grad"
                                                name="grad"
                                                label="Grad"
                                                fullWidth
                                                autoComplete="given-name"
                                                variant="standard"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="adresa"
                                                name="adresa"
                                                label="Adresa"
                                                fullWidth
                                                autoComplete="family-name"
                                                variant="standard"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                id="imeZavoda"
                                                name="imeZavoda"
                                                label="Ime zavoda"
                                                fullWidth
                                                autoComplete="shipping address-line1"
                                                variant="standard"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <label htmlFor="datepicker" style={{ display: 'block', fontSize: '15px', color: 'grey' }}>
                                                Odaberi datum akcije *
                                            </label>
                                            <DatePicker
                                                required
                                                id="datepicker"
                                                selected={selectedDate}
                                                onChange={handleDateChange}
                                                dateFormat="dd/MM/yyyy"
                                                minDate={new Date()}
                                                showMonthDropdown
                                                showYearDropdown
                                                dropdownMode="select"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="vrijeme"
                                                name="vrijeme"
                                                label="Vrijeme održavanja akcije"
                                                fullWidth
                                                autoComplete="shipping address-level2"
                                                variant="standard"
                                            />
                                        </Grid>
                                        {/* <Grid item xs={12}>
                                            <FormControlLabel
                                                control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                                                label="Spremi akciju kao kao godišnju"
                                            />
                                        </Grid> */}
                                    </Grid>
                                </React.Fragment>
                            </Container>
                            {/* Dodajte sadržaj za prvo pitanje */}
                        </>
                    )}
                    {selectedQuestion === 6 && (
                        <>
                            <Container>
                                <React.Fragment>
                                    <Typography variant="h6" gutterBottom>
                                        Akcija
                                    </Typography>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="grad"
                                                name="grad"
                                                label="Grad"
                                                fullWidth
                                                autoComplete="given-name"
                                                variant="standard"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="adresa"
                                                name="adresa"
                                                label="Adresa"
                                                fullWidth
                                                autoComplete="family-name"
                                                variant="standard"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                id="imeZavoda"
                                                name="imeZavoda"
                                                label="Ime zavoda"
                                                fullWidth
                                                autoComplete="shipping address-line1"
                                                variant="standard"
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <label htmlFor="datepicker" style={{ display: 'block', fontSize: '15px', color: 'grey' }}>
                                                Odaberi datum akcije *
                                            </label>
                                            <DatePicker
                                                required
                                                id="datepicker"
                                                selected={selectedDate}
                                                onChange={handleDateChange}
                                                dateFormat="dd/MM/yyyy"
                                                minDate={new Date()}
                                                showMonthDropdown
                                                showYearDropdown
                                                dropdownMode="select"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="vrijeme"
                                                name="vrijeme"
                                                label="Vrijeme održavanja akcije"
                                                fullWidth
                                                autoComplete="shipping address-level2"
                                                variant="standard"
                                            />
                                        </Grid>

                                        {/* <Grid item xs={12}>
                                            <FormControlLabel
                                                control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                                                label="Spremi akciju kao kao godišnju"
                                            />
                                        </Grid> */}
                                    </Grid>
                                </React.Fragment>
                            </Container>
                            {/* Dodajte sadržaj za prvo pitanje */}
                        </>
                    )}
                </Typography>
            )}
        </Container>
    );
};

export default Actions;


