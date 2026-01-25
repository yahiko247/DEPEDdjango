import React from 'react'
import Cards from "../../components/cards/Cards.jsx";
import Grid from "@mui/material/Grid";
import CardsTwo from "../../components/cards/CardTwo.jsx";
import Box from '@mui/material/Box';

export default function Gridbox() {
  return (
     <Box sx={{ flexGrow: 1, p: 4 }}>
          <Grid
            container
            spacing={4}
            justifyContent="center"
            alignItems="center"
          >
            {/* Standard Grid items for better compatibility */}
            <Grid item xs={12} sm={6} md={3}>
              <Cards />
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <CardsTwo />
            </Grid>
          </Grid>
        </Box>
  )
}
