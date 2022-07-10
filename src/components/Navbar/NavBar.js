import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { auth, db } from "../../firebase";
import { signOut } from "firebase/auth";
import { updateDoc, doc, getDoc } from "firebase/firestore";

export default function NavBar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [userType, setUserType] = useState("");
  const loggedInUser = auth.currentUser.uid;
  const navigate = useNavigate();
  const handleLogout = async () => {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      isOnline: false,
    });
    await signOut(auth);
    navigate("/login");
  };

  getDoc(doc(db, "users", loggedInUser)).then((docSnap) => {
    if (docSnap.exists()) {
      setUserType(docSnap.data().enteredRole);
    } else {
      console.log("No such document!");
    }
  });


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleListings = () => {
    navigate("/listings");
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" color="inherit">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            FoodHeroes
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {userType === "donator" ? (
                  <MenuItem onClick={handleListings}>Listings</MenuItem>
                ) : null}

                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
