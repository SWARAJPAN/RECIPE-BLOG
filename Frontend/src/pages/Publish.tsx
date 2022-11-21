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
import { NavLink } from "react-router-dom";
import * as yup from "yup";
import { red, blue } from "@mui/material/colors";
import SelectCategory from "../components/SelectCategory";
import Footer from "../components/Footer";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Formik, Field, Form, FormikHelpers, useFormik } from "formik";
import { BoltOutlined } from "@mui/icons-material";
import Divider from "@mui/material/Divider";
import Chip from "@mui/material/Chip";

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
      // backgroundColor: "#676A6B",
      // "&:focus": {
      //   backgroundColor: "#676A6B",
      // },
    },
  },
});

const validationSchema = yup.object({
  recipeName: yup
    .string()
    .min(3, "Must be at least 3 characters")
    .max(20, "Must be less  than 20 characters")
    .required("Name is required")
    .matches(/^[a-zA-Z ]+$/, "Cannot contain special characters or numbers")
    .trim("Cannot contain spaces"),
  description: yup
    .string()
    .min(20, "Must be at least 20 characters")
    .max(100, "Must be less  than 100 characters")
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
});

interface Values {
  recipeName: string;
  description: string;
  ingredients: string;
  ethnicity: string;
  instruction: string;
}

export default function Publish() {
  const formik = useFormik({
    initialValues: {
      recipeName: "",
      description: "",
      ingredients: "",
      ethnicity: "",
      instruction: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: Values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get("email"),
  //     password: data.get("password"),
  //   });
  // };

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='sm'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 6,
            // width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Avatar sx={{ m: 1, mb: 2, bgcolor: "primary.main" }}>
            <HistoryEduIcon />
          </Avatar>
          <Typography
            component='h1'
            variant='h2'
            sx={{
              display: "flex",
              //   margin: "auto",
              width: "80vw",
              //   mr: 1,
            }}
          >
            Submit your recipe!
          </Typography>
          <Typography component='h1' variant='subtitle1'>
            Share your amazing recipes with hundreds of home cooks!
          </Typography>
          <Box
            // component='form'
            // noValidate
            // onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2} rowGap={1}>
                <Grid item xs={12}>
                  <TextField
                    variant='standard'
                    autoFocus
                    fullWidth
                    color='secondary'
                    name='recipeName'
                    id='recipeName'
                    label='Recipe Name'
                    value={formik.values.recipeName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.recipeName &&
                      Boolean(formik.errors.recipeName)
                    }
                    helperText={
                      formik.touched.recipeName && formik.errors.recipeName
                    }
                  />
                </Grid>
                <Grid item xs={6} sm={6}>
                  <SelectCategory />
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
                    placeholder='Upload Image'
                  >
                    <PhotoCamera /> <Typography>Upload Image</Typography>
                    <input
                      hidden
                      accept='image/png, image/jpeg, image/jpg, image/gif,'
                      multiple
                      type='file'
                      style={{ display: "none" }}
                    />
                  </Button>
                </Grid>
              </Grid>

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
            </form>
          </Box>
        </Box>
      </Container>
      <Footer />
    </ThemeProvider>
  );
}
