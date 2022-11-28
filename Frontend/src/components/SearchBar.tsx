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
// import { Search } from "@mui/icons-material";
import { borderRadius } from "@mui/system";
import { AccountCircle } from "@mui/icons-material";

// const Search = styled("div")(() => ({
//   position: "relative",

//   justifyContent: "center",
//   alignContent: "center",
//   margin: "auto",
//   width: "50%",
//   "@media (max-width:420px)": {
//     width: "100%",
//   },
// }));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
}));

export default function SearchBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Toolbar>
        <TextField
          id='input-with-icon-textfield'
          placeholder='Search...'
          color='secondary'
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
      </Toolbar>
    </Box>
  );
}
