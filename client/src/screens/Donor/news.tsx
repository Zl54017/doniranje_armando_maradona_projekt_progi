import React, { useState } from "react";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";

// Dummy data za prikaz
const newsData = [
  {
    id: 1,
    image: "link-do-slike1.jpg",
    title: "Naslov vijesti 1",
    text: "Ovo je tekst prve vijesti...",
  },
  {
    id: 2,
    image: "link-do-slike2.jpg",
    title: "Naslov vijesti 2",
    text: "Ovo je tekst druge vijesti...",
  },
  // Dodajte više vijesti prema potrebi
];

function News() {
  const [selectedQuestion, setSelectedQuestion] = useState<number | null>(null);

  const handleQuestionClick = (index: number) => {
    // If the same question is clicked again, close it
    setSelectedQuestion((prev) => (prev === index ? null : index));
  };

  return (
    <Container>
      <List sx={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {newsData.map((news) => (
          <ListItemButton
            key={news.id}
            selected={selectedQuestion === news.id}
            onClick={() => handleQuestionClick(news.id)}
            sx={{ width: "200px", height: "200px", display: "flex", flexDirection: "column", alignItems: "center" }}
          >
            <img src={news.image} alt={`News ${news.id}`} style={{ width: "100%", height: "120px", objectFit: "cover" }} />
            <Typography variant="h6" color="primary" sx={{ fontWeight: "bold", marginTop: "5px" }}>
              {news.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" sx={{ marginTop: "5px" }}>
              {news.text}
            </Typography>
          </ListItemButton>
        ))}
      </List>
    </Container>
  );
}

export default News;
