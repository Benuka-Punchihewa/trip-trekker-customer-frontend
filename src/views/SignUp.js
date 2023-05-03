import React, { useState, useEffect } from "react";
import {
  Box,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  Button,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import colors from "../assets/Style/colors";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [userType, setUserType] = useState("customer");

  const [RegInputs, setRegInputs] = useState();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [conError, setConError] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);

    // const response = await signUpUser(RegInputs);

    // if (response.success) {
    //   response?.data &&
    //     popAlert("Success!", response?.data, "success").then((res) => {});
    // } else {
    //   response?.data?.message &&
    //     popAlert("Error!", response?.data?.message, "error");
    //   response?.data?.data && setErrors(response.data.data);
    // }
    // setLoading(false);
  };

  const handleClear = () => {
    setRegInputs();
    setConfirmPassword("");
  };

  const handleChange = (event) => {
    setUserType(event.target.value);
  };

  //   useEffect(() => {
  //     let unmounted = false;

  //     if (RegInputs.password !== confirmPassword) {
  //       if (!unmounted) setConError("Password does not match!");
  //     } else {
  //       if (!unmounted) setConError("");
  //     }
  //     return () => {
  //       unmounted = true;
  //     };
  //   }, [confirmPassword, RegInputs.password]);

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 5,
        }}
      >
        <Box
          sx={{
            my: 6,
            borderRadius: 6,
            backgroundColor: colors.white,
            boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.25)",
            p: 3,
            width: 550,
          }}
        >
          <Box sx={{ mb: 2 }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              color="primary"
              textAlign={"center"}
              sx={{ mb: 3 }}
              style={{ color: "black" }}
            >
              Sign Up
            </Typography>
            <form onSubmit={handleRegisterSubmit}>
              <Box sx={{ mb: 2, m: 3 }}>
                <Typography>Register As :</Typography>
                <RadioGroup
                  row
                  aria-label="userType"
                  name="userType"
                  value={userType}
                  onChange={handleChange}
                >
                  <FormControlLabel
                    value="customer"
                    control={<Radio />}
                    label="Customer"
                  />
                  <FormControlLabel
                    value="tourGuide"
                    control={<Radio />}
                    label="Tour Guide"
                  />
                </RadioGroup>
              </Box>
              <Box sx={{ mb: 2, m: 3 }}>
                <TextField
                  variant="filled"
                  label="Name"
                  fullWidth
                  //   value={RegInputs.name}
                  //   onChange={(e) =>
                  //     setRegInputs({
                  //       ...RegInputs,
                  //       name: e.target.value,
                  //     })
                  //   }
                />
                {errors["name"] && (
                  <Typography color="error">{errors["name"]}</Typography>
                )}
              </Box>

              <Box sx={{ mb: 2, m: 3 }}>
                <TextField
                  variant="filled"
                  label="Address"
                  fullWidth
                  //   value={RegInputs.address}
                  //   onChange={(e) =>
                  //     setRegInputs({
                  //       ...RegInputs,
                  //       address: e.target.value,
                  //     })
                  //   }
                />
                {errors["address"] && (
                  <Typography color="error">{errors["address"]}</Typography>
                )}
              </Box>

              <Box sx={{ mb: 2, m: 3 }}>
                <TextField
                  variant="filled"
                  label="Contact Number"
                  fullWidth
                  //   value={RegInputs.contactNumber}
                  //   onChange={(e) =>
                  //     setRegInputs({
                  //       ...RegInputs,
                  //       contactNumber: e.target.value,
                  //     })
                  //   }
                />
                {errors["contactNumber"] && (
                  <Typography color="error">
                    {errors["contactNumber"]}
                  </Typography>
                )}
              </Box>

              <Box sx={{ mb: 2, m: 3 }}>
                <TextField
                  variant="filled"
                  label="E-mail"
                  type="email"
                  fullWidth
                  //   value={RegInputs.email}
                  //   onChange={(e) =>
                  //     setRegInputs({
                  //       ...RegInputs,
                  //       email: e.target.value,
                  //     })
                  //   }
                />
                {errors["email"] && (
                  <Typography color="error">{errors["email"]}</Typography>
                )}
              </Box>

              <Box sx={{ mb: 2, m: 3 }}>
                <TextField
                  variant="filled"
                  label="Password"
                  type="password"
                  fullWidth
                  //   value={RegInputs.password}
                  //   onChange={(e) =>
                  //     setRegInputs({
                  //       ...RegInputs,
                  //       password: e.target.value,
                  //     })
                  //   }
                />
                {errors["password"] && (
                  <Typography color="error">{errors["password"]}</Typography>
                )}
              </Box>

              <Box sx={{ mb: 2, m: 3 }}>
                <TextField
                  variant="filled"
                  label="Confirm Password"
                  type="password"
                  fullWidth
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {conError && <Typography color="error">{conError}</Typography>}
              </Box>

              <Box sx={{ mb: 2, m: 3 }}>
                {userType === "tourGuide" && (
                  <>
                    <Typography variant="h6">
                      Tour Guide License Information
                    </Typography>
                    <TextField
                      sx={{ mb: 2 }}
                      variant="filled"
                      label="License No"
                      type="text"
                      fullWidth
                      required
                    />
                    <Typography sx={{ mb: 2 }}>
                      Provide Your Tour Guide License as a PDF.
                    </Typography>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={(e) => {
                        setSelectedFile(e.target.files[0]);
                      }}
                      required
                    />
                  </>
                )}
              </Box>

              <Box
                sx={{
                  mb: 2,
                  mr: 3,
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
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
            <Box textAlign={"center"} sx={{ cursor: "pointer" }}>
              <Link to="/sign-in">
                <Typography variant="h7">Already have an account?</Typography>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default SignUp;
