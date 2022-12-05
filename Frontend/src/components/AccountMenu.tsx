import React from "react";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
// import { NavLink } from "react-router-dom";
import { red } from "@mui/material/colors";

const logout = () => {
  console.log("logout");
  localStorage.removeItem("token");

  window.location.reload();
};

const userId: string = JSON.parse(localStorage.getItem("user") || "{}");
console.log(userId);

const settings = [
  {
    id: 1,
    title: "Publishes",
    path: `/user/publishes/${userId}`,
  },
  {
    id: 2,
    title: "Bookmarks",
    path: `/user/bookmarks/${userId}`,
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
        >
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
          <Link
            to={`${setting.path}`}
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
                fontFamily={"sans-serif"}
                sx={{
                  "&:hover": {
                    color: red[500],
                  },
                }}
              >
                {setting.title}
              </Typography>
            </MenuItem>
          </Link>
        ))}
      </Menu>
    </Box>
  );
}
