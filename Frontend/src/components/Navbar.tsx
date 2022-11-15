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

import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { createTheme } from "@mui/material/styles";
import { orange } from "@mui/material/colors";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF914D",
      dark: orange[900],
      contrastText: "#fff",
    },
  },
  typography: {
    subtitle1: { fontSize: 12 },

    body1: { fontSize: 16 },
    button: {
      fontSize: 22,
      fontWeight: 600,
      textTransform: "none",
      color: "#fff",
      fontFamily: "arial",
      margin: "0 10px",
      padding: "10px 20px",
      borderRadius: "15px",
      backgroundColor: "#FF914D",
      "&:focus": {
        backgroundColor: orange[800],
      },
    },
  },
});

// const pages = ["Explore", "Publish", "Sign-In"];

export default function ResponsiveAppBar() {
  //   const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
  //     null
  //   );

  //   const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
  //     setAnchorElNav(event.currentTarget);
  //   };

  //   const handleCloseNavMenu = () => {
  //     setAnchorElNav(null);
  //   };

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position='static'
        sx={{
          borderRadius: 5,
          height: 120,
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <RamenDiningIcon
              sx={{
                display: { xs: "none", md: "flex" },
                mr: 1,
                pr: 2,
                fontSize: 70,
              }}
            />

            <Typography
              variant='h4'
              noWrap
              component='a'
              href='/'
              sx={{
                // mr: 2,
                // ml: auto",
                display: { xs: "none", md: "flex" },
                // fontFamily: "Sanchez",
                fontWeight: 1000,
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
                listStyle: "none",
              }}
            >
              RECIPES
            </Typography>

            <Box
              sx={{
                // marginLeft: "auto",
                // flexGrow: 1,
                // bgcolor: "background.paper",
                display: { xs: "flex", md: "none" },
              }}
            >
              {/* <AccountMenu /> */}
            </Box>
            <RamenDiningIcon
              sx={{
                display: { xs: "flex", md: "none" },
                mr: 1,
              }}
            />
            <Typography
              variant='h5'
              noWrap
              component='a'
              href=''
              sx={{
                // mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "Sanchez",
                fontWeight: 700,
                letterSpacing: ".2rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              RECIPE
            </Typography>

            <Box
              sx={{
                // flexGrow: 1,
                marginLeft: "auto",
                display: { xs: "block", md: "flex" },
              }}
            >
              <Button>
                <AccountMenu />
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
}
// export default ResponsiveAppBar;
