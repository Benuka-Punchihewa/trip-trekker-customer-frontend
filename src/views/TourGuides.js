import React from "react";

import { Typography, Box, CardMedia } from "@mui/material";
import guideImage from "../assets/Images/guide1.png";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import SearchBar from "../components/common/SearchBar";
import MediaCard from "../components/common/MediaCard";
import { useNavigate } from "react-router-dom";

//images
import per1 from "../assets/Images/per1.png";

const TourGuides = () => {
  return (
    <React.Fragment>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ position: "relative" }}>
          <CardMedia component="img" image={guideImage} />
          <Box
            sx={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "80%",
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
            <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
              Tour Guides
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
            <Grid container spacing={4} style={{ maxWidth: 1300 }}>
              <Grid item xs={3}>
                <MediaCard image={per1} name={"Name"} />
              </Grid>
              <Grid item xs={3}>
                <MediaCard image={per1} name={"Name"} />
              </Grid>
              <Grid item xs={3}>
                <MediaCard image={per1} name={"Name"} />
              </Grid>
              <Grid item xs={3}>
                <MediaCard image={per1} name={"Name"} />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default TourGuides;
