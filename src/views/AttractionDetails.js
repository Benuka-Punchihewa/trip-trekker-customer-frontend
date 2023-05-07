import React, { useEffect, useState } from "react";
import { Typography, Box, Grid, CircularProgress } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { useNavigate, useParams } from "react-router-dom";
import MapGoogle from "../components/common/MapGoogle";
import MiniCard from "../components/common/MiniCard";
import M1 from "../assets/Images/M1.png";
import M2 from "../assets/Images/M2.png";
import M3 from "../assets/Images/M3.png";
import M4 from "../assets/Images/M4.png";
import M5 from "../assets/Images/M5.png";
import M6 from "../assets/Images/M6.png";
import H1 from "../assets/Images/H1.png";
import H2 from "../assets/Images/H2.png";
import H3 from "../assets/Images/H3.png";
import H4 from "../assets/Images/H4.png";
import H5 from "../assets/Images/H5.png";
import H6 from "../assets/Images/H6.png";
import FeedbackForm from "../components/common/FeedbackForm";
import Feedbacks from "../components/common/Feedbacks";
import UptoDate from "../components/common/UptoDate";
import Slider from "../components/common/Slider";
import { getAttractionById } from "../service/attraction.service";
import { getDownloadURLFromFirebaseRef } from "../utils/firebase";
import { getStrigifiedStringArrayItems } from "../utils/common";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const AttractionDetails = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [attraction, setAttraction] = useState({});

  useEffect(() => {
    let unmounted = false;
    if (!id) return;

    const fetchAndSet = async () => {
      setIsLoading(true);
      const response = await getAttractionById(id);

      if (response.success) {
        const data = response.data;
        data.previewImages = [];
        // resolove firesbase images
        const images = data?.images || [];

        for (const image of images) {
          const imageRef = image?.firebaseStorageRef;
          if (imageRef) {
            const url = await getDownloadURLFromFirebaseRef(imageRef);
            data.previewImages.push(url);
          }
        }

        if (!unmounted) {
          setAttraction(data);
          setIsLoading(false);
        }
      } else {
        console.log(response.data);
      }
    };

    fetchAndSet();

    return () => {
      unmounted = true;
    };
  }, []);

  if (isLoading)
    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          mt: 15,
        }}
      >
        <CircularProgress /> <span style={{ marginLeft: 10 }}>Loading...</span>
      </Box>
    );
  return (
    <Box sx={{ width: "100%" }}>
      <Slider images={attraction.previewImages} />

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={6} sx={{ mt: 3, ml: 8 }}>
            <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
              {attraction?.name}
            </Typography>
            <Typography>{attraction?.description}</Typography>

            <Typography variant="h5" sx={{ fontWeight: "bold", mt: 2 }}>
              Hours of Operation
            </Typography>
            <Typography>
              {new Date(attraction.openHours?.open).toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}{" "}
              to{" "}
              {new Date(attraction.openHours?.close).toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: "bold", mt: 2 }}>
              Accessibility Options
            </Typography>
            <Typography>
              {getStrigifiedStringArrayItems(attraction.accessibilityOptions)}
            </Typography>

            <Typography variant="h4" sx={{ fontWeight: "bold", mt: 2 }}>
              Location
            </Typography>
            <Box>
              <MapGoogle />
            </Box>

            <Typography variant="h4" sx={{ fontWeight: "bold", mt: 2 }}>
              Up to Date Info
            </Typography>
            <Box sx={{ mb: 5 }}>
              <UptoDate />
            </Box>
          </Grid>
          <Grid item xs={5} sx={{ mt: 3, ml: 2 }}>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
              Nearby Attractions
            </Typography>
            <Box sx={{ mb: 5 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <MiniCard image={M1} name={"Name"} />
                  </Grid>
                  <Grid item xs={4}>
                    <MiniCard image={M2} name={"Name"} />
                  </Grid>
                  <Grid item xs={4}>
                    <MiniCard image={M3} name={"Name"} />
                  </Grid>
                  <Grid item xs={4}>
                    <MiniCard image={M4} name={"Name"} />
                  </Grid>
                  <Grid item xs={4}>
                    <MiniCard image={M5} name={"Name"} />
                  </Grid>
                  <Grid item xs={4}>
                    <MiniCard image={M6} name={"Name"} />
                  </Grid>
                </Grid>
              </Box>
            </Box>

            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
              Nearby Hotels
            </Typography>
            <Box sx={{ mb: 5 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <MiniCard image={H1} name={"Name"} />
                  </Grid>
                  <Grid item xs={4}>
                    <MiniCard image={H2} name={"Name"} />
                  </Grid>
                  <Grid item xs={4}>
                    <MiniCard image={H3} name={"Name"} />
                  </Grid>
                  <Grid item xs={4}>
                    <MiniCard image={H4} name={"Name"} />
                  </Grid>
                  <Grid item xs={4}>
                    <MiniCard image={H5} name={"Name"} />
                  </Grid>
                  <Grid item xs={4}>
                    <MiniCard image={H6} name={"Name"} />
                  </Grid>
                </Grid>
              </Box>
            </Box>
            <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
              Ratings & Reviews
            </Typography>
            <Box>
              <FeedbackForm />
              <Feedbacks />
              <Feedbacks />
              <Feedbacks />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default AttractionDetails;
