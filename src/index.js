    import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";
import NavBar from "./components/common/NavBar";
import { createTheme } from "@mui/material/styles";
import colors from "./assets/Style/colors";
import Footer from "./components/common/Footer";
import Hotels from "./views/Hotels";
import Attractions from "./views/Attractions";
import TourGuides from "./views/TourGuides";

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
    fontFamily: '"Poppins"',
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    // <React.StrictMode>
    <>
       
    <BrowserRouter>
       <NavBar/>
      <Routes>
        <Route path="/">
              <Route index element={<Home />} />
              <Route path="/hotels" element={<Hotels />} />
              <Route path="/attractions" element={<Attractions />} />
              <Route path="/tourGuides" element={<TourGuides />} />        
      </Route>
      </Routes>
      <Footer/>
      </BrowserRouter>
      </>
    // </React.StrictMode>
);
