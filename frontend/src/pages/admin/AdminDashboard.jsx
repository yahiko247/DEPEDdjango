import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cards from "../../components/cards/Cards.jsx";
import { Background, DEPED, LessonPlan } from "../../assets/index.js";

//principal ni na dashboard

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  backgroundColor: "#2c8aad98",
}));

export default function AdminDashboard() {
  const navigate = useNavigate();
  const image = LessonPlan;

  return (
    //change routing to a different file for cleaner option kinda like an env but for routes

    <Cards
      title="View Lesson Plans"
      subtitle="View Teacher Lesson Plan"
      image={image}
      onClick={() => navigate("../view")}
    ></Cards>

    //   {/* Will have to find another use for this Card*/}
    //   {/* <Cards
    //     title="View Lesson Plans"
    //     subtitle="View Teacher Lesson Plan"
    //     image={image}
    //   ></Cards> */}

    // {/* <Box
    //   sx={{
    //     flexGrow: 1,
    //     minHeight: "100vh",
    //     position: "relative",
    //     backgroundImage: `url(${background})`,
    //     backgroundSize: "cover",
    //     backgroundPosition: "center center",
    //     backgroundAttachment: "fixed",
    //     display: "flex",
    //     justifyContent: "center",
    //     alignItems: "center",
    //     pt: { xs: "56px", sm: "64px" }, // padding-top equal to AppBar
    //   }}
    // >
    //   <Cards
    //     title="View Lesson Plans"
    //     subtitle="View Teacher Lesson Plan"
    //     image={image}
    //   ></Cards>
    //   <Cards
    //     title="View Lesson Plans"
    //     subtitle="View Teacher Lesson Plan"
    //     image={image}
    //   ></Cards>
    // </Box> */}
  );
}
