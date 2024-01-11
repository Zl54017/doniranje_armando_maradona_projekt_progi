import React, { useEffect, useRef, useState } from "react";
import Container from "@mui/material/Container";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Typography from "@mui/material/Typography";
import { Button, Dialog, DialogContent, Grid, Box } from "@mui/material";
import { RootState, useAppDispatch } from "../../redux/store";
import { attemptGetFAQ, attemptPostFAQ } from "../../redux/slices/authSlice";
import { useSelector } from "react-redux";


interface Question {
    question: string;
    answer: string;
    isEditingQuestion: boolean;
    isEditingAnswer: boolean;
    isOpen: boolean;
}

function FaqEdit() {
    const dispatch = useAppDispatch();
    // const initialQuestions: Question[] = [
    //     {
    //         question: 'Prvo pitanje',
    //         answer: 'Odgovor na prvo pitanje...',
    //         isEditingQuestion: false,
    //         isEditingAnswer: false,
    //         isOpen: false
    //     },
    //     {
    //         question: 'Drugo pitanje',
    //         answer: 'Odgovor na drugo pitanje...',
    //         isEditingQuestion: false,
    //         isEditingAnswer: false,
    //         isOpen: false
    //     }
    //     // Dodaj više pitanja i odgovora po potrebi
    // ];

    const [initialQuestions, setInitialQuestions] = useState({
        question: 'Prvo pitanje',
        answer: 'Odgovor na prvo pitanje...',
        isEditingQuestion: false,
        isEditingAnswer: false,
        isOpen: false
    })

    // const [questions, setQuestions] = useState<Question[]>(initialQuestions);
    const [questions, setQuestions] = useState<any[]>([]);
    const [newQuestions, setNewQuestions] = useState<any[]>([]);
    const { user, role } = useSelector((state: RootState) => state.auth);

    const handleQuestionClick = (index: number) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].isOpen = !updatedQuestions[index].isOpen;
        setQuestions(updatedQuestions);
    };

    const handleEditQuestion = (index: number) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].isEditingQuestion = !updatedQuestions[index].isEditingQuestion;
        setQuestions(updatedQuestions);
    };

    const handleEditAnswer = (index: number) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].isEditingAnswer = !updatedQuestions[index].isEditingAnswer;
        setQuestions(updatedQuestions);
    };


    const [showForm, setShowForm] = useState(false);
    const [dialogContent, setDialogContent] = useState('Izbriši');

    const handleToggleDialog = () => {
        setShowForm(!showForm);
        if (showForm) {
            setDialogContent('Izbriši');
        } else {
            setDialogContent('Otkaži');
        }
    };
    const handleCloseDialog = () => {
        setShowForm(false);
        setDialogContent('Izbriši');
    };

    const handleDeleteItem = (index: number) => {
        console.log("Index to delete:", index);
        const updatedQuestions = questions.filter((_, i) => i !== index);
        setQuestions(updatedQuestions);
        setShowForm(false);
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

    useEffect(() => {
        if (user) {
            dispatch(attemptPostFAQ(user))
                .then((response: any) => {
                    setNewQuestions(response.payload || []);
                })
                .catch((error: any) => {
                    console.error("Error", error);
                });
        }
    }, [dispatch]);

    return (
        <Container>
            <Box mt={5} ml={5} style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <List>
                    {questions.map((item, index) => (
                        <React.Fragment key={index}>
                            <ListItemButton onClick={() => handleQuestionClick(index)}>
                                {item.isEditingQuestion ? (
                                    <input
                                        type="text"
                                        value={item.question}
                                        onChange={(e) => {
                                            const updatedQuestions = [...questions];
                                            updatedQuestions[index].question = e.target.value;
                                            setQuestions(updatedQuestions);
                                        }}
                                    />
                                ) : (
                                    <Typography variant="h6" color="#b2102f">
                                        {item.question}
                                    </Typography>
                                )}
                                <Grid item xs={12} sm={6}>
                                    <Button onClick={() => handleEditQuestion(index)} variant="contained" style={{ backgroundColor: "#b2102f", color: "white", gap: "30px", marginRight: '5px' }}>
                                        {item.isEditingQuestion ? 'Spremi' : 'Uredi'}
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Box style={{ display: 'flex', flexDirection: 'column', marginRight: '5%', flexGrow: 1 }}>
                                        <Button onClick={handleToggleDialog} variant="contained" style={{ backgroundColor: "#b2102f", color: "white", marginLeft: '5px' }}>
                                            {showForm ? 'Otkaži' : 'Izbriši'}
                                        </Button>
                                        {showForm && (
                                            <Dialog open={showForm} onClose={handleToggleDialog} fullWidth maxWidth="sm">
                                                <DialogContent dividers>
                                                    <Container style={{ maxWidth: '500px', maxHeight: '80vh', overflowY: 'auto', padding: '16px' }}>
                                                        <Box style={{ display: "flex", flexDirection: "column" }}>
                                                            <Typography variant="body1" style={{ textAlign: 'center' }}>
                                                                Jeste li sigurni da želite izbrisati stavku?
                                                            </Typography>
                                                            <Grid container spacing={2} justifyContent="center">
                                                                <Grid item xs={6} sm={6}>
                                                                    <Button onClick={() => handleDeleteItem(index)} variant="contained" style={{ backgroundColor: "#b2102f", color: "white", width: '200px', marginTop: '15px' }}>
                                                                        Izbriši
                                                                    </Button>
                                                                </Grid>
                                                                <Grid item xs={6} sm={6}>
                                                                    <Button onClick={handleCloseDialog} variant="contained" style={{ backgroundColor: "#b2102f", color: "white", width: '200px', marginTop: '15px' }}>
                                                                        Otkaži
                                                                    </Button>
                                                                </Grid>
                                                            </Grid>
                                                        </Box>
                                                    </Container>
                                                </DialogContent>
                                            </Dialog>
                                        )}

                                    </Box>
                                </Grid>

                            </ListItemButton>

                            {item.isOpen && (
                                <ListItemButton>
                                    {item.isEditingAnswer ? (
                                        <input
                                            type="text"
                                            value={item.answer}
                                            onChange={(e) => {
                                                const updatedQuestions = [...questions];
                                                updatedQuestions[index].answer = e.target.value;
                                                setQuestions(updatedQuestions);
                                            }}
                                        />
                                    ) : (
                                        <p>{item.answer}</p>
                                    )}
                                    <Button onClick={() => handleEditAnswer(index)} variant="contained" style={{ backgroundColor: "#b2102f", color: "white", gap: "30px" }}>
                                        {item.isEditingAnswer ? 'Spremi' : 'Uredi'}
                                    </Button>
                                </ListItemButton>
                            )}
                        </React.Fragment>
                    ))}
                </List>
            </Box>
        </Container>
    );


    // );
}

export default function FaqEmployee(props: any) {
    return (
        <FaqEdit />
    );
}

function setShowForm(arg0: boolean) {
    throw new Error("Function not implemented.");
}
function setDialogContent(arg0: string) {
    throw new Error("Function not implemented.");
}

