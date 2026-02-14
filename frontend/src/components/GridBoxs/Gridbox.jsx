import React from "react";
import Cards from "../../components/cards/Cards.jsx";
import Grid from "@mui/material/Grid";
import CardsTwo from "../../components/cards/CardTwo.jsx";
import Box from "@mui/material/Box";
import image1 from "../../assets/images/submit.jpg"
import image2 from "../../assets/images/lessonplan.jpg"
import { useNavigate } from "react-router-dom";

export default function Gridbox() {

  const navigate = useNavigate();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        {/* Standard Grid items for better compatibility */}
        <Grid item xs={12} sm={6} md={3}>
          <Cards
            title="My Lesson Plan"
            subtitle="View Your Lesson Quarterly"
            image={image2}
            onClick={() => navigate("/quaterview")}
            
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Cards
          title=" Submit Lesson Plan"
          subtitle="View Your Lesson Plan"
          image={image1}
          onClick={() => navigate("/subview")}
          />
        </Grid>
      </Grid>
    </Box>
  );
}
