import React, { useState, useEffect } from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { useHistory, useLocation } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import { makeStyles } from "@material-ui/core/styles";
import * as UserActions from "../../../config/Store/Actions/user.actions";
import { useDispatch, useSelector } from "react-redux";
import { PieChart } from "react-minimal-pie-chart";
import Chart from "react-google-charts";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import moment from "moment";
import * as RepresentativeActions from "../../../config/Store/Actions/representative.actions";
import * as CityActions from "../../../config/Store/Actions/city.action";
import * as ZoneActions from "../../../config/Store/Actions/zone.action";
import * as EmployeeAttendace from "../../../config/Store/Actions/attendaceEmployee.actions";
import * as UsersActions from "../../../config/Store/Actions/user.actions";
import Avatar from "@material-ui/core/Avatar";
import CallIcon from "@material-ui/icons/Call";
import PersonIcon from "@material-ui/icons/Person";
import AutorenewIcon from "@material-ui/icons/Autorenew";
import NotesIcon from "@material-ui/icons/Notes";
import ReportIcon from "@material-ui/icons/Report";
import { Pie } from "react-chartjs-2";
import { Divider } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 200,
    width: "100%",
    marginTop: 20,
  },
  chartContainer: {
    height: "300px",
    margin: "50px",
    width: "300px",
  },
  formControl: {
    margin: theme.spacing(3),
    minWidth: 140,
  },
  chartContainerDiv: {
    marginLeft: "50px",
    fontSize: "xx-large",
  },
  barChartContainer: {
    margin: "30px",
    alignItems: "justifyContent",
  },
  cardDivSet: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardStyle: {
    background: "#16b9f4",
    height: "150px",
    width: "300px",
    boxShadow:
      " rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px",
    borderRadius: "30px",
    marginLeft: "25px",
  },
  cardUnderDiv: {
    display: "flex",
    flexDirection: "row",
    height: "100%",
  },
  cardUnderDiv2: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "20px",
    width: "100%",
    color: "white",
  },
}));

