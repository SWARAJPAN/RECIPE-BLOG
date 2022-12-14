import { IconButton, Modal, Typography } from "@mui/material";
import Box from "@mui/material/Box";

import { Player } from "@lottiefiles/react-lottie-player";
import CloseIcon from "@mui/icons-material/Close";
import { NavLink } from "react-router-dom";
import Restrict from "../assets/restric.json";

export default function ModalDialog(props: any) {
  return (
    <Modal open={props.open} onClose={props.onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",

          margin: "auto",
          bgcolor: "background.paper",

          justifyContent: "center",
          alignItems: "center",
          borderRadius: "5px",
          boxShadow: 24,

          "@media (max-width:420px)": {
            width: "70%",
          },
        }}
      >
        <IconButton
          sx={{
            justifyContent: "flex-end",
            width: "100%",
            color: "secondary.light",
          }}
          onClick={props.onClose}
        >
          <CloseIcon />
        </IconButton>
        <Box
          sx={{
            p: 4,
            pt: 2,
            pb: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            id='modal-modal-title'
            variant='body1'
            component='h4'
            sx={{ fontWeight: "bold" }}
          >
            Uh-oh, Looks like you need to login first!
          </Typography>
          <Player
            autoplay
            loop
            src={Restrict}
            style={{
              height: "200px",
              width: "200px",
            }}
          >
            <Typography
              id='modal-modal-description'
              variant='subtitle1'
              sx={{ mb: 1, textAlign: "center", fontWeight: "bold" }}
            >
              <span>
                {" "}
                <NavLink
                  to='/signin'
                  style={{
                    textDecoration: "none",
                    color: "#FF5757",
                  }}
                >
                  Sign-In
                </NavLink>
              </span>
            </Typography>
          </Player>
          <Typography
            id='modal-modal-description'
            variant='subtitle1'
            sx={{ textAlign: "center" }}
          >
            {" "}
            Or if you don't have an account, you can
            <span>
              {" "}
              <NavLink
                to='/signup'
                style={{
                  textDecoration: "none",
                  color: "#FF5757",
                }}
              >
                Sign-Up
              </NavLink>
            </span>
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
}
function useState(arg0: boolean): [any, any] {
  throw new Error("Function not implemented.");
}
