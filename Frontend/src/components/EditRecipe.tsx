import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { red } from "@mui/material/colors";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";

import { Player } from "@lottiefiles/react-lottie-player";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Loader from "../assets/loader.json";
import Footer from "../components/Footer";

import { MenuItem } from "@mui/material";
import { API } from "../lib/axios";

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
    action: {
      disabledBackground: red[100],
      disabled: "#f57373",
    },
  },

  typography: {
    h2: {
      // fontSize: 12,
      color: "#676A6B",
      fontWeight: 600,
      width: "100vw",
      textAlign: "center",
      justifyContent: "center",
      mb: 2,
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
        lineHeight: "1.3rem",
      },
    },

    button: {
      fontSize: 16,
      fontWeight: "bold",
      textTransform: "none",
      padding: "10px 20px",
      fontFamily: "arial",

      borderRadius: "20px",
    },
  },
});

const categoryType = [
  {
    value: "Vegan",
    label: "Vegan",
  },
  {
    value: "Vegetarian",
    label: "Vegetarian",
  },
  {
    value: "Non-Vegetarian",
    label: "Non-Vegetarian",
  },
  {
    value: "Eggless",
    label: "Eggless",
  },
];

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
    value: "1hr",
    label: "1hr+",
  },
  {
    value: "2hr",
    label: "2hr+",
  },
];

type Recipe = {
  name: string;
  description: string;
  ingredients: string;
  instruction: string;
  uploadImg: string;
  category: string;
  ethnicity: string;
  cookTime: string;
};

export default function EditRecipe() {
  const [editRecipe, setEditRecipe] = React.useState<Recipe>(null as any);
  const [updatedImg, setUpdatedImg] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore
    setEditRecipe({
      ...editRecipe,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageChange = (fileList: FileList | null) => {
    const file = fileList && fileList[0];
    const reader = new FileReader();

    reader.readAsDataURL(file!);
    reader.addEventListener("loadend", () => {
      setUpdatedImg(reader.result as string);
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    API.patch(`/recipes/${id}`, {
      ...editRecipe,
      uploadImg: updatedImg ?? editRecipe.uploadImg,
    }).then((res) => {
      setLoading(false);
      if (res.status === 200) {
        navigate(-1);
      }
    });
  };

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  React.useEffect(() => {
    API.get(`/recipes/${id}`)
      .then((res) => {
        setEditRecipe(res.data.recipe);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    //edit recipe
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='sm'>
        <CssBaseline />

        <Box
          sx={{
            marginTop: 6,

            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Avatar
            sx={{
              m: 1,
              mb: 2,
              bgcolor: "primary.main",
              transform: "scale(1.3)",
            }}
          >
            <BorderColorIcon />
          </Avatar>
          <Typography
            component='h1'
            variant='h2'
            sx={{
              display: "flex",

              width: "80vw",
            }}
          >
            Making some changes?
          </Typography>
          <Typography component='h1' variant='subtitle1'>
            Edit your recipe here and we'll make sure it's updated in no time!
          </Typography>

          {!editRecipe ? (
            <Player
              autoplay
              loop
              src={Loader}
              style={{ height: "200px", width: "200px" }}
            />
          ) : (
            <Box component='form' onSubmit={handleSubmit} sx={{ mt: 3 }}>
              <Grid
                container
                spacing={2}
                rowGap={1}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Grid
                  item
                  xs={6}
                  sm={6}
                  sx={{
                    "& .MuiTextField-root": { width: "46ch" },
                    "@media (max-width:420px)": {
                      "& .MuiTextField-root": { width: "26ch" },
                    },
                  }}
                >
                  <TextField
                    color='secondary'
                    fullWidth
                    id='name'
                    variant='standard'
                    label='Recipe Name'
                    name='name'
                    value={editRecipe.name}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={3} sm={3}>
                  <TextField
                    id='outlined-select-cookTime'
                    select
                    fullWidth
                    name='cookTime'
                    label='Time'
                    color='secondary'
                    variant='standard'
                    value={editRecipe.cookTime}
                    onChange={handleChange}
                  >
                    {cookingTime.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sm={6}
                  sx={{
                    "& .MuiTextField-root": { width: "29.9ch" },
                    "@media (max-width:420px)": {
                      "& .MuiTextField-root": { width: "17ch" },
                    },
                  }}
                >
                  <TextField
                    variant='standard'
                    color='secondary'
                    select
                    id='outlined-select-category'
                    label='Category'
                    name='category'
                    value={editRecipe.category}
                    onChange={handleChange}
                  >
                    {categoryType.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sm={6}
                  md={6}
                  sx={{
                    "& .MuiTextField-root": { width: "29.9ch" },
                    "@media (max-width:420px)": {
                      "& .MuiTextField-root": { width: "17ch" },
                    },
                  }}
                >
                  <TextField
                    variant='standard'
                    color='secondary'
                    id='ethnicity'
                    fullWidth
                    label='Ethnicity'
                    name='ethnicity'
                    value={editRecipe.ethnicity}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant='standard'
                    color='secondary'
                    fullWidth
                    id='ingredients'
                    label='Ingredients'
                    name='ingredients'
                    multiline
                    value={editRecipe.ingredients}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    color='secondary'
                    fullWidth
                    variant='standard'
                    multiline
                    minRows={2}
                    maxRows={3}
                    id='description'
                    label='Recipe description'
                    name='description'
                    value={editRecipe.description}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant='standard'
                    color='secondary'
                    fullWidth
                    id='instruction'
                    label='Instruction'
                    name='instruction'
                    multiline
                    minRows={4}
                    maxRows={6}
                    value={editRecipe.instruction}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant='outlined'
                    component='label'
                    color='secondary'
                    fullWidth
                    sx={{
                      justifyContent: "space-between",
                      mt: 3,
                      mb: 3,

                      "&:hover": {
                        borderColor: "secondary.main",
                        backgroundColor: "secondary.light",

                        color: "white",
                      },
                    }}
                  >
                    <PhotoCamera /> <Typography>Upload Image</Typography>
                    <input
                      hidden
                      accept='image/png, image/jpeg, image/jpg, image/gif,'
                      multiple
                      type='file'
                      onChange={(e) => handleImageChange(e.target.files)}
                      style={{
                        display: "none",
                      }}
                    />
                  </Button>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      textAlign: "center",
                      margin: "1rem",
                    }}
                  >
                    {updatedImg && (
                      <img
                        src={updatedImg}
                        style={{
                          height: "100%",
                          width: "100%",
                        }}
                      />
                    )}
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    disabled={loading}
                    sx={{
                      mt: 3,
                      mb: 2,
                      boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;",
                      // opacity: loading ? 0.5 : 1,
                    }}
                  >
                    {loading ? "Updating..." : "Update Recipe"}
                  </Button>
                </Grid>
              </Grid>
            </Box>
          )}
        </Box>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}
