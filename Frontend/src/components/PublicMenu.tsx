import React from "react";

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
import Link from "react-router-dom";
import { NavLink } from "react-router-dom";

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

export default function PublicMenu() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <Box
      sx={{
        marginLeft: "auto",
        flexGrow: 1,
        // bgcolor: "background.paper",
        display: { xs: "flex", md: "none" },
      }}
    >
      <IconButton
        // size= "large",
        aria-label='account of current user'
        aria-controls='menu-appbar'
        aria-haspopup='true'
        onClick={handleOpenNavMenu}
        color='inherit'
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id='menu-appbar'
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{
          display: { xs: "block", md: "none" },
          justifyContent: "space-between",
        }}
      >
        {pages.map((page) => (
          <NavLink
            key={page.id}
            to={`${page.path}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            <MenuItem key={page.id} onClick={handleCloseNavMenu}>
              <Typography textAlign='center'>{page.title}</Typography>
            </MenuItem>
          </NavLink>
        ))}
      </Menu>
    </Box>
  );
}
