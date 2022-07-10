import React from "react";
import { Grid } from "@material-ui/core";
import { Stack, Box, Typography } from "@mui/material";
import FoodList from "../components/FoodInfo/FoodList";
import NavBar from "../components/Navbar/NavBar";
import CreateFoodButton from "../components/CreateFood/CreateFoodButton";

const Home = () => {
  return (
    <Stack spacing={14}>
      <NavBar />
      <Grid
        container
        spacing={4}
        direction="column"
        alignItems="center"
  
      >
        <Grid item xs={6} sm={12} md={12}>
          <Box className="text-center" style={{ width: "100%" }}>
            <Typography>
              <span className="text-2xl text-green-600 font-bold">
                FoodHero Packages
              </span>
            </Typography>
            <CreateFoodButton />
          </Box>
        </Grid>

        <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          style={{ minHeight: "100vh" }}
          item
        >
          <Grid item xs={10} sm={12} md={12}>
            <FoodList />
          </Grid>
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Home;
