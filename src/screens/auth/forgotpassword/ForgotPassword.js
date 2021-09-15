import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import * as Actions from "../../../config/Store/Actions/user.actions";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { Redirect } from "react-router-dom";
import { useSnackbar } from "notistack";
const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(https://i.ibb.co/XCV0qgy/conference-bridge.png)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function ForgotPassword(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const redirectToForgot = useSelector((state) => state.user.forgotPassword);
  const [email, setEmail] = useState("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  function handleForgotPassword() {
    let obj = {
      email: email,
    };

    dispatch(Actions.user_forgot_paasword(obj, enqueueSnackbar));

    setEmail("");
  }

  return (
    <Grid container component="main" className={classes.root}>
      {redirectToForgot == "redirectemailverification" ? (
        <Redirect push to="/emailverificationcode" />
      ) : null}
      <CssBaseline />
      <Grid item xs={false} sm={false} md={7} className={classes.image}></Grid>
      <img src={"https://i.ibb.co/sKLFVC4/logo.png"} className={"loginLogo"} />
      <Grid item xs={12} sm={12} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Forgot Password
          </Typography>
          <form
            className={classes.form}
            action={"javascript:void(0)"}
            onSubmit={() => {
              handleForgotPassword();
            }}
          >
            <FormControl variant="outlined" style={{ width: "100%" }}>
              <InputLabel htmlFor="outlined-adornment-password">
                Email Address
              </InputLabel>
              <OutlinedInput
                id="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </FormControl>

            <Grid container>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Submit
              </Button>
            </Grid>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
