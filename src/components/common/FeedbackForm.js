import { Box, Typography, Rating, TextField, Button } from "@mui/material";
import React, { useState } from "react";
import colors from "../../assets/Style/colors";

const FeedbackForm = ({attractionId, onSubmit}) => {
  const [value, setValue] = useState();
  return (
    <Box
      sx={{
        backgroundColor: "#F0F0F0",
        p: 2,
        boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.2)",
        borderRadius: 2,
      }}
    >
      <form>
        <Box>
          <Typography>Rating</Typography>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
          />
        </Box>
        <Box sx={{ mt: 1 }}>
          <TextField
            id="outlined-multiline-flexible"
            label="Your Review"
            multiline
            maxRows={4}
            fullWidth
            sx={{ color: colors.grey }}
          />
          <Box sx={{ mt: 1, display: "flex", justifyContent: "flex-end" }}>
            <Button
              size="small"
              color="primary"
              variant="outlined"
              sx={{ backgroundColor: colors.secondary }}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default FeedbackForm;
