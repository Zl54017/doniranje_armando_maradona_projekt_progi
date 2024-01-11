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
import Faq from "../Donor/faq";
import News from "../Donor/news";
import Default from "./default";

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Donori krvi
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}


function ContentBox({ activeTab }: { activeTab: string }) {
  return (
    <div>
      {activeTab === "faq" ? (
        <Faq />
      )  : activeTab==="news" ? (
        <News />
      ): (
        <Default />
      )}
    </div>
  );
}
// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Main() {
  const [activeTab, setActiveTab] = React.useState("default");

  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles
        styles={{ ul: { margin: 1, padding: 1, listStyle: "none" } }}
      />
      <CssBaseline />
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        // sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography
            align="left"
            variant="h3"
            color="#b2102f"
            noWrap
            sx={{ flexGrow: 1 }}
            onClick={()=>{
              setActiveTab("default");
            }}
          >
            Donori krvi
          </Typography>

          <Link
            variant="button"
            color="text.primary"
            href="#"
            sx={{ my: 1, mx: 1.5 }}
            onClick={()=>{
              setActiveTab("faq");
            }}
          >
            FAQ
          </Link>
          <Link
            variant="button"
            color="text.primary"
            href="#"
            sx={{ my: 1, mx: 1.5 }}
            onClick={() => {
              setActiveTab("news");
            }}
          >
            Novosti
          </Link>
          <Button
            href="/login"
            variant="outlined"
            color="inherit"
            sx={{ my: 1, mx: 1.5 }}
          >
            Prijavi se
          </Button>
        </Toolbar>
      </AppBar>
      <ContentBox activeTab={activeTab} />

      
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <Copyright sx={{ mt: 5 }} />
      </Container>
      {/* End footer */}
    </ThemeProvider>
  );
}
