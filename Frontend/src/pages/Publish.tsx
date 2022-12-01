import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { red, blue } from "@mui/material/colors";

import Footer from "../components/Footer";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { Player } from "@lottiefiles/react-lottie-player";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import Register from "../assets/publish.json";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import { Formik, Field, Form, FormikHelpers, useFormik } from "formik";
import { BoltOutlined, DisabledByDefault } from "@mui/icons-material";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";

import { API } from "../lib/axios";
import { MenuItem } from "@mui/material";

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
    value: "1hr+",
    label: "1hr+",
  },
  {
    value: "2hr+",
    label: "2hr+",
  },
];

const validationSchema = yup.object({
  name: yup
    .string()
    .min(3, "Must be at least 3 characters")
    .max(20, "Must be less  than 20 characters")
    .required("Name is required")
    .matches(/^[a-zA-Z ]+$/, "Cannot contain special characters or numbers")
    .trim("Cannot contain spaces"),
  description: yup
    .string()
    .required("Description is required")
    .min(20, "Must be at least 20 characters")
    .trim("Cannot contain spaces"),
  ethnicity: yup
    .string()
    .min(3, "Must be at least 3 characters")
    .max(20, "Must be less  than 20 characters")
    .required("Plsease put your ethnicity")
    .matches(/^[a-zA-Z ]+$/, "Cannot contain special characters or numbers")
    .trim("Cannot contain spaces"),
  ingredients: yup
    .string()
    .min(10, "Must be at least 10 characters")
    .matches(/^[a-zA-Z ,0-9]+$/, "Cannot contain special characters")
    .required("Plsease provide an ingredients")
    .trim("Cannot contain spaces"),
  instruction: yup
    .string()
    .min(20, "Must be at least 20 characters")
    .required("Plsease provide an instruction")
    .trim("Cannot contain spaces"),
  category: yup.string().required("Please select a category"),
  cookTime: yup.string().required("Required"),
  uploadImg: yup.string().required("Please select an image"),
});

interface Values {
  name: string;
  description: string;
  ingredients: string;
  ethnicity: string;
  instruction: string;
  category: string;
  uploadImg: string;
  cookTime: string;
}

const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return JSON.parse(token);
  } else {
    return null;
  }
};

const userId: string = JSON.parse(localStorage.getItem("user") || "{}");
console.log(userId);

