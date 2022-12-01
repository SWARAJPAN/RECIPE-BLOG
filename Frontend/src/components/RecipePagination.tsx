import React from "react";
import { Box, Pagination } from "@mui/material";
interface props {
  pages: number;
  setSkip: any;
  limit: number;
}

export default function RecipePagination({ limit, pages, setSkip }: props) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
      <Pagination
        count={pages}
        onChange={(e, values) => {
          setSkip(limit * (values - 1));
          console.log(values, "values");
        }}
        color='primary'
        // onChange={(e, values) => console.log(values)}
      />
    </Box>
  );
}
