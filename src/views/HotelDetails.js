import React from "react";
import { Typography, Box, CardMedia } from "@mui/material";
import hotelImage from "../assets/Images/Rectangle2.png"; 
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import SearchBar from "../components/common/SearchBar";
import MediaCard from "../components/common/MediaCard";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const HotelDetails = () => {
  const navigate = useNavigate();
  const hotelbyId = () => {
    navigate('/')
  }
  return (
    <Box sx={{ width: "100%" }}>
          <Typography>
              hotel details
      </Typography>
    </Box> 
      
  );
};

export default HotelDetails;
