import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Grid, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

import Navbar from "../components/Navbar";
import SignUp from "./SignUp";
import Album from "./Album";

export default function SimpleContainer() {
  const location = useLocation();

  console.log(location.state, "location");
  return (
    <React.Fragment>
      <Album />
      {/* <Navbar /> */}
      {/* <SignUp /> */}
    </React.Fragment>
  );
}
