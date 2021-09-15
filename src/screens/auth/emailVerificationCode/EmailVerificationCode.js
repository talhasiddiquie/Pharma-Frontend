import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import * as Actions from "../../../config/Store/Actions/user.actions";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FilledInput from "@material-ui/core/FilledInput";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import { useSnackbar } from "notistack";
import { Redirect } from "react-router-dom";
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

export default function EmailVerificationCode(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const redirectToForgot = useSelector((state) => state.user.forgotPassword);
  const [evc, setEvc] = useState("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  function handleLogin() {
    let obj = {
      otp: evc,
    };

    dispatch(Actions.user_verification_code(obj, enqueueSnackbar));
  }

  return (
    <Grid container component="main" className={classes.root}>
      {redirectToForgot == "redirecttoupdatepassword" ? (
        <Redirect push to="/updatepassword" />
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
            Email Verfication Code
          </Typography>
          <form
            className={classes.form}
            action={"javascript:void(0)"}
            onSubmit={() => {
              handleLogin();
            }}
          >
            <FormControl
              variant="outlined"
              style={{ width: "100%", marginBottom: "10px" }}
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Email Verification Code
              </InputLabel>
              <OutlinedInput
                id="outlined"
                margin="normal"
                required
                fullWidth
                id="emailverificationcode"
                label="Email Verification Code"
                name="emailverificationcode"
                autoComplete="emailverificationcode"
                autoFocus
                value={evc}
                onChange={(e) => {
                  setEvc(e.target.value);
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
