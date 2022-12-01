import React, { useLayoutEffect } from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Card from "@mui/material/Card";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { red } from "@mui/material/colors";
import Link, { Chip, IconButton, Pagination } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import Divider from "@mui/material/Divider";
import { useState, useEffect } from "react";
import { API } from "../lib/axios";
import { useParams } from "react-router-dom";
import Modal from "../components/ModalDialog";
import ModalDialog from "../components/ModalDialog";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import { Player } from "@lottiefiles/react-lottie-player";
import Loader from "../assets/loader.json";
import { margin } from "@mui/system";

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
      // fontSize: "1rem",
      color: "#7F8284",
      "@media (max-width:420px)": {
        lineHeight: "1.5rem",
      },
    },
    body1: {
      color: "#676A6B",
      fontSize: "2 rem",
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

const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return JSON.parse(token);
  } else {
    return null;
  }
};

export default function DetailPage() {
  const navigate = useNavigate();

  const [login, setLogin] = React.useState(getTokenFromLocalStorage);

  const [openModal, setOpenModal] = React.useState(false);
  const [bookmarked, setBookmarked] = React.useState(false);
  const [liked, setLiked] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [likeLength, setLikeLength] = React.useState(0);

  const params = useParams();
  const id = params.id;
  console.log(id);

  const [detailRecipe, setDetailRecipe] = useState<any>([]);

  useEffect(() => {
    const user: string = JSON.parse(localStorage.getItem("user") || "{}");
    setLoading(true);
    API.get(`recipes/${id}`)
      .then((res) => {
        console.log(res.data.recipe);
        setDetailRecipe(res.data.recipe);

        res.data.recipe.bookmarkedBy.forEach((bookmark: any) => {
          if (bookmark === user) {
            setBookmarked(true);
            console.log("bookmark", bookmarked);
          }
        });

        res.data.recipe.likedBy.forEach((like: any) => {
          console.log("like", like, user, like === user);
          if (like._id === user) {
            setLiked(true);
            console.log("like", liked);
            setLikeLength(res.data.recipe.likedBy.length);
          }
        });

        setLoading(false);
      })

      .catch((err) => {
        console.log(err);
      });
  }, [bookmarked, liked, likeLength]);

  console.log(likeLength, "show likes");

  const handleBookmark = () => {
    if (login) {
      API.post(`recipes/${id}/bookmark`)
        .then((res) => {
          if (res.status === 200) {
            setBookmarked(!bookmarked);
            console.log("bookmark", bookmarked);
          }

          // console.log(res.data);
          // setBookmarked(!bookmarked);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setOpenModal(true);
    }
  };

  const handleLike = () => {
    if (login) {
      API.post(`recipes/${id}/like`)
        .then((res) => {
          if (res.status === 200) {
            setLiked(!liked);
            setLikeLength(res.data.recipe.likedBy.length);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setOpenModal(true);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        maxWidth='xl'
        sx={{
          marginTop: "4rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {loading ? (
          <Player
            autoplay
            loop
            src={Loader}
            style={{
              height: "300px",
              width: "300px",
              marginTop: "30%",
              margin: "0",
            }}
          />
        ) : (
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
            <Grid
              item
              xs={12}
              sm={6}
              xl={6}
              paddingRight={3}
              sx={{
                "@media (max-width:420px)": {
                  padding: "0 ",
                },
              }}
            >
              <Typography variant='h3' gutterBottom>
                {detailRecipe.name}
              </Typography>
              <Typography variant='subtitle1' gutterBottom>
                by{" "}
                <span style={{ color: "#CB692D" }}>
                  {detailRecipe.publishedBy?.firstName}{" "}
                  {detailRecipe.publishedBy?.lastName}
                </span>
              </Typography>
              <Grid
                item
                container
                direction='row'
                justifyContent='space-evenly'
                xl={5}
                xs={6}
                md={8}
                mb={3}
                mt={3}
                // width='40%'
                sx={{
                  "@media (max-width:420px)": {
                    justifyContent: "space-between",
                    width: "100%",
                  },
                }}
              >
                <Typography variant='body1' gutterBottom>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <LocalDiningIcon
                      sx={{
                        mr: "7px",
                        "@media (max-width:420px)": {
                          paddingLeft: "5px",
                          mr: "5px",
                        },
                      }}
                    />{" "}
                    {detailRecipe.category}
                  </div>
                </Typography>
                <Typography variant='body1' gutterBottom>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <PeopleAltIcon
                      sx={{
                        mr: "7px",

                        "@media (max-width:420px)": {
                          paddingLeft: "5px",
                          mr: "5px",
                          ml: "2px",
                        },
                      }}
                    />{" "}
                    {detailRecipe.ethnicity}
                  </div>
                </Typography>
              </Grid>
              <Typography variant='subtitle1' mb={4}>
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
              </Grid>
            </Grid>

            <Grid item xs={12} sm={6} xl={6}>
              <Grid item>
                <Card
                  sx={{
                    position: "relative",
                    "@media (max-width:420px)": {
                      width: "100%",
                    },
                  }}
                >
                  <CardMedia
                    component='img'
                    image={detailRecipe.uploadImg}
                    alt='image'
                    height='500'
                  />

                  <Chip
                    icon={<AvTimerIcon />}
                    label={detailRecipe.cookTime}
                    className='chip'
                    color='primary'
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
                  <Typography
                    variant='subtitle1'
                    sx={{
                      width: "50%",
                      height: "2.5rem",

                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",

                      "@media (max-width:420px)": {
                        marginBottom: "10px",
                        width: "100%",
                      },
                    }}
                  >
                    {/* {liked ? "Liked!" : "Like this recipe?"}{" "} */}
                    <Checkbox
                      checked={liked}
                      onClick={handleLike}
                      inputProps={{ "aria-label": "controlled" }}
                      icon={<FavoriteBorder />}
                      checkedIcon={<Favorite />}
                    />
                    {liked ? `${likeLength} Likes` : "Like this recipe?"}
                  </Typography>

                  <Button
                    onClick={handleBookmark}
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
                    <BookmarkIcon sx={{ marginRight: "5px" }} />{" "}
                    {bookmarked ? "Bookmarked! " : "Bookmark this recipe?"}
                  </Button>

                  <ModalDialog
                    open={openModal}
                    onClose={() => setOpenModal(false)}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Container>
      <Footer />
    </ThemeProvider>
  );
}
