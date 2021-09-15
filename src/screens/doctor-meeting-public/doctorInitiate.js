import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { useDispatch, useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";
import ApiService from "../../config/ApiService";
import axios from "axios";
import SessionServies from '../../config/session-service';

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100%)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },

  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    display: "flex",
    flexDirection: "column",
    height: "100%",
    position: "fixed",
    width: "100%",
    overflow: "auto",
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  doctorInititateForm: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    "& input": {
      background: "none",
      border: "none",
      outline: "none",
      border: "1px solid grey",
      borderRadius: "10px",
      padding: "10px",
      margin: "5px 12px 5px 0px",
      width: "100%",
    },
    "& > div": {
      background: "white",
      borderRadius: "20px",
      padding: "50px",
      width: "50%",
      "& > form > div": {
        margin: "10px auto",
      },
      [theme.breakpoints.down("sm")]: {
        width: "95%",
      },
    },
    "& button": {
      color: "#fff",
      borderRadius: 10,
    },
  },
  intro: {
    marginBottom: "30px !important",
  },
  underline: {
    width: 60,
    height: 6,
    background: theme.palette.primary.main,
    margin: "10px 0px",
  },
  head: {
    fontWeight: 600,
    fontSize: "20px",
    textTransform: "uppercase",
    color: theme.palette.primary.main,
  },
  subHead: {},
  label: {
    fontWeight: 600,
    textTransform: "uppercase",
  },
}));

function DoctorInitiate() {
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const [email, setEmail] = React.useState("");
  const [id, setId] = React.useState("");
  const [errors, setErrors] = React.useState("");
  const blackAndWhiteTheme = useSelector(
    (state) => state.theme.blackAndWhiteTheme
  );

  const joinMeetingDoc = async () => {
    setErrors("");
    await axios
      .get(ApiService.getBaseUrl() + `/doctors/${email}`)
      .then(async (res) => {
        var data = res.data.content;
        SessionServies.setSessionDoc(data[0]);
        if (data.length > 0) {
          await axios
            .get(ApiService.getBaseUrl() + `/workPlans/${id}`)
            .then((response) => {
              var meetingData = response.data.content;
              if (meetingData.length > 0) {

                history.push({
                  pathname: `/doctor-meeting/${id}`,
                  state: { docData: data, meetingData: meetingData },
                });
                
              } else {
                setErrors("Your Meeting ID has been wrong, Kindly check again");
              }
            })
            .catch((err) => console.log(err, "err"));
        } else {
          setErrors("Doctor email not Exists");
        }
      })
      .catch((err) => console.log(err, "err"));
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
        color={"primary"}
      >
        <Toolbar>
          <img
            src={"https://i.ibb.co/sKLFVC4/logo.png"}
            style={{
              width: "100px",
              filter: blackAndWhiteTheme ? "invert(1)" : "invert(0)",
            }}
          />
        </Toolbar>
      </AppBar>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <div className={classes.doctorInititateForm}>
          <div>
            <form
              action={"JavaScript:void(0)"}
              onSubmit={() => {
                joinMeetingDoc();
              }}
            >
              <div className={classes.intro}>
                <Typography className={classes.head}>
                  Get in the meeting!
                </Typography>
                <Typography className={classes.subHead}>
                  In order to join the doctor meeting please enter the below
                  details.
                </Typography>
                <div className={classes.underline} />
              </div>
              <div>
                <Typography className={classes.label}>Email</Typography>
                <input
                  placeholder="Please Enter Your Email Here..."
                  type={"email"}
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  required
                />
              </div>
              <div>
                <Typography className={classes.label}>ID</Typography>
                <input
                  placeholder="Please Enter Meeting ID Here..."
                  type={"text"}
                  value={id}
                  onChange={(e) => {
                    setId(e.target.value);
                  }}
                  required
                />
              </div>
              <div style={{ fontSize: "28px", color: "red" }}>
                {errors && errors !== "" ? errors : null}
              </div>
              <div style={{ textAlign: "right" }}>
                <Button
                  variant="contained"
                  color="primary"
                  disableElevation
                  type={"submit"}
                  endIcon={<ArrowRightAltIcon />}
                >
                  JOIN
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DoctorInitiate;
