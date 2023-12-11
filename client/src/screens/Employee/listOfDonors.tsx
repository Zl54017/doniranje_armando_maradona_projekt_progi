import * as React from "react";
import { useState } from 'react';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Select, MenuItem, SelectChangeEvent } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';


interface Person {
    id: number;
    name: string;
    lastName: string;
    bloodType: string;
}

const peopleData: Person[] = [
    { id: 1, name: 'John', lastName: 'Doe', bloodType: 'A+' },
    { id: 2, name: 'Jane', lastName: 'Doe', bloodType: 'B-' },
    // Add more people as needed
];

const PersonList: React.FC = () => {
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

    const filteredPeople = peopleData.filter((person) => {
        const matchBloodType = !selectedBloodType || person.bloodType.startsWith(selectedBloodType);
        const matchRhFactor = !selectedRhFactor || person.bloodType.endsWith(selectedRhFactor);
        return matchBloodType && matchRhFactor;
    });

    const styleOfArrowButton: React.CSSProperties = {
        border: 'none',
        backgroundColor: '#ffffff00',
        cursor: 'pointer',
        outline: 'none',
    }

    return (
        <div>
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
            {filteredPeople.map((person) => (
                <div
                    key={person.id}
                    style={{
                        borderRadius: '6px',
                        padding: '10px',
                        marginBottom: '10px',
                        backgroundColor: '#f5f5f5'
                    }}
                    onClick={() => handleExpandClick(person.id)}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div>
                            {person.name} {person.lastName} ({person.bloodType})
                        </div>
                        <button style={styleOfArrowButton} >
                            {expandedPerson === person.id ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        </button>
                    </div>
                    {expandedPerson === person.id && (
                        <div>
                            <h3>Details for {person.name} {person.lastName}</h3>
                            <p>Blood Type: {person.bloodType}</p>
                            {/* Add more details as needed */}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default function ListOfDonors(props: any) {
    return (
        <PersonList />
    );
}