function Dashboard() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const user = useSelector((state) => state.user.user);
  const userLogedIn = useSelector((state) => state.user.userLogedIn);
  const allRepresentatives = useSelector(
    (state) => state.representative.allRepresentatives
  );
  const allCities = useSelector((state) => state.city.allCities);
  const allZone = useSelector((state) => state.zone.allZones);
  const [filter, setFilter] = useState("Today");
  const dispatch = useDispatch();
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    var userLogIn = location.state;
    if (userLogIn !== "" && userLogIn !== undefined) {
      //attendace not completed set first you should check today attendance is store or nor then add the attendance
      if (userLogedIn) {
        if (!allRepresentatives) {
          dispatch(RepresentativeActions.get_all_representatives());
        }
        if (!allCities) {
          dispatch(CityActions.get_cities());
        }
        if (!allZone) {
          dispatch(ZoneActions.get_zones());
        }

        var startTime = moment().format("HH:mm");
        var todayDate = moment().format("DD-MM-YYYY");
        let obj = {
          designation: user.designation,
          designationId: user.designationId,
          empEmail: user.email,
          employeeName: user.name,
          employeeRole: user.role,
          employeeUserId: user._id,
          status: "P",
          startTime: startTime,
          todayDate: todayDate,
        };

        var zoneName = "";
        //matched rep data wit user
        for (var key in allRepresentatives) {
          if (allRepresentatives[key].representativeId === user._id) {
            var zonesId = allRepresentatives[key].zoneId;
            //get rep city name
            for (var city in allCities) {
              if (
                allCities[city]._id === allRepresentatives[key].headquarterId
              ) {
                obj.cityName = allCities[city].name;
                obj.cityId = allCities[city]._id;
              }
            }
            //get rep zones name
            for (var i = 0; i < zonesId.length; i++) {
              for (var zone in allZone) {
                if (allZone[zone]._id === zonesId[i]) {
                  if (zoneName !== "") {
                    zoneName = zoneName + "," + allZone[zone].name;
                  } else {
                    zoneName = allZone[zone].name;
                  }
                }
              }
            }
          }
        }
        obj.zoneName = zoneName;
        obj.zonesIds = zonesId;

        dispatch(EmployeeAttendace.add_employee_attendance(obj));
        dispatch(UsersActions.user_loged_in_checked());
      }
    }

    if (!refresh) {
      dispatch(UserActions.all_users());
      setRefresh(true);
    }
  });

  const state = {
    labels: ["Present", "Absent", "Leave"],
    datasets: [
      {
        label: "Rainfall",
        backgroundColor: ["#00AEEF", "grey", "red"],
        data: [65, 59, 80],
      },
    ],
  };

  const vistor = {
    labels: ["Planned Calls", "Close Calls", "Postponed"],
    datasets: [
      {
        label: "Rainfall",
        backgroundColor: ["#00AEEF", "grey", "red"],
        data: [65, 59, 80],
      },
    ],
  };

  return user && user.email !== undefined ? (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          color="inherit"
          href="javascript:void(0)"
          onClick={() => {
            history.push("/dashboard");
          }}
        >
          Home
        </Link>
        <Typography color="textPrimary">Dashboard</Typography>
      </Breadcrumbs>

      <Card className={classes.root}>
        <Grid container className={classes.root} spacing={3}>
          <div className={classes.cardDivSet}>
            <Card className={classes.cardStyle}>
              <div className={classes.cardUnderDiv}>
                <div className={classes.cardUnderDiv2}>
                  <Typography style={{ color: "white" }} variant="h4">
                    4000
                  </Typography>
                  <Typography variant="h7">New Clients</Typography>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Avatar
                    style={{
                      backgroundColor: "white",
                      width: "50px",
                      height: "50px",
                    }}
                  >
                    <PersonIcon
                      style={{
                        color: "#16b9f4",
                        width: "35px",
                        height: "30px",
                      }}
                    />
                  </Avatar>
                </div>
              </div>
            </Card>

            <Card className={classes.cardStyle}>
              <div className={classes.cardUnderDiv}>
                <div className={classes.cardUnderDiv2}>
                  <Typography style={{ color: "white" }} variant="h4">
                    15
                  </Typography>
                  <Typography variant="h7">Total Repersentative</Typography>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Avatar
                    style={{
                      backgroundColor: "white",
                      width: "50px",
                      height: "50px",
                    }}
                  >
                    <AutorenewIcon
                      style={{
                        color: "#16b9f4",
                        width: "35px",
                        height: "30px",
                      }}
                    />
                  </Avatar>
                </div>
              </div>
            </Card>

            <Card className={classes.cardStyle}>
              <div className={classes.cardUnderDiv}>
                <div className={classes.cardUnderDiv2}>
                  <Typography style={{ color: "white" }} variant="h4">
                    5
                  </Typography>
                  <Typography variant="h7">Surveys</Typography>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Avatar
                    style={{
                      backgroundColor: "white",
                      width: "50px",
                      height: "50px",
                    }}
                  >
                    <NotesIcon
                      style={{
                        color: "#16b9f4",
                        width: "35px",
                        height: "30px",
                      }}
                    />
                  </Avatar>
                </div>
              </div>
            </Card>

            <Card className={classes.cardStyle}>
              <div className={classes.cardUnderDiv}>
                <div className={classes.cardUnderDiv2}>
                  <Typography style={{ color: "white" }} variant="h4">
                    12
                  </Typography>
                  <Typography variant="h7">PV-Reported</Typography>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Avatar
                    style={{
                      backgroundColor: "white",
                      width: "50px",
                      height: "50px",
                    }}
                  >
                    <ReportIcon
                      style={{
                        color: "#16b9f4",
                        width: "35px",
                        height: "30px",
                      }}
                    />
                  </Avatar>
                </div>
              </div>
            </Card>

            <Card className={classes.cardStyle}>
              <div className={classes.cardUnderDiv}>
                <div className={classes.cardUnderDiv2}>
                  <Typography style={{ color: "white" }} variant="h4">
                    100
                  </Typography>
                  <Typography variant="h7">Total Plan Calls</Typography>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Avatar
                    style={{
                      backgroundColor: "white",
                      width: "50px",
                      height: "50px",
                    }}
                  >
                    <CallIcon
                      style={{
                        color: "#16b9f4",
                        width: "35px",
                        height: "30px",
                      }}
                    />
                  </Avatar>
                </div>
              </div>
            </Card>
          </div>
          <div style={{ width: "100%", border: "10px", marginTop: "10px" }}>
            <Divider />
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "flex-end",
              marginTop: "10px",
            }}
          >
            <div style={{ width: "10%" }}>
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="Filter">Filter</InputLabel>

                <Select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  labelId="Filter"
                  label="Filter"
                  name="Filter"
                  fullWidth
                >
                  <MenuItem value={"Today"}>Today</MenuItem>
                  <MenuItem value={"Y-T-D"}>Y-T-D</MenuItem>
                  <MenuItem value={"M-T-D"}>M-T-D</MenuItem>
                </Select>
              </FormControl>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-around",
              marginTop: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h1>Attendance</h1>
              <div style={{ width: "400px" }}>
                <Pie
                  data={state}
                  options={{
                    legend: {
                      display: true,
                      position: "right",
                    },
                  }}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h1>Visit</h1>
              <div style={{ width: "400px" }}>
                <Pie
                  data={vistor}
                  options={{
                    legend: {
                      display: true,
                      position: "right",
                    },
                  }}
                />
              </div>
            </div>
          </div>
          <Grid xs={12}>
            <Chart
              className={classes.barChartContainer}
              width={"1000px"}
              height={"400px"}
              chartType="Bar"
              loader={<div>Loading Chart</div>}
              data={[
                ["Months", "Exen-D", "X-Bone", "Envera"],
                ["Aug", 1030, 540, 350],
                ["SEPT", 1000, 400, 200],
                ["OCT", 1170, 460, 250],
                ["Nov", 660, 1120, 300],
              ]}
              options={{
                // Material design options
                chart: {
                  title: "Products Performance",
                  // subtitle: 'Sales, Expenses, and Profit: 2017-2020',
                },
              }}
              // For tests
              rootProps={{ "data-testid": "2" }}
            />
          </Grid>
        </Grid>
      </Card>
    </>
  ) : null;
}

export default Dashboard;
