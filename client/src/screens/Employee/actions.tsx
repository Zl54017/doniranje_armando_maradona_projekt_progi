import React, { useState } from 'react';
import { Container, Select, MenuItem, Typography, SelectChangeEvent } from '@mui/material';

const Actions: React.FC = () => {
    const [selectedQuestion, setSelectedQuestion] = useState<number | ''>('');

    const handleQuestionChange = (event: SelectChangeEvent<number | ''>) => {
        setSelectedQuestion(event.target.value as number | '');
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
                            Krv može darivati svaki čovjek dobrog općeg zdravstvenog stanja...
                            {/* Dodajte sadržaj za prvo pitanje */}
                        </>
                    )}
                    {/* Dodajte slično sadržaj za ostala pitanja */}
                </Typography>
            )}
        </Container>
    );
};

export default Actions;

// return (
//   <Container>
//     <React.Fragment>
//       <Typography variant="h6" gutterBottom>
//         Akcija
//       </Typography>
//       <Grid container spacing={3}>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             required
//             id="grad"
//             name="grad"
//             label="Grad"
//             fullWidth
//             autoComplete="given-name"
//             variant="standard"
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             required
//             id="adresa"
//             name="adresa"
//             label="Adresa"
//             fullWidth
//             autoComplete="family-name"
//             variant="standard"
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             required
//             id="imeZavoda"
//             name="imeZavoda"
//             label="Ime zavoda"
//             fullWidth
//             autoComplete="shipping address-line1"
//             variant="standard"
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             required
//             id="datum"
//             name="datum"
//             label="Datum održavanja akcije"
//             fullWidth
//             autoComplete="shipping address-line2"
//             variant="standard"
//           />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             required
//             id="vrijeme"
//             name="vrijeme"
//             label="Vrijeme održavanja akcije"
//             fullWidth
//             autoComplete="shipping address-level2"
//             variant="standard"
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <FormControlLabel
//             control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
//             label="Spremi akciju kao kao godišnju"
//           />
//         </Grid>
//       </Grid>
//     </React.Fragment>
//   </Container>
// );

