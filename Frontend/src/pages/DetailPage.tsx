import React from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import Footer from "../components/Footer";
import { red } from "@mui/material/colors";

import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Divider from "@mui/material/Divider";
import { useState, useEffect } from "react";
import { API } from "../lib/axios";
import { useParams } from "react-router-dom";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF5757",
      // main: red[100],
      dark: red[500],
      light: red[200],
      contrastText: "#fff",
    },
    secondary: {
      main: "#7F8284",
      dark: "#676A6B",
      contrastText: "#fff",
    },
  },

  typography: {
    h3: {
      // fontSize: 12,
      color: "#CB692D",
      fontWeight: 600,

      mb: 4,
      marginBottom: "1rem",
      "@media (max-width:420px)": {
        fontSize: "2.4rem",
      },
    },
    subtitle1: {
      mt: 2,
      marginBottom: "1rem",
      color: "#7F8284",
      "@media (max-width:420px)": {
        lineHeight: "1.5rem",
      },
    },
    body1: {
      color: "#676A6B",
      fontSize: "1rem",
      fontWeight: "bold",
      //   fontSize: "0.9rem",
    },

    button: {
      fontSize: 20,

      fontWeight: "bold",
      textTransform: "none",
      padding: "10px 20px",
      fontFamily: "arial",

      borderRadius: "20px",
      // backgroundColor: "#676A6B",
      // "&:focus": {
      //   backgroundColor: "#676A6B",
      // },
    },
  },
});

const label = { inputProps: { "aria-label": "Checkbox demo" } };

export default function DetailPage() {
  const params = useParams();
  const id = params.id;
  console.log(id);

  const [detailRecipe, setDetailRecipe] = useState<any>([]);

  useEffect(() => {
    API.get(`recipes/${id}`)
      .then((res) => {
        console.log(res.data.recipe);
        setDetailRecipe(res.data.recipe);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        maxWidth='xl'
        sx={{
          marginTop: "4rem",
          display: "flex",
        }}
      >
        <Grid
          container
          spacing={2}
          sx={{
            "@media (max-width:420px)": {
              padding: "0 ",
            },
            padding: "2rem",
          }}
        >
          <Grid item xs={12} sm={6} xl={6}>
            <Typography variant='h3' gutterBottom>
              {/* Recipe name. */}
              {detailRecipe.name}
            </Typography>
            <Typography variant='subtitle1' gutterBottom>
              by{" "}
              <span style={{ color: "#CB692D" }}>
                {detailRecipe.publishedBy}
              </span>
            </Typography>
            <Grid
              item
              container
              direction='row'
              justifyContent='space-between'
              xl={4}
              xs={6}
              mb={2}
              mt={4}
            >
              <Typography variant='body1' gutterBottom>
                Category {detailRecipe.category}
              </Typography>
              <Typography variant='body1' gutterBottom>
                Ethnicity {detailRecipe.ethnicity}
              </Typography>
            </Grid>
            <Typography variant='subtitle1'>
              {detailRecipe.description}
            </Typography>
            <Grid item container direction='column' xs={12} sm={12}>
              <Grid item>
                <Typography variant='body1' gutterBottom>
                  Ingredients
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant='subtitle1' mb={4}>
                  {detailRecipe.ingredients}
                </Typography>
              </Grid>
            </Grid>
            <Grid item sx={{ paddingRight: "10px" }}>
              <Typography variant='body1' gutterBottom>
                Instruction:
              </Typography>
              <Typography variant='subtitle1'>
                {detailRecipe.instruction}
              </Typography>
              {/* <Divider /> */}
            </Grid>
          </Grid>

          <Grid item xs={12} sm={6} xl={6}>
            <Grid item>
              <Card>
                <CardMedia
                  component='img'
                  image='https://source.unsplash.com/random?food'
                  alt='pasta'
                  height='500'
                  //   sx={{ boxShadow: "0" }}
                />
              </Card>
              <Box
                mt={4}
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                  verticalAlign: "top",
                  "@media (max-width:420px)": {
                    flexDirection: "column",
                    alignItems: "center",
                  },
                }}
              >
                <Typography variant='subtitle1'>
                  Like this recipe?{" "}
                  <Checkbox
                    {...label}
                    icon={<FavoriteBorder />}
                    checkedIcon={<Favorite />}
                  />
                </Typography>
                <Button
                  size='small'
                  variant='outlined'
                  sx={{
                    height: "2.5rem",
                    lineHeight: "1rem",
                    width: "50%",
                    "&:hover": {
                      backgroundColor: "primary.main",
                      color: "white",
                    },
                    "@media (max-width:420px)": {
                      width: "100%",
                    },
                  }}
                >
                  <BookmarkIcon sx={{ marginRight: "5px" }} />
                  Bookmark this recipe
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}
