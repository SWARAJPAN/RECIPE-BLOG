import React from "react";
import { IconButton, Modal, Typography } from "@mui/material";
import Box from "@mui/material/Box";

import CloseIcon from "@mui/icons-material/Close";
import { NavLink, useNavigate } from "react-router-dom";

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
          }}
        >
          <Typography
            id='modal-modal-title'
            variant='body1'
            component='h2'
            sx={{ fontWeight: "bold" }}
          >
            Uh-oh, Looks like you need to login first!
          </Typography>
          <Typography
            id='modal-modal-description'
            variant='subtitle1'
            sx={{ mt: 2 }}
          >
            <span>
              {" "}
              <NavLink
                to='/signup'
                style={{
                  textDecoration: "none",
                  color: "#FF5757",
                }}
              >
                Sign-In
              </NavLink>
            </span>{" "}
            to bookmark this recipe.
          </Typography>
        </Box>
      </Box>
    </Modal>
  );
}
function useState(arg0: boolean): [any, any] {
  throw new Error("Function not implemented.");
}
