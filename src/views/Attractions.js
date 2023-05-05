import React from "react";
import { Typography, Box, CardMedia } from "@mui/material";
import Attraction1 from "../assets/Images/Attraction1.png";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import SearchBar from "../components/common/SearchBar";
import MediaCard from "../components/common/MediaCard";
import { useNavigate } from "react-router-dom";

//images
import AttractionIm2 from "../assets/Images/AttractionIm2.png";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Attractions = () => {
  const navigate = useNavigate();
  const attractionId = () => {
    navigate("/attractiondetails");
  };
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ position: "relative" }}>
        <CardMedia component="img" image={Attraction1} />
        <Box
          sx={{
            position: "absolute",
            top: "100%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60%",
          }}
        >
          <SearchBar />
        </Box>
      </Box>
      <Box
        sx={{
          mt: 10,
          px: 10,
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
            Attractions
          </Typography>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Grid container spacing={2} style={{ maxWidth: 1300 }}>
            <Grid item xs={4} onClick={attractionId}>
              <MediaCard image={AttractionIm2} name={"Name"} location={"Location"} />
            </Grid>
            <Grid item xs={4} onClick={attractionId}>
              <MediaCard image={AttractionIm2} name={"Name"} location={"Location"} />
            </Grid>
            <Grid item xs={4} onClick={attractionId}>
              <MediaCard image={AttractionIm2} name={"Name"} location={"Location"} />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Attractions;
