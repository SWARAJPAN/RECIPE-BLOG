import * as React from "react";
import * as ReactDOM from "react-dom";
import { Formik, Field, Form, FormikHelpers, useFormik } from "formik";
import { Grid } from "@mui/material";
import * as yup from "yup";
import { TextField, Button, Box } from "@mui/material";

const validationSchema = yup.object({
  username: yup
    .string()
    .min(3, "Must be at least 8 characters")
    .max(20, "Must be less  than 20 characters")
    .required("Username is required")
    .matches(/^[a-zA-Z0-9]+$/, "Cannot contain special characters or spaces"),
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
  username: string;
  email: string;
  password: string;
}

const Signup = () => {
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: Values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  // console.log(formik);h

  return (
    <Grid container columnSpacing={{ xs: 12, xl: 12 }} rowSpacing={1}>
      <Grid item xs={12}>
        <Box sx={{ width: "100%" }}>
          <Grid item xl={6}>
            <Box>
              {/* <h1>Signup</h1> */}
              {/* <Formik formik={formik}> */}
              <form onSubmit={formik.handleSubmit}>
                <Grid item xl={12}>
                  <Box
                    sx={{
                      width: "100vw",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <TextField
                      id='username'
                      name='username'
                      label='Username'
                      type='text'
                      value={formik.values.username}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.username &&
                        Boolean(formik.errors.username)
                      }
                      helperText={
                        formik.touched.username && formik.errors.username
                      }
                      // helperText='Must be 8-20 characters and cannot contain special characters.
                    />

                    {/* </Grid> */}

                    {/* <Grid item xs={20}> */}
                    <TextField
                      id='email'
                      name='email'
                      label='Email'
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    />
                    {/* </Grid> */}

                    {/* <Grid item xs={20}> */}
                    <TextField
                      id='password'
                      name='password'
                      label='Password'
                      type='password'
                      value={formik.values.password}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      helperText={
                        formik.touched.password && formik.errors.password
                      }
                    />
                    <Button color='primary' variant='contained' type='submit'>
                      Submit
                    </Button>
                  </Box>
                </Grid>
              </form>
            </Box>
          </Grid>
          {/* </Formik> */}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Signup;
