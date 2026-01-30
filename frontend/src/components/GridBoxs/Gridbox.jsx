import React from "react";
import Cards from "../../components/cards/Cards.jsx";
import Grid from "@mui/material/Grid";
import CardsTwo from "../../components/cards/CardTwo.jsx";
import Box from "@mui/material/Box";

export default function Gridbox() {
  const image =
    "https://images.unsplash.com/photo-1544377193-33dcf4d68fb5?q=80&w=1000";
  return (
    <Box sx={{ flexGrow: 1, p: 4 }}>
      <Grid container spacing={4} justifyContent="center" alignItems="center">
        {/* Standard Grid items for better compatibility */}
        <Grid item xs={12} sm={6} md={3}>
          <Cards
            title="My Lesson Plan"
            subtitle="View Your Lesson Quarterly"
            image={image}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <CardsTwo />
        </Grid>
      </Grid>
    </Box>
  );
}
