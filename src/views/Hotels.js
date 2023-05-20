import React, { useEffect, useState } from "react";
import { Typography, Box, CardMedia, CircularProgress, Pagination } from "@mui/material";
import hotelImage from "../assets/Images/Rectangle2.png";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import SearchBar from "../components/common/SearchBar";
import MediaCard from "../components/common/MediaCard";
import { useNavigate } from "react-router-dom";
import { getPaginatedHotels } from "../service/hotel.service"
import { getDownloadURLFromFirebaseRef } from "../utils/firebase";

//images
import hotel1 from "../assets/Images/Rectangle3.png";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

const Hotels = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [hotels, setHotels] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const handleClick = (id) => {
    navigate(`/hotels/${id}`);
  };

    const handleSearch = (input) => {
    setKeyword(input);
  };

    useEffect(() => {
    let unmounted = false;

    const fetchAndSet = async () => {
      setIsLoading(true);
      const response = await getPaginatedHotels(page, 6, "desc", keyword);

      if (response.success) {
        // resolove firesbase images
        const NewHotels = response?.data?.content || [];

        for (const hotels of NewHotels) {
          const imageRef = hotels?.images[0]?.firebaseStorageRef;
          if (imageRef)
            hotels.preview = await getDownloadURLFromFirebaseRef(imageRef);
        }

        if (!unmounted) {
          setHotels(NewHotels);
          setTotalPages(response?.data?.totalPages || 0);
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
    }, [page, keyword]);
  
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ position: "relative" }}>
        <CardMedia component="img" image={hotelImage} />
        <Box
          sx={{
            position: "absolute",
            top: "100%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "60%",
          }}
        >
          <SearchBar onSearch={handleSearch}/>
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
            Hotels
          </Typography>
        </Box>
        {isLoading && (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              my: 3,
            }}
          >
            <CircularProgress />
          </Box>
        )}
        <Box
          sx={{
            flexGrow: 1,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
           <Grid container spacing={2} style={{ maxWidth: 1300 }}>
            {hotels?.map((hotel) => (
              <Grid
                item
                key={hotel._id}
                xs={4}
                onClick={() => handleClick(hotel._id)}
              >
                <MediaCard image={hotel.preview} name={hotel.name} />
              </Grid>
            ))}

            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "right",
                mt: 4,
              }}
            >
              <Pagination
                count={totalPages}
                page={page}
                onChange={handleChange}
                fontWeight={"bold"}
              />
            </Box>
          </Grid>

        </Box>
      </Box>
    </Box>
  );
};

export default Hotels;
