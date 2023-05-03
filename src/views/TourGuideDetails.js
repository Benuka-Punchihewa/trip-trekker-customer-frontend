import React, { useState } from "react";
import {
  Typography,
  Box,
  Card,
  CardMedia,
  Grid,
  Button,
  TextField,
  CircularProgress,
  Input,
} from "@mui/material";
import PortfolioCard from "../components/common/PortfolioCard";
import FeedbackForm from "../components/common/FeedbackForm";
import Feedbacks from "../components/common/Feedbacks";
import Popup from "../components/common/Popup";
import colors from "../assets/Style/colors";

//image
import personImage from "../assets/Images/per3.png";
import portImg1 from "../assets/Images/po1.jpg";
import portImg2 from "../assets/Images/po2.jpg";

const TourGuideDetails = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handlePopupClose = () => {
    setShowPopup(false);
    setSelectedFile(null);
  };

  const handleClear = () => {
    setSelectedFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <React.Fragment>
      <Box sx={{ mt: 10, px: 12 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
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
          <Grid item xs={8}>
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
            <Grid item xs={8} sx={{ mb: 2 }}>
              <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                Guide Portfolio
              </Typography>
            </Grid>
            <Grid item xs={4} sx={{ textAlign: "right" }}>
              <Button
                variant="contained"
                size="large"
                onClick={() => setShowPopup(true)}
              >
                Add New
              </Button>
            </Grid>
            <Grid item xs={6}>
              <PortfolioCard image={portImg1} />
            </Grid>
            <Grid item xs={6}>
              <PortfolioCard image={portImg2} />
            </Grid>
          </Grid>
        </Box>
        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid item xs={8} sx={{ mb: 2 }}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Ratings & Reviews
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <FeedbackForm />
            <Feedbacks />
            <Feedbacks />
            <Feedbacks />
          </Grid>
          <Grid item xs={6}>
            Random Attractions
          </Grid>
        </Grid>
      </Box>

      {/* pop up */}

      <Popup
        title="Create new Post"
        width={800}
        show={showPopup}
        onClose={handlePopupClose}
      >
        <Box sx={{ mb: 2 }}>
          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ mb: 2 }}>
                <Input
                  fullWidth
                  type="file"
                  onChange={(e) => setSelectedFile(e.target.files[0])}
                />
              </Box>
              <Box>
                {selectedFile && (
                  <CardMedia
                    component="img"
                    image={URL.createObjectURL(selectedFile)}
                    sx={{ my: 2, maxWidth: "100%" }}
                  />
                )}
              </Box>

              <TextField
                name="description"
                variant="filled"
                label="Description"
                fullWidth
                multiline
                maxRows={4}
                // value={inputs.name}
                // onChange={(e) =>
                //   setInputs({
                //     ...inputs,
                //     name: e.target.value,
                //   })
                // }
              />
              {errors["name"] && (
                <Typography color="error">{errors["name"]}</Typography>
              )}
            </Box>

            <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="reset"
                variant="contained"
                onClick={handleClear}
                sx={{ py: 2, px: 5, mr: 2, backgroundColor: colors.grey }}
              >
                Clear
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ py: 2, px: 5 }}
                disabled={loading}
              >
                {loading ? <CircularProgress color="secondary" /> : "Save"}
              </Button>
            </Box>
          </form>
        </Box>
      </Popup>
    </React.Fragment>
  );
};

export default TourGuideDetails;
