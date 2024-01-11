import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { attemptGetNews } from "../../redux/slices/authSlice";
import { useAppDispatch } from "../../redux/store";

interface NewsItem {
  title: "",
  text: "",
  picture: "/blood.png",
}
function News() {
  const dispatch = useAppDispatch();
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  useEffect(() => {
    dispatch(attemptGetNews())
      .then((response: any) => {
        setNewsItems(response.payload);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, [dispatch]);

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
