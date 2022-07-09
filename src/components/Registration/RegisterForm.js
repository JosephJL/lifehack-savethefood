import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Button,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { TextInput, Select } from "@mantine/core";
import useInput from "../../hooks/use-input";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc, Timestamp } from "firebase/firestore";
import { auth, db } from "../../firebase";

const RegisterForm = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    navigate("/login");
  };

  const [data, setData] = useState({
    enteredName: "",
    enteredEmail: "",
    enteredPassword: "",
    enteredRole: "",
  });

  const {
    value: enteredName,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameInputBlurHandler,
    reset: nameReset,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailInputBlurHandler,
    reset: emailReset,
  } = useInput(
    (value) =>
      value.trim() !== "" &&
      value
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
  );

  const {
    value: enteredPassword,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordInputBlurHandler,
    reset: passwordReset,
  } = useInput((value) => value.trim() !== "" && value.length >= 6);

  const [enteredRole, setEnteredRole] = useState("");

  let formIsValid = false;

  if (nameIsValid && emailIsValid && passwordIsValid && enteredRole) {
    formIsValid = true;
  }
  const formSubmitHandler = async (event) => {
    event.preventDefault();
    if (!nameIsValid && !emailIsValid && !passwordIsValid && !enteredRole) {
      return;
    }
    setData({
      enteredName: enteredName,
      enteredEmail: enteredEmail,
      enteredPassword: enteredPassword,
      enteredRole: enteredRole,
    });

    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        enteredEmail,
        enteredPassword
      );

      await setDoc(doc(db, "users", result.user.uid), {
        uid: result.user.uid,
        enteredName,
        enteredEmail,
        enteredRole,
        createdAt: Timestamp.fromDate(new Date()),
      });
      setData({ enteredName: "", email: "", password: "" });
    } catch (err) {
      console.log(err);
    }
    nameReset();
    passwordReset();
    emailReset();
    setEnteredRole("");
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <Stack spacing={2}>
        <TextInput
          required
          placeholder="Enter Name"
          label="Name"
          type="name"
          style={{ width: 500 }}
          value={enteredName}
          onChange={nameChangeHandler}
          onBlur={nameInputBlurHandler}
          error={nameHasError}
        />
        <TextInput
          required
          placeholder="Enter Email"
          label="Email"
          type="email"
          style={{ width: 500 }}
          value={enteredEmail}
          onChange={emailChangeHandler}
          onBlur={emailInputBlurHandler}
          error={emailHasError}
        />
        <TextInput
          required
          placeholder="Enter Password"
          label="Password"
          type="password"
          description="Password has to be at least 6 characters long"
          style={{ width: 500 }}
          value={enteredPassword}
          onChange={passwordChangeHandler}
          onBlur={passwordInputBlurHandler}
          error={passwordHasError}
        />
        <Select
          required
          label="Role"
          value={enteredRole}
          style={{ width: 500 }}
          onChange={setEnteredRole}
          data={[
            { value: "donator", label: "Donator" },
            { value: "volunteer", label: "Volunteer" },
          ]}
        />
        <div>
          <Button
            style={{ maxWidth: "100px" }}
            variant="contained"
            type="submit"
            disabled={!formIsValid}
            onClick={handleClickOpen}
          >
            Register
          </Button>
          <Button onClick={handleClose} autoFocus>
            Return
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Successful Registration"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Registration was successful. You may now proceed to login to the
                application
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} autoFocus>
                Return to Login
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </Stack>
    </form>
  );
};

export default RegisterForm;
