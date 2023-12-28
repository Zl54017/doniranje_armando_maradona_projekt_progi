import React from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Grid } from '@mui/material';



function MyForm() {

    const [formData, setFormData] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        role: '',
    });

    const instituteNames = [
        "KBC Osijek",
        "KBC Rijeka",
        "KBC Split",
        "OB Dubrovnik",
        "OB Varaždin",
        "OB Zadar",
        "Hrvatski zavod za transfuzijsku medicinu Zagreb",
    ];

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSelectChange = (event: SelectChangeEvent<string>, child: React.ReactNode) => {
        setFormData({ ...formData, role: event.target.value });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Form submitted:', formData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormControl style={{ minWidth: 600 }}>
                <InputLabel id="institute-label">Zavod</InputLabel>
                <Select
                    labelId="institute-label"
                    id="institute"
                    name="institute"
                    value={formData.role}
                    onChange={handleSelectChange}
                >
                    {instituteNames.map((option, index) => (
                        <MenuItem key={index} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <TextField
                        label="Ime"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        label="Prezime"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        fullWidth
                        margin="normal"
                    />
                </Grid>
            </Grid>

            <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            />

            <TextField
                label="Lozinka"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                fullWidth
                margin="normal"
            />

            <Button variant="contained" color="primary" type="submit">
                Dodaj zaposlenika
            </Button>
        </form>
    );
};



export default function AddEmployee(props: any) {
    return (
        <MyForm />
    );
}