import React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";

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
    value: "Gluten-Free",
    label: "Gluten-Free",
  },
  {
    value: "Dairy-Free",
    label: "Dairy-Free",
  },
  {
    value: "Egg-Free",
    label: "Egg-Free",
  },
];

export default function SelectCategory() {
  const [category, setCategory] = React.useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
  };
  return (
    <Box
      component='form'
      sx={{
        "& .MuiTextField-root": { width: "22ch" },
        "@media (max-width:420px)": {
          "& .MuiTextField-root": { width: "17ch" },
        },
      }}
      noValidate
      autoComplete='off'
    >
      <Grid item xs={6} sm={6}>
        <TextField
          id='outlined-select-category'
          select
          label='Category'
          color='secondary'
          required
          value={category}
          onChange={handleChange}
        >
          {categoryType.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
    </Box>
  );
}
