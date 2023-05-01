import React, { useState, useEffect } from "react";
import {
  Grid,
  Stack,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Avatar,
} from "@mui/material";

import { Box } from "@mui/system";
import colors from "../../assets/Style/colors";
import navbarStyles from "../../components/navbar";
import Popup from "../../components/common/Popup";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router-dom";
import Banner from '../../assets/Images/Rectangle.png';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const NavBar = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showRegiserPopup, setshowRegiserPopup] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [inputs, setInputs] = useState();
  const handlePopupClose = () => setShowPopup(false);
  const handleRegisterPopupClose = () => setshowRegiserPopup(false);
    const navigate = useNavigate();
   
  const Navigatehome = () => {
    navigate("/");
  }
   const NavigateAttraction = () => {
    navigate("/attractions");
  }
  
  const NavigateHotles = () => {
    navigate("/hotels");
  }

  const NavigateTourguide = () => {
    navigate("/tourGuides")
  }
  return (
    <React.Fragment>    
      <Box sx={{ flexGrow: 1 ,backgroundColor: colors.white, px: 8, py: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={6} md={2}>
         <Typography
                variant="h4"
                sx={{ fontWeight: "bold", color: colors.black, fontFamily:'Poppins' }}
              >
                TripTrekker
              </Typography>
        </Grid>
        <Grid item xs={6} md={8}>
          <Stack
              direction="row"
              spacing={2}
              justifyContent="flex-start"
              alignItems="center"
              sx={{ height: "100%" ,ml:18}}
            >
               <Typography
                sx={{ ...navbarStyles.NavbarHeading, paddingRight: 2, paddingLeft: 2 }}
                onClick={Navigatehome}
                  >
                    Home
                </Typography>
                <Typography
                sx={{ ...navbarStyles.NavbarHeading, paddingRight: 2, paddingLeft: 2 }}
                onClick={NavigateAttraction}
                  >
                    Attractions
                </Typography>
                <Typography
                sx={{ ...navbarStyles.NavbarHeading, paddingRight: 2, paddingLeft: 2 }}
                onClick={NavigateHotles}
                  >
                    Hotels
                </Typography>
                <Typography
                sx={{ ...navbarStyles.NavbarHeading, ml: 5, paddingRight: 2, paddingLeft: 2 }}
                 onClick={NavigateTourguide}
                  >
                    Tour Guides
                  </Typography>
            </Stack>
        </Grid>
        <Grid item xs={6} md={2}>
           <Stack direction="row" spacing={2}>
             <Avatar alt="" src="" />
    </Stack>
        </Grid>
      </Grid>
    </Box>
    </React.Fragment>
  );
};

export default NavBar;
