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

const Hotels = () => {
  const navigate = useNavigate();
  const hotelbyId = () => {
    navigate('/hoteldetails')
  }
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ position: "relative" }}>
        <CardMedia component="img" image={hotelImage} />
        <Box sx={{ position: "absolute", top: "100%", left: "50%", transform: "translate(-50%, -50%)" ,width:'80%'}}>
          <SearchBar />
        </Box>
      </Box>    
      <Box sx={{ flexGrow: 1, mt: 10, width: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start' ,ml:15}}>
        <Typography variant="h4" sx={{fontWeight: 'bold',mb:2}}>Hotels</Typography>
      </Box>
      <Box sx={{ flexGrow: 1, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <Grid container spacing={2} style={{ maxWidth: 1300 }}>
          <Grid item xs={4} onClick={hotelbyId} >
              <MediaCard />
          </Grid>
          <Grid item xs={4} onClick={hotelbyId}>
           <MediaCard/>
          </Grid>
          <Grid item xs={4} onClick={hotelbyId}>
            <MediaCard/>
          </Grid>
        </Grid>
      </Box>
    </Box>
    </Box> 
      
  );
};

export default Hotels;
