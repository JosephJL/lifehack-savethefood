import { auth, db } from "../firebase";

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { collection, query, onSnapshot } from "firebase/firestore";
import {
  Grid,
  Typography,
  ButtonBase,
  Stack,
  Box,
  Button,
} from "@mui/material";
import NavBar from "../components/Navbar/NavBar";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const Listings = () => {
  const [listings, setListings] = useState([]);
  const loggedInUser = auth.currentUser.uid;
  const navigate = useNavigate();

  useEffect(() => {
    const listingsRef = collection(db, "donators", loggedInUser, "foodItems");
    const q = query(listingsRef);
    onSnapshot(q, (querySnapshot) => {
      let listings = [];
      querySnapshot.forEach((doc) => {
        listings.push(doc.data());
      });
      setListings(listings);
    });
  }, [loggedInUser]);
  console.log(listings);
  if (!listings || listings.length === 0) {
    return (
      <Stack spacing={14}>
        <NavBar />
        <Box className="text-center" style={{ width: "100%" }}>
          <Typography>
            <span className="text-2xl text-green-600 font-bold text-center w-full">
              My Listings
            </span>
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/home");
            }}
          >
            Return to Home
          </Button>
          <Typography>No listings</Typography>
        </Box>
      </Stack>
    );
  }
  return (
    <Stack spacing={14}>
      <NavBar />
      <Stack spacing={6}>
        <Box className="text-center space-y-2" style={{ width: "100%" }}>
          <Typography>
            <span className="text-2xl text-green-600 font-bold text-center w-full">
              My Listings
            </span>
          </Typography>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/home");
            }}
          >
            Return to Home
          </Button>
        </Box>
        {listings.map((item) => {
          return (
            <Grid container spacing={0} direction="column" alignItems="center">
              <Grid
                container
                className="border border-solid rounded-sm p-4"
                spacing={2}
                direction="row"
                alignItems="center"
                justifyContent="center"
                style={{ width: 500 }}
              >
                <Grid item>
                  <ButtonBase sx={{ width: 128, height: 128 }}>
                    <Img alt="complex" src={item.image} />
                  </ButtonBase>
                </Grid>
                <Grid item xs={12} sm>
                  <Grid item xs container direction="column" spacing={0}>
                    <Stack spacing={1}>
                      <Typography
                        gutterBottom
                        variant="h4 bold"
                        component="div"
                      >
                        {item.title}
                      </Typography>
                      <Typography variant="body2" component="div">
                        Type: {item.type}
                      </Typography>
                      <Typography variant="body2" component="div">
                        Quantity: {item.quantity}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        Location : {item.location}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        Expiration :{" "}
                        {new Date(
                          item.expiration.seconds * 1000
                        ).toLocaleDateString("en-US")}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        Storage Instructions : {item.storage_details}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          );
        })}
      </Stack>
    </Stack>
  );
};

export default Listings;
