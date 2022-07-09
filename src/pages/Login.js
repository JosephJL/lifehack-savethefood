import React from "react";
import { Grid, Typography } from "@material-ui/core";
import LoginForm from "../components/Login/LoginForm";
const Login = () => {
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
        <Grid item xs={3}>
          <Typography>
            <span>Welcome to </span>{" "}
            <span className="text-2xl text-green-600 font-bold">FoodHeroes</span>{" "}
          </Typography>
          <LoginForm />
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
