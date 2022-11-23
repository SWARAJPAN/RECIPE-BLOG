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
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { NavLink } from "react-router-dom";
// import { NavLink } from "react-router-dom";
import { red, blue } from "@mui/material/colors";
import { useState } from "react";
import { Login } from "@mui/icons-material";

const logout = () => {
  console.log("logout");
  localStorage.removeItem("token");
  window.location.reload();
};

const settings = [
  {
    id: 1,
    title: "Publishes",
    path: "/userpublishes",
  },
  {
    id: 2,
    title: "Bookmarks",
    path: "/userbookmarks",
  },

  {
    id: 3,
    title: "Logout",
    path: "/",
    onClick: logout,
  },
];
// const [login, setLogin] = useState(
//   JSON.parse(localStorage.getItem("token") || "{}")
// );

export default function AccountMenu() {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title='Open settings'>
        <IconButton
          onClick={handleOpenUserMenu}
          sx={{
            p: 0,
            margin: "0",
            color: "white",
            alignSelf: "end",
            height: "50px",
            padding: "1rem",
          }}
          // color='inherit'
          // size='large'
        >
          {/* <Avatar src='/broken-image.jpg' /> */}
          <AccountCircleIcon />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id='menu-appbar'
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {settings.map((setting) => (
          // <Link to={`${setting.path}`}>
          <NavLink
            to={`/${setting.path}`}
            key={setting.title}
            style={{
              textDecoration: "none",
              color: "black",
            }}
          >
            <MenuItem
              key={setting.id}
              onClick={() => {
                setting.onClick && setting.onClick();
                handleCloseUserMenu();
              }}
            >
              <Typography
                textAlign='center'
                sx={{
                  "&:hover": {
                    color: red[500],
                  },
                }}
              >
                {setting.title}
              </Typography>
            </MenuItem>
          </NavLink>
        ))}
      </Menu>
    </Box>
  );
}
