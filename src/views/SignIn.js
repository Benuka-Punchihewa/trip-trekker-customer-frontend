import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";

import colors from "../assets/Style/colors";
import { Link } from "react-router-dom";

const SignIn = () => {
  const [inputs, setInputs] = useState();

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // const response = await createUser();
    // if (response.success) {
    //   setLoading(false);
    //   dispatch(authActions.login(response.data));
    //   response?.data &&
    //     popAlert("Success!", response?.data, "success").then((res) => {
    //       window.location.replace("/");
    //     });
    // } else {
    //   response?.data && popAlert("Error!", response?.data, "error");
    //   response?.data && setErrors(response.data);
    // }
    // setLoading(false);
  };

  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <Box
          sx={{
            borderRadius: 4,
            backgroundColor: colors.white,
            boxShadow: "0px 8px 25px rgba(0, 0, 0, 0.25)",
            p: 5,
            width: 400,
            textAlign: "center",
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
              Sign In
            </Typography>
            <form onSubmit={handleSubmit}>
              <Box sx={{ mb: 2, m: 3 }}>
                <TextField
                  id="outlined-basic"
                  variant="filled"
                  label="Email"
                  fullWidth
                  // value={inputs.email}
                  // onChange={(e) =>
                  //   setInputs({
                  //     ...inputs,
                  //     email: e.target.value,
                  //   })
                  // }
                />
                {errors["email"] && (
                  <Typography color="error">{errors["email"]}</Typography>
                )}
              </Box>

              <Box sx={{ mb: 2, m: 3, mt: 1 }}>
                <TextField
                  id="outlined-password-input"
                  variant="filled"
                  label="Password"
                  type="password"
                  fullWidth
                  // value={inputs.password}
                  // onChange={(e) =>
                  //   setInputs({
                  //     ...inputs,
                  //     password: e.target.value,
                  //   })
                  // }
                />
                {errors["password"] && (
                  <Typography color="error">{errors["password"]}</Typography>
                )}
              </Box>

              <Box sx={{ cursor: "pointer" }}>
                <Typography variant="h7" style={{ color: "black" }}>
                  Forget Your Password?
                </Typography>
              </Box>
              <Box sx={{ m: 2 }}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  disabled={loading}
                  style={{}}
                >
                  {loading ? <CircularProgress color="#28ac64" /> : "Sign In"}
                </Button>
              </Box>
            </form>
            <Box textAlign={"center"} sx={{ cursor: "pointer" }}>
              <Link to="/sign-up" underline="none">
                <Typography
                  style={{
                    color: "black",
                    textDecoration: "none",
                    textDecorationLine: "none",
                  }}
                >
                  Do you need to create an account?
                </Typography>
              </Link>
            </Box>
          </Box>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default SignIn;
