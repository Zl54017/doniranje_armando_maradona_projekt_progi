import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { attemptDeleteNews, attemptGetNews, attemptPostNews } from "../../redux/slices/authSlice";
import { useAppDispatch } from "../../redux/store";

interface NewsItem {
    id: "",
    title: "",
    text: "",
    picture: "/blood.png",
}

function NewsEdit() {
    const dispatch = useAppDispatch();
    const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
    const [newNews, setNewNews] = useState({ title: "", text: "", picture: "/blood.png" });
    const [isDialogOpen, setIsDialogOpen] = useState(false);


    useEffect(() => {
        dispatch(attemptGetNews())
            .then((response: any) => {
                setNewsItems(response.payload);
            })
            .catch((error: any) => {
                console.log(error);
            });
    }, [dispatch]);

    const handleAddNews = () => {
        dispatch(attemptPostNews(newNews))
            .then((response: any) => {
                // Ovdje možete ažurirati lokalno stanje kako biste prikazali dodanu vijest
                // Na primjer, možete ponovno pozvati attemptGetNews() kako biste dobili najnovije vijesti
                console.log("News added successfully");
                setIsDialogOpen(false); // Zatvori dialog nakon dodavanja vijesti
            })
            .catch((error: any) => {
                console.log(error);
            });
    };

    const handleOpenDialog = () => {
        setIsDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setIsDialogOpen(false);
    };

    const handleDeleteNews = (newsId: any) => {
        // Pozovite akciju za brisanje obavijesti
        dispatch(attemptDeleteNews(newsId))
            .then((response) => {
                // Ovdje možete ažurirati lokalno stanje kako biste uklonili obavijest iz prikaza
                console.log(response.payload);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const bloodGroups = [
        { group: "A-", percentage: 30 },
        { group: "B-", percentage: 20 },
        { group: "AB-", percentage: 15 },
        { group: "O-", percentage: 35 },
        { group: "A+", percentage: 30 },
        { group: "B+", percentage: 20 },
        { group: "AB+", percentage: 15 },
        { group: "O+", percentage: 35 },
    ];

    return (
        <Container>
            {/* Blood Groups */}
            <Box marginTop={2} display="flex" justifyContent="space-between">
                {bloodGroups.map((groupData) => (
                    <Box key={groupData.group} textAlign="center">
                        <img src={`/blood.png`} alt={groupData.group} width={50} height={50} />
                        {/* Zamijenite s pravim atributima ikonice */}
                        <Typography>{`${groupData.group}: ${groupData.percentage}%`}</Typography>
                    </Box>
                ))}
            </Box>

            {/* News */}
            <Grid mt={10} container spacing={2}>
                {newsItems.map((news, index) => (
                    <Grid item xs={12} md={6} lg={4} key={index}>
                        <Box position="relative" border="2px solid red" borderRadius={4} maxHeight={350} overflow="hidden">
                            {/* Prikaz slike ispod teksta */}
                            <Box position="absolute" top={0} left={0} padding={2} width="100%" bgcolor="rgba(255, 0, 0, 0.7)">
                                <Typography variant="h6" color="white" fontWeight="bold">{news.title}</Typography>
                                <Typography variant="body1" color="white">{news.text}</Typography>
                                <Box mt={6} color="#b2102f">
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        style={{ backgroundColor: "#b2102f", color: "white", position: "absolute", bottom: 0, right: 0 }}
                                        onClick={() => handleDeleteNews(news.id)}
                                    >
                                        Obriši obavijest
                                    </Button>
                                </Box>
                            </Box>
                            {/* Prikaz slike ispod teksta */}
                            <img src={news.picture} alt={news.title} style={{ maxHeight: "250px" }} />
                        </Box>
                    </Grid>
                ))}
            </Grid>

            {/* Add News Button */}
            <Box marginTop={2} textAlign="center" color="#b2102f">
                <Button variant="contained" style={{ backgroundColor: "#b2102f", color: "white" }} onClick={handleOpenDialog}>
                    Dodaj novu obavijest
                </Button>
            </Box>

            {/* Add News Dialog */}
            <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>Dodaj novu obavijest</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Naslov"
                        fullWidth
                        value={newNews.title}
                        onChange={(e) => setNewNews({ ...newNews, title: e.target.value })}
                    />
                    <TextField
                        label="Tekst"
                        multiline
                        rows={4}
                        fullWidth
                        value={newNews.text}
                        onChange={(e) => setNewNews({ ...newNews, text: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary" style={{ backgroundColor: "#b2102f", color: "white" }}>
                        Odustani
                    </Button>
                    <Button onClick={handleAddNews} color="primary" style={{ backgroundColor: "#b2102f", color: "white" }}>
                        Stvori obavijest
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
}

export default NewsEdit;
