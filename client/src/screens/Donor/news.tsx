import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { attemptGetAllInventory, attemptGetNews } from "../../redux/slices/authSlice";
import { RootState, useAppDispatch } from "../../redux/store";
import { useAsyncError } from "react-router-dom";

interface NewsItem {
  title: "",
  text: "",
  picture: "/blood.png",
}
function News() {
  const dispatch = useAppDispatch();
  const { user, role } = useSelector((state: RootState) => state.auth);

  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [listOfAllInventory, setListOfAllInventory] = useState<any[]>([]);    

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


  var currentBloodBankInventory: Record<string, number>={};
  Object.keys(listOfAllInventory).forEach((key)=>{
    if (user && key=== user.transfusionInstitute){
          currentBloodBankInventory = listOfAllInventory[key as keyof typeof listOfAllInventory]
    }
  })

  return (
    
    <Container>
      {/* Blood Groups */}
     {user &&(
      <Box marginTop={2} display="flex" justifyContent="space-between">
  {Object.keys(currentBloodBankInventory).map((key) => (
    <Box key={key} textAlign="center">
      <img src={`/blood.png`} alt={key} width={50} height={50} />
      <Typography style={{ fontWeight: key === user?.bloodType ? 'bold' : 'normal' }}>{`${key}: ${currentBloodBankInventory[key as keyof typeof currentBloodBankInventory]}L`}</Typography>
    </Box>
  ))}
</Box>)}

      {/* News */}
      <Grid mt={10} container spacing={2}>
        {newsItems.map((news, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <Box position="relative" border="2px solid red" borderRadius={4} maxHeight={350} overflow="hidden">
              {/* Prikaz slike ispod teksta */}
              <Box position="absolute" top={0} left={0} padding={2} width="100%" bgcolor="rgba(255, 0, 0, 0.7)">
                <Typography variant="h6" color="white" fontWeight="bold">{news.title}</Typography>
                <Typography variant="body1" color="white">{news.text}</Typography>
              </Box>
              {/* Prikaz slike ispod teksta */}
              <img src={news.picture} alt={news.title} style={{ maxHeight: "250px" }} />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}


export default News;
