import React from "react";
import { Grid } from "@material-ui/core";
import { Stack } from "@mui/material";
import { FoodList } from "../components/FoodInfo/FoodList";
import NavBar from "../components/Navbar/NavBar";
import CreateFoodButton from "../components/CreateFood/CreateFoodButton";

const Home = () => {
  return (
    <Stack spacing={10}>
      <NavBar />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid Grid item xs={10} sm={12} md={12}>
          <CreateFoodButton />
        </Grid>
        <Grid item xs={10} sm={12} md={12}>
          <FoodList />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default Home;
