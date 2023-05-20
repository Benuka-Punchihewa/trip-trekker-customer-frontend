import React, { useState, useEffect, useRef } from "react";
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
  Pagination,
} from "@mui/material";
import PortfolioCard from "../components/common/PortfolioCard";
import FeedbackForm from "../components/common/FeedbackForm";
import Feedbacks from "../components/common/Feedbacks";
import Popup from "../components/common/Popup";
import colors from "../assets/Style/colors";
import { getTourGuideById } from "../service/tourGuides.service";
import { getPortfolios } from "../service/portfolio.service";
import { getDownloadURLFromFirebaseRef } from "../utils/firebase";
import { useParams } from "react-router";
import { popAlert, popDangerPrompt } from "../utils/alerts";
import { useSelector } from "react-redux";
import {
  deleteRating,
  getPaginatedTourGuideRatings,
} from "../service/rating.service";

import per1 from "../assets/Images/per1.png";

const TourGuideDetails = () => {
  const { id } = useParams();
  const scrollElmRef = useRef(null);
  const authState = useSelector((state) => state.auth);
  const [userData, setUserData] = useState("");
  const [portfolios, setPortfolios] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    orderBy: "desc",
    totalPages: 0,
  });
  const [ratingState, setRatingState] = useState({
    isLoading: false,
    page: 1,
    totalPages: 0,
    content: [],
    refresh: false,
  });
  const [ratingFormState, setRatingFormState] = useState({
    isUpdateForm: false,
    activeRating: null,
  });
  const [userState, setUserState] = useState({
    isLoading: true,
    user: {},
  });

  const handleChange = (event, value) => {
    setPagination(value);
  };

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

  const handleRatingSubmit = () => {
    setRatingState({
      ...ratingState,
      refresh: !ratingState.refresh,
    });
    setRatingFormState({
      ...ratingFormState,
      isUpdateForm: false,
      activeRating: {},
    });
  };

  const handleRatingUpdateClick = (rating) => {
    setRatingFormState({
      ...ratingFormState,
      isUpdateForm: true,
      activeRating: rating,
    });

    // scroll to view
    scrollElmRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  };

  const handleRatingDeleteClick = (rating) => {
    popDangerPrompt(
      "Warning",
      "Are you sure you want to delete this?",
      "error"
    ).then(async (res) => {
      if (res.isConfirmed) {
        const response = await deleteRating(rating._id);
        if (response.success) {
          popAlert("Success!", "Successfully deleted the rating!", "success");
          setRatingState({
            ...ratingState,
            refresh: !ratingState.refresh,
          });
        } else {
          response?.data &&
            popAlert("Error!", response?.data?.message, "error");
        }
      }
    });
  };

  const handleRatingUpdateCancel = () => {
    setRatingFormState({
      ...ratingFormState,
      isUpdateForm: false,
      activeRating: {},
    });
  };

  //get user data
  useEffect(() => {
    let unmounted = false;

    const fetchAndSet = async () => {
      const response = await getTourGuideById(id);

      if (response.success) {
        if (!unmounted) {
          setUserData(response?.data);
        }
      }
    };

    fetchAndSet();

    return () => {
      unmounted = true;
    };
  }, [id]);

  //get all portfolios
  useEffect(() => {
    let unmounted = false;

    if (!unmounted) setIsLoading(true);

    const fetchAndSet = async () => {
      const response = await getPortfolios(
        id,
        pagination.page,
        pagination.limit,
        pagination.orderBy
      );

      if (response.success) {
        if (!response.data) return;

        const iPortfolio = response?.data?.content || [];

        for (const portfolio of iPortfolio) {
          const imageRef = portfolio?.image?.firebaseStorageRef;
          if (imageRef)
            portfolio.image = await getDownloadURLFromFirebaseRef(imageRef);
        }
        setPagination({ ...pagination, totalPages: response.data.totalPages });
        setPortfolios(iPortfolio);
      } else {
        console.error(response?.data);
      }
      if (!unmounted) setIsLoading(false);
    };

    fetchAndSet();

    return () => {
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, pagination, refresh]);

  useEffect(
    () => {
      let unmounted = false;
      if (!userData._id) return;

      console.log(userState);

      const fetchAndSet = async () => {
        setRatingState({
          ...ratingState,
          isLoading: true,
        });
        const response = await getPaginatedTourGuideRatings(
          userData._id,
          ratingState.page,
          6,
          "desc"
        );

        if (response.success) {
          if (!unmounted) {
            setRatingState({
              ...ratingState,
              content: response.data?.content || [],
              totalPages: response?.data?.totalPages || 0,
              isLoading: false,
            });
          }
        } else {
          console.log(response.data);
        }
      };

      fetchAndSet();

      return () => {
        unmounted = true;
      };
    },
    // eslint-disable-next-line
    [ratingState.refresh, userData, ratingState.page]
  );

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
                image={per1}
              />
            </Card>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              {userData.name}
            </Typography>

            <Typography sx={{ fontWeight: "bold" }}>
              Address: {userData.address}
            </Typography>
            <Typography></Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              Contact: {userData.mobileNumber}
            </Typography>
            <Typography></Typography>
            <Typography sx={{ fontWeight: "bold" }}>
              Sex: {userData.gender}
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
            {portfolios &&
              portfolios.map((item) => (
                <Grid item xs={6} key={item._id}>
                  <PortfolioCard
                    image={item.image}
                    description={item.description}
                  />
                </Grid>
              ))}
          </Grid>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "right",
              mt: 4,
            }}
          >
            <Pagination
              count={pagination.totalPages}
              page={pagination.page}
              onChange={handleChange}
              fontWeight={"bold"}
            />
          </Box>
        </Box>
        <Grid container spacing={2} sx={{ mt: 4 }}>
          <Grid item xs={8} sx={{ mb: 2 }}>
            <div
              ref={scrollElmRef}
              style={{
                position: "absolute",
                marginTop: "-100px",
                height: 100,
              }}
            />
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              Ratings & Reviews
            </Typography>
          </Grid>
          <Grid item xs={6}>
            {authState.isLoggedIn && (
              <FeedbackForm
                userId={userData._id}
                onSubmit={handleRatingSubmit}
                isUpdate={ratingFormState.isUpdateForm}
                rating={ratingFormState.activeRating}
                onUpdateCancel={handleRatingUpdateCancel}
              />
            )}
            {ratingState?.content?.map((rating) => (
              <Feedbacks
                key={rating._id}
                rating={rating}
                onUpdateClick={handleRatingUpdateClick}
                onDeleteClick={handleRatingDeleteClick}
              />
            ))}
          </Grid>
          <Grid item xs={6}></Grid>
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
