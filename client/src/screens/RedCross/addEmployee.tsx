import React, { useEffect, useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Grid, Box } from '@mui/material';
import { RootState, useAppDispatch } from "../../redux/store";
import { attemptGetAllBloodBanks } from "../../redux/slices/authSlice";
import { useSelector } from 'react-redux';


function MyForm() {
    const dispatch = useAppDispatch();
    const { user, role } = useSelector((state: RootState) => state.auth);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        bloodBank: '',
        role: '',
    });
    const [listOfBloodBanks, setListOfBloodBanks] = useState<any[]>([]);
    const [lockBloodBankChange, setLockBloodBankChange] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSelectChange = (event: SelectChangeEvent<string>, child: React.ReactNode) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Form submitted:', formData);
    };

    useEffect(() => {
        if (user) {
            if (role === 'bloodBank') {
                setFormData({ ...formData, ["bloodBank"]: user.id.toString() });
                setLockBloodBankChange(true)
            }
            // if (role === 'employee') {
            //     setFormData({ ...formData, ["bloodBank"]: user.bloodBankId });
            //     setLockBloodBankChange(true)
            // }
        }
        dispatch(attemptGetAllBloodBanks())
            .then((response: any) => {
                setListOfBloodBanks(response.payload || []);
            })
            .catch((error: any) => {
                console.error("Error", error);
            });
    }, [dispatch, user, role]);

    return (
        <Box paddingX={'200px'} paddingY={'40px'}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <FormControl style={{ width: '100%' }}>
                            <InputLabel id="bloodBank-label">Zavod</InputLabel>
                            <Select
                                labelId="bloodBank-label"
                                id="bloodBank"
                                name="bloodBank"
                                value={formData.bloodBank}
                                onChange={handleSelectChange}
                                disabled={lockBloodBankChange}
                            >
                                {Object.entries(listOfBloodBanks).map(([bloodBankId, bloodBankData]) => (
                                    <MenuItem value={bloodBankId}>{bloodBankData}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl style={{ width: '100%' }}>
                            <InputLabel id="role-label">Uloga</InputLabel>
                            <Select
                                labelId="role-label"
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleSelectChange}
                            >
                                <MenuItem value="employee">Zaposlenik</MenuItem>
                                <MenuItem value="bloodBank">Zavod</MenuItem>
                                {!lockBloodBankChange && (
                                    <MenuItem value="redCross" >Crveni Križ</MenuItem>
                                )}
                                
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
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
        </Box>
    );
};



export default function AddEmployee(props: any) {
    return (
        <MyForm />
    );
}