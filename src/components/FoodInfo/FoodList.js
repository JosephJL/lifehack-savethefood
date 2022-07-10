import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import ButtonBase from "@mui/material/ButtonBase";
import { collection, query, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../firebase";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const FoodList = () => {
  const [foodData, setFoodData] = useState([]);
  useEffect(() => {
    const foodListingsRef = collection(db, "foodListings");
    const q = query(foodListingsRef);
    onSnapshot(q, (querySnapshot) => {
      let foodData = [];
      querySnapshot.forEach((doc) => {
        foodData.push(doc.data());
      });
      setFoodData(foodData);
    });
  }, []);

  return foodData.map((item) => (
    <Paper
      sx={{
        p: 2,
        margin: 2,
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? "#1A2027" : "#fff",
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="complex" src={item.image} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography
                gutterBottom
                variant="h6"
                fontWeight="fontWeightBold"
                component="div"
              >
                {item.title}
              </Typography>
              <Typography variant="subtitle1" component="div">
                {item.type}
              </Typography>
              <Typography variant="body2" component="div">
                Quantity: {item.quantity}
              </Typography>
              
              <Typography variant="body2" gutterBottom>
                Location : {item.location}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Expiration: {new Date(item.expiration.seconds * 1000).toLocaleDateString(
                  "en-US"
                )}
              </Typography>
              <Typography variant="body2" gutterBottom>
                Storage Instructions : {item.storage_details}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Donator: {item.username}
              </Typography>
            </Grid>
            <Grid item>
              <ButtonBase>
                <Typography sx={{ cursor: "pointer" }} variant="body2">
                  Pick Up
                </Typography>
              </ButtonBase>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  ));
};

export default FoodList;
