import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Button,
  Typography,
  Grid,
  ButtonBase,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { updateDoc, doc, getDoc } from "firebase/firestore";

import { db } from "../../firebase";

const Img = styled("img")({
  margin: "auto",
  display: "block",
  maxWidth: "100%",
  maxHeight: "100%",
});

const FoodItem = ({ item }) => {
  const [open, setOpen] = useState(false);
  const [isPickedUp, setIsPickedUp] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const selectFoodItem = async (id) => {
    await updateDoc(doc(db, "foodListings", id), {
      isPickedUp: true,
    });
    setOpen(false);
  };

  getDoc(doc(db, "foodListings", item.id)).then((docSnap) => {
    if (docSnap.exists()) {
      setIsPickedUp(docSnap.data().isPickedUp);
    } else {
      console.log("No such document!");
    }
  });

  return (
    <Grid className="border border-solid p-2" container spacing={2}>
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
              Expiration:{" "}
              {new Date(item.expiration.seconds * 1000).toLocaleDateString(
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
            {!isPickedUp ? (
              <Button
                variant="contained"
                size="small"
                onClick={handleClickOpen}
              >
                Pick Up
              </Button>
            ) : (
              <Typography className="text-red-500">
                Has Been Picked Up
              </Typography>
            )}

            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Pickup Confirmation"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to pick up this food item?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} autoFocus>
                  Cancel
                </Button>
                <Button onClick={() => selectFoodItem(item.id)} autoFocus>
                  Confirm
                </Button>
              </DialogActions>
            </Dialog>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FoodItem;
