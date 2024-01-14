import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { useSelector } from "react-redux";
import { attemptDeleteNews, attemptGetAllBloodBanks, attemptGetAllInventory, attemptGetBloodTypeInv, attemptGetDonors, attemptGetNews, attemptPostNews } from "../../redux/slices/authSlice";
import { RootState, useAppDispatch } from "../../redux/store";
import LoginInput from "../../types/inputs/user/LoginInput";

interface NewsItem {
    id: "",
    title: "",
    text: "",
    picture: "/blood.png",
}

function NewsEdit() {
    const dispatch = useAppDispatch();
    const { user, role } = useSelector((state: RootState) => state.auth);
    const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
    const [newNews, setNewNews] = useState({ title: "", text: "", picture: "/blood.png" });
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [listOfAllInventory, setListOfAllInventory] = useState<any[]>([]);    
    const [listOfDonors, setListOfDonors] = useState<any[]>([]);
    const [filters, setFilters] = useState<LoginInput>({name: '',
    email: '',
    password: '',
    bloodType: '',
    transfusionInstitute: '',
    numberOfDonations: '100',
    gender: '',
    age: 0,
    id: 0,
});


    useEffect(() => {
        dispatch(attemptGetDonors(filters))
            .then((response: any) => {
                setListOfDonors(response.payload || []);
            })
            .catch((error: any) => {
                console.error("Error", error);
            });
    }, [dispatch, filters]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (user && role === "bloodBank") {
                    const bloodBanksResponse = await dispatch(attemptGetAllBloodBanks());
                    let updatedFilters: LoginInput = { ...filters };
                    if (user.name != "Crveni Križ") {
                            updatedFilters["transfusionInstitute"] = user.name;
                        setFilters(updatedFilters);
                    }
                    dispatch(attemptGetDonors(updatedFilters))
                        .then((response: any) => {
                            setListOfDonors(response.payload || []);
                        })
                        .catch((error: any) => {
                            console.error(error)
                        });
                }
                else if (user && role === "employee"){
                  const bloodBanksResponse = await dispatch(attemptGetAllBloodBanks());
                  let updatedFilters: LoginInput = { ...filters };
                  updatedFilters["transfusionInstitute"] = bloodBanksResponse.payload[user.bloodBankId];
                  setFilters(updatedFilters);
                  dispatch(attemptGetDonors(updatedFilters))
                      .then((response: any) => {
                          setListOfDonors(response.payload || []);
                      })
                      .catch((error: any) => {
                          console.error(error)
                      });
                }
            } catch (error) {
                console.error("Error", error);
            }
        };

        fetchData();
    }, [dispatch, user, role]);

    useEffect(() => {
        dispatch(attemptGetAllInventory())
            .then((response: any) => {
                setListOfAllInventory(response.payload || []);
            })
            .catch((error: any) => {
                console.error("Error", error);
            });
    }, [dispatch]);

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
                dispatch(attemptGetNews())
                    .then((response: any) => {
                        setNewsItems(response.payload);
                    })
                    .catch((error: any) => {
                        console.log(error);
                    });
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
                dispatch(attemptGetNews())
                    .then((response: any) => {
                        setNewsItems(response.payload);
                    })
                    .catch((error: any) => {
                        console.log(error);
                    });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const [bloodGroups, setBloodGroups] = useState([
        { group: "A-", percentage: 0 },
        { group: "B-", percentage: 0 },
        { group: "AB-", percentage: 0 },
        { group: "O-", percentage: 0 },
        { group: "A+", percentage: 0 },
        { group: "B+", percentage: 0 },
        { group: "AB+", percentage: 0 },
        { group: "O+", percentage: 0 },
    ]);

    var currentBloodBankInventory: Record<string, number>={};
    Object.keys(listOfAllInventory).forEach((key)=>{
        if (user && role === "bloodBank" && key=== user.name){
              currentBloodBankInventory = listOfAllInventory[key as keyof typeof listOfAllInventory]
        }
        else if (user && role === "employee" && key=== listOfDonors[0].transfusionInstitute){
          currentBloodBankInventory = listOfAllInventory[key as keyof typeof listOfAllInventory]

        }
      })
      console.log("trenutno", currentBloodBankInventory);
   /* const fetchBloodTypeInventory = async () => {
        const updatedBloodGroups = [...bloodGroups];
      
        for (const bloodGroupObj of updatedBloodGroups) {
          const { group } = bloodGroupObj;
      
          try {
            const response = await dispatch(attemptGetBloodTypeInv(user));
            const percentage = response.payload;
      
            // Ažuriranje percentage u varijabli updatedBloodGroups
            const index = updatedBloodGroups.findIndex((obj) => obj.group === group);
            updatedBloodGroups[index] = { ...updatedBloodGroups[index], percentage };
          } catch (error: any) {
            // Postavljanje defaultne vrijednosti ili rukovanje greškom
            console.error(`Error fetching blood type inventory for ${group}: ${error.message}`);
          }
        }
      
        // Ažuriranje state-a s novim podacima
        setBloodGroups(updatedBloodGroups);
      };
      
      // Pozivanje funkcije
      //fetchBloodTypeInventory();*/
     
    return (
        <Container>
            {/* Blood Groups */}
            <Box marginTop={2} display="flex" justifyContent="space-between">
  {Object.keys(currentBloodBankInventory).map((key) => (
    <Box key={key} textAlign="center">
      <img src={`/blood.png`} alt={key} width={50} height={50} />
      <Typography>{`${key}: ${currentBloodBankInventory[key as keyof typeof currentBloodBankInventory]}L`}</Typography>
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
