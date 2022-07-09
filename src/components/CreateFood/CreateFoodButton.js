import { useState } from "react";

import { Button, Stack, Typography } from "@mui/material";
import useInput from "../../hooks/use-input";
import { Modal, TextInput, Textarea, Box } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { auth, db, storage } from "../../firebase";
import { ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { collection, addDoc } from "firebase/firestore";

export default function CreateFoodButton() {
  const loggedInUser = auth.currentUser.uid;
  const [open, setOpen] = useState(false);
  const [enteredQuantity, setEnteredQuantity] = useState("");
  const [enteredDetails, setEnteredDetails] = useState("");
  const [enteredExpiration, setEnteredExpiration] = useState(new Date());
  const [img, setImg] = useState("");

  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const {
    value: enteredTitle,
    isValid: titleIsValid,
    hasError: titleHasError,
    valueChangeHandler: titleChangeHandler,
    inputBlurHandler: titleInputBlurHandler,
    reset: titleReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredLocation,
    isValid: locationIsValid,
    hasError: locationHasError,
    valueChangeHandler: locationChangeHandler,
    inputBlurHandler: locationInputBlurHandler,
    reset: locationReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredType,
    isValid: typeIsValid,
    hasError: typeHasError,
    valueChangeHandler: typeChangeHandler,
    inputBlurHandler: typeInputBlurHandler,
    reset: typeReset,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;

  if (titleIsValid && locationIsValid && typeIsValid) {
    formIsValid = true;
  }

  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (!formIsValid) {
      return;
    }

    let url;
    if (img) {
      const imgRef = ref(
        storage,
        `images/${new Date().getTime()} - ${img.name}`
      );
      const snap = await uploadBytes(imgRef, img);
      const dlUrl = await getDownloadURL(ref(storage, snap.ref.fullPath));
      url = dlUrl;
    }

    try {
      await addDoc(collection(db, "donators", loggedInUser, "foodItems"), {
        title: enteredTitle,
        location: enteredLocation,
        type: enteredType,
        image: url || "",
        quantity: enteredQuantity,
        expiration: enteredExpiration,
        storage_details: enteredDetails,
      });
    } catch (err) {
      console.log(err);
    }
    url="";
    titleReset();
    locationReset();
    typeReset();
    setEnteredExpiration(new Date());
    setEnteredDetails("");
    setEnteredQuantity("");
    setOpen(false);
  };

  return (
    <>
      <Button variant="contained" onClick={handleClick}>
        Donate Food
      </Button>
      <Modal opened={open} onClose={handleClose} title="Enter Details">
        <form onSubmit={formSubmitHandler}>
          <Stack spacing={2}>
            <TextInput
              required
              placeholder="Title of Food"
              label="Title"
              value={enteredTitle}
              onChange={titleChangeHandler}
              onBlur={titleInputBlurHandler}
              error={titleHasError}
            />
            <Textarea
              required
              placeholder="Enter Your Location"
              label="Location"
              value={enteredLocation}
              onChange={locationChangeHandler}
              onBlur={locationInputBlurHandler}
              error={locationHasError}
            />
            <TextInput
              required
              placeholder="Enter Type"
              label="Type"
              value={enteredType}
              onChange={typeChangeHandler}
              onBlur={typeInputBlurHandler}
              error={typeHasError}
            />
            <TextInput
              placeholder="Enter the Quantity"
              description="Estimated Weight of Food"
              label="Quantity"
              value={enteredQuantity}
              onChange={(event) => {
                setEnteredQuantity(event.target.value);
              }}
            />
            <DatePicker
              required
              placeholder="Expiration Date"
              label="Expiration Date"
              value={enteredExpiration}
              onChange={setEnteredExpiration}
            />

            <Textarea
              placeholder="Storage Details"
              label="Storage Details"
              value={enteredDetails}
              onChange={(event) => {
                setEnteredDetails(event.target.value);
              }}
            />
            <Button
              style={{
                backgroundColor: "#D3D3D3",
              }}
              variant="contained"
              component="label"
            >
              Upload Images
              <input
                type="file"
                id="img"
                accept="image/*"
                onChange={(e) => setImg(e.target.files[0])}
                style={{ display: "none" }}
              />
            </Button>
            <Typography className="text-xs text-gray-400">
              {img ? img.name : null}
            </Typography>
            <Box display="flex" flexDirection="column">
              <Button
                variant="contained"
                type="submit"
                disabled={!formIsValid}
                autoFocus
              >
                Submit
              </Button>
            </Box>
          </Stack>
        </form>
      </Modal>
    </>
  );
}
