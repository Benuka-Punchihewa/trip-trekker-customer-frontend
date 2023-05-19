import React, { useEffect, useState, useRef } from "react";
import {
  Typography,
  Box,
  Grid,
  CircularProgress,
  Button,
  Pagination,
} from "@mui/material";
import { useParams } from "react-router-dom";
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
import PulseStreamDataRecord from "../components/common/PulseStreamDataRecord";
import Slider from "../components/common/Slider";
import { getAttractionById } from "../service/attraction.service";
import { getDownloadURLFromFirebaseRef } from "../utils/firebase";
import { getStrigifiedStringArrayItems } from "../utils/common";
import {
  deletePulseStreamRecord,
  getPaginatedPulseStreamData,
} from "../service/pulseStreamData.service";
import PulseStreamDataForm from "../components/attraction/PulseStreamDataForm";
import Popup from "../components/common/Popup";
import { popAlert, popDangerPrompt } from "../utils/alerts";
import {
  deleteRating,
  getPaginatedAttractionRatings,
} from "../service/rating.service";

const AttractionDetails = () => {
  const { id } = useParams();
  const scrollElmRef = useRef(null);
  const [attractionState, setAttractionState] = useState({
    isLoading: true,
    attraction: {},
  });
  const [pulseStreamState, setPulseStreamState] = useState({
    isLoading: false,
    page: 1,
    totalPages: 0,
    content: [],
    refresh: false,
  });
  const [pulseStreamFormState, setPulseStreamFormState] = useState({
    isUpdateForm: false,
    activePulseRecord: null,
    showPopup: false,
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

  const handlePulseStreamPageChange = (event, value) => {
    setPulseStreamState({ ...pulseStreamState, page: value });
  };

  const handlePulseStreamPopupClose = () => {
    setPulseStreamFormState({ ...pulseStreamFormState, showPopup: false });
  };

  const handlePulseStreamPopupSuccess = () => {
    setPulseStreamState({
      ...pulseStreamState,
      refresh: !pulseStreamState.refresh,
    });
    setPulseStreamFormState({ ...pulseStreamFormState, showPopup: false });
  };

  const handleShowPulseStreamUpdatePopup = (record) => {
    setPulseStreamFormState({
      ...pulseStreamFormState,
      showPopup: true,
      isUpdateForm: true,
      activePulseRecord: record,
    });
  };

  const handleShowPulseStreamAddPopup = () => {
    setPulseStreamFormState({
      ...pulseStreamFormState,
      showPopup: true,
      isUpdateForm: false,
    });
  };

  const handleRatingSubmit = () => {
    setRatingState({
      ...ratingState,
      refresh: !ratingState.refresh,
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

  const handlePulseStreamDelete = (record) => {
    popDangerPrompt(
      "Warning",
      "Are you sure you want to delete this?",
      "error"
    ).then(async (res) => {
      if (res.isConfirmed) {
        const response = await deletePulseStreamRecord(record._id);
        if (response.success) {
          popAlert("Success!", "Successfully deleted the record!", "success");
          setPulseStreamState({
            ...pulseStreamState,
            refresh: !pulseStreamState.refresh,
          });
        } else {
          response?.data &&
            popAlert("Error!", response?.data?.message, "error");
        }
      }
    });
  };

  // attraction
  useEffect(
    () => {
      let unmounted = false;
      if (!id) return;

      const fetchAndSet = async () => {
        setAttractionState({ ...attractionState, isLoading: true });
        const attractionResponse = await getAttractionById(id);

        if (attractionResponse.success) {
          const data = attractionResponse.data;
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
            setAttractionState({
              ...attractionState,
              isLoading: false,
              attraction: data,
            });
          }
        } else {
          console.log(attractionResponse.data);
        }
      };

      fetchAndSet();

      return () => {
        unmounted = true;
      };
    },
    // eslint-disable-next-line
    [id]
  );

  // ratings
  useEffect(
    () => {
      let unmounted = false;
      if (!attractionState?.attraction?._id) return;

      const fetchAndSet = async () => {
        setRatingState({
          ...ratingState,
          isLoading: true,
        });
        const response = await getPaginatedAttractionRatings(
          attractionState.attraction._id,
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
    [ratingState.refresh, attractionState.attraction, ratingState.page]
  );

  // pulse stream
  useEffect(
    () => {
      let unmounted = false;
      if (!attractionState?.attraction?._id) return;

      const fetchAndSet = async () => {
        setPulseStreamState({
          ...pulseStreamState,
          isLoading: true,
        });
        const response = await getPaginatedPulseStreamData(
          attractionState.attraction._id,
          pulseStreamState.page,
          6,
          "desc"
        );

        if (response.success) {
          // resolove firesbase images
          const pPulseStreamRecords = response?.data?.content || [];

          for (const record of pPulseStreamRecords) {
            const imageRef = record?.image?.firebaseStorageRef;
            if (imageRef)
              record.preview = await getDownloadURLFromFirebaseRef(imageRef);
          }

          if (!unmounted) {
            setPulseStreamState({
              ...pulseStreamState,
              content: pPulseStreamRecords,
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
    [ratingState.refresh, attractionState.attraction, ratingState.page]
  );

  if (attractionState.isLoading)
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
    <>
      <Box sx={{ width: "100%" }}>
        <Slider images={attractionState?.attraction?.previewImages} />

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={6} sx={{ mt: 3, ml: 8 }}>
              <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
                {attractionState?.attraction?.name}
              </Typography>
              <Typography>
                {attractionState?.attraction?.description}
              </Typography>

              <Typography variant="h5" sx={{ fontWeight: "bold", mt: 2 }}>
                Hours of Operation
              </Typography>
              <Typography>
                {new Date(
                  attractionState?.attraction.openHours?.open
                ).toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}{" "}
                to{" "}
                {new Date(
                  attractionState?.attraction.openHours?.close
                ).toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
              </Typography>

              <Typography variant="h5" sx={{ fontWeight: "bold", mt: 2 }}>
                Accessibility Options
              </Typography>
              <Typography>
                {getStrigifiedStringArrayItems(
                  attractionState?.attraction.accessibilityOptions
                )}
              </Typography>

              <Typography variant="h4" sx={{ fontWeight: "bold", mt: 2 }}>
                Location
              </Typography>
              <Box>
                <MapGoogle
                  lat={attractionState?.attraction?.location?.coordinates[1]}
                  lng={attractionState?.attraction?.location?.coordinates[0]}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 3,
                  mb: 2,
                }}
              >
                <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                  Pulse Stream
                </Typography>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleShowPulseStreamAddPopup}
                >
                  Add New
                </Button>
              </Box>

              {pulseStreamState.isLoading && (
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    my: 2,
                  }}
                >
                  <CircularProgress />{" "}
                  <span style={{ marginLeft: 10 }}>Loading...</span>
                </Box>
              )}

              <Box sx={{ mb: 5 }}>
                {pulseStreamState?.content?.map((record) => (
                  <PulseStreamDataRecord
                    key={record._id}
                    record={record}
                    image={record.preview}
                    onUpdateClick={handleShowPulseStreamUpdatePopup}
                    onDeleteClick={handlePulseStreamDelete}
                  />
                ))}

                <Box sx={{ mt: 2 }}>
                  <Pagination
                    count={pulseStreamState.totalPages}
                    page={pulseStreamState.page}
                    onChange={handlePulseStreamPageChange}
                    fontWeight={"bold"}
                  />
                </Box>
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
              <div
                ref={scrollElmRef}
                style={{
                  position: "absolute",
                  marginTop: "-100px",
                  height: 100,
                }}
              />
              <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
                Ratings & Reviews
              </Typography>
              {ratingState.isLoading && (
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    my: 2,
                  }}
                >
                  <CircularProgress />{" "}
                  <span style={{ marginLeft: 10 }}>Loading...</span>
                </Box>
              )}
              <Box>
                <FeedbackForm
                  attractionId={attractionState?.attraction._id}
                  onSubmit={handleRatingSubmit}
                  isUpdate={ratingFormState.isUpdateForm}
                  rating={ratingFormState.activeRating}
                />
                {ratingState?.content?.map((rating) => (
                  <Feedbacks
                    key={rating._id}
                    rating={rating}
                    onUpdateClick={handleRatingUpdateClick}
                    onDeleteClick={handleRatingDeleteClick}
                  />
                ))}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Popup
        title="Create Pulse Stream Record"
        width={800}
        show={pulseStreamFormState.showPopup}
        onClose={handlePulseStreamPopupClose}
      >
        <PulseStreamDataForm
          attractionId={attractionState?.attraction._id}
          onSuccess={handlePulseStreamPopupSuccess}
          isUpdate={pulseStreamFormState.isUpdateForm}
          pulseStreamRecord={pulseStreamFormState.activePulseRecord}
        />
      </Popup>
    </>
  );
};

export default AttractionDetails;
