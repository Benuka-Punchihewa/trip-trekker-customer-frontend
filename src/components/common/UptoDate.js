import { Box, Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import AttractionCard1 from '../../assets/Images/AttractionCard1.png';
import AttractionCard2 from '../../assets/Images/AttractionCard2.png';


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const UptoDate = () => {
    return (

        <>
        <Box>
            <Box sx={{mt:1}}>
        <Card sx={{ maxWidth: 750 }}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="250"
                image={AttractionCard2}
            />
                        <CardContent>
                            
                            <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
         <Typography gutterBottom variant="h6" component="div">
          B.B.Punchihewa
        </Typography >
        </Grid>
        <Grid item xs={4}>
          <Typography gutterBottom variant="body1" component="div" textAlign={'right'}>
          30 min ago
        </Typography >
        </Grid>
      </Grid>
    </Box>
                            
        
        <Typography variant="body2" color="text.secondary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel egestas dolor, nec dignissim metus. Donec augue elit, rhoncus ac sodales id, porttitor vitae est. Donec laoreet rutrum libero sed pharetra.Donec vel egestas dolor, nec dignissim metus. Donec augue elit, rhoncus ac 
        </Typography>
      </CardContent>
      <CardActions >
       
      </CardActions>
    </Card>
        </Box>
            <Box sx={{mt:1}}>
                <Card sx={{ maxWidth: 750 }}>
            <CardMedia
                component="img"
                alt="green iguana"
                height="250"
                image={AttractionCard1}
            />
                        <CardContent>
                            
                            <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
         <Typography gutterBottom variant="h6" component="div">
          Benuka Binod
        </Typography >
        </Grid>
        <Grid item xs={4}>
          <Typography gutterBottom variant="body1" component="div" textAlign={'right'}>
          40 min ago
        </Typography >
        </Grid>
      </Grid>
    </Box>
                            
        
        <Typography variant="body2" color="text.secondary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel egestas dolor, nec dignissim metus. Donec augue elit, rhoncus ac sodales id, porttitor vitae est. Donec laoreet rutrum libero sed pharetra.Donec vel egestas dolor, nec dignissim metus. Donec augue elit, rhoncus ac 
        </Typography>
      </CardContent>
      <CardActions >
       
      </CardActions>
    </Card>
            </Box>
            
        </Box>
        </>
    );

}

export default UptoDate;