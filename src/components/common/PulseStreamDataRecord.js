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
import { getTimePassed } from "../../utils/common";
import { useSelector } from "react-redux";

const PulseStreamDataRecord = ({
  record,
  image,
  onUpdateClick,
  onDeleteClick,
}) => {
  const authState = useSelector((state) => state.auth);

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
                  {record?.user?.name}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography
                  gutterBottom
                  variant="body1"
                  component="div"
                  textAlign={"right"}
                >
                  {getTimePassed(record.updatedAt)}
                </Typography>
              </Grid>
            </Grid>
          </Box>

          <Typography variant="body2" color="text.secondary">
            {record.description}
          </Typography>
        </CardContent>
        <CardActions>
          {authState?.user?._id === record?.user?._id && (
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <Button
                size="small"
                color="success"
                onClick={() => onUpdateClick(record)}
              >
                Update
              </Button>
              <Button
                size="small"
                color="error"
                onClick={() => onDeleteClick(record)}
              >
                Delete
              </Button>
            </CardActions>
          )}
        </CardActions>
      </Card>
    </Box>
  );
};

export default PulseStreamDataRecord;
