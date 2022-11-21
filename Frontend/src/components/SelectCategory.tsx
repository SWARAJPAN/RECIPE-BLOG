import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import * as yup from "yup";
import { Formik, Field, Form, FormikHelpers, useFormik } from "formik";

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
];

const validationSchema = yup.object({
  category: yup.string().required("Required"),
});

interface Values {
  category: string;
}

export default function SelectCategory() {
  const formik = useFormik({
    initialValues: {
      category: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values: Values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const [category, setCategory] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
  };
  return (
    <Box
      component='form'
      sx={{
        "& .MuiTextField-root": { width: "29.9ch" },
        "@media (max-width:420px)": {
          "& .MuiTextField-root": { width: "17ch" },
        },
      }}
      noValidate
      autoComplete='off'
    >
      <form onSubmit={formik.handleSubmit}>
        <Grid item xs={6} sm={6}>
          <TextField
            id='outlined-select-category'
            select
            label='Category'
            color='secondary'
            value={category}
            onChange={handleChange}
            error={formik.touched.category && Boolean(formik.errors.category)}
            helperText={formik.touched.category && formik.errors.category}
            variant='standard'
          >
            {categoryType.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </form>
    </Box>
  );
}
