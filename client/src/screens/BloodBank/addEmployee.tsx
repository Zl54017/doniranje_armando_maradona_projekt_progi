import React, { useEffect, useState } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Grid, Box, Dialog, DialogContent, Container, Typography } from '@mui/material';
import { RootState, useAppDispatch } from "../../redux/store";
import { attemptAddEmployee, attemptDeleteEmployeeById, attemptGetAllBloodBanks, attemptGetBloodBankEmployees } from "../../redux/slices/authSlice";
import { useSelector } from 'react-redux';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Employee from "../../types/inputs/bloodbank/Employee";



function MyForm() {
    const dispatch = useAppDispatch();
    const { user, role } = useSelector((state: RootState) => state.auth);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        bloodBank: '',
    })
    const [listOfBloodBanks, setListOfBloodBanks] = useState<any[]>([]);
    const [lockBloodBankChange, setLockBloodBankChange] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const [listOfEmployees, setListOfEmployees] = useState<any[]>([]);
    const [expandedPerson, setExpandedPerson] = useState<number | null>(null);
    const [deleteMessage, setDeleteMessage] = useState('');
    const [addEmployeeMessage, setAddEmployeeMessage] = useState('');



    const handleExpandClick = (personId: number) => {
        setExpandedPerson((prevId) => (prevId === personId ? null : personId));
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSelectChange = (event: SelectChangeEvent<string>, child: React.ReactNode) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const employee: Employee = {
            name: formData["firstName"].trim() + " " + formData["lastName"].trim(),
            email: formData["email"].trim(),
            password: formData["password"],
            bloodBankId: Object.entries(listOfBloodBanks).find(([key, value]) => value === formData["bloodBank"])?.[0] || "",
        };
        console.log(employee)
        if (employee.bloodBankId == "") {
            setAddEmployeeMessage("Neuspješno dodavanje zaposlenika")
        } else {
            dispatch(attemptAddEmployee(employee))
                .then((response: any) => {
                    console.log(response)
                    if (response.error && response.error.message.endsWith("400")) {
                        setAddEmployeeMessage("Email adresa se već koristi");
                    } else {
                        setAddEmployeeMessage(response.payload ? "Uspješno dodan zaposlenik" : "Neuspješno dodavanje zaposlenika");
                    }
                })
        }
    };

    const handleToggleDialog = () => {
        setShowForm(!showForm);
    };
    const handleSelectsChange = (event: SelectChangeEvent<string>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [event.target.name]: value });
    };
    useEffect(() => {
        dispatch(attemptGetBloodBankEmployees(formData["bloodBank"]))
            .then((response: any) => {
                setListOfEmployees(response.payload || []);
            })
            .catch((error: any) => {
                console.error("Error", error);
            });
    }, [dispatch, formData["bloodBank"]]);

    useEffect(() => {
        if (user) {
            if (user.id != 8) {
                setFormData({ ...formData, ["bloodBank"]: user.name });
                dispatch(attemptGetBloodBankEmployees(user.name))
                    .then((response: any) => {
                        setListOfEmployees(response.payload || []);
                    })
                    .catch((error: any) => {
                        console.error("Error", error);
                    });
                setLockBloodBankChange(true)
            } else {
                setFormData({ ...formData, ["bloodBank"]: "KBC Osijek" });
                dispatch(attemptGetBloodBankEmployees("KBC Osijek"))
                    .then((response: any) => {
                        setListOfEmployees(response.payload || []);
                    })
                    .catch((error: any) => {
                        console.error("Error", error);
                    });
            }

        }
        dispatch(attemptGetAllBloodBanks())
            .then((response: any) => {
                setListOfBloodBanks(response.payload || []);
            })
            .catch((error: any) => {
                console.error("Error", error);
            });
    }, [dispatch, user, role]);

    function handleDeleteEmployee(id: string): void {
        dispatch(attemptDeleteEmployeeById(id)).then((response: any) => {
            console.log(response)
            setDeleteMessage(response.payload.message ? "Uspješno arhiviranje zaposlenika" : 'Neuspjelo arhiviranje zaposlenika');
            setTimeout(() => {
                setDeleteMessage('');
            }, 5000);
        })
            .catch((error: any) => {
                setDeleteMessage('Neuspjelo arhiviranje zaposlenika');
                setTimeout(() => {
                    setDeleteMessage('');
                }, 5000);
            });
    }

    return (
        <Box paddingX={'200px'} paddingY={'40px'}>
            <Button onClick={handleToggleDialog} variant="contained" style={{ backgroundColor: "#b2102f", color: "white", gap: "10px", fontSize: '0.8rem', width: '200px', height: '30px' }}>
                {showForm ? 'Otkaži' : 'Novi zaposlenik'}
            </Button>
            {showForm && (
                <Dialog open={showForm} onClose={handleToggleDialog} fullWidth maxWidth="sm">
                    <DialogContent dividers>
                        <Container style={{ maxWidth: '500px', maxHeight: '80vh', overflowY: 'auto', padding: '16px' }}>
                            <Typography variant="body1">

                                <Container style={{ padding: '8px' }}>
                                    <Box style={{ display: "flex", flexDirection: "column" }}>
                                        <Typography variant="h6" gutterBottom>
                                            Zaposlenik
                                        </Typography>
                                        <form onSubmit={handleSubmit}>
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
                                                            <MenuItem value={bloodBankData}>{bloodBankData}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
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
                                            <Button variant="contained" style={{ backgroundColor: "#b2102f", color: "white", gap: "10px", fontSize: '0.8rem', width: '200px', height: '30px' }} type="submit">
                                                Dodaj zaposlenika
                                            </Button>
                                            <Box style={{ color: "#b2102f", gap: "10px", fontSize: '1.5rem', height: "30px", padding: "5px" }}>{addEmployeeMessage}</Box>
                                        </form>
                                    </Box>
                                </Container>

                            </Typography>
                        </Container>
                    </DialogContent>
                </Dialog>
            )}
            <Box>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                    <InputLabel id="bloodBank">Institut:</InputLabel>
                    <Select
                        labelId="bloodBank"
                        id="bloodBank"
                        name="bloodBank"
                        onChange={handleSelectsChange}
                        value={formData.bloodBank}
                        disabled={lockBloodBankChange}
                    >
                        {Object.entries(listOfBloodBanks).map(([bloodBankId, bloodBankData]) => (
                            <MenuItem value={bloodBankData}>{bloodBankData}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            {listOfEmployees.length > 0 ? (
                <Box style={{ overflowY: "auto" }}>
                    {listOfEmployees.map((employee: any) => (
                        <Box
                            key={employee.id}
                            style={{
                                borderRadius: '6px',
                                padding: '10px',
                                marginBottom: '10px',
                                backgroundColor: '#f5e9e9'
                            }}
                        >
                            <Box style={{ display: 'flex', justifyContent: 'space-between' }} onClick={() => handleExpandClick(employee.id)}>
                                <Box>
                                    {employee.name}
                                </Box>
                                <button style={{ border: 0, backgroundColor: 'transparent', }}>
                                    {expandedPerson === employee.id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </button>
                            </Box>
                            {expandedPerson === employee.id && (
                                <Box>
                                    <h3>{employee.name}</h3>
                                    <p>Email: {employee.email}</p>
                                    <Button onClick={() => handleDeleteEmployee(employee.id)} variant="contained" style={{ backgroundColor: "#b2102f", color: "white", gap: "10px", fontSize: '0.8rem', width: '200px', height: '30px' }}>
                                        Arhiviraj zapolenika
                                    </Button>
                                    <Box style={{ color: "#b2102f", gap: "10px", fontSize: '1.5rem', height: "30px", padding: "5px" }}>{deleteMessage}</Box>
                                </Box>
                            )}
                        </Box>
                    ))}
                </Box>
            ) : (
                <Typography variant="body1">Nema zabilježenih zaposlenika.</Typography>
            )}
        </Box>
    );
};



export default function AddEmployee(props: any) {
    return (
        <MyForm />
    );
}