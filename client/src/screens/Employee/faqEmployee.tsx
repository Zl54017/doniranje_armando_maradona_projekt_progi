import React, { useEffect, useRef, useState } from "react";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import { Box, Button, Dialog, DialogContent, Grid, TextField } from "@mui/material";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { attemptDeleteFAQ, attemptGetFAQ, attemptPostFAQ } from "../../redux/slices/authSlice";

interface Question {
    id: number;
    text: string;
    title: string;
}

function FaqEdit() {
    const dispatch = useAppDispatch();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [selectedQuestionId, setSelectedQuestionId] = useState<number | null>(null);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editedTitle, setEditedTitle] = useState("");
    const [editedText, setEditedText] = useState("");
    const [isNewFAQ, setIsNewFAQ] = useState(false);

    const handleQuestionClick = (questionId: number) => {
        setSelectedQuestionId((prev) => (prev === questionId ? null : questionId));
    };

    const handleDeleteClick = (questionId: any) => {
        dispatch(attemptDeleteFAQ(questionId))
            .then(() => {
                dispatch(attemptGetFAQ())
                .then((response: any) => {
                    setQuestions(response.payload || []);
                })
                .catch((error: any) => {
                    console.error("Error fetching FAQs", error);
                });
            })
            .catch((error) => {
                console.error("Failed to delete FAQ", error);
            });
    };

    const handleEditClick = (questionId: number) => {
        const selectedQuestion = questions.find((q) => q.id === questionId);
        if (selectedQuestion) {
            setEditedTitle(selectedQuestion.title);
            setEditedText(selectedQuestion.text);
            setIsNewFAQ(false);
            setEditDialogOpen(true);
        }
    };

    const handleNewClick = () => {
        setEditedTitle("");
        setEditedText("");
        setIsNewFAQ(true);
        setEditDialogOpen(true);
    };

    const handleSaveChanges = () => {
        if (isNewFAQ) {
            const newQuestion = {
                question: editedTitle,
                answer: editedText,
            };
            dispatch(attemptPostFAQ(newQuestion))
                .then((response: any) => {
                    dispatch(attemptGetFAQ())
                    .then((response: any) => {
                        setQuestions(response.payload || []);
                    })
                    .catch((error: any) => {
                        console.error("Error fetching FAQs", error);
                    });
                })
                .catch((error) => {
                    console.error("Failed to create FAQ", error);
                });
        } else {
            console.log("Saving changes...");
        }

        setEditDialogOpen(false);
    };

    useEffect(() => {
        dispatch(attemptGetFAQ())
            .then((response: any) => {
                setQuestions(response.payload || []);
            })
            .catch((error: any) => {
                console.error("Error", error);
            });
    }, [dispatch]);

    return (
        <Container>
            <List>
                {questions.map((question) => (
                    <React.Fragment key={question.id}>
                        <ListItemButton onClick={() => handleQuestionClick(question.id)}>
                            <Typography variant="h6" color="#b2102f">
                                {question.title}
                            </Typography>
                        </ListItemButton>
                        {selectedQuestionId === question.id && (
                            <React.Fragment>
                                <Typography variant="body1">{question.text}</Typography>
                                <Box display="flex" justifyContent="flex-end">
                                    <Button
                                        variant="contained"
                                        onClick={() => handleDeleteClick(question.id)}
                                        style={{ marginRight: 8, backgroundColor: "#b2102f", color: "#fff" }}
                                    >
                                        Izbriši
                                    </Button>
                                    <Button
                                        variant="contained"
                                        onClick={() => handleEditClick(question.id)}
                                        style={{ backgroundColor: "#b2102f", color: "#fff" }}
                                    >
                                        Uredi
                                    </Button>
                                </Box>
                            </React.Fragment>
                        )}
                    </React.Fragment>
                ))}
            </List>
            <Button
                variant="contained"
                onClick={() => handleNewClick()}
                style={{ backgroundColor: "#b2102f", color: "#fff" }}
            >
                Dodaj FAQ
            </Button>

            {/* Edit Dialog */}
            <Dialog open={editDialogOpen} onClose={() => setEditDialogOpen(false)}>
                <DialogContent>
                    <Typography variant="h6" color="#b2102f">
                        {isNewFAQ ? "Stvori FAQ" : "Uredi FAQ"}
                    </Typography>
                    <TextField
                        label="Naslov"
                        fullWidth
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        label="Odgovor"
                        fullWidth
                        multiline
                        rows={4}
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        margin="normal"
                    />
                    <Button
                        variant="contained"
                        onClick={handleSaveChanges}
                        style={{ marginTop: 16, backgroundColor: "#b2102f", color: "#fff" }}
                    >
                        {isNewFAQ ? "Stvori FAQ" : "Spremi promjene"}
                    </Button>
                </DialogContent>
            </Dialog>
        </Container>
    );
}

export default FaqEdit;
