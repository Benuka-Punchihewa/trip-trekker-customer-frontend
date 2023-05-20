import { Box, Button, Grid } from "@mui/material";

const Facilities = ({ name1, name2,  name3,name4,name5}) => { 

    return (
        <Box>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={3}>
                  <Grid item xs={2}>
                    <Button variant="contained" size="large">
                   {name1}
                  </Button>  
                </Grid>
                <Grid item xs={2}>
                  <Button variant="contained" size="large">
                   {name2}
                  </Button>  
                </Grid>
                  <Grid item xs={4}>
                    <Button variant="contained" size="large">
                    {name3}
                  </Button>  
                 
                </Grid>
                 <Grid item xs={4}>
                  </Grid>
                   <Grid item xs={2}>
                  <Button variant="contained" size="large">
                    {name4}
                  </Button>
                  </Grid>
                   <Grid item xs={4}>
                  <Button variant="contained" size="large">
                   {name5}
                  </Button>
                  </Grid>
              </Grid>
           </Box>
        </Box>
    );
}
export default Facilities;