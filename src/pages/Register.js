import { Grid, Typography} from "@material-ui/core";
import RegisterForm from "../components/Registration/RegisterForm";


const Register = () => {
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
          <Typography variant = "h4">
            Create an Account
          </Typography>
          <RegisterForm />
        </Grid>
      </Grid>
    </div>
  );
};

export default Register;
