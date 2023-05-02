import React from "react";
import { Typography, Box, Card, CardMedia, Grid, Button } from "@mui/material";
import PortfolioCard from "../components/common/PortfolioCard";

//image
import personImage from "../assets/Images/per3.png";
import portImg1 from "../assets/Images/po1.jpg";
import portImg2 from "../assets/Images/po2.jpg";
import FeedbackForm from "../components/common/FeedbackForm";
import Feedbacks from "../components/common/Feedbacks";

const TourGuideDetails = () => {
  return (
    <React.Fragment>
      <Box sx={{ mt: 4, px: 10 }}>
        <Grid container spacing={2}>
          <Grid Item xs={3}>
            <Card sx={{ width: "50" }}>
              <CardMedia
                component="img"
                alt="person"
                height="200"
                boxshadow="0px 8px 25px rgba(0, 0, 0, 0.15)"
                image={personImage}
              />
            </Card>
          </Grid>
          <Grid Item xs={8} sx={{ px: 5 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Guide Name
            </Typography>
            <Typography>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel
              egestas dolor, nec dignissim metus. Donec augue elit, rhoncus ac
              sodales id, porttitor vitae est. Donec laoreet rutrum
            </Typography>
          </Grid>
        </Grid>
        <Box sx={{ mt: 4 }}>
          <Grid container spacing={2}>
            <Grid Item xs={8} sx={{ mb: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Guide Portfolio
              </Typography>
            </Grid>
            <Grid Item xs={4} sx={{ textAlign: "right" }}>
              <Button variant="contained" size="large">
                Add New
              </Button>
            </Grid>
            <Grid Item xs={6}>
              <PortfolioCard image={portImg1} />
            </Grid>
            <Grid Item xs={6}>
              <PortfolioCard image={portImg2} />
            </Grid>
          </Grid>
        </Box>
        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid Item xs={8} sx={{ mb: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Ratings & Reviews
            </Typography>
          </Grid>
          <Grid Item xs={6}>
            <FeedbackForm />
            <Feedbacks />
            <Feedbacks />
            <Feedbacks />
          </Grid>
          <Grid Item xs={6}>
            Random Attractions
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};

export default TourGuideDetails;
