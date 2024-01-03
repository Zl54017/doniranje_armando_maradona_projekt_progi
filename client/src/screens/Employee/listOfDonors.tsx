import * as React from "react";
import { useEffect, useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Select, MenuItem, SelectChangeEvent, Box, Typography } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import { useDispatch, useSelector } from "react-redux";
import { attemptGetDonorsForEmployee } from "../../redux/slices/authSlice";
import { RootState, useAppDispatch } from "../../redux/store";
import RegisterInput from "../../types/inputs/user/RegisterInput";


function PersonList() {
    const dispatch = useAppDispatch();
    const { user, role } = useSelector((state: RootState) => state.auth);
    const [expandedPerson, setExpandedPerson] = useState<number | null>(null);
    const [selectedBloodType, setSelectedBloodType] = useState<string | undefined>('');
    const [selectedRhFactor, setSelectedRhFactor] = useState<string | undefined>('');



    const handleExpandClick = (personId: number) => {
        setExpandedPerson((prevId) => (prevId === personId ? null : personId));
    };
    const handleBloodTypeChange = (event: SelectChangeEvent<string>) => {
        setSelectedBloodType(event.target.value);
    };

    const handleRhFactorChange = (event: SelectChangeEvent<string>) => {
        setSelectedRhFactor(event.target.value);
    };

    const [listOfDonors, setListOfDonors] = useState<any[]>([]);

    // const filteredPeople = peopleData.filter((person) => {
    //     const matchBloodType = !selectedBloodType || person.bloodType.startsWith(selectedBloodType);
    //     const matchRhFactor = !selectedRhFactor || person.bloodType.endsWith(selectedRhFactor);
    //     return matchBloodType && matchRhFactor;
    // });

    // const styleOfArrowButton: React.CSSProperties = {
    //     border: 'none',
    //     backgroundColor: '#ffffff00',
    //     cursor: 'pointer',
    //     outline: 'none',
    // }

    useEffect(() => {
        if (user) {
            dispatch(attemptGetDonorsForEmployee(user))
                .then((response: any) => {
                    setListOfDonors(response.payload || []);
                })
                .catch((error: any) => {
                    console.error("Error", error);
                });
        }
    }, [dispatch]);

    return (
        <Box>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="bloodType">Krvna Grupa:</InputLabel>
                <Select
                    labelId="bloodType"
                    id="bloodType"
                    value={selectedBloodType || '' as string}
                    onChange={handleBloodTypeChange}
                >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="A">A</MenuItem>
                    <MenuItem value="B">B</MenuItem>
                    <MenuItem value="AB">AB</MenuItem>
                    <MenuItem value="0">0</MenuItem>
                </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="rhFactor">Rh:</InputLabel>
                <Select
                    labelId="rhFactor"
                    id="rhFactor"
                    value={selectedRhFactor || '' as string}
                    onChange={handleRhFactorChange}
                >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value="+">+</MenuItem>
                    <MenuItem value="-">-</MenuItem>
                </Select>
            </FormControl>

            <h2>Lista donora:</h2>
            {listOfDonors.length > 0 ? (
                <Box style={{ maxHeight: "200px", overflowY: "auto" }}>
                    {listOfDonors.map((donor: any) => (
                        <Box marginBottom={2} padding={2} border="1px solid #b2102f" borderRadius={5}>
                            <Typography variant="body1">
                                Ime donora: {donor.name}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            ) : (
                <Typography variant="body1">Nema zabilježenih donora.</Typography>
            )}
            {/* {filteredPeople.map((person) => (
                <Box
                    key={person.id}
                    style={{
                        borderRadius: '6px',
                        padding: '10px',
                        marginBottom: '10px',
                        backgroundColor: '#f5f5f5'
                    }}
                    onClick={() => handleExpandClick(person.id)}
                >
                    <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Box>
                            {person.name} {person.lastName} ({person.bloodType})
                        </Box>
                        <button style={styleOfArrowButton} >
                            {expandedPerson === person.id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </button>
                    </Box>
                    {expandedPerson === person.id && (
                        <Box>
                            <h3>Details for {person.name} {person.lastName}</h3>
                            <p>Blood Type: {person.bloodType}</p>
                            {/* Add more details as needed
                        </Box>
                    )}
                </Box>
            ))} */}
        </Box>
    );
};

export default function ListOfDonors(props: any) {
    return (
        <PersonList />
    );
}