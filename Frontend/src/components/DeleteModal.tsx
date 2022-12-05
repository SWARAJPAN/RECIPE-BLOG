import { Button, Modal, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { API } from "../lib/axios";

export default function DeleteModal(props: any) {
  console.log(props);
  //delete a recipe
  const deleteRecipe = async (id: any) => {
    {
      try {
        API.delete(`recipes/${props.recipeId}`).then((res) => {
          console.log("del func", res.data);

          if (res.status === 200) {
            props.onClose();

            window.location.reload();
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  };

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
            mt={2}
            sx={{
              textAlign: "center",
            }}
          >
            Are you sure you want to delete this recipe?
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              mt: 4,
            }}
          >
            <Button variant='contained' onClick={deleteRecipe}>
              Delete
            </Button>
            <Button
              variant='outlined'
              color='secondary'
              onClick={props.onClose}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}
function useState(arg0: boolean): [any, any] {
  throw new Error("Function not implemented.");
}
