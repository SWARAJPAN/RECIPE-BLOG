import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Grid, Typography } from "@mui/material";
import Signup from "../pages/Signup";

import Navbar from "../components/Navbar";

export default function SimpleContainer() {
  return (
    <React.Fragment>
      <Navbar />

      <Signup />
    </React.Fragment>
  );
}
