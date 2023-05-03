import { Box, Typography, Rating, TextField, Button } from "@mui/material";
import React from "react";

const Feedbacks = () => {
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
        <Typography>User Name</Typography>
        <Rating name="read-only" value={5} readOnly />
        <Typography>Review</Typography>
      </Box>
    </Box>
  );
};

export default Feedbacks;
