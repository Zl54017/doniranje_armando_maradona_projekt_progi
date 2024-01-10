import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";
import { attemptGetFaq } from "../../redux/slices/authSlice";
import { useAppDispatch } from "../../redux/store";


interface Question {
  id: number;
  text: string;
  title: string;
}

function Faq() {
  const dispatch = useAppDispatch();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);

  const handleQuestionClick = (questionId: number) => {
    setSelectedQuestionId((prev) => (prev === questionId ? null : questionId));
  };

  useEffect(() => {
    dispatch(attemptGetFaq())
      .then((response: any) => {
        setQuestions(response.payload || []);
      })
      .catch((error: any) => {
        console.error('Error', error);
      });
  }, [dispatch]);

  return (
    <Container>
        <List>
          {questions.map((question) => (
            <React.Fragment key={question.id}>
              <ListItemButton onClick={() => handleQuestionClick(question.id)}>
                <Typography variant="h6" color="#b2102f"> {question.title}</Typography>
              </ListItemButton>
              {selectedQuestionId === question.id && (
                <Typography variant="body1">{question.text}</Typography>
              )}
            </React.Fragment>
          ))}
        </List>
    </Container>
  );
}

export default Faq;

