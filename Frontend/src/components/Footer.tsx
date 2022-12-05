import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

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
      <Box
        sx={{
          bgcolor: "background.paper",
          mt: 8,
        }}
        component='footer'
      >
        <Divider
          sx={{
            mt: 2,
            mb: 4,
            justifyContent: "center",
            display: "flex",
          }}
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
