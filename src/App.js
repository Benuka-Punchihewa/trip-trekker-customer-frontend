import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import NavBar from "./components/common/NavBar";
import { createTheme } from "@mui/material/styles";
import colors from "./assets/Style/colors";
import Footer from "./components/common/Footer";
import Hotels from "./views/Hotels";
import Attractions from "./views/Attractions";
import TourGuides from "./views/TourGuides";
import "./global.css";
import { ThemeProvider } from "@emotion/react";
import "typeface-poppins";
import HotelDetails from "./views/HotelDetails";
import TourGuideDetails from "./views/TourGuideDetails";
import SignIn from "./views/SignIn";
import SignUp from "./views/SignUp";
import AttractionDetails from "./views/AttractionDetails";
import Profile from "./views/Profile";
import { useSelector } from "react-redux";

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary,
    },
    secondary: {
      main: "#000",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

const App = () => {
  const authState = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ flexGrow: 1 }}>
            <NavBar />
            <Routes>
              <Route path="/">
                <Route index element={<Home />} />
                <Route path="/hotels" element={<Hotels />} />
                <Route path="/attractions" element={<Attractions />} />
                <Route path="/tour-guides" element={<TourGuides />} />
                <Route path="/hoteldetails" element={<HotelDetails />} />
                <Route
                  path="/attractions/:id"
                  element={<AttractionDetails />}
                />
                <Route path="/tour-guides/:id" element={<TourGuideDetails />} />
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                {authState.isLoggedIn && (
                  <Route path="/profile" element={<Profile />} />
                )}
              </Route>
            </Routes>
          </div>
          <Footer />
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
