import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import AttractionCard2 from "../../assets/Images/AttractionCard2.png";
import { getTimePassed } from "../../utils/common";

const PulseStreamDataRecord = ({ author, createdAt, description, image }) => {
  return (
    <Box sx={{ mb: 1 }}>
      <Card sx={{ maxWidth: 750 }}>
        <CardMedia
          component="img"
          alt="green iguana"
          height="250"
          sx={{ objectFit: "cover" }}
          image={image}
        />
        <CardContent>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              <Grid item xs={8}>
                <Typography gutterBottom variant="h6" component="div">
                  {author}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  gutterBottom
                  variant="body1"
                  component="div"
                  textAlign={"right"}
                >
                  {getTimePassed(createdAt)}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
        <CardActions></CardActions>
      </Card>
    </Box>
  );
};

export default PulseStreamDataRecord;
