import React from "react";
import Card from "@mui/material/Card";
import {Box,Grid} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Banner from '../../assets/Images/Rectangle.png';
import colors from '../../assets/Style/colors';

const HomeBanner = () => {

  return (
    <Card
      sx={{
        height:"100vh",
      }}
    >
      <CardMedia
        component="img"
        alt="green iguana"
        image={Banner}
        sx={{
          position: "relative",
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
        }}
      /> 
      <Typography component="div" variant="h1" gutterBottom>
        <Box sx={{  
          fontSize: 'h1.fontSize',
          position: "absolute",
          top: "25%",
          width: "100%",
          fontWeight: 'bold',
          textAlign:'center',
          color:colors.fontColor}}>
          Enjoy Your Way.
        </Box>
      </Typography> 
      <Card sx={{color:colors.cardColor}}>
        <Typography component={"span"}>
          <Box sx={{  
            fontSize: 'h6.fontSize',
            position: "absolute",
            top: "50%",
            width: "100%",
            textAlign:'center',
            color:colors.fontColor,}}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel egestas dolor, nec dignissim metus.
            Donec augue elit,<br></br>
            rhoncus ac sodales id, porttitor vitae est. Donec laoreet rutrum libero sed pharetra
          </Box>
        </Typography> 
      </Card>
    </Card>
  );
};

export default HomeBanner;