export default function Publish() {
  const [login, setLogin] = React.useState(getTokenFromLocalStorage);
  const [image, setImage] = React.useState(null);
  const [showRecipeId, setShowRecipeId] = React.useState<any>();

  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.state, "id");

  const params = useParams();
  console.log(params.id);

  React.useEffect(() => {
    API.get(`/recipes`).then((res) => {
      setShowRecipeId(res.data.recipe);
    });
  }, []);
  console.log(showRecipeId, "show recipe ID");

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      ingredients: "",
      ethnicity: "",
      instruction: "",
      category: "",
      uploadImg: "",
      cookTime: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: Values) => {
      PublishRecipe(values);
    },
  });

  const PublishRecipe = (data: any) => {
    {
      try {
        API.post("recipes", { ...data, uploadImg: image }).then((res) => {
          console.log(res);

          if (res.status === 201) {
            navigate(`/user/publishes/${userId}`);
            window.location.reload();
            console.log(res.data, "published");
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

  //convert image to base64
  const getBase64 = (file: any, cb: any) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      cb(reader.result);
    };
    reader.onerror = function (error) {
      console.log("Error: ", error);
    };
  };

  //upload image
  const uploadImage = (e: any) => {
    let file = e.target.files[0];
    getBase64(file, (result: any) => {
      setImage(result);
    });
  };

  return (
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
            <HistoryEduIcon />
          </Avatar>
          <Typography
            component='h2'
            variant='h2'
            sx={{
              display: "flex",

              width: "80vw",
            }}
          >
            Submit your recipe!
          </Typography>
          <Typography component='h1' variant='subtitle1'>
            Share your amazing recipes with hundreds of home cooks!
          </Typography>
          <Box sx={{ mt: 3 }}>
            <form onSubmit={formik.handleSubmit}>
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
                    variant='standard'
                    // autoFocus
                    fullWidth
                    color='secondary'
                    name='name'
                    id='name'
                    label='Recipe Name'
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
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
                    value={formik.values.cookTime}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.cookTime && Boolean(formik.errors.cookTime)
                    }
                    helperText={
                      formik.touched.cookTime && formik.errors.cookTime
                    }
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
                    id='outlined-select-category'
                    select
                    name='category'
                    label='Category'
                    color='secondary'
                    variant='standard'
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.category && Boolean(formik.errors.category)
                    }
                    helperText={
                      formik.touched.category && formik.errors.category
                    }
                  >
                    {categoryType.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={6} sm={6}>
                  <TextField
                    variant='standard'
                    fullWidth
                    color='secondary'
                    id='ethnicity'
                    name='ethnicity'
                    label='Ethnicity'
                    placeholder='e.g. Assamese, Nepali, Garo, etc.'
                    value={formik.values.ethnicity}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.ethnicity &&
                      Boolean(formik.errors.ethnicity)
                    }
                    helperText={
                      formik.touched.ethnicity && formik.errors.ethnicity
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant='standard'
                    fullWidth
                    color='secondary'
                    id='ingredients'
                    name='ingredients'
                    label='Ingredients'
                    placeholder='Enter ingredients separated by commas'
                    multiline
                    value={formik.values.ingredients}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.ingredients &&
                      Boolean(formik.errors.ingredients)
                    }
                    helperText={
                      formik.touched.ingredients && formik.errors.ingredients
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant='standard'
                    fullWidth
                    color='secondary'
                    id='description'
                    name='description'
                    label='Description'
                    placeholder="Tell us about your recipe. What's the story behind it?"
                    multiline
                    minRows={2}
                    maxRows={3}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.description &&
                      Boolean(formik.errors.description)
                    }
                    helperText={
                      formik.touched.description && formik.errors.description
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant='standard'
                    fullWidth
                    color='secondary'
                    id='instruction'
                    name='instruction'
                    label='Instruction'
                    placeholder="Don't forget to add the steps!"
                    multiline
                    minRows={4}
                    maxRows={6}
                    value={formik.values.instruction}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.instruction &&
                      Boolean(formik.errors.instruction)
                    }
                    helperText={
                      formik.touched.instruction && formik.errors.instruction
                    }
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
                      mt: 1,
                      mb: 3,

                      "&:hover": {
                        borderColor: "secondary.main",
                        backgroundColor: "secondary.light",

                        color: "white",
                      },
                    }}
                  >
                    <PhotoCamera />
                    <Typography>Upload Image</Typography>
                    <input
                      hidden
                      accept='image/png, image/jpeg, image/jpg, image/gif,'
                      multiple
                      type='file'
                      value={formik.values.uploadImg}
                      onChange={uploadImage}
                      style={{
                        display: "none",
                      }}
                    />
                  </Button>
                </Grid>
              </Grid>
              {login ? (
                <>
                  <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    sx={{
                      mt: 3,
                      mb: 2,
                      boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;",
                    }}
                  >
                    Publish!
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    type='submit'
                    fullWidth
                    disabled
                    variant='contained'
                    // color='primary'
                    sx={{ mt: 3, mb: 2 }}
                  >
                    You need to Sign-In to Publish
                  </Button>
                  <Grid container justifyContent='center'>
                    <Grid item>
                      <Typography variant='subtitle1' sx={{ mt: 3 }}>
                        Don't have an account?{" "}
                        <NavLink to='/signup'>
                          <Link variant='body1' fontWeight={"bold"}>
                            Sign-up.
                          </Link>
                        </NavLink>
                      </Typography>
                    </Grid>
                  </Grid>
                </>
              )}
            </form>
          </Box>
        </Box>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}
