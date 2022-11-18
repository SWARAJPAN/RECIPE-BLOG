import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { red, blue } from "@mui/material/colors";
import { NavLink } from "react-router-dom";
import Footer from "../components/Footer";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF5757",
      light: red[400],
      // main: red[100],
      dark: red[500],
      contrastText: "#fff",
    },
    secondary: {
      main: "#7F8284",
      dark: "#676A6B",
      contrastText: "#fff",
    },
  },

  typography: {
    h2: {
      // fontSize: 12,

      color: "#676A6B",
      fontWeight: "bold",
      textAlign: "center",
      // display: "flex",
      // width: "50vw",

      justifyContent: "center",

      "@media (max-width:420px)": {
        fontSize: "1.4rem",
      },
    },
    subtitle1: {
      mt: 2,
      marginBottom: "1rem",
      fontWeight: "bold",

      color: "#7F8284",
      "@media (max-width:420px)": {
        lineHeight: "1.3rem",
      },
    },

    button: {
      fontSize: 16,
      fontWeight: "bold",
      textTransform: "none",
      padding: "10px 20px",
      fontFamily: "arial",
      backgroundColor: "primary.light",
      borderRadius: "20px",
      // backgroundColor: "#676A6B",
      // "&:focus": {
      //   backgroundColor: "#676A6B",
      // },
    },
  },
});

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

export default function Album() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <main>
        {/* Hero unit */}
        <Box
          sx={{
            // bgcolor: "background.blue",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth='sm'>
            <Typography
              component='h1'
              variant='h2'
              display={{ xs: "block", sm: "block" }}
              gutterBottom
            >
              Find your next recipe!
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 3 }} maxWidth='lg'>
          {/* End hero unit */}
          <Grid container spacing={5} marginBottom={-10}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    maxHeight: "75%",
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;",
                    borderRadius: "10px",
                  }}
                >
                  <CardMedia
                    component='img'
                    sx={{
                      // 16: 9,
                      overflow: "hidden",
                    }}
                    image='https://source.unsplash.com/random'
                    alt='random'
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant='subtitle1' component='h2'>
                      Heading
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant='outlined'
                      size='medium'
                      sx={{
                        justifyContent: "center",
                        margin: "auto",
                        minWidth: "100%",
                        borderRadius: "10px",
                      }}
                    >
                      View
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
        <Typography
          variant='subtitle1'
          align='center'
          color='text.secondary'
          paragraph
          sx={{ mt: 10 }}
        >
          If you want to share your own recipe with us, please.{" "}
          <NavLink to='/signup'>
            <Link fontWeight={"bold"} variant='body1'>
              Sign Up
            </Link>
          </NavLink>
        </Typography>
      </main>
      <Footer />
    </ThemeProvider>
  );
}
