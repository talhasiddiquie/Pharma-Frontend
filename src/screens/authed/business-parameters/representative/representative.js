import React, { useState, useEffect } from "react";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { useHistory } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import axios from "axios";
import { Button, TextField } from "@material-ui/core";
import Autocomplete from "@mui/material/Autocomplete";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Card from "@material-ui/core/Card";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import VisibilityIcon from "@material-ui/icons/Visibility";
import SuccessIcon from "../../../components/Success&PendingIcon/SuccessIcon";
import PendingIcon from "../../../components/Success&PendingIcon/PendingIcon";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useSnackbar } from "notistack";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import { getModalUtilityClass } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid white",
    borderRadius: "4px",
    boxShadow: theme.shadows[5],
    padding: "20px",
    width: "45%",
    inHeight: "40%",
    [theme.breakpoints.down("sm")]: {
      width: "80%",
      inHeight: "55%",
    },
  },
  paperTwo: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid white",
    borderRadius: "4px",
    boxShadow: theme.shadows[5],
    padding: "20px",
    width: "35%",
    overflow: "scroll",
    inHeight: "50%",
    maxHeight: 800,
    [theme.breakpoints.down("sm")]: {
      width: "80%",
      inHeight: "55%",
    },
  },

  formDiv: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
  textFieldName: {
    width: "100%",
    [theme.breakpoints.down("sm")]: {
      width: "85%",
    },
  },
  textFieldSsid: {
    width: "100%",
    marginTop: "10px",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  styleTableHead: {
    padding: "5px",
    background: "#00AEEF",
    color: "white",
    fontWeight: "600",
  },
}));

