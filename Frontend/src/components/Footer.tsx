import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import CameraIcon from "@mui/icons-material/PhotoCamera";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { red, blue } from "@mui/material/colors";
import Divider from "@mui/material/Divider";
import { Player } from "@lottiefiles/react-lottie-player";
import FooterBg from "../assets/footer.json";

function Copyright(props: any) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}
    >
      {"Copyright © "}
      Recipe Blog {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Footer() {
  return (
    <>
      {/* Footer */}

      <Box sx={{ bgcolor: "background.paper", mt: 5 }} component='footer'>
        <Divider
          sx={{
            mt: 2,
            mb: 4,
            justifyContent: "center",
            display: "flex",
          }}
        />
        <Player
          autoplay
          loop
          src={FooterBg}
          style={{ overflow: "clip", height: "200px", widows: "100%" }}
        />

        <Typography
          variant='subtitle1'
          align='center'
          color='text.secondary'
          component='p'
        >
          Made with ❤️ by Swaraj 🍕
        </Typography>
        <Copyright />
      </Box>
    </>
  );
}
