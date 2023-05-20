import React, { useEffect, useRef, useState } from "react";
import { Typography, Box, CardMedia, Card, Button, Grid, CircularProgress } from "@mui/material";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useNavigate, useParams } from "react-router-dom";
import MapGoogle from "../components/common/MapGoogle";
import Facilities from "../components/common/Facilities";
import Promotions from "../components/common/Promotions";
import MiniCard from "../components/common/MiniCard";
import FeedbackForm from "../components/common/FeedbackForm";
import Feedbacks from "../components/common/Feedbacks";
import { popDangerPrompt } from "../utils/alerts";
import { deleteRating, getPaginatedHotelRatings } from "../service/rating.service";
import { popAlert } from "../utils/alerts";
import { getById, getNearestHotels, getPaginatedHotels } from "../service/hotel.service";
import { getDownloadURLFromFirebaseRef } from "../utils/firebase";
import { getNearestAttractions } from "../service/attraction.service";
import Slider from "../components/common/Slider";
import { covertToKm, getStrigifiedStringArrayItems } from "../utils/common";

const HotelDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const scrollElmRef = useRef(null);

  const [hotelsState, setHotelState] = useState({
    isLoading: true,
    hotel: {},
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

  const [nearestAttractionsState, setNearestAttractionsState] = useState({
    isLoading: false,
    content: [],
  });
  const [nearestHotelsState, setNearestHotelsState] = useState({
    isLoading: false,
    content: [],
  });

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

  //hotels
    useEffect(
    () => {
      let unmounted = false;
      if (!id) return;

      const fetchAndSet = async () => {
        setHotelState({ ...hotelsState, isLoading: true });
        const hotelResponse = await getById(id);

        if (hotelResponse.success) {
          const data = hotelResponse.data;
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
            setHotelState({
              ...hotelsState,
              isLoading: false,
              hotel: data,
            });
          }
        } else {
          console.log(hotelResponse.data);
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
      if (!hotelsState?.hotel?._id) return;

      const fetchAndSet = async () => {
        setRatingState({
          ...ratingState,
          isLoading: true,
        });
        const response = await getPaginatedHotelRatings(
          hotelsState.hotel._id,
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
    [ratingState.refresh, hotelsState.hotel, ratingState.page]
  );

  // nearest hotels
  useEffect(
    () => {
      let unmounted = false;
      const coordinates = hotelsState?.hotel?.location?.coordinates;
      if (!coordinates || coordinates.length <= 0) return;

      const fetchAndSet = async () => {
        setNearestHotelsState({
          ...nearestHotelsState,
          isLoading: true,
        });
        const response = await getNearestHotels(
          hotelsState.hotel.location.coordinates[1],
          hotelsState.hotel.location.coordinates[0],
          7
        );

        if (response.success) {
          const content = response.data || [];

          // remove this hotel
          const thisIndex = content.findIndex(
            (item) => item._id === hotelsState.hotel?._id
          );
          if (thisIndex !== -1) content.splice(thisIndex, 1);

          for (const item of content) {
            if (!item?.images || item.images.length <= 0) continue;

            const imageRef = item?.images[0]?.firebaseStorageRef;
            if (imageRef)
              item.preview = await getDownloadURLFromFirebaseRef(imageRef);
          }

          if (!unmounted) {
            setNearestHotelsState({
              ...nearestHotelsState,
              content,
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
    [hotelsState.hotel]
  );

  // nearest attrection
  useEffect(
    () => {
      let unmounted = false;
      const coordinates = hotelsState?.hotel?.location?.coordinates;
      if (!coordinates || coordinates.length <= 0) return;

      const fetchAndSet = async () => {
        setNearestAttractionsState({
          ...nearestAttractionsState,
          isLoading: true,
        });
        const response = await getNearestAttractions(
          hotelsState.hotel.location.coordinates[1],
          hotelsState.hotel.location.coordinates[0],
          6
        );

        if (response.success) {
          const content = response.data || [];

           for (const item of content) {
            if (!item?.images || item.images.length <= 0) continue;

            const imageRef = item?.images[0]?.firebaseStorageRef;
            if (imageRef)
              item.preview = await getDownloadURLFromFirebaseRef(imageRef);
          }

          if (!unmounted) {
            setNearestAttractionsState({
              ...nearestAttractionsState,
              content,
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
    [hotelsState.hotel]
  );

  console.log("hotelsState",hotelsState);

  if (hotelsState.isLoading)
    return (
      <Box sx={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 15,
      }} >

        <CircularProgress /> <span style={{ marginLeft: 10 }}>Loading...</span>
      </Box>
    );

  return (
    <Box sx={{ width: "100%" }}>
      <Slider images={hotelsState?.hotel?.previewImages} />

      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
          <Grid item xs={6} sx={{mt:3,ml:8}}>
            <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
              {hotelsState?.hotel?.name}
            </Typography>
            <Typography>
              {hotelsState?.hotel?.description}
            </Typography>

            <Typography variant="h5" sx={{ fontWeight: "bold", mt: 2 }}>
                Hours of Operation
              </Typography>
              <Typography>
                {new Date(
                  hotelsState?.hotel.openHours?.open
                ).toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}{" "}
                to{" "}
                {new Date(
                  hotelsState?.hotel.openHours?.close
                ).toLocaleString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })}
            </Typography>
            
            <Typography variant="h4" sx={{ fontWeight: "bold",mt:2}}>
              Location
            </Typography>
            <Box>
              <MapGoogle
              lat={hotelsState?.hotel?.location?.coordinates[1]}
              lng={hotelsState?.hotel?.location?.coordinates[0]}
              />
            </Box>

            <Box>
              
            <Typography variant="h4" sx={{ fontWeight: "bold",mt:2}}>
              Facilities
            </Typography>
              <Box>
               <div class="container" style={{  display:"flex", flexWrap:"wrap" }}>
                 {hotelsState.hotel?.hotelFacilities?.map((hotelFacility) => (
                   <div class="item" style={{ margin: "5px", padding: "8px 12px", backgroundColor: "#e0e0e0", borderRadius: "16px" }}>{hotelFacility}</div>
                 ))} 
                </div>
                
              </Box>
            </Box> 

            <Typography variant="h4" sx={{ fontWeight: "bold",mt:2}}>
              Promotions & Offers
            </Typography>
            <Box sx={{mb:5}}>
              <Promotions  />
            </Box>
        </Grid>
        <Grid item xs={5} sx={{mt:3, ml:2}}>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
              Nearby Attractions
          </Typography>
          {nearestAttractionsState.isLoading && (
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                    my: 2,
                  }}
                >
                  <CircularProgress />{" "}
                  <span style={{ marginLeft: 10 }}>Loading...</span>
                </Box>
              )}
              <Box sx={{ mb: 5 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    {nearestAttractionsState.content?.map((attraction) => (
                      <Grid
                        item
                        xs={4}
                        key={attraction._id}
                        onClick={() =>
                          navigate(`/attractions/${attraction._id}`)
                        }
                      >
                        <MiniCard
                          image={attraction.preview}
                          name={attraction.name}
                          distance={covertToKm(attraction.distance)}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box>
              </Box>

             <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
              Nearby Hotels
            </Typography>
            {nearestHotelsState.isLoading && (
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "left",
                    alignItems: "center",
                    my: 2,
                  }}
                >
                  <CircularProgress />{" "}
                  <span style={{ marginLeft: 10 }}>Loading...</span>
                </Box>
              )}
              <Box sx={{ mb: 5 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container spacing={2}>
                    {nearestHotelsState.content?.map((hotel) => (
                      <Grid
                        item
                        xs={4}
                        key={hotel._id}
                        onClick={() => navigate(`/hotels/${hotel._id}`)}
                      >
                        <MiniCard
                          image={hotel.preview}
                          name={hotel.name}
                          distance={covertToKm(hotel.distance)}
                        />
                      </Grid>
                    ))}
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
                    justifyContent: "left",
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
                hotelid={hotelsState?.hotel._id}
                onSubmit={handleRatingSubmit}
                isUpdate={ratingFormState.isUpdateForm}
                rating={ratingFormState.activeRating}
                onUpdateCancel={handleRatingUpdateCancel}
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
  );
};

export default HotelDetails;
