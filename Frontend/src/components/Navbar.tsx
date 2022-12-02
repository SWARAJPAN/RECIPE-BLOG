import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import RamenDiningIcon from "@mui/icons-material/RamenDining";
import AccountMenu from "./AccountMenu";
import PublicMenu from "./PublicMenu";
import { useState } from "react";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { createTheme } from "@mui/material/styles";
import { orange, red } from "@mui/material/colors";
import { Link } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import Logo from "../assets/blob.svg";

// const token: string = JSON.parse(localStorage.getItem("token"));

// console.log(token, "token from nav");
// console.log("hello");

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF914D",
      dark: "CB692D",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: ["Righteous"].join(","),

    subtitle1: { fontSize: 12 },

    body1: { fontSize: 16 },
    button: {
      fontSize: 20,
      fontWeight: 500,
      textTransform: "none",
      color: "#fff",
      fontFamily: "arial",
      margin: "0 10px",

      "&:hover": {
        backgroundColor: "none",
      },
      "&:focus": {
        backgroundColor: "#CB692D",
      },
    },
  },
});

const pages = [
  {
    id: 1,
    title: "Explore",
    path: "/",
  },
  {
    id: 2,
    title: "Publish",
    path: "/publish",
  },

  {
    id: 3,
    title: "Sign-In",
    path: "/signin",
  },
];

const getTokenFromLocalStorage = () => {
  const token = localStorage.getItem("token");
  if (token) {
    return JSON.parse(token);
  } else {
    return null;
  }
};

export default function ResponsiveAppBar() {
  const [login, setLogin] = useState(getTokenFromLocalStorage);

  console.log(login, "token from nav");

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position='static'
        sx={{
          borderRadius: 4,
          height: 120,
          justifyContent: "center",
          padding: "0.5rem",
          "@media (max-width:420px)": {
            borderRadius: 1,
            height: 80,
          },
        }}
      >
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <Box
              sx={{
                marginRight: 2,
                display: { xs: "block", md: "flex" },
              }}
            >
              <PublicMenu />
            </Box>
            <RamenDiningIcon
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,

                fontSize: 50,
              }}
            />

            <Typography
              variant='h4'
              noWrap
              component='a'
              sx={{
                display: { xs: "flex", md: "flex" },
                fontWeight: 500,
                color: "inherit",
                // textDecoration: "none",
                justifyContent: "space-between",
                alignContent: "center",
                margin: "auto",
                cursor: "pointer",
                "@media (max-width:420px)": {
                  fontSize: 25,
                },
              }}
              style={{ textDecoration: "none" }}
            >
              Recipe Blog
            </Typography>
            <Box
              sx={{
                flexGrow: 1,

                justifyContent: "end",
                display: { xs: "none", md: "flex" },
              }}
            >
              {pages.map((page) => (
                <Link
                  to={`${page.path}`}
                  style={{ textDecoration: "none", color: "#ffff" }}
                  key={page.title}
                >
                  {login && page.title === "Sign-In" ? null : (
                    <Button
                      key={page.id}
                      sx={{
                        // my: 2,
                        borderRadius: 2,
                        margin: "0",
                        color: "inherit",
                        display: "block",
                        padding: "4px 20px",
                        fontFamily: "sans-serif",
                      }}
                    >
                      {page.title}
                    </Button>
                  )}
                </Link>
              ))}
            </Box>

            <Box
              sx={{
                // flexGrow: 1,
                // margin: "0",
                display: { xs: "block", md: "flex" },
              }}
            >
              {login ? <AccountMenu /> : null}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
