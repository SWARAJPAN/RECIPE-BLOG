import React from "react";

import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";

const pages = [
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
              <Typography textAlign='center' fontFamily='sans-serif'>
                {page.title}
              </Typography>
            </MenuItem>
          </NavLink>
        ))}
      </Menu>
    </Box>
  );
}
