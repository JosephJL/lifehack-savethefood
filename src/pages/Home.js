import React from 'react'
import { Grid, Typography } from "@material-ui/core";
import { FoodList } from '../components/FoodInfo/FoodList';

const Home = () => {
    return (
        <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={10} sm={12} md={12}>
            <FoodList/>
        </Grid>
      </Grid>
    </div>
    )
}

export default Home