const Representative = () => {
  const classes = useStyles();
  const history = useHistory();
  const [emp, setEmp] = useState([]);
  const [load, setLoad] = useState(false);
  const [open, setOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [getModal, setGetModal] = useState(false);
  const [role, setRole] = useState("");
  const [name, setName] = useState("");
  const [employeeCode, setEmployeeCode] = useState("");
  const [designationId, setDesignationId] = useState("");
  const [provinceid, setProvinceid] = useState([]);
  const [regionid, setRegionid] = useState([]);
  const [zoneid, setZoneid] = useState([]);
  const [territoryid, setTerritoryid] = useState([]);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  const [company, setCompany] = useState("");
  const [workType, setWorkType] = useState("");
  const [isActive, setIsActive] = useState("");
  const [password, setPassword] = useState("");
  const [Id, setId] = useState("");
  const [dropdownCompany, setDropDownCompany] = useState([]);
  const [dropdownRegion, setDropDownRegion] = useState([]);
  const [dropdownZone, setDropDownZone] = useState([]);
  const [dropdownTerritory, setDropDownTerritory] = useState([]);
  const [dropdownProvince, setDropDownProvince] = useState([]);

  const [dropDownDesignation, setDropDownDesignation] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  // const myArr = ["talhasiddquie10@gmail.com", "waji12@gmail.com"];
  // var result = [];
  // myArr.forEach(function (v) {
  //   const arr = v.match(/[-+]?[0-9]*\.?[0-9]+/g);
  //   result = result.concat(arr);
  // });
  // const filtered = result.map(function (x) {
  //   return parseInt(x, 10);
  // });
  // console.log(filtered);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

    setName("");
    setDesignationId("");
    setProvinceid([]);
    setPhone("");
    setEmail("");
    setGender("");
    setMaritalStatus("");
    setDateOfBirth("");

    setWorkType("");
    setCompany("");
    setPassword("");
    setIsActive("");
    setRegionid([]);
    setZoneid([]);
    setTerritoryid([]);
    setEmployeeCode("");
    setRole("");
  };

  const handleEditOpen = (id) => {
    setEditModal(true);
  };

  const handleEditClose = () => {
    setEditModal(false);

    setName("");

    setDesignationId("");
    setProvinceid([]);
    setPhone("");
    setEmail("");
    setGender("");
    setMaritalStatus("");
    setDateOfBirth("");

    setWorkType("");
    setCompany("");
    setPassword("");
    setIsActive("");
    setRegionid([]);
    setZoneid([]);
    setTerritoryid([]);
    setEmployeeCode("");
    setRole("");
  };

  const handleGetOpen = () => {
    setGetModal(true);
  };

  const handleGetClose = () => {
    setGetModal(false);

    setName("");
    setDesignationId("");
    setProvinceid([]);
    setPhone("");
    setEmail("");
    setGender("");
    setMaritalStatus("");
    setDateOfBirth("");
    setWorkType("");
    setCompany("");
    setPassword("");
    setIsActive("");
    setRegionid([]);
    setZoneid([]);
    setTerritoryid([]);
    setEmployeeCode("");
    setRole("");
  };

  const handleRegionChange = async (e, selectedObject) => {
    let List = [];
    if (selectedObject !== null) {
      for (let i = 0; i < selectedObject.length; i++) {
        List.push(selectedObject[i]);
      }
      setRegionid(List);
    }

    const provinceList = [];

    List.map((value) => {
      provinceList.push(value.provinceId);
    });
    setDropDownProvince(provinceList[0]);

   
  };

  const handleProvinceChange = async (e, selectedObject) => {
    let List = [];
    if (selectedObject !== null) {
      for (let i = 0; i < selectedObject.length; i++) {
        List.push(selectedObject[i]);
      }
      setProvinceid(List);
    }
    const Arr = [];
    let a = "";
    List.map((x) => {
      Arr.push({ provinceId: x.id });
      a = a + "provinceId=" + x.id + "&";
    });

    await axios
      .get(`${process.env.REACT_APP_URL}/zones/getZones?${a}`)
      .then((res) => {
        setDropDownZone(res.data.results);
      });
  };

  const handleZoneChange = async (e, selectedObject) => {
    let List = [];
    if (selectedObject !== null) {
      for (let i = 0; i < selectedObject.length; i++) {
        List.push(selectedObject[i]);
      }
      setZoneid(List);
    }
    const Arr = [];
    let a = "";
    List.map((x) => {
      Arr.push({ zoneId: x.id });
      a = a + "zoneId=" + x.id + "&";
    });

    await axios
      .get(`${process.env.REACT_APP_URL}/territory/getTerritories?${a}`)
      .then((res) => {
        setDropDownTerritory(res.data.results);
      });
  };

  const addRepresentative = async () => {
    //For Region Multi select

    const provinceId = [];
    provinceid.forEach((value) => provinceId.push(value.id));
    const regionId = [];
    regionid.forEach((value) => regionId.push(value.id));

    const zoneId = [];
    zoneid.forEach((value) => zoneId.push(value.id));

    const territoryId = [];
    territoryid.forEach((value) => territoryId.push(value.id));
    const form = {
      name,
      designationId,
      gender,
      provinceId,
      zoneId,
      regionId,
      territoryId,
      phone,
      email,
      maritalStatus,
      dateOfBirth,
      workType,
      company,
      password,
      isActive,
      employeeCode,
      role,
    };
    await axios
      .post(
        `${process.env.REACT_APP_URL}/representative/postRepresentative`,
        form
      )
      .then((res) => {
        console.log(res.data);
        enqueueSnackbar("Representative Add Successfully", {
          variant: "success",
        });
        setOpen(false);
        fetchRepresentative();
      })
      .catch(function (error) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
        console.log(error.response);
      });

    setName("");
    setDesignationId("");
    setProvinceid([]);
    setPhone("");
    setEmail("");
    setGender("");
    setMaritalStatus("");
    setDateOfBirth("");
    setWorkType("");
    setCompany("");
    setPassword("");
    setIsActive("");
    setRegionid([]);
    setZoneid([]);
    setTerritoryid([]);
    setRole("");
    setEmployeeCode("");
  };

  const viewRepresentativeData = async (id) => {
    const form = { id };
    let response = await axios.post(
      `${process.env.REACT_APP_URL}/representative/getRepresentative`,
      form
    );
    const dob = moment(response.data.dateOfBirth).format("DD MMM YYYY");

    const provinceArr = [];
    const provinceData = response.data.provinceId?.forEach((value) =>
      provinceArr.push(value.name + ", ")
    );

    const regionArr = [];
    const regionData = response.data.regionId?.forEach((value) =>
      regionArr.push(value.name + ", ")
    );
    const zoneArr = [];
    const zoneData = response.data.zoneId?.forEach((value) =>
      zoneArr.push(value.name + ", ")
    );
    const territoryArr = [];
    const territoryData = response.data.territoryId?.forEach((value) =>
      territoryArr.push(value.name + ", ")
    );

    setName(response.data.name);
    setDesignationId(response.data.designationId?.name);
    setPhone(response.data.phone);
    setEmail(response.data.email);
    setGender(response.data.gender);
    setMaritalStatus(response.data.maritalStatus);
    setDateOfBirth(dob);
    setWorkType(response.data.workType);
    setCompany(response.data.company?.name);
    setPassword(response.data.password);
    setIsActive(response.data.isActive);
    setProvinceid(provinceArr);
    setRegionid(regionArr);
    setZoneid(zoneArr);
    setTerritoryid(territoryArr);
    setEmployeeCode(response.data.employeeCode);
    setRole(response.data.role);
    setGetModal(true);
  };

  const getRepresentativeById = async (id) => {
    const form = { id };
    let response = await axios.post(
      `${process.env.REACT_APP_URL}/representative/getRepresentative`,
      form
    );
    const dob = moment(response.data.dateOfBirth).format("YYYY-MM-DD");
    setId(response.data.id);
    setName(response.data.name);
    setDesignationId(response.data.designationId?.id);
    setProvinceid(response.data.provinceId);
    setPhone(response.data.phone);
    setEmail(response.data.email);
    setGender(response.data.gender);
    setMaritalStatus(response.data.maritalStatus);
    setDateOfBirth(dob);
    setWorkType(response.data.workType);
    setCompany(response.data.company?.id);
    setPassword(response.data.password);
    setIsActive(response.data.isActive);
    setRegionid(response.data.regionId);
    setZoneid(response.data.zoneId);
    setTerritoryid(response.data.territoryId);
    setEmployeeCode(response.data.employeeCode);
    setRole(response.data.role);
    setEditModal(true);
  };

  const editRepresentative = async (id) => {
    const provinceId = [];
    provinceid.forEach((value) => provinceId.push(value.id));
    const regionId = [];
    regionid.forEach((value) => regionId.push(value.id));

    const zoneId = [];
    zoneid.forEach((value) => zoneId.push(value.id));

    const territoryId = [];
    territoryid.forEach((value) => territoryId.push(value.id));
    const form = {
      id,
      name,
      designationId,
      provinceId,
      zoneId,
      regionId,
      territoryId,
      gender,
      phone,
      email,
      maritalStatus,
      dateOfBirth,
      workType,
      company,
      password,
      isActive,
      role,
      employeeCode,
    };
    await axios
      .post(
        `${process.env.REACT_APP_URL}/representative/updateRepresentative`,
        form
      )
      .then((res) => {
        console.log(res.data);
        setEditModal(false);
        enqueueSnackbar("Representative Edit Successfully", {
          variant: "success",
        });
        fetchRepresentative();
      })
      .catch(function (error) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
        console.log(error.response);
      });

    setName("");
    setDesignationId("");
    setProvinceid([]);
    setPhone("");
    setEmail("");
    setGender("");
    setMaritalStatus("");
    setDateOfBirth("");
    setWorkType("");
    setCompany("");
    setPassword("");
    setIsActive("");
    setRegionid([]);
    setZoneid([]);
    setTerritoryid([]);
    setEmployeeCode("");
    setRole("");
  };

  const deleteRepresentative = (id) => {
    const form = { id };
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axios
              .post(
                `${process.env.REACT_APP_URL}/representative/deleteRepresentative`,
                form
              )
              .then((res) => {
                enqueueSnackbar("Representative Delete Successfully", {
                  variant: "success",
                });
                fetchRepresentative();
              })
              .catch(function (error) {
                console.log(error.response);
              });
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  //Get Region

  const fetchRepresentative = async () => {
    await axios
      .get(`${process.env.REACT_APP_URL}/representative/getRepresentatives`)
      .then((response) => {
        const allRepresentative = response.data.results;
        console.log(allRepresentative);
        setEmp(allRepresentative);
        setLoad(false);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  const provinceList = [];

  const filterprovince_Id = (res) => {
    for (let i = 0; i < res.data.results.length; i++) {
      provinceList.push(res.data.results);
    }
    let newList = [];
    provinceList[0].map((item) => {
      newList.push(item);
    });
    setDropDownRegion(newList);
  };

  const territoryList = [];

  const filterTerritoryId = (res) => {
    for (let i = 0; i < res.data.results.length; i++) {
      territoryList.push(res.data.results);
    }
    let newList = [];
    territoryList[0].map((item) => {
      newList.push(item);
    });
    setDropDownTerritory(newList);
  };

  useEffect(() => {
    fetchRepresentative();
  }, [load]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/regions/getRegions`)
      .then(async (res) => {
        await filterprovince_Id(res);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/territory/getTerritories`)
      .then(async (res) => {
        await filterTerritoryId(res);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/companies/getCompanies`)
      .then((res) => {
        setDropDownCompany(res.data?.results);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/designations/getDesignations`)
      .then((res) => {
        setDropDownDesignation(res.data.results);
      });
  }, []);
  return (
    <div>
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
        <Typography color="textPrimary">Business-Parameters</Typography>
        <Typography color="textPrimary">Representative</Typography>
      </Breadcrumbs>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
          marginBottom: "10px",
        }}
      >
        <Button
          style={{ width: "150px" }}
          variant="contained"
          color="primary"
          style={{ width: "200px", color: "white" }}
          onClick={handleOpen}
        >
          Add Representative
        </Button>
      </div>
      <div>
        <TableContainer
          style={{
            borderRadius: "4px",
            width: "100%",
            overflow: "auto",
            minWidth: "450px",
            overflowY: "auto",
          }}
          component={Paper}
        >
          <Table>
            <TableHead style={{ background: "#00AEEF" }}>
              <TableRow>
                <TableCell
                  style={{ fontWeight: "600", width: "15%", color: "white" }}
                >
                  Employee Code
                </TableCell>
                <TableCell
                  style={{ fontWeight: "600", width: "15%", color: "white" }}
                >
                  Name
                </TableCell>

                <TableCell
                  style={{ fontWeight: "600", width: "15%", color: "white" }}
                >
                  Email
                </TableCell>
                <TableCell
                  style={{ fontWeight: "600", width: "15%", color: "white" }}
                >
                  Phone
                </TableCell>
                <TableCell
                  style={{ fontWeight: "600", width: "15%", color: "white" }}
                >
                  Password
                </TableCell>
                <TableCell
                  style={{ fontWeight: "600", width: "15%", color: "white" }}
                >
                  Work Type
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "600",
                    width: "15%",
                    color: "white",
                    textAlign: "center",
                  }}
                >
                  isActive
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "600",
                    width: "15%",
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {emp.map((user, key, index) => {
                return (
                  <TableRow key={user.id}>
                    <TableCell component="th" scope="row">
                      {user.employeeCode}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {user.name}
                    </TableCell>

                    <TableCell>{user.email} </TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.password}</TableCell>
                    <TableCell>{user.workType}</TableCell>
                    <TableCell>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          flexWrap: "nowrap",
                          width: "130px",
                        }}
                      >
                        {user.isActive === true ? (
                          <SuccessIcon />
                        ) : (
                          <PendingIcon />
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Button
                          onClick={() => {
                            viewRepresentativeData(user.id);
                          }}
                        >
                          <VisibilityIcon color="primary" />
                        </Button>
                        <Button
                          onClick={() => {
                            getRepresentativeById(user.id);
                          }}
                        >
                          <EditIcon color="primary" />
                        </Button>

                        <Button
                          onClick={() => {
                            deleteRepresentative(user.id);
                          }}
                        >
                          <DeleteIcon color="secondary" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <h2 id="transition-modal-title">Add Representative</h2>

                <div className={classes.formDiv}>
                  <div style={{ display: "flex", width: "100%" }}>
                    <TextField
                      className={classes.textFieldName}
                      style={{ marginRight: "10px" }}
                      id="abc"
                      label="Employee Code"
                      name="employeecode"
                      variant="outlined"
                      value={employeeCode}
                      onChange={(e) => setEmployeeCode(e.target.value)}
                    />
                    <TextField
                      className={classes.textFieldName}
                      id="abc"
                      label="Name"
                      name="Name"
                      variant="outlined"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div style={{ display: "flex", width: "100%" }}>
                    <TextField
                      className={classes.textFieldSsid}
                      style={{ marginRight: "10px" }}
                      id="abc"
                      label="Email"
                      name="email"
                      variant="outlined"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                      className={classes.textFieldSsid}
                      id="abc"
                      type="password"
                      label="Password"
                      name="password"
                      variant="outlined"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div style={{ display: "flex", width: "100%" }}>
                    <FormControl
                      variant="outlined"
                      className={classes.textFieldSsid}
                      style={{ marginRight: "10px" }}
                    >
                      <InputLabel htmlFor="outlined-age-native-simple">
                        Role
                      </InputLabel>
                      <Select
                        onChange={(e) => setRole(e.target.value)}
                        id="abc"
                        value={role}
                        native
                        label="Role"
                      >
                        <option aria-label="None"> </option>
                        <option value="admin">Admin</option>
                        <option value="representative">Representative</option>
                        <option value="National Manager">
                          National Manager
                        </option>
                        <option value="Regional Manager">
                          Regional Manager
                        </option>
                        <option value="Zonal Manager">Zonal Manager</option>
                      </Select>
                    </FormControl>
                    <FormControl
                      variant="outlined"
                      className={classes.textFieldSsid}
                    >
                      <InputLabel htmlFor="outlined-age-native-simple">
                        Designation
                      </InputLabel>
                      <Select
                        // value={department}
                        onChange={(e) => setDesignationId(e.target.value)}
                        id="abc"
                        native
                        value={designationId}
                        label="Designation"
                      >
                        <option aria-label="None" />
                        {dropDownDesignation.map((value, index) => (
                          <option key={value.id} value={value.id}>
                            {value.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  <div style={{ display: "flex", width: "100%" }}>
                    <TextField
                      className={classes.textFieldSsid}
                      style={{ marginRight: "10px" }}
                      id="abc"
                      label="Phone"
                      name="phone"
                      variant="outlined"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />

                    <FormControl
                      variant="outlined"
                      className={classes.textFieldSsid}
                    >
                      <InputLabel htmlFor="outlined-age-native-simple">
                        Gender
                      </InputLabel>
                      <Select
                        onChange={(e) => setGender(e.target.value)}
                        id="abc"
                        value={gender}
                        native
                        label="Gender"
                      >
                        <option aria-label="None"> </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </Select>
                    </FormControl>
                  </div>

                  <div style={{ display: "flex", width: "100%" }}>
                    <TextField
                      style={{ marginTop: "10px" }}
                      className={classes.textFieldName}
                      id="date"
                      variant="outlined"
                      label="Date of Birth"
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />

                    <FormControl
                      variant="outlined"
                      className={classes.textFieldSsid}
                      style={{ marginLeft: "10px" }}
                    >
                      <InputLabel htmlFor="outlined-age-native-simple">
                        Marital Status
                      </InputLabel>
                      <Select
                        onChange={(e) => setMaritalStatus(e.target.value)}
                        id="abc"
                        value={maritalStatus}
                        native
                        label="Marital Status"
                      >
                        <option aria-label="None"> </option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                      </Select>
                    </FormControl>
                  </div>

                  <div style={{ display: "flex", width: "100%" }}>
                    <FormControl
                      variant="outlined"
                      className={classes.textFieldSsid}
                    >
                      <InputLabel htmlFor="outlined-age-native-simple">
                        IsActive
                      </InputLabel>
                      <Select
                        // onChange={(e) => setIsActive(e.target.value)}
                        onChange={(e) => {
                          setIsActive(e.target.value);
                        }}
                        id="abc"
                        value={isActive}
                        native
                        label="IsActive"
                      >
                        <option aria-label="None"> </option>
                        <option value={true}>True</option>
                        <option value={false}>False</option>
                      </Select>
                    </FormControl>

                    <FormControl
                      variant="outlined"
                      className={classes.textFieldSsid}
                      style={{ marginLeft: "10px" }}
                    >
                      <InputLabel htmlFor="outlined-age-native-simple">
                        Company
                      </InputLabel>
                      <Select
                        // value={department}
                        onChange={(e) => setCompany(e.target.value)}
                        id="abc"
                        native
                        value={company}
                        label="Company"
                      >
                        <option aria-label="None" />
                        {dropdownCompany?.map((value, index) => (
                          <option key={value.id} value={value.id}>
                            {value.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  <FormControl
                    variant="outlined"
                    className={classes.textFieldSsid}
                  >
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Work Type
                    </InputLabel>
                    <Select
                      onChange={(e) => setWorkType(e.target.value)}
                      id="abc"
                      value={workType}
                      native
                      label="Work Type"
                    >
                      <option aria-label="None"> </option>
                      <option value="Office">Office</option>
                      <option value="On Field">On Field</option>
                    </Select>
                  </FormControl>

                  <FormControl
                    variant="outlined"
                    className={classes.textFieldSsid}
                  >
                    <Autocomplete
                      multiple
                      id="tags-outlined"
                      options={dropdownRegion}
                      getOptionLabel={(option) => option.name}
                      value={regionid}
                      filterSelectedOptions
                      getOptionSelected={(option, value) => {
                        if (value === "") {
                          return true;
                        } else if (value === option) {
                          return true;
                        }
                      }}
                      onChange={handleRegionChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Region"
                        />
                      )}
                    />
                  </FormControl>

                  <FormControl
                    style={{
                      width: "100%",
                      marginTop: "10px",
                    }}
                    variant="outlined"
                  >
                    <Autocomplete
                      multiple
                      id="tags-outlined"
                      options={dropdownProvince}
                      getOptionLabel={(option) => option.name}
                      value={provinceid}
                      filterSelectedOptions
                      getOptionSelected={(option, value) => {
                        if (value === "") {
                          return true;
                        } else if (value === option) {
                          return true;
                        }
                      }}
                      onChange={handleProvinceChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Province"
                        />
                      )}
                    />
                  </FormControl>

                  <FormControl
                    variant="outlined"
                    className={classes.textFieldSsid}
                  >
                    <Autocomplete
                      multiple
                      id="tags-outlined"
                      options={dropdownZone}
                      getOptionLabel={(option) => option.name}
                      value={zoneid}
                      filterSelectedOptions
                      getOptionSelected={(option, value) => {
                        if (value === "") {
                          return true;
                        } else if (value === option) {
                          return true;
                        }
                      }}
                      onChange={handleZoneChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Zone"
                        />
                      )}
                    />
                  </FormControl>

                  <FormControl
                    variant="outlined"
                    className={classes.textFieldSsid}
                  >
                    <Autocomplete
                      multiple
                      id="tags-outlined"
                      options={dropdownTerritory}
                      getOptionLabel={(option) => option.name}
                      value={territoryid}
                      filterSelectedOptions
                      getOptionSelected={(option, value) => {
                        if (value === "") {
                          return true;
                        } else if (value === option) {
                          return true;
                        }
                      }}
                      onChange={(e, selectedObject) => {
                        if (selectedObject !== null) {
                          let List = [];
                          for (let i = 0; i < selectedObject.length; i++) {
                            List.push(selectedObject[i]);
                          }
                          setTerritoryid(List);
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Territory"
                        />
                      )}
                    />
                  </FormControl>

                  <Button
                    onClick={addRepresentative}
                    className={classes.btn}
                    variant="contained"
                    style={{
                      backgroundColor: "#69c9ef",
                      color: "#fff",
                      marginTop: "20px",
                    }}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={editModal}
          onClose={handleEditClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={editModal}>
            <div className={classes.paper}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <h2 id="transition-modal-title">Edit Representative</h2>
                <div className={classes.formDiv}>
                  <div style={{ display: "flex", width: "100%" }}>
                    <TextField
                      className={classes.textFieldName}
                      style={{ marginRight: "10px" }}
                      id="abc"
                      label="Employee Code"
                      name="employeecode"
                      variant="outlined"
                      value={employeeCode}
                      onChange={(e) => setEmployeeCode(e.target.value)}
                    />
                    <TextField
                      className={classes.textFieldName}
                      id="abc"
                      label="Name"
                      name="Name"
                      variant="outlined"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div style={{ display: "flex", width: "100%" }}>
                    <TextField
                      className={classes.textFieldSsid}
                      style={{ marginRight: "10px" }}
                      id="abc"
                      label="Email"
                      name="email"
                      variant="outlined"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                      className={classes.textFieldSsid}
                      id="abc"
                      type="password"
                      label="Password"
                      name="password"
                      variant="outlined"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div style={{ display: "flex", width: "100%" }}>
                    <FormControl
                      variant="outlined"
                      className={classes.textFieldSsid}
                      style={{ marginRight: "10px" }}
                    >
                      <InputLabel htmlFor="outlined-age-native-simple">
                        Role
                      </InputLabel>
                      <Select
                        onChange={(e) => setRole(e.target.value)}
                        id="abc"
                        value={role}
                        native
                        label="Role"
                      >
                        <option aria-label="None"> </option>
                        <option value="admin">Admin</option>
                        <option value="representative">Representative</option>
                        <option value="National Manager">
                          National Manager
                        </option>
                        <option value="Regional Manager">
                          Regional Manager
                        </option>
                        <option value="Zonal Manager">Zonal Manager</option>
                      </Select>
                    </FormControl>

                    <FormControl
                      variant="outlined"
                      className={classes.textFieldSsid}
                    >
                      <InputLabel htmlFor="outlined-age-native-simple">
                        Designation
                      </InputLabel>
                      <Select
                        // value={department}
                        onChange={(e) => setDesignationId(e.target.value)}
                        id="abc"
                        native
                        value={designationId}
                        label="Designation"
                      >
                        <option aria-label="None" />
                        {dropDownDesignation.map((value, index) => (
                          <option key={value.id} value={value.id}>
                            {value.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  <div style={{ display: "flex", width: "100%" }}>
                    <TextField
                      className={classes.textFieldSsid}
                      style={{ marginRight: "10px" }}
                      id="abc"
                      label="Phone"
                      name="phone"
                      variant="outlined"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />

                    <FormControl
                      variant="outlined"
                      className={classes.textFieldSsid}
                    >
                      <InputLabel htmlFor="outlined-age-native-simple">
                        Gender
                      </InputLabel>
                      <Select
                        onChange={(e) => setGender(e.target.value)}
                        id="abc"
                        value={gender}
                        native
                        label="Gender"
                      >
                        <option aria-label="None"> </option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </Select>
                    </FormControl>
                  </div>

                  <div style={{ display: "flex", width: "100%" }}>
                    <TextField
                      style={{ marginTop: "10px" }}
                      className={classes.textFieldName}
                      id="date"
                      variant="outlined"
                      label="Date of Birth"
                      type="date"
                      value={dateOfBirth}
                      onChange={(e) => setDateOfBirth(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />

                    <FormControl
                      variant="outlined"
                      className={classes.textFieldSsid}
                      style={{ marginLeft: "10px" }}
                    >
                      <InputLabel htmlFor="outlined-age-native-simple">
                        Marital Status
                      </InputLabel>
                      <Select
                        onChange={(e) => setMaritalStatus(e.target.value)}
                        id="abc"
                        value={maritalStatus}
                        native
                        label="Marital Status"
                      >
                        <option aria-label="None"> </option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                      </Select>
                    </FormControl>
                  </div>

                  <div style={{ display: "flex", width: "100%" }}>
                    <FormControl
                      variant="outlined"
                      className={classes.textFieldSsid}
                    >
                      <InputLabel htmlFor="outlined-age-native-simple">
                        IsActive
                      </InputLabel>
                      <Select
                        // onChange={(e) => setIsActive(e.target.value)}
                        onChange={(e) => {
                          setIsActive(e.target.value);
                        }}
                        id="abc"
                        value={isActive}
                        native
                        label="IsActive"
                      >
                        <option aria-label="None"> </option>
                        <option value={true}>True</option>
                        <option value={false}>False</option>
                      </Select>
                    </FormControl>

                    <FormControl
                      variant="outlined"
                      className={classes.textFieldSsid}
                      style={{ marginLeft: "10px" }}
                    >
                      <InputLabel htmlFor="outlined-age-native-simple">
                        Company
                      </InputLabel>
                      <Select
                        // value={department}
                        onChange={(e) => setCompany(e.target.value)}
                        id="abc"
                        native
                        value={company}
                        label="Company"
                      >
                        <option aria-label="None" />
                        {dropdownCompany.map((value, index) => (
                          <option key={value.id} value={value.id}>
                            {value.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  <FormControl
                    variant="outlined"
                    className={classes.textFieldSsid}
                  >
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Work Type
                    </InputLabel>
                    <Select
                      onChange={(e) => setWorkType(e.target.value)}
                      id="abc"
                      value={workType}
                      native
                      label="Work Type"
                    >
                      <option aria-label="None"> </option>
                      <option value="Office">Office</option>
                      <option value="On Field">On Field</option>
                    </Select>
                  </FormControl>

                  <FormControl
                    variant="outlined"
                    className={classes.textFieldSsid}
                  >
                    <Autocomplete
                      multiple
                      id="tags-outlined"
                      options={dropdownRegion}
                      getOptionLabel={(option) => option.name}
                      value={regionid}
                      filterSelectedOptions
                      getOptionSelected={(option, value) => {
                        if (value === "") {
                          return true;
                        } else if (value === option) {
                          return true;
                        }
                      }}
                      onChange={handleRegionChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Region"
                        />
                      )}
                    />
                  </FormControl>

                  <FormControl
                    style={{
                      width: "100%",
                      marginTop: "10px",
                    }}
                    variant="outlined"
                  >
                    <Autocomplete
                      multiple
                      id="tags-outlined"
                      options={dropdownProvince}
                      getOptionLabel={(option) => option.name}
                      value={provinceid}
                      filterSelectedOptions
                      getOptionSelected={(option, value) => {
                        if (value === "") {
                          return true;
                        } else if (value === option) {
                          return true;
                        }
                      }}
                      onChange={handleProvinceChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Province"
                        />
                      )}
                    />
                  </FormControl>

                  <FormControl
                    variant="outlined"
                    className={classes.textFieldSsid}
                  >
                    <Autocomplete
                      multiple
                      id="tags-outlined"
                      options={dropdownZone}
                      getOptionLabel={(option) => option.name}
                      value={zoneid}
                      filterSelectedOptions
                      getOptionSelected={(option, value) => {
                        if (value === "") {
                          return true;
                        } else if (value === option) {
                          return true;
                        }
                      }}
                      onChange={handleZoneChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Zone"
                        />
                      )}
                    />
                  </FormControl>

                  <FormControl
                    variant="outlined"
                    className={classes.textFieldSsid}
                  >
                    <Autocomplete
                      multiple
                      id="tags-outlined"
                      options={dropdownTerritory}
                      getOptionLabel={(option) => option.name}
                      value={territoryid}
                      filterSelectedOptions
                      getOptionSelected={(option, value) => {
                        if (value === "") {
                          return true;
                        } else if (value === option) {
                          return true;
                        }
                      }}
                      onChange={(e, selectedObject) => {
                        if (selectedObject !== null) {
                          let List = [];
                          for (let i = 0; i < selectedObject.length; i++) {
                            List.push(selectedObject[i]);
                          }
                          setTerritoryid(List);
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Territory"
                        />
                      )}
                    />
                  </FormControl>

                  <Button
                    onClick={() => {
                      editRepresentative(Id);
                    }}
                    className={classes.btn}
                    variant="contained"
                    style={{
                      backgroundColor: "#69c9ef",
                      color: "#fff",
                      marginTop: "20px",
                    }}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={getModal}
          onClose={handleGetClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={getModal}>
            <div className={classes.paperTwo}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <h2 id="transition-modal-title">View Representative</h2>
                <Table style={{ border: "2px solid" }}>
                  <TableRow style={{ border: "2px solid" }}>
                    <TableCell className={classes.styleTableHead}>
                      Employee Code
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "left", borderLeft: "2px solid" }}
                    >
                      {employeeCode}
                    </TableCell>
                  </TableRow>
                  <TableRow style={{ border: "2px solid" }}>
                    <TableCell className={classes.styleTableHead}>
                      Name
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "left", borderLeft: "2px solid" }}
                    >
                      {name}
                    </TableCell>
                  </TableRow>

                  <TableRow style={{ border: "2px solid" }}>
                    <TableCell className={classes.styleTableHead}>
                      Role
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "left", borderLeft: "2px solid" }}
                    >
                      {role}
                    </TableCell>
                  </TableRow>

                  <TableRow style={{ border: "2px solid" }}>
                    <TableCell className={classes.styleTableHead}>
                      Designation
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "left", borderLeft: "2px solid" }}
                    >
                      {designationId}
                    </TableCell>
                  </TableRow>
                  <TableRow style={{ border: "2px solid" }}>
                    <TableCell className={classes.styleTableHead}>
                      Province
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "left", borderLeft: "2px solid" }}
                    >
                      {provinceid}
                    </TableCell>
                  </TableRow>
                  <TableRow style={{ border: "2px solid" }}>
                    <TableCell className={classes.styleTableHead}>
                      Phone
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "left", borderLeft: "2px solid" }}
                    >
                      {phone}
                    </TableCell>
                  </TableRow>
                  <TableRow style={{ border: "2px solid" }}>
                    <TableCell className={classes.styleTableHead}>
                      Email
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "left", borderLeft: "2px solid" }}
                    >
                      {email}
                    </TableCell>
                  </TableRow>
                  <TableRow style={{ border: "2px solid" }}>
                    <TableCell className={classes.styleTableHead}>
                      Gender
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "left", borderLeft: "2px solid" }}
                    >
                      {gender}
                    </TableCell>
                  </TableRow>
                  <TableRow style={{ border: "2px solid" }}>
                    <TableCell className={classes.styleTableHead}>
                      Marital Status
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "left", borderLeft: "2px solid" }}
                    >
                      {maritalStatus}
                    </TableCell>
                  </TableRow>
                  <TableRow style={{ border: "2px solid" }}>
                    <TableCell className={classes.styleTableHead}>
                      Date of Birth
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "left", borderLeft: "2px solid" }}
                    >
                      {dateOfBirth}
                    </TableCell>
                  </TableRow>

                  <TableRow style={{ border: "2px solid" }}>
                    <TableCell className={classes.styleTableHead}>
                      Work Type
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "left", borderLeft: "2px solid" }}
                    >
                      {workType}
                    </TableCell>
                  </TableRow>
                  <TableRow style={{ border: "2px solid" }}>
                    <TableCell className={classes.styleTableHead}>
                      Company
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "left", borderLeft: "2px solid" }}
                    >
                      {company}
                    </TableCell>
                  </TableRow>
                  <TableRow style={{ border: "2px solid" }}>
                    <TableCell className={classes.styleTableHead}>
                      Password
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "left", borderLeft: "2px solid" }}
                    >
                      {password}
                    </TableCell>
                  </TableRow>
                  <TableRow style={{ border: "2px solid" }}>
                    <TableCell className={classes.styleTableHead}>
                      IsActive
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "left", borderLeft: "2px solid" }}
                    >
                      {isActive === true ? "TRUE" : "False"}
                    </TableCell>
                  </TableRow>
                  <TableRow style={{ border: "2px solid" }}>
                    <TableCell className={classes.styleTableHead}>
                      Region
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "left", borderLeft: "2px solid" }}
                    >
                      {regionid}
                    </TableCell>
                  </TableRow>
                  <TableRow style={{ border: "2px solid" }}>
                    <TableCell className={classes.styleTableHead}>
                      Zone
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "left", borderLeft: "2px solid" }}
                    >
                      {zoneid}
                    </TableCell>
                  </TableRow>
                  <TableRow style={{ border: "2px solid" }}>
                    <TableCell className={classes.styleTableHead}>
                      Territory
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "left", borderLeft: "2px solid" }}
                    >
                      {territoryid}
                    </TableCell>
                  </TableRow>
                </Table>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
};

export default Representative;
