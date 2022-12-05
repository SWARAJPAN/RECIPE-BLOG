import { Visibility, VisibilityOff } from "@mui/icons-material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { red } from "@mui/material/colors";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import * as React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import Footer from "../components/Footer";
import { API } from "../lib/axios";
// import Lottie from "react-lottie";
// import Lottie from "react-lottie";
import { AvatarGroup, IconButton, InputAdornment } from "@mui/material";

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
      width: "50vw",
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
  firstName: yup
    .string()
    .min(3, "Must be at least 8 characters")
    .max(20, "Must be less  than 20 characters")
    .required("Name is required")
    .matches(/^[a-zA-Z]+$/, "Cannot contain special characters or numbers")
    .trim("Cannot contain spaces"),
  lastName: yup
    .string()
    .min(3, "Must be at least 8 characters")
    .max(20, "Must be less  than 20 characters")
    .required("Name is required")
    .matches(/^[a-zA-Z]+$/, "Cannot contain special characters or numbers")
    .trim("Cannot contain spaces"),
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
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: Values) => {
      CreateUser(values);
      // alert(JSON.stringify(values, null, 2));
    },
  });

  const CreateUser = (data: any) => {
    {
      console.log(data, "data");
      try {
        API.post("users/signup", data).then((res) => {
          console.log(res.data);
          // navigate("/login");
          // window.location.href = "/login";

          if (res.status === 201) {
            navigate("/signin");
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 6,
            gap: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <AvatarGroup max={2}>
            <Avatar
              sx={{
                bgcolor: "primary.main",
                transform: "scale(1.2)",
                animation: "lock 0.5s ",
                " @keyframes lock": {
                  "0%": {
                    transform: "translateX(50%)  ",
                  },

                  "100%": {
                    transform: "translateX(0%) scale(1.2)",
                  },
                },
              }}
            >
              <LockOutlinedIcon />
            </Avatar>

            <Avatar
              sx={{
                bgcolor: "secondary.main",
                transform: "scale(0.9)",
                animation: "lockOpen 0.5s ",
                " @keyframes lockOpen": {
                  "0%": {
                    transform: "scale(1)  ",
                  },

                  "100%": {
                    transform: " scale(0.9)",
                  },
                },
              }}
            >
              <LockOpenIcon />
            </Avatar>
          </AvatarGroup>

          <Typography
            component='h1'
            variant='h2'
            // sx={{
            //   display: { xs: "none", md: "flex" },
            //   mr: 1,
            // }}
          >
            Sign up to Publish!
          </Typography>
          <Typography component='h1' variant='subtitle1'>
            Share your amazing recipes with everyone to showcase you culture
            through food!
          </Typography>
          <Box
            // component='form'
            // noValidate
            // onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2} rowGap={1}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant='standard'
                    color='secondary'
                    autoComplete='given-name'
                    name='firstName'
                    fullWidth
                    id='firstName'
                    label='First Name'
                    autoFocus
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.firstName &&
                      Boolean(formik.errors.firstName)
                    }
                    helperText={
                      formik.touched.firstName && formik.errors.firstName
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    variant='standard'
                    color='secondary'
                    fullWidth
                    id='lastName'
                    label='Last Name'
                    name='lastName'
                    autoComplete='family-name'
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.lastName && Boolean(formik.errors.lastName)
                    }
                    helperText={
                      formik.touched.lastName && formik.errors.lastName
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant='standard'
                    color='secondary'
                    fullWidth
                    id='email'
                    label='Email Address'
                    name='email'
                    autoComplete='email'
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant='standard'
                    color='secondary'
                    fullWidth
                    name='password'
                    label='Password'
                    type={showPassword ? "text" : "password"}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position='end'>
                          <IconButton
                            aria-label='toggle password visibility'
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    id='password'
                    autoComplete='new-password'
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                  />
                </Grid>
              </Grid>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{
                  mt: 4,
                  mb: 6,
                  boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;",
                }}
              >
                Sign Up!
              </Button>
              <Grid container justifyContent='center'>
                <Grid item>
                  <Typography variant='subtitle1'>
                    Already have an account?{" "}
                    <NavLink to='/signin'>
                      <Link variant='body1' fontWeight={"bold"}>
                        Login.
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
