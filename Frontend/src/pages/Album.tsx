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
import { red, orange } from "@mui/material/colors";
import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Divider from "@mui/material/Divider";
import { useState, useEffect } from "react";
import { API } from "../lib/axios";
import { useParams } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF5757",
      light: red[400],
      dark: orange[900],
      contrastText: "#fff",
    },
    secondary: {
      light: "#d4d3d2",
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

      color: "#7F8284",
      "@media (max-width:420px)": {
        lineHeight: "1.3rem",
      },
    },
  },
});

export default function Album() {
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState<any>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get("recipes?sort={'createdAt':-1}").then((res) => {
      setRecipes(res.data.recipe);
      console.log(res.data.recipe);
    });
  }, []);

  console.log(recipes);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <main>
        <Box
          sx={{
            // bgcolor: "background.blue",
            pt: 8,
            pb: 4,
          }}
        >
          <Container maxWidth='md'>
            <Typography
              component='h1'
              variant='h2'
              display={{ xs: "block", sm: "block" }}
              gutterBottom
            >
              Find your next recipe!
              {recipes.ame}
            </Typography>
          </Container>
        </Box>
        {/* <Divider /> */}
        <Container sx={{ py: 8 }} maxWidth='lg'>
          <Grid container spacing={5}>
            {/* <-----------------  Here is the map  -----------------> */}

            {recipes.map((recipe: any) => {
              return (
                <Grid item key={recipes._id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      maxHeight: "75%",
                      display: "flex",
                      flexDirection: "column",
                      boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;",
                      borderRadius: "10px",

                      transition: "all 0.2s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.05)",
                        opacity: 0.9,

                        // scale: "1.1",
                      },
                    }}
                  >
                    <CardMedia
                      component='img'
                      sx={{
                        // 16: 9,
                        overflow: "hidden",
                      }}
                      image='https://source.unsplash.com/random?recipe'
                      alt='random'
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          gutterBottom
                          variant='subtitle1'
                          component='h2'
                          color='black'
                        >
                          {recipe.name}
                        </Typography>
                        <Typography
                          gutterBottom
                          variant='subtitle1'
                          component='h2'
                        >
                          {recipe.cuisineTag}
                        </Typography>
                      </Box>
                    </CardContent>
                    <CardActions>
                      <NavLink
                        to={`/detail/${recipe._id}`}
                        style={{ textDecoration: "none", minWidth: "100%" }}
                      >
                        <Button
                          variant='outlined'
                          size='medium'
                          sx={{
                            justifyContent: "center",

                            margin: "auto",
                            minWidth: "100%",
                            fontWeight: "bold",
                            borderRadius: "6px",
                            border: "1px solid",

                            "&:hover": {
                              backgroundColor: "primary.main",
                              color: "white",
                            },
                          }}
                          onClick={() => navigate(`detail/${recipe._id}`)}
                        >
                          View
                        </Button>
                      </NavLink>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
        <Typography
          variant='subtitle1'
          align='center'
          // color='text.secondary'

          sx={{ mt: 4 }}
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
