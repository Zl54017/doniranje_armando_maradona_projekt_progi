import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import GlobalStyles from "@mui/material/GlobalStyles";
import Container from "@mui/material/Container";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import { Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { attemptLogout, clearUser } from "../../redux/slices/authSlice";
import localStorageUtility from "../../utils/localStorage/auth";
import { BrowserRouter as Router, Route } from 'react-router-dom';

export default function ListOfDonors(props: any) {
    return (
        <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            {...props}
        >
            {"Copyright © "}
            <Link color="inherit" href="https://mui.com/">
                ListOfDonors
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}