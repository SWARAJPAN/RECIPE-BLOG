import React from "react";
import { Box, Pagination } from "@mui/material";

export default function RecipePagination() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
      <Pagination count={10} color='primary' />
    </Box>
  );
}
