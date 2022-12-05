import { Player } from "@lottiefiles/react-lottie-player";
import { Favorite } from "@mui/icons-material";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import { Chip } from "@mui/material";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { orange, red } from "@mui/material/colors";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Loader from "../assets/loader.json";
import Footer from "../components/Footer";
import { API } from "../lib/axios";
import LocalDiningIcon from "@mui/icons-material/LocalDining";

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

export default function UserBookmarks() {
  const params = useParams();
  const id = params.id;
  console.log(id);

  const navigate = useNavigate();

  const [showBbookmarks, setShowBookmarks] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    setLoading(true);
    setEmpty(false);
    API.get(`users/${id}`)
      .then((res) => {
        console.log(res.data.user);
        setShowBookmarks(res.data.user.bookmarkedRecipe);
        setLoading(false);
        if (res.data.user.bookmarkedRecipe.length === 0) {
          setEmpty(true);
        }

        console.log(res.data.user.bookmarkedRecipe.length);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(showBbookmarks.bookmarkedRecipe, "rec");

  return (
    //show all the bookmarks of the user

    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box sx={{ flexGrow: 1, pt: 8, pb: 4 }}>
        <Container maxWidth='lg'>
          <Typography variant='h2' component='h2' gutterBottom>
            Your Bookmarks
          </Typography>
          <Divider />
          {loading ? (
            <Player
              autoplay
              loop
              src={Loader}
              style={{ height: "200px", width: "200px" }}
            />
          ) : (
            <Grid container spacing={4} mt={4}>
              {empty ? (
                <Grid item xs={12} sm={12} md={12} xl={12}>
                  <Typography
                    variant='subtitle1'
                    component='h2'
                    gutterBottom
                    sx={{
                      textAlign: "center",

                      magin: "auto",
                      display: "flex",

                      justifyContent: "center",
                    }}
                  >
                    You have no bookmarks yet. Add some recipes to your
                    bookmarks to see them here!
                  </Typography>
                </Grid>
              ) : (
                <>
                  {showBbookmarks.map((bookmark: any) => {
                    return (
                      <Grid item key={bookmark._id} xs={12} sm={6} md={4}>
                        <Card
                          sx={{
                            maxHeight: "85%",
                            display: "flex",
                            flexDirection: "column",
                            boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
                            borderRadius: "10px",
                            position: "relative",
                            transition: "all 0.2s ease-in-out",
                            "&:hover": {
                              transform: "scale(1.05)",
                            },
                          }}
                        >
                          <CardMedia
                            component='img'
                            image={bookmark.uploadImg}
                            alt='recipe image'
                            sx={{
                              height: "30vh",
                              overflow: "hidden",
                              cursor: "default",
                              objectFit: "cover",
                              "@media (max-width:420px)": {
                                height: "20vh",
                              },
                            }}
                          />
                          <Chip
                            icon={<AvTimerIcon />}
                            label={
                              bookmark.cookTime.includes("hr") === true
                                ? bookmark.cookTime + "+"
                                : bookmark.cookTime
                            }
                            className='chip'
                            variant='outlined'
                            sx={{
                              ":hover": {
                                backgroundColor: "white",
                                color: "black",
                              },
                            }}
                          />

                          <Chip
                            icon={<LocalDiningIcon />}
                            label={bookmark.category}
                            className='categoryChip'
                            variant='outlined'
                            sx={{
                              ":hover": {
                                backgroundColor: "white",
                                color: "black",
                              },
                            }}
                          />
                          <CardContent sx={{ flexGrow: 1, paddingBottom: 0 }}>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                              }}
                            >
                              <Typography
                                gutterBottom
                                variant='h6'
                                component='h2'
                              >
                                {bookmark.name}
                              </Typography>
                              <Typography variant='subtitle1'>
                                {bookmark.ethnicity}
                              </Typography>
                            </Box>
                          </CardContent>
                          <CardActions
                            sx={{
                              display: "flex",
                              justifyContent: "space-evenly",
                              alignItems: "flex-start",
                            }}
                          >
                            <Typography
                              variant='subtitle1'
                              component='h2'
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                fontSize: "0.9rem",
                                minWidth: "50%",
                              }}
                            >
                              <Favorite
                                color='primary'
                                sx={{ marginRight: "5px", size: "0.9rem" }}
                              />
                              {bookmark.likedBy.length}{" "}
                              {bookmark.likedBy.length > 1 ? "likes" : "like"}
                            </Typography>
                            <NavLink
                              to={`/detail/${bookmark._id}`}
                              style={{ textDecoration: "none" }}
                            >
                              <Button
                                variant='outlined'
                                size='small'
                                sx={{
                                  justifyContent: "center",
                                  alignItems: "flex-end",
                                  minWidth: "110px",
                                  fontWeight: "bold",
                                  borderRadius: "6px",
                                  border: "1px solid",
                                  "&:hover": {
                                    backgroundColor: "primary.main",
                                    color: "white",
                                  },
                                }}
                                onClick={() =>
                                  navigate(`detail/${bookmark._id}`)
                                }
                              >
                                view
                              </Button>
                            </NavLink>
                          </CardActions>
                        </Card>
                      </Grid>
                    );
                  })}
                </>
              )}
            </Grid>
          )}
        </Container>
      </Box>
      <Footer />
    </ThemeProvider>
  );
}
