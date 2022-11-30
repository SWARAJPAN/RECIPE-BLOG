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
import DeleteModal from "../components/DeleteModal";

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
      fontWeight: 600,
      textAlign: "center",
      // display: "flex",
      // width: "50vw",
      mb: 2,
      justifyContent: "center",
      "@media (max-width:420px)": {
        fontSize: "2.4rem",
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

export default function UserPublishes() {
  const [openModal, setOpenModal] = React.useState(false);

  //send the id of the recipe to the modal
  const [recipeId, setRecipeId] = React.useState("");

  const params = useParams();
  const id = params.id;
  // console.log(id);
  console.log(recipeId);

  const [showPublishes, setShowPublishes] = useState<any>([]);

  useEffect(() => {
    API.get(`/users/${id}`)
      .then((res) => {
        console.log(res.data.user);
        setShowPublishes(res.data.user.publishedRecipe);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    //show all the Publishes of the user

    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box sx={{ flexGrow: 1, pt: 8, pb: 4 }}>
        <Container maxWidth='lg'>
          <Typography variant='h2' component='h2' gutterBottom>
            Your Publishes
          </Typography>
          <Divider />

          <Grid container spacing={4} mt={4}>
            {showPublishes.map((publishes: any) => {
              return (
                <Grid item key={publishes._id} xs={12} sm={6} md={4}>
                  <Card
                    sx={{
                      maxHeight: "100%",
                      display: "flex",
                      flexDirection: "column",
                      boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;",
                      borderRadius: "10px",

                      transition: "all 0.2s ease-in-out",
                      "&:hover": {
                        transform: "scale(1.05)",
                        opacity: 0.9,
                      },
                    }}
                  >
                    <NavLink
                      to={`/detail/${publishes._id}`}
                      style={{
                        textDecoration: "none",
                        color: "black",
                      }}
                    >
                      <CardMedia
                        component='img'
                        image={publishes.uploadImg}
                        alt='random'
                        sx={{
                          overflow: "hidden",
                        }}
                      />
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <Typography gutterBottom variant='h6' component='h2'>
                            {publishes.name}
                          </Typography>
                          <Typography variant='subtitle1'>
                            {publishes.ethnicity}
                          </Typography>
                        </Box>
                      </CardContent>
                    </NavLink>
                    <CardActions>
                      <NavLink
                        state={publishes}
                        to={`/edit/${publishes._id}`}
                        style={{
                          textDecoration: "none",
                          color: "black",
                        }}
                      >
                        <Button size='small' color='primary'>
                          Edit
                        </Button>
                      </NavLink>

                      <Button
                        onClick={() => {
                          setOpenModal(true);

                          setRecipeId(publishes._id);
                        }}
                        size='small'
                      >
                        Delete
                      </Button>
                      <DeleteModal
                        open={openModal}
                        recipeId={recipeId}
                        onClose={() => setOpenModal(false)}
                      />
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>
      <Footer />
    </ThemeProvider>
  );
}
