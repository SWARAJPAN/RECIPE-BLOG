import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import Navbar from "../components/Navbar";

export default function SimpleContainer() {
  return (
    <React.Fragment>
      <Navbar />
      <Typography component='div'>HELLO</Typography>
    </React.Fragment>
  );
}
