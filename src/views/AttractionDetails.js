import React, { useEffect, useState } from "react";
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
import { getPaginatedPulseStreamData } from "../service/pulseStreamData.service";
import PulseStreamDataForm from "../components/attraction/PulseStreamDataForm";
import Popup from "../components/common/Popup";

const AttractionDetails = () => {
  const { id } = useParams();
  const [isAttractionLoading, setIsAttractionLoading] = useState(true);
  const [isPulseStreamLoading, setIsPulseStreamLoading] = useState(true);
  const [attraction, setAttraction] = useState({});
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pulseStreamRecords, setPulseSteamRecords] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [isUpdateForm, setIsUpdateForm] = useState(false);
  const [activePulseRecord, setActivePulseRecord] = useState(null);

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handlePopupSuccess = () => {
    setRefresh(!refresh);
    setShowPopup(false);
  };

  const handleShowUpdatePopup = (record) => {
    setShowPopup(true);
    setIsUpdateForm(true);
    setActivePulseRecord(record);
  };

  const handleShowAddPopup = () => {
    setShowPopup(true);
    setIsUpdateForm(false);
  };

  const handleDelete = () => {};

  useEffect(() => {
    let unmounted = false;
    if (!id) return;

    const fetchAndSet = async () => {
      setIsAttractionLoading(true);
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
          setAttraction(data);
          setIsAttractionLoading(false);
        }
      } else {
        console.log(attractionResponse.data);
      }
    };

    fetchAndSet();

    return () => {
      unmounted = true;
    };
  }, []);

  useEffect(() => {
    let unmounted = false;
    if (!attraction._id) return;

    const fetchAndSet = async () => {
      setIsPulseStreamLoading(true);
      const response = await getPaginatedPulseStreamData(
        attraction._id,
        page,
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

        console.log(pPulseStreamRecords);

        if (!unmounted) {
          setPulseSteamRecords(pPulseStreamRecords);
          setTotalPages(response?.data?.totalPages || 0);
          setIsPulseStreamLoading(false);
        }
      } else {
        console.log(response.data);
      }
    };

    fetchAndSet();

    return () => {
      unmounted = true;
    };
  }, [refresh, attraction, page]);

  if (isAttractionLoading && isPulseStreamLoading)
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
        <Slider images={attraction?.previewImages} />

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
                <MapGoogle
                  lat={attraction?.location?.coordinates[1]}
                  lng={attraction?.location?.coordinates[0]}
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
                  onClick={handleShowAddPopup}
                >
                  Add New
                </Button>
              </Box>

              <Box sx={{ mb: 5 }}>
                {pulseStreamRecords?.map((record) => (
                  <PulseStreamDataRecord
                    key={record._id}
                    record={record}
                    image={record.preview}
                    onUpdateClick={handleShowUpdatePopup}
                    onDeleteClick={handleDelete}
                  />
                ))}

                <Box sx={{ mt: 2 }}>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
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

      <Popup
        title="Create Pulse Stream Record"
        width={800}
        show={showPopup}
        onClose={handlePopupClose}
      >
        <PulseStreamDataForm
          attractionId={attraction._id}
          onSuccess={handlePopupSuccess}
          isUpdate={isUpdateForm}
          pulseStreamRecord={activePulseRecord}
        />
      </Popup>
    </>
  );
};

export default AttractionDetails;
