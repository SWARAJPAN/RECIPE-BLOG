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
import {
  Checkbox,
  Chip,
  InputAdornment,
  Pagination,
  TextField,
} from "@mui/material";
import RecipePagination from "../components/RecipePagination";
import SearchBar from "../components/SearchBar";
import SearchIcon from "@mui/icons-material/Search";
import AvTimerIcon from "@mui/icons-material/AvTimer";
import { Player } from "@lottiefiles/react-lottie-player";
import Loader from "../assets/loader.json";
import { FavoriteBorder, Favorite } from "@mui/icons-material";

const cookingTime = [
  {
    value: "15mins",
    label: "15mins",
  },
  {
    value: "30mins",
    label: "30mins",
  },
  {
    value: "45mins",
    label: "45mins",
  },
  {
    value: "1hr+",
    label: "1hr+",
  },
  {
    value: "2hr+",
    label: "2hr+",
  },
];

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

const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return JSON.parse(token);
  } else {
    return null;
  }
};

export default function Album() {
  const navigate = useNavigate();

  const [recipes, setRecipes] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(getTokenFromLocalStorage());
  const [search, setSearch] = useState("");
  const [sendSearch, setSendSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [length, setLength] = useState(0);
  const [skip, setSkip] = useState(0);
  const [filter, setFilter] = useState("");

  const { id } = useParams();

  //search a recipe

  const handleSearch = (e: any) => {
    e.preventDefault();
    setSearch(e.target.value);
    setSendSearch(e.target.value);
  };
  const limit = 9;

  useEffect(() => {
    const fetchRecipes = setTimeout(() => {
      setLoading(true);
      API.get(
        `recipes?${filter}&search=${search}&sort={'createdAt':-1}&skip=${skip}&limit=${limit}`
      ).then((res) => {
        console.log("ass0", res.data);
        setRecipes(res.data.recipes);
        console.log(res.data.recipe);

        setLoading(false);
      });
    }, 500);

    return () => clearTimeout(fetchRecipes);
  }, [search, skip, filter, limit]);

  //api call for pagination
  useEffect(() => {
    API.get(`recipes`).then((res) => {
      setLength(res.data.count);
    });
  }, [sendSearch, skip, limit]);

  console.log(skip, "length");

  const pages = Math.floor(length / limit);

  console.log("pages", pages);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          pt: 8,
          pb: 4,
        }}
      >
        <Container maxWidth='md'>
          <Typography
            component='h1'
            variant='h2'
            display={{ xs: "none", sm: "block" }}
          >
            Find your next recipe!
          </Typography>
        </Container>
      </Box>
      {/* <-----------------Search Bar-----------------> */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mb: 2,
          mt: 1,

          "@media (max-width:420px)": {
            mb: 2,
            mt: 1,
          },
        }}
      >
        <TextField
          id='input-with-icon-textfield'
          placeholder='Search by name or ethnicity...'
          color='secondary'
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant='standard'
          sx={{
            position: "relative",

            justifyContent: "center",
            alignContent: "center",
            margin: "auto",
            width: "50%",
            "@media (max-width:420px)": {
              width: "90%",
            },
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {cookingTime.map((cookTime: any) => (
          <Button
            key={cookTime.value}
            value={cookTime.value}
            onClick={() => setFilter(`cookTime=${cookTime.value}`)}
            className='chip'
            // sx={{
            //   display: "flex",
            //   justifyContent: "center",
            //   alignItems: "center",
            //   mr: 1,
            // }}
          >
            {cookTime.label}
          </Button>
        ))}
      </Box>

      {loading ? (
        <Player
          autoplay
          loop
          src={Loader}
          style={{ height: "300px", width: "300px" }}
        />
      ) : (
        <Container sx={{ py: 8, mb: 2 }} maxWidth='lg'>
          <Grid container spacing={6}>
            {recipes
              // .slice((page - 1) * 9, page * 9)

              .map((recipe: any, index: number) => {
                return (
                  <Grid item key={recipes._id} xs={12} sm={6} md={4}>
                    <Card
                      sx={{
                        maxHeight: "85%",
                        display: "flex",
                        flexDirection: "column",
                        boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;",
                        borderRadius: "10px",
                        transition: "all 0.2s ease-in-out",
                        cursor: "pointer",
                        "&:hover": {
                          transform: "scale(1.1)",
                        },
                        "@media (max-width:420px)": {
                          maxHeight: "100%",
                        },
                        position: "relative",
                      }}
                    >
                      <CardMedia
                        component='img'
                        sx={{
                          // 16: 9,
                          height: "35vh",
                          overflow: "hidden",
                          cursor: "default",
                          objectFit: "cover",
                          "@media (max-width:420px)": {
                            height: "20vh",
                          },
                        }}
                        image={recipe.uploadImg}
                        alt='random'
                      />

                      <Chip
                        icon={<AvTimerIcon />}
                        label={recipe.cookTime}
                        className='chip'
                        variant='outlined'
                        sx={{
                          ":hover": {
                            backgroundColor: "white",
                            color: "black",
                          },
                        }}
                      />

                      <CardContent sx={{ flexGrow: 1, paddingBottom: "0" }}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "baseline",
                          }}
                        >
                          <Typography
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
                            {recipe.ethnicity}
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
                          {recipe.likedBy.length} likes
                        </Typography>
                        <NavLink
                          to={`/detail/${recipe._id}`}
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
                            onClick={() => navigate(`detail/${recipe._id}`)}
                          >
                            view
                          </Button>
                        </NavLink>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
          </Grid>
        </Container>
      )}
      {loading ? null : (
        <RecipePagination
          pages={pages + 1}
          skip={skip}
          limit={limit}
          setSkip={setSkip}
        />
      )}

      {login ? (
        <Typography
          color={theme.palette.secondary.main}
          variant='subtitle1'
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            margin: "auto",
            width: "50%",
            mt: 4,
          }}
        >
          Welcome {login.user}!
        </Typography>
      ) : (
        <Typography variant='subtitle1' align='center' sx={{ mt: 12 }}>
          If you want to share your own recipe with us, please{" "}
          <NavLink to='/signup'>
            <Link fontWeight={"bold"} variant='body1'>
              Sign Up.
            </Link>
          </NavLink>
        </Typography>
      )}
      <Footer />
    </ThemeProvider>
  );
}
function useDebounce(
  search: string,
  arg1: number,
  handleSendSearch: (e: any) => void
) {
  throw new Error("Function not implemented.");
}
