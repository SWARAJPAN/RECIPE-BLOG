import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
import { API } from "../lib/axios";

export default function SearchBar(props: any) {
  //get props from Album.tsx and pass it to SearchBar.tsx

  return (
    <Box
      sx={{
        flexGrow: 1,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextField
          id='input-with-icon-textfield'
          placeholder='Search...'
          color='secondary'
          onChange={(e) => props.setSearch(e.target.value)}
          // onChange={props.onChange}
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
            width: "60%",
            "@media (max-width:420px)": {
              width: "90%",
            },
          }}
        />
      </Toolbar>
    </Box>
  );
}
