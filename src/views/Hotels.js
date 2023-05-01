// import React from "react";
// import { Typography, Box, CardMedia } from "@mui/material";
// import hotelImage from "../assets/Images/Rectangle2.png"; 
// import { styled } from '@mui/material/styles';
// import Paper from '@mui/material/Paper';
// import Grid from '@mui/material/Grid';
// import SearchBar from "../components/common/SearchBar";

// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary,
// }));

// const Hotels = () => {
//   return (
//     <Box sx={{ width: "100%" }}>
//       <CardMedia component="img" image={hotelImage} />
//      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',ml:30,mb:10}}>
//   <SearchBar />
// </Box>
//       <Box sx={{ flexGrow: 1}}>
//       <Grid container spacing={2}>
//         <Grid item xs={8}>
//           <Item>xs=8</Item>
//         </Grid>
//         <Grid item xs={4}>
//           <Item>xs=4</Item>
//         </Grid>
//         <Grid item xs={4}>
//           <Item>xs=4</Item>
//         </Grid>
//         <Grid item xs={8}>
//           <Item>xs=8</Item>
//         </Grid>
//       </Grid>
//     </Box>
//     </Box>
//   );
// };

// export default Hotels;
import React from "react";
import { Typography, Box, CardMedia } from "@mui/material";
import hotelImage from "../assets/Images/Rectangle2.png"; 
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import SearchBar from "../components/common/SearchBar";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Hotels = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ position: "relative" }}>
        <CardMedia component="img" image={hotelImage} />
        <Box sx={{ position: "absolute", top: "100%", left: "50%", transform: "translate(-50%, -50%)" ,width:'80%'}}>
          <SearchBar />
        </Box>
      </Box>
      <Box sx={{ flexGrow: 1,mt:10}}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Item>xs=8</Item>
          </Grid>
          <Grid item xs={4}>
            <Item>xs=4</Item>
          </Grid>
          <Grid item xs={4}>
            <Item>xs=4</Item>
          </Grid>
          <Grid item xs={8}>
            <Item>xs=8</Item>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Hotels;
