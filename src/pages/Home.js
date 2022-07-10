import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { Stack, Box, Typography } from "@mui/material";
import FoodList from "../components/FoodInfo/FoodList";
import NavBar from "../components/Navbar/NavBar";
import { auth, db } from "../firebase";
import CreateFoodButton from "../components/CreateFood/CreateFoodButton";
import { getDoc, doc } from "firebase/firestore";

const Home = () => {
  const loggedInUser = auth.currentUser.uid;
  const [userType, setUserType] = useState("");
  getDoc(doc(db, "users", loggedInUser)).then((docSnap) => {
    if (docSnap.exists()) {
      setUserType(docSnap.data().enteredRole);
    } else {
      console.log("No such document!");
    }
  });
  return (
    <Stack spacing={14}>
      <NavBar />
      <Grid container spacing={4} direction="column" alignItems="center">
        <Grid item xs={6} sm={12} md={12}>
          <Box className="text-center" style={{ width: "100%" }}>
            <Typography>
              <span className="text-2xl text-green-600 font-bold">
                FoodHero Packages
              </span>
            </Typography>
            {userType === "donator" ? <CreateFoodButton /> : null}
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
