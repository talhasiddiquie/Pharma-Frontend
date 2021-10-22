import React, { useState, useEffect } from "react";
import Routes from "./routes";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { useDispatch, useSelector } from "react-redux";
import AssignmentIcon from "@material-ui/icons/Assignment";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import DateRangeIcon from "@material-ui/icons/DateRange";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import Avatar from "@material-ui/core/Avatar";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import Button from "@material-ui/core/Button";
import * as UserActions from "../Store/Actions/user.actions";
import GroupIcon from "@material-ui/icons/Group";
import Chip from "@material-ui/core/Chip";
import StaticProfileImage from "../../assets/images/user-profile-icon.png";
import AssessmentIcon from "@material-ui/icons/Assessment";
import { useHistory } from "react-router-dom";
import * as EmployeeAttendace from "../Store/Actions/attendaceEmployee.actions";
import moment from "moment";
import ApiService from "../../config/ApiService";
var endTime = moment().format("HH:mm");
var todayDate = moment().format("DD-MM-YYYY");

const drawerWidth = 260;
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    // display:'none',
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
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
}));

function DrawerAndRoutes() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user.user);
  const [openVerticalSettings, setOpenVerticalSettings] = useState(false);
  const [openBusinessParamters, setOpenBusinessParamters] = useState(false);
  const [openEventParamters, setOpenEventParamters] = useState(false);
  const [openMeetingParamters, setOpenMeetingParamters] = useState(false);
  const [openReportsParamters, setOpenReportsParamters] = useState(false);

  const allEmployeeAttendance = useSelector(
    (state) => state.attendance.employeesAttendaces
  );

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const blackAndWhiteTheme = useSelector(
    (state) => state.theme.blackAndWhiteTheme
  );
  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    if (!allEmployeeAttendance) {
      dispatch(EmployeeAttendace.get_employee_attendances());
    }
  }, [allEmployeeAttendance]);

  function handleLogout() {
    for (var attendance in allEmployeeAttendance) {
      if (allEmployeeAttendance[attendance].todayDate === todayDate) {
        if (allEmployeeAttendance[attendance].employeeUserId === user._id) {
          let obj = {
            objectId: allEmployeeAttendance[attendance]._id,
            endTime: endTime,
          };
          dispatch(EmployeeAttendace.update_employee_attendance(obj));
        }
      }
    }
    dispatch(UserActions.remove_user());
    // dis

    // localStorage.clear()
  }

  return user && user.email !== undefined ? (
    // If user is logged in

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
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open)}
          >
            <MenuIcon />
          </IconButton>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              width: "100%",
              flexWrap: "wrap",
            }}
          >
            <Button
              color="secondary"
              startIcon={<ExitToAppIcon />}
              style={{
                marginTop: "4px",
              }}
              onClick={() => {
                handleLogout();
              }}
            >
              LOGOUT
            </Button>
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={[classes.drawerHeader]}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "20px",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
            }}
          >
            <img
              src={"https://i.ibb.co/sKLFVC4/logo.png"}
              style={{
                width: "100px",
                filter: blackAndWhiteTheme ? "invert(1)" : "invert(0)",
              }}
            />
          </div>
        </div>

        <Divider />

        <List className={"sidebar-content"}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "20px",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              alt="avatar"
              src={
                user.profileImage
                  ? ApiService.getAssestUrl() + user.profileImage
                  : StaticProfileImage
              }
              style={{ width: "110px", height: "110px", marginBottom: "8px" }}
            />
            <h1>{}</h1>
            <Typography variant="h6">{user.name}</Typography>
            <Chip
              label={user.designation}
              disabled
              variant="outlined"
              style={{
                borderRadius: "4px",
                background: "#16B9F4",
                color: "white",
                fontStyle: "bold",
                opacity: 1,
              }}
              // color={blackAndWhiteTheme ? "#000" : "secondary"}
            />
          </div>
          <Divider style={{ marginBottom: "10px" }} />
          <ListItem
            button
            key={"sidebar-home"}
            onClick={() => {
              history.push("/dashboard");
            }}
          >
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText primary={"Dashboard"} />
          </ListItem>
          <Divider />
          <ListItem
            button
            onClick={() => {
              setOpenVerticalSettings(!openVerticalSettings);
            }}
          >
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Vertical Settings" />
            {openVerticalSettings ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={openVerticalSettings} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {user && user.role === "admin" ? (
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => {
                    history.push("/vertical-settings/vertical-group-company");
                  }}
                >
                  <ListItemText primary="Vertical / Group / Company" />
                </ListItem>
              ) : null}
              {user && user.role === "admin" ? (
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => {
                    history.push("/vertical-settings/province");
                  }}
                >
                  <ListItemText primary="Province" />
                </ListItem>
              ) : null}
              {user && user.role === "admin" ? (
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => {
                    history.push("/vertical-settings/region");
                  }}
                >
                  <ListItemText primary="Region" />
                </ListItem>
              ) : null}
              {user && user.role === "admin" ? (
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => {
                    history.push("/vertical-settings/zone");
                  }}
                >
                  <ListItemText primary="Zone" />
                </ListItem>
              ) : null}

              {user && user.role === "admin" ? (
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => {
                    history.push("/vertical-settings/city");
                  }}
                >
                  <ListItemText primary="City" />
                </ListItem>
              ) : null}
              {user && user.role === "admin" ? (
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => {
                    history.push("/vertical-settings/territory");
                  }}
                >
                  <ListItemText primary="Territory" />
                </ListItem>
              ) : null}
              {user && user.role === "admin" ? (
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => {
                    history.push("/vertical-settings/brick");
                  }}
                >
                  <ListItemText primary="Brick" />
                </ListItem>
              ) : null}
              {(user && user.role === "admin") ||
              user.role === "representative" ||
              user.role === "National Manager" ||
              user.role === "Regional Manager" ||
              user.role === "Zonal Manager" ? (
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => {
                    history.push("/vertical-settings/clinic-hospital");
                  }}
                >
                  <ListItemText primary="Clinic / Hospital" />
                </ListItem>
              ) : null}
            </List>
          </Collapse>
          <Divider />
          <ListItem
            button
            onClick={() => {
              setOpenBusinessParamters(!openBusinessParamters);
            }}
          >
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Business Parameters" />
            {openBusinessParamters ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openBusinessParamters} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {(user && user.role === "admin") ||
              user.role === "representative" ||
              user.role === "National Manager" ||
              user.role === "Regional Manager" ||
              user.role === "Zonal Manager" ? (
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => {
                    history.push("/business-parameters/designation");
                  }}
                >
                  <ListItemText primary="Designation" />
                </ListItem>
              ) : null}

              {(user && user.role === "admin") ||
              user.role === "representative" ||
              user.role === "National Manager" ||
              user.role === "Regional Manager" ||
              user.role === "Zonal Manager" ? (
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => {
                    history.push("/business-parameters/qualification");
                  }}
                >
                  <ListItemText primary="Qualification" />
                </ListItem>
              ) : null}
              {(user && user.role === "admin") ||
              user.role === "representative" ||
              user.role === "National Manager" ||
              user.role === "Regional Manager" ||
              user.role === "Zonal Manager" ? (
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => {
                    history.push("/business-parameters/speciality");
                  }}
                >
                  <ListItemText primary="Speciality" />
                </ListItem>
              ) : null}

              {(user && user.role === "admin") ||
              user.role === "representative" ||
              user.role === "National Manager" ||
              user.role === "Regional Manager" ||
              user.role === "Zonal Manager" ? (
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => {
                    history.push("/business-parameters/tier");
                  }}
                >
                  <ListItemText primary="Tier" />
                </ListItem>
              ) : null}
              {(user && user.role === "admin") ||
              user.role === "representative" ||
              user.role === "National Manager" ||
              user.role === "Regional Manager" ||
              user.role === "Zonal Manager" ? (
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => {
                    history.push("/business-parameters/doctor");
                  }}
                >
                  <ListItemText primary="Doctor" />
                </ListItem>
              ) : null}
              {user && user.role === "admin" ? (
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => {
                    history.push("/business-parameters/representative");
                  }}
                >
                  <ListItemText primary="Representative" />
                </ListItem>
              ) : null}
              {(user && user.role === "admin") ||
              user.role === "representative" ||
              user.role === "National Manager" ||
              user.role === "Regional Manager" ||
              user.role === "Zonal Manager" ? (
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => {
                    history.push("/business-parameters/product");
                  }}
                >
                  <ListItemText primary="Product" />
                </ListItem>
              ) : null}
              {(user && user.role === "admin") ||
              user.role === "representative" ||
              user.role === "National Manager" ||
              user.role === "Regional Manager" ||
              user.role === "Zonal Manager" ? (
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => {
                    history.push("/business-parameters/add-selling-pitch");
                  }}
                >
                  <ListItemText primary="Add Selling Pitch" />
                </ListItem>
              ) : null}
              {(user && user.role === "admin") ||
              user.role === "representative" ||
              user.role === "National Manager" ||
              user.role === "Regional Manager" ||
              user.role === "Zonal Manager" ? (
                <ListItem
                  button
                  className={classes.nested}
                  onClick={() => {
                    history.push("/business-parameters/add-survey");
                  }}
                >
                  <ListItemText primary="Add Survey" />
                </ListItem>
              ) : null}
            </List>
          </Collapse>
          <Divider />
          <ListItem
            button
            onClick={() => {
              setOpenEventParamters(!openEventParamters);
            }}
          >
            <ListItemIcon>
              <DateRangeIcon />
            </ListItemIcon>
            <ListItemText primary="Events Parameters" />
            {openEventParamters ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={openEventParamters} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                className={classes.nested}
                onClick={() => {
                  history.push("/events-parameters/events");
                }}
              >
                <ListItemText primary="Events" />
              </ListItem>
              <ListItem
                button
                className={classes.nested}
                onClick={() => {
                  history.push("/events-parameters/tourPlan");
                }}
              >
                <ListItemText primary="Authrization Work Plan" />
              </ListItem>
            </List>
          </Collapse>
          <Divider />
          <ListItem
            button
            onClick={() => {
              setOpenMeetingParamters(!openMeetingParamters);
            }}
          >
            <ListItemIcon>
              <MeetingRoomIcon />
            </ListItemIcon>
            <ListItemText primary="Meetings Parameters" />
            {openMeetingParamters ? <ExpandLess /> : <ExpandMore />}
          </ListItem>

          <Collapse in={openMeetingParamters} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                className={classes.nested}
                onClick={() => {
                  history.push("/meetings-parameters/initiate-meetings");
                }}
              >
                <ListItemText primary="Meeting Initiator" />
              </ListItem>
            </List>
          </Collapse>
          <Divider />
          <ListItem
            button
            onClick={() => {
              setOpenReportsParamters(!openReportsParamters);
            }}
          >
            <ListItemIcon>
              <AssessmentIcon />
            </ListItemIcon>
            <ListItemText primary="Reports Parameters" />
            {openReportsParamters ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={openReportsParamters} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                className={classes.nested}
                onClick={() => {
                  history.push("/reports-parameters/doctorReport");
                }}
              >
                <ListItemText primary="Doctor Report" />
              </ListItem>
              <ListItem
                button
                className={classes.nested}
                onClick={() => {
                  history.push("/reports-parameters/employeesReport");
                }}
              >
                <ListItemText primary="Employee Report" />
              </ListItem>
              <ListItem
                button
                className={classes.nested}
                onClick={() => {
                  history.push("/reports-parameters/kpiReport");
                }}
              >
                <ListItemText primary="KPI Report" />
              </ListItem>

              <ListItem
                button
                className={classes.nested}
                onClick={() => {
                  history.push("/reports-parameters/callsReport");
                }}
              >
                <ListItemText primary="Calls Report" />
              </ListItem>
              <ListItem
                button
                className={classes.nested}
                onClick={() => {
                  history.push("/reports-parameters/attendanceReport");
                }}
              >
                <ListItemText primary="Attendance Report" />
              </ListItem>
            </List>
          </Collapse>
        </List>
        <Divider />
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />

        <Routes />
      </main>
    </div>
  ) : (
    // If user is not logged in
    <div>
      <Routes />
    </div>
  );
}

export default DrawerAndRoutes;
