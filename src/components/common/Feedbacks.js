import { Box, Typography, Rating } from "@mui/material";
import React from "react";

const Feedbacks = ({ rater, rating, review }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#F0F0F0",
        p: 2,
        boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.2)",
        borderRadius: 2,
        mt: 2,
      }}
    >
      <Box>
        <Typography>{rater}</Typography>
        <Rating name="read-only" value={rating} readOnly />
        <Typography>{review}</Typography>
      </Box>
    </Box>
  );
};

export default Feedbacks;
