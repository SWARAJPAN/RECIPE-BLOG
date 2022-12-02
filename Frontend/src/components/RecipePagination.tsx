import React from "react";
import { Box, Pagination } from "@mui/material";
interface props {
  pages: number;
  setSkip: any;
  limit: number;
  skip: number;
}

export default function RecipePagination({
  limit,
  pages,
  skip,
  setSkip,
}: props) {
  return (
    <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
      <Pagination
        count={pages}
        page={skip / limit + 1}
        onChange={(e, values) => {
          setSkip(limit * (values - 1));
          console.log(values, "values");
        }}
        color='primary'
      />
    </Box>
  );
}
