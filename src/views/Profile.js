import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Card,
  CardMedia,
  Grid,
  Button,
  TextField,
  CircularProgress,
  Input,
  IconButton,
} from "@mui/material";
import PortfolioCard from "../components/common/PortfolioCard";
import Popup from "../components/common/Popup";
import colors from "../assets/Style/colors";
import { useSelector } from "react-redux";
import {
  getPortfolios,
  createPortfolio,
  deletePortfolio,
  updatePortfolio,
} from "../service/portfolio.service";
import portfolio from "../models/portfolio";
import { popAlert, popDangerPrompt } from "../utils/alerts";
import { getDownloadURLFromFirebaseRef } from "../utils/firebase";
import EditIcon from "@mui/icons-material/Edit";
import { uploadProfileImage } from "../service/signUp.service";
import signUp from "../models/signUp";

import per1 from "../assets/Images/per1.png";

const Profile = () => {
  const authState = useSelector((state) => state.auth);
  const [inputs, setInputs] = useState(portfolio);
  const [userInputs, setUserInputs] = useState(signUp);
  const [portfolios, setPortfolios] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [updateShowPopup, setUpdateShowPopup] = useState(false);
  const [ImageShowPopup, setImageShowPopup] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [profileImg, setProfileImg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    orderBy: "desc",
  });

  //create portfolio
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await createPortfolio(inputs);

    if (response.success) {
      response?.data &&
        popAlert("Success!", response?.data?.message, "success").then((res) => {
          setShowPopup(false);
          window.location.reload();
        });
    } else {
      response?.data?.message &&
        popAlert("Error!", response?.data?.message, "error");
      response?.data?.data && setErrors(response.data.data);
      setLoading(false);
    }
  };

  const handleUpdatePopupClose = () => {
    setUpdateShowPopup(false);
    setInputs("");
  };

  const handleClear = () => {
    setInputs("");
  };

  //delete portfolio
  const handlePortfolioDelete = (id) => {
    setLoading(true);
    popDangerPrompt(
      "DELETE",
      "Do you want to delete this Portfolio?",
      "error"
    ).then(async (res) => {
      if (res.isConfirmed) {
        const response = await deletePortfolio(id);

        if (response.success) {
          popAlert(
            "Success!",
            "Portfolio Successfully Deleted!",
            "success"
          ).then((res) => {
            window.location.reload();
          });
        } else {
          response?.data?.message &&
            popAlert("Error!", response?.data?.message, "error");
          response?.data?.data && setErrors(response.data.data);
        }
      }
    });
    setLoading(false);
  };

  //update portfolio fetch data
  const handlePortfolioUpdate = async (item) => {
    setUpdateShowPopup(true);

    setInputs(item);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await updatePortfolio(inputs, inputs._id);

    if (response.success) {
      response?.data &&
        popAlert("Success!", response?.data?.message, "success").then((res) => {
          setLoading(false);
          setShowPopup(false);
          window.location.reload();
        });
    } else {
      response?.data?.message &&
        popAlert("Error!", response?.data?.message, "error");
      response?.data?.data && setErrors(response.data.data);
      setLoading(false);
    }
  };

  //update priofile Image
  const handleProfileImage = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await uploadProfileImage(userInputs, authState.user._id);

    if (response.success) {
      response?.data &&
        popAlert("Success!", response?.data?.message, "success").then((res) => {
          setLoading(false);
          setShowPopup(false);
          window.location.reload();
        });
    } else {
      response?.data?.message &&
        popAlert("Error!", response?.data?.message, "error");
      response?.data?.data && setErrors(response.data.data);
      setLoading(false);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    setInputs("");
  };

  const handleProfileImageClose = () => {
    setImageShowPopup(false);
  };

  //get birthday date
  const birthday = new Date(authState.user.birthday);
  const birthdate = birthday.toLocaleDateString();

  //get all portfolios
  useEffect(() => {
    let unmounted = false;

    if (!unmounted) setIsLoading(true);

    const profileFirebaseRef = authState?.user?.profileImg?.firebaseStorageRef;
    if (profileFirebaseRef) {
      const url = getDownloadURLFromFirebaseRef(profileFirebaseRef);
      if (!unmounted) setProfileImg(url);
    }

    const fetchAndSet = async () => {
      const response = await getPortfolios(
        authState.user._id,
        pagination.page,
        pagination.limit,
        pagination.orderBy
      );

      if (response.success) {
        if (!response.data) return;

        const iPortfolio = response?.data?.content || [];

        for (const portfolio of iPortfolio) {
          const imageRef = portfolio?.image?.firebaseStorageRef;
          if (imageRef)
            portfolio.image = await getDownloadURLFromFirebaseRef(imageRef);
        }

        setPortfolios(iPortfolio);
      } else {
        console.error(response?.data);
      }
      if (!unmounted) setIsLoading(false);
    };

    fetchAndSet();

    return () => {
      unmounted = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination, refresh, authState]);

  return (
    <React.Fragment>
      <Box sx={{ mt: 10, px: 12 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <Card sx={{ width: "50", position: "relative" }}>
              <CardMedia
                component="img"
                alt="person"
                height="200"
                image={per1}
                sx={{
                  "&:hover": {
                    opacity: 0.8,
                  },
                }}
              />
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  opacity: 0,
                  transition: "opacity 0.3s",
                  textAlign: "center",
                  width: "100%",
                  p: 12,
                  color: "white",
                  backgroundColor: "rgba(0, 0, 0, 0.2)",
                  "&:hover": {
                    opacity: 1,
                  },
                }}
              >
                <IconButton onClick={() => setImageShowPopup(true)}>
                  <EditIcon />
                </IconButton>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="h5" sx={{ fontWeight: "bold" }}>
              {authState.user.name}
            </Typography>

            <Typography sx={{ fontWeight: "bold", my: 1 }}>
              Address : {authState.user.name}
            </Typography>
            <Typography sx={{ fontWeight: "bold", my: 1 }}>
              Birthday : {birthdate}
            </Typography>
            <Typography sx={{ fontWeight: "bold", my: 1 }}>
              Contact : {authState.user.mobileNumber}
            </Typography>
            <Typography sx={{ fontWeight: "bold", my: 1 }}>
              Sex : {authState.user.gender}
            </Typography>
          </Grid>
        </Grid>
        {authState.user.type === "Tour Guide" ? (
          <Box sx={{ mt: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={8} sx={{ mb: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                  Guide Portfolio
                </Typography>
              </Grid>
              <Grid item xs={4} sx={{ textAlign: "right" }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => setShowPopup(true)}
                >
                  Add New
                </Button>
              </Grid>
              {portfolios &&
                portfolios.map((item) => (
                  <Grid item xs={6} key={item._id}>
                    <PortfolioCard
                      image={item.image}
                      description={item.description}
                      handleDelete={() => handlePortfolioDelete(item._id)}
                      handleUpdate={() => handlePortfolioUpdate(item)}
                    />
                  </Grid>
                ))}
            </Grid>
          </Box>
        ) : (
          ""
        )}
      </Box>

      {/* pop up for create portfolio*/}

      <Popup
        title="Create new Post"
        width={800}
        show={showPopup}
        onClose={handlePopupClose}
      >
        <Box sx={{ mb: 2 }}>
          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ mb: 2 }}>
                <Input
                  fullWidth
                  type="file"
                  onChange={(e) =>
                    setInputs({ ...inputs, image: e.target.files[0] })
                  }
                />
              </Box>
              {/* <Box>
                {inputs.image && (
                  <CardMedia
                    component="img"
                    image={URL.createObjectURL(inputs.image)}
                    sx={{ my: 2, maxWidth: "100%" }}
                  />
                )}
              </Box> */}

              <TextField
                name="description"
                variant="filled"
                label="Description"
                fullWidth
                multiline
                maxRows={4}
                value={inputs.description}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    description: e.target.value,
                  })
                }
              />
              {errors["description"] && (
                <Typography color="error">{errors["description"]}</Typography>
              )}
            </Box>

            <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="reset"
                variant="contained"
                onClick={handleClear}
                sx={{ py: 2, px: 5, mr: 2, backgroundColor: colors.grey }}
              >
                Clear
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ py: 2, px: 5 }}
                disabled={loading}
              >
                {loading ? <CircularProgress color="secondary" /> : "Save"}
              </Button>
            </Box>
          </form>
        </Box>
      </Popup>

      {/* pop up for update portfolio*/}

      <Popup
        title="Update the Post"
        width={800}
        show={updateShowPopup}
        onClose={handleUpdatePopupClose}
      >
        <Box sx={{ mb: 2 }}>
          <form onSubmit={handleUpdateSubmit}>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ mb: 2 }}>
                <Input
                  fullWidth
                  type="file"
                  onChange={(e) =>
                    setInputs({ ...inputs, image: e.target.files[0] })
                  }
                />
              </Box>
              {/* <Box>
                {inputs.image && (
                  <CardMedia
                    component="img"
                    image={URL.createObjectURL(inputs.image)}
                    sx={{ my: 2, maxWidth: "100%" }}
                  />
                )}
              </Box> */}

              <TextField
                name="description"
                variant="filled"
                label="Description"
                fullWidth
                multiline
                maxRows={4}
                value={inputs.description}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    description: e.target.value,
                  })
                }
              />
              {errors["description"] && (
                <Typography color="error">{errors["description"]}</Typography>
              )}
            </Box>

            <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="reset"
                variant="contained"
                onClick={handleClear}
                sx={{ py: 2, px: 5, mr: 2, backgroundColor: colors.grey }}
              >
                Clear
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ py: 2, px: 5 }}
                disabled={loading}
              >
                {loading ? <CircularProgress color="secondary" /> : "Save"}
              </Button>
            </Box>
          </form>
        </Box>
      </Popup>
      {/* pop up for update portfolio*/}

      <Popup
        title="Update the Post"
        width={800}
        show={updateShowPopup}
        onClose={handleUpdatePopupClose}
      >
        <Box sx={{ mb: 2 }}>
          <form onSubmit={handleUpdateSubmit}>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ mb: 2 }}>
                <Input
                  fullWidth
                  type="file"
                  onChange={(e) =>
                    setInputs({ ...inputs, image: e.target.files[0] })
                  }
                />
              </Box>
              {/* <Box>
                {inputs.image && (
                  <CardMedia
                    component="img"
                    image={URL.createObjectURL(inputs.image)}
                    sx={{ my: 2, maxWidth: "100%" }}
                  />
                )}
              </Box> */}

              <TextField
                name="description"
                variant="filled"
                label="Description"
                fullWidth
                multiline
                maxRows={4}
                value={inputs.description}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    description: e.target.value,
                  })
                }
              />
              {errors["description"] && (
                <Typography color="error">{errors["description"]}</Typography>
              )}
            </Box>

            <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="reset"
                variant="contained"
                onClick={handleClear}
                sx={{ py: 2, px: 5, mr: 2, backgroundColor: colors.grey }}
              >
                Clear
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ py: 2, px: 5 }}
                disabled={loading}
              >
                {loading ? <CircularProgress color="secondary" /> : "Save"}
              </Button>
            </Box>
          </form>
        </Box>
      </Popup>

      {/* pop up for profile Image*/}

      <Popup
        title="Set Profile Image"
        width={800}
        show={ImageShowPopup}
        onClose={handleProfileImageClose}
      >
        <Box sx={{ mb: 2 }}>
          <form onSubmit={handleProfileImage}>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ mb: 2 }}>
                <Input
                  fullWidth
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setInputs({ ...userInputs, profileImg: e.target.files[0] })
                  }
                />
              </Box>
            </Box>

            <Box sx={{ mb: 2, display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="reset"
                variant="contained"
                onClick={handleClear}
                sx={{ py: 2, px: 5, mr: 2, backgroundColor: colors.grey }}
              >
                Clear
              </Button>
              <Button
                type="submit"
                variant="contained"
                sx={{ py: 2, px: 5 }}
                disabled={loading}
              >
                {loading ? <CircularProgress color="secondary" /> : "Save"}
              </Button>
            </Box>
          </form>
        </Box>
      </Popup>
    </React.Fragment>
  );
};

export default Profile;
