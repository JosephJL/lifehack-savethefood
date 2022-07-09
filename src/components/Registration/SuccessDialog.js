import { useState } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export default function SuccessDialog() {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
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
          <Button onClick={handleClose()} autoFocus>
            Return to Login
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}