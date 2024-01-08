import * as React from "react";
import { useEffect, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Select, MenuItem, SelectChangeEvent, Box, Typography, Slider, TextField, Input } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useDispatch, useSelector } from "react-redux";
import { attemptGetDonors, attemptGetAllBloodBanks } from "../../redux/slices/authSlice";
import { RootState, useAppDispatch } from "../../redux/store";
import LoginInput from "../../types/inputs/user/LoginInput";
import constructWithOptions from "styled-components/dist/constructors/constructWithOptions";


function PersonList() {
    const dispatch = useAppDispatch();
    const { user, role } = useSelector((state: RootState) => state.auth);
    const [expandedPerson, setExpandedPerson] = useState<number | null>(null);
    const [filters, setFilters] = useState<LoginInput>({
        name: '',
        email: '',
        password: '',
        bloodType: '',
        transfusionInstitute: '',
        numberOfDonations: '100',
        gender: '',
        age: 0,
        id: 0,
    });
    const [listOfDonors, setListOfDonors] = useState<any[]>([]);
    const [listOfBloodBanks, setListOfBloodBanks] = useState<any[]>([]);
    const [lockBloodBankChange, setLockBloodBankChange] = useState(false);

    const handleExpandClick = (personId: number) => {
        setExpandedPerson((prevId) => (prevId === personId ? null : personId));
    };

    const handleSelectsChange = (event: SelectChangeEvent<string>) => {
        const { name, value } = event.target;
        let updatedFilters: LoginInput = { ...filters };
        updatedFilters[name] = value == "all" ? "" : value;
        setFilters(updatedFilters);

        dispatch(attemptGetDonors(updatedFilters))
            .then((response: any) => {
                setListOfDonors(response.payload || []);
            })
            .catch((error: any) => {
                console.error("Error", error);
            });
    };
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        let updatedFilters: LoginInput = { ...filters };
        updatedFilters[name] = value == "all" ? "" : value;
        setFilters(updatedFilters);

        dispatch(attemptGetDonors(updatedFilters))
            .then((response: any) => {
                setListOfDonors(response.payload || []);
            })
            .catch((error: any) => {
                console.error("Error", error);
            });
    };

    const handleAgeRangeChange = (event: Event, newValue: number | number[]) => {
        const [minAge, maxAge] = newValue as number[];
        let updatedFilters: LoginInput = { ...filters };
        updatedFilters["age"] = minAge;
        updatedFilters["numberOfDonations"] = maxAge.toString();
        setFilters(updatedFilters);
        dispatch(attemptGetDonors(updatedFilters))
            .then((response: any) => {
                setListOfDonors(response.payload || []);
            })
            .catch((error: any) => {
                console.error("Error", error);
            });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user) {
                    // Fetch Donors
                    const donorsResponse = await dispatch(attemptGetDonors(filters));
                    setListOfDonors(donorsResponse.payload || []);
    
                    // Fetch Blood Banks
                    const bloodBanksResponse = await dispatch(attemptGetAllBloodBanks());
                    setListOfBloodBanks(bloodBanksResponse.payload || []);
    
                    // Adjust filters based on user role
                    if (role !== 'redCross') {
                        setLockBloodBankChange(true);
    
                        if (role === 'employee') {
                            setFilters({ ...filters, transfusionInstitute: bloodBanksResponse.payload[user.bloodBankId] });
                        } else if (role === 'bloodBank') {
                            setFilters({ ...filters, transfusionInstitute: user.name });
                        }
    
                        // Fetch Donors with updated filters
                        const updatedDonorsResponse = await dispatch(attemptGetDonors(filters));
                        setListOfDonors(updatedDonorsResponse.payload || []);
                    }
                }
            } catch (error) {
                console.error("Error", error);
            }
        };
    
        fetchData();
    }, [dispatch]);
    

    return (
        <Box padding={'40px'}>
            <FormControl variant="standard">
                <InputLabel>Ime donora:</InputLabel>
                <Input
                    name="name"
                    disableUnderline={true}
                    value={filters.name}
                    onChange={handleInputChange}
                />
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="bloodBank">Institut:</InputLabel>
                <Select
                    labelId="bloodBank"
                    id="bloodBank"
                    name="transfusionInstitute"
                    value={filters.transfusionInstitute}
                    onChange={handleSelectsChange}
                    disabled={lockBloodBankChange}
                >
                    <MenuItem value="all">Svi</MenuItem>
                    {Object.entries(listOfBloodBanks).map(([bloodBankId, bloodBankData]) => (
                        <MenuItem value={bloodBankData}>{bloodBankData}</MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="bloodType">Krvna Grupa:</InputLabel>
                <Select
                    labelId="bloodType"
                    id="bloodType"
                    value={filters.bloodType}
                    name="bloodType"
                    onChange={handleSelectsChange}
                >
                    <MenuItem value="all">Sve</MenuItem>
                    <MenuItem value="A-">A-</MenuItem>
                    <MenuItem value="A+">A+</MenuItem>
                    <MenuItem value="B-">B-</MenuItem>
                    <MenuItem value="B+">B+</MenuItem>
                    <MenuItem value="AB-">AB-</MenuItem>
                    <MenuItem value="AB+">AB+</MenuItem>
                    <MenuItem value="O-">O-</MenuItem>
                    <MenuItem value="O+">O+</MenuItem>
                </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="gender">Spol:</InputLabel>
                <Select
                    labelId="gender"
                    id="gender"
                    value={filters.gender}
                    name="gender"
                    onChange={handleSelectsChange}
                >
                    <MenuItem value="all">Sve</MenuItem>
                    <MenuItem value="M">Muško</MenuItem>
                    <MenuItem value="F">Žensko</MenuItem>
                </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="ageRange">Dob (od - do):</InputLabel>
                <Slider
                    value={[filters.age, parseInt(filters.numberOfDonations)] as number[]}
                    onChange={handleAgeRangeChange}
                    getAriaLabel={() => 'Temperature range'}
                    valueLabelDisplay="auto"
                    size="small"
                    min={18}
                    max={65}
                    color="secondary"
                />
            </FormControl>

            <h2>Lista donora:</h2>
            {listOfDonors.length > 0 ? (
                <Box style={{ overflowY: "auto" }}>
                    {listOfDonors.map((donor: any) => (
                        <Box
                            key={donor.id}
                            style={{
                                borderRadius: '6px',
                                padding: '10px',
                                marginBottom: '10px',
                                backgroundColor: '#f5e9e9'
                            }}
                            onClick={() => handleExpandClick(donor.id)}
                        >
                            <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <Box>
                                    {donor.name} ({donor.bloodType})
                                </Box>
                                <button style={{ border: 0, backgroundColor: 'transparent', }}>
                                    {expandedPerson === donor.id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                                </button>
                            </Box>
                            {expandedPerson === donor.id && (
                                <Box>
                                    <h3>{donor.name}</h3>
                                    <p>Tip krvi: {donor.bloodType}</p>
                                    <p>Dob: {donor.age}</p>
                                    <p>Spol: {donor.gender}</p>
                                    <p>Primarni institut: {donor.transfusionInstitute}</p>
                                    <p>Email: {donor.email}</p>
                                    <p>Broj donacija: {donor.numberOfDonations}</p>
                                </Box>
                            )}
                        </Box>
                    ))}
                </Box>
            ) : (
                <Typography variant="body1">Nema zabilježenih donora.</Typography>
            )}
        </Box>
    );
};

export default function ListOfDonors(props: any) {
    return (
        <PersonList />
    );
}