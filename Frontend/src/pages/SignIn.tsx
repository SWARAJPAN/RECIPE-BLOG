import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { AvatarGroup } from "@mui/material";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import * as yup from "yup";
import { Formik, Field, Form, FormikHelpers, useFormik } from "formik";
import { red } from "@mui/material/colors";
import { API } from "../lib/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF5757",
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
      fontWeight: 600,
      width: "100vw",
      textAlign: "center",
      justifyContent: "center",
      mb: 2,
      "@media (max-width:420px)": {
        fontSize: "2.4rem",
      },
    },

    subtitle1: { mt: 2, marginBottom: "1rem", color: "#7F8284" },

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
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(8, "Password should be of minimum 8 characters length")
    .required("Password is required"),
});

interface Values {
  email: string;
  password: string;
}

export default function SignIn() {
  // const [token, setToken] = React.useState("");

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: Values) => {
      LoginUser(values);

      // alert(JSON.stringify(values, null, 2));
    },
  });

  const LoginUser = (data: any) => {
    {
      // console.log(data, "data");
      try {
        API.post("users/login", data).then((res) => {
          console.log(res.data.token);
          // setToken(res.data.token);

          if (res.status == 200) {
            localStorage.setItem(
              "token",
              JSON.stringify({ token: res.data.token })
            );
            window.location.reload();
            navigate("/publish");
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

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
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 6,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
          }}
        >
          <AvatarGroup max={2}>
            <Avatar sx={{ bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Avatar sx={{ bgcolor: "primary.main", zIndex: "1" }}>
              <LockOpenIcon />
            </Avatar>
          </AvatarGroup>

          <Typography component='h1' variant='h2' sx={{ width: "40vw" }}>
            Nice to see you!
          </Typography>
          <Typography component='h1' variant='subtitle1'>
            Log in to post your freshly baked recipes.
          </Typography>
          <Box
            // component='form'
            // onSubmit={handleSubmit}
            // noValidate
            sx={{ mt: 1 }}
          >
            <form onSubmit={formik.handleSubmit}>
              <TextField
                variant='standard'
                color='secondary'
                margin='normal'
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoComplete='email'
                autoFocus
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                variant='standard'
                color='secondary'
                margin='normal'
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />

              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{
                  mt: 3,
                  mb: 6,
                  boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;",
                }}
              >
                Sign In
              </Button>
              <Grid container justifyContent='center'>
                <Grid item>
                  <Typography variant='subtitle1'>
                    Don't have an account?{" "}
                    <NavLink to='/signup'>
                      <Link fontWeight={"bold"} variant='body1'>
                        Sign Up
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
