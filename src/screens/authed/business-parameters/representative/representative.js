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
  const [objectId, setObjectId] = useState("");
  const [name, setName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [designationId, setDesignationId] = useState("");
  const [provinceId, setProvinceId] = useState("");
  const [region_Id, setRegion_Id] = useState([]);
  const [zone_Id, setZone_Id] = useState([]);
  const [territory_Id, setTerritory_Id] = useState([]);
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [bloodGroupId, setBloodGroupId] = useState("");
  const [workType, setWorkType] = useState("");
  const [sellingLine, setSellingLine] = useState("");
  const [isActive, setIsActive] = useState("");
  const [password, setPassword] = useState("");
  const [Id, setId] = useState("");
  const [dropdownRegion, setDropDownRegion] = useState("");
  const [dropdownZone, setDropDownZone] = useState("");
  const [dropdownTerritory, setDropDownTerritory] = useState("");
  const [dropdownProvince, setDropDownProvince] = useState([]);
  const [dropDownBloodGroup, setDropDownBloodGroup] = useState([]);
  const [dropDownDesignation, setDropDownDesignation] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setObjectId("");
    setName("");
    setIdentifier("");
    setDesignationId("");
    setProvinceId("");
    setPhone("");
    setEmail("");
    setGender("");
    setMaritalStatus("");
    setDateOfBirth("");
    setBloodGroupId("");
    setWorkType("");
    setSellingLine("");
    setPassword("");
    setIsActive("");
    setRegion_Id([]);
    setZone_Id([]);
    setTerritory_Id([]);
  };

  const handleEditOpen = (id) => {
    setEditModal(true);
  };

  const handleEditClose = () => {
    setEditModal(false);
    setObjectId("");
    setName("");
    setIdentifier("");
    setDesignationId("");
    setProvinceId("");
    setPhone("");
    setEmail("");
    setGender("");
    setMaritalStatus("");
    setDateOfBirth("");
    setBloodGroupId("");
    setWorkType("");
    setSellingLine("");
    setPassword("");
    setIsActive("");
    setRegion_Id([]);
    setZone_Id([]);
    setTerritory_Id([]);
  };

  const handleGetOpen = (id) => {
    setGetModal(true);
  };

  const handleGetClose = () => {
    setGetModal(false);
    setObjectId("");
    setName("");
    setIdentifier("");
    setDesignationId("");
    setProvinceId("");
    setPhone("");
    setEmail("");
    setGender("");
    setMaritalStatus("");
    setDateOfBirth("");
    setBloodGroupId("");
    setWorkType("");
    setSellingLine("");
    setPassword("");
    setIsActive("");
    setRegion_Id([]);
    setZone_Id([]);
    setTerritory_Id([]);
  };

  const addRepresentative = async () => {
    //For Region Multi select
    const regionId = [];
    region_Id.forEach((value) => regionId.push(value._id));

    const zoneId = [];
    zone_Id.forEach((value) => zoneId.push(value._id));

    const territoryId = [];
    territory_Id.forEach((value) => territoryId.push(value._id));
    const form = {
      objectId,
      name,
      identifier,
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
      bloodGroupId,
      workType,
      sellingLine,
      password,
      isActive,
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
    setObjectId("");
    setName("");
    setIdentifier("");
    setDesignationId("");
    setProvinceId("");
    setPhone("");
    setEmail("");
    setGender("");
    setMaritalStatus("");
    setDateOfBirth("");
    setBloodGroupId("");
    setWorkType("");
    setSellingLine("");
    setPassword("");
    setIsActive("");
    setRegion_Id([]);
    setZone_Id([]);
    setTerritory_Id([]);
  };

  const viewRepresentativeData = async (id) => {
    const form = { id };
    let response = await axios.post(
      `${process.env.REACT_APP_URL}/representative/getRepresentative`,
      form
    );
    const dob = moment(response.data.dateOfBirth).format("DD MMM YYYY");
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

    setObjectId(response.data.objectId);
    setName(response.data.name);
    setIdentifier(response.data.identifier);
    setDesignationId(response.data.designationId?.name);
    setProvinceId(response.data.provinceId?.name);
    setPhone(response.data.phone);
    setEmail(response.data.email);
    setGender(response.data.gender);
    setMaritalStatus(response.data.maritalStatus);
    setDateOfBirth(dob);
    setBloodGroupId(response.data.bloodGroupId?.name);
    setWorkType(response.data.workType);
    setSellingLine(response.data.sellingLine);
    setPassword(response.data.password);
    setIsActive(response.data.isActive);
    setRegion_Id(regionArr);
    setZone_Id(zoneArr);
    setTerritory_Id(territoryArr);
    handleGetOpen(true);
  };

  const getRepresentativeById = async (id) => {
    const form = { id };
    let response = await axios.post(
      `${process.env.REACT_APP_URL}/representative/getRepresentative`,
      form
    );
    const dob = moment(response.data.dateOfBirth).format("YYYY-MM-DD");
    setId(response.data._id);
    setObjectId(response.data.objectId);
    setName(response.data.name);
    setIdentifier(response.data.identifier);
    setDesignationId(response.data.designationId?._id);
    setProvinceId(response.data.provinceId?._id);
    setPhone(response.data.phone);
    setEmail(response.data.email);
    setGender(response.data.gender);
    setMaritalStatus(response.data.maritalStatus);
    setDateOfBirth(dob);
    setBloodGroupId(response.data.bloodGroupId?._id);
    setWorkType(response.data.workType);
    setSellingLine(response.data.sellingLine);
    setPassword(response.data.password);
    setIsActive(response.data.isActive);
    setRegion_Id(response.data.regionId);
    setZone_Id(response.data.zoneId);
    setTerritory_Id(response.data.territoryId);
    setEditModal(true);
  };

  const editRepresentative = async (id) => {
    const regionId = [];
    region_Id.forEach((value) => regionId.push(value._id));

    const zoneId = [];
    zone_Id.forEach((value) => zoneId.push(value._id));

    const territoryId = [];
    territory_Id.forEach((value) => territoryId.push(value._id));
    const form = {
      id,
      objectId,
      name,
      identifier,
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
      bloodGroupId,
      workType,
      sellingLine,
      password,
      isActive,
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
    setObjectId("");
    setName("");
    setIdentifier("");
    setDesignationId("");
    setProvinceId("");
    setPhone("");
    setEmail("");
    setGender("");
    setMaritalStatus("");
    setDateOfBirth("");
    setBloodGroupId("");
    setWorkType("");
    setSellingLine("");
    setPassword("");
    setIsActive("");
    setRegion_Id([]);
    setZone_Id([]);
    setTerritory_Id([]);
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
        const allRepresentative = response.data;
        console.log(allRepresentative);
        setEmp(allRepresentative);
        setLoad(false);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  const regionList = [];

  const filterRegionId = (res) => {
    for (let i = 0; i < res.data.length; i++) {
      regionList.push(res.data);
    }
    let newList = [];
    regionList[0].map((item) => {
      newList.push(item);
    });
    setDropDownRegion(newList);
  };

  const zoneList = [];

  const filterZoneId = (res) => {
    for (let i = 0; i < res.data.length; i++) {
      zoneList.push(res.data);
    }
    let newList = [];
    zoneList[0].map((item) => {
      newList.push(item);
    });
    setDropDownZone(newList);
  };

  const territoryList = [];

  const filterTerritoryId = (res) => {
    for (let i = 0; i < res.data.length; i++) {
      territoryList.push(res.data);
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
        await filterRegionId(res);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/zones/getZones`)
      .then(async (res) => {
        await filterZoneId(res);
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
      .get(`${process.env.REACT_APP_URL}/provinces/getProvinces`)
      .then((res) => {
        setDropDownProvince(res.data.content);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/bloodGroup/getBloodGroups`)
      .then((res) => {
        setDropDownBloodGroup(res.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/designations/getDesignations`)
      .then((res) => {
        setDropDownDesignation(res.data);
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
                  Object ID
                </TableCell>
                <TableCell
                  style={{ fontWeight: "600", width: "15%", color: "white" }}
                >
                  Name
                </TableCell>
                <TableCell
                  style={{ fontWeight: "600", width: "15%", color: "white" }}
                >
                  Identifier
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
                  <TableRow key={user._id}>
                    <TableCell component="th" scope="row">
                      {user.objectId}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {user.name}
                    </TableCell>
                    <TableCell>{user.identifier}</TableCell>
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
                            viewRepresentativeData(user._id);
                          }}
                        >
                          <VisibilityIcon color="primary" />
                        </Button>
                        <Button
                          onClick={() => {
                            getRepresentativeById(user._id);
                          }}
                        >
                          <EditIcon color="primary" />
                        </Button>

                        <Button
                          onClick={() => {
                            deleteRepresentative(user._id);
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
                      label="Object Id"
                      name="objectid"
                      variant="outlined"
                      value={objectId}
                      onChange={(e) => setObjectId(e.target.value)}
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
                      label="Identifier"
                      name="identifier"
                      variant="outlined"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                    />
                    <FormControl
                      variant="outlined"
                      className={classes.textFieldSsid}
                    >
                      <InputLabel htmlFor="outlined-age-native-simple">
                        Province
                      </InputLabel>
                      <Select
                        // value={department}
                        onChange={(e) => setProvinceId(e.target.value)}
                        id="abc"
                        native
                        value={provinceId}
                        label="Province"
                      >
                        <option aria-label="None" />
                        {dropdownProvince.map((value, index) => (
                          <option key={value.id} value={value._id}>
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
                      label="Email"
                      name="email"
                      variant="outlined"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
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
                          <option key={value.id} value={value._id}>
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

                  <div style={{ display: "flex" }}>
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
                      style={{ marginLeft: "10px" }}
                    >
                      <InputLabel htmlFor="outlined-age-native-simple">
                        Blood Group
                      </InputLabel>
                      <Select
                        // value={department}
                        onChange={(e) => setBloodGroupId(e.target.value)}
                        id="abc"
                        native
                        value={bloodGroupId}
                        label="Blood Group"
                      >
                        <option aria-label="None" />
                        {dropDownBloodGroup.map((value, index) => (
                          <option key={value.id} value={value._id}>
                            {value.name}
                          </option>
                        ))}
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

                    <TextField
                      className={classes.textFieldSsid}
                      style={{ marginLeft: "10px" }}
                      id="abc"
                      label="Selling Line"
                      name="sellingline"
                      variant="outlined"
                      value={sellingLine}
                      onChange={(e) => setSellingLine(e.target.value)}
                    />
                  </div>

                  <FormControl
                    variant="outlined"
                    className={classes.textFieldSsid}
                  >
                    <Autocomplete
                      multiple
                      id="tags-outlined"
                      options={dropdownRegion}
                      getOptionLabel={(option) => option.name}
                      value={region_Id}
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
                          setRegion_Id(List);
                        }
                      }}
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
                    variant="outlined"
                    className={classes.textFieldSsid}
                  >
                    <Autocomplete
                      multiple
                      id="tags-outlined"
                      options={dropdownZone}
                      getOptionLabel={(option) => option.name}
                      value={zone_Id}
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
                          setZone_Id(List);
                        }
                      }}
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
                      value={territory_Id}
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
                          setTerritory_Id(List);
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Region"
                        />
                      )}
                    />
                  </FormControl>

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
                      label="Object Id"
                      name="objectid"
                      variant="outlined"
                      value={objectId}
                      onChange={(e) => setObjectId(e.target.value)}
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
                      label="Identifier"
                      name="identifier"
                      variant="outlined"
                      value={identifier}
                      onChange={(e) => setIdentifier(e.target.value)}
                    />
                    <FormControl
                      variant="outlined"
                      className={classes.textFieldSsid}
                    >
                      <InputLabel htmlFor="outlined-age-native-simple">
                        Province
                      </InputLabel>
                      <Select
                        // value={department}
                        onChange={(e) => setProvinceId(e.target.value)}
                        id="abc"
                        native
                        value={provinceId}
                        label="Province"
                      >
                        <option aria-label="None" />
                        {dropdownProvince.map((value, index) => (
                          <option key={value.id} value={value._id}>
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
                      label="Email"
                      name="email"
                      variant="outlined"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
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
                          <option key={value.id} value={value._id}>
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

                  <div style={{ display: "flex" }}>
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
                      style={{ marginLeft: "10px" }}
                    >
                      <InputLabel htmlFor="outlined-age-native-simple">
                        Blood Group
                      </InputLabel>
                      <Select
                        // value={department}
                        onChange={(e) => setBloodGroupId(e.target.value)}
                        id="abc"
                        native
                        value={bloodGroupId}
                        label="Blood Group"
                      >
                        <option aria-label="None" />
                        {dropDownBloodGroup.map((value, index) => (
                          <option key={value.id} value={value._id}>
                            {value.name}
                          </option>
                        ))}
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

                    <TextField
                      className={classes.textFieldSsid}
                      style={{ marginLeft: "10px" }}
                      id="abc"
                      label="Selling Line"
                      name="sellingline"
                      variant="outlined"
                      value={sellingLine}
                      onChange={(e) => setSellingLine(e.target.value)}
                    />
                  </div>

                  <FormControl
                    variant="outlined"
                    className={classes.textFieldSsid}
                  >
                    <Autocomplete
                      multiple
                      id="tags-outlined"
                      options={dropdownRegion}
                      getOptionLabel={(option) => option.name}
                      value={region_Id}
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
                          setRegion_Id(List);
                        }
                      }}
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
                    variant="outlined"
                    className={classes.textFieldSsid}
                  >
                    <Autocomplete
                      multiple
                      id="tags-outlined"
                      options={dropdownZone}
                      getOptionLabel={(option) => option.name}
                      value={zone_Id}
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
                          setZone_Id(List);
                        }
                      }}
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
                      value={territory_Id}
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
                          setTerritory_Id(List);
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Region"
                        />
                      )}
                    />
                  </FormControl>

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
                      ObjectId
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "left", borderLeft: "2px solid" }}
                    >
                      {objectId}
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
                      Identifier
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "left", borderLeft: "2px solid" }}
                    >
                      {identifier}
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
                      {provinceId}
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
                      Blood Group
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "left", borderLeft: "2px solid" }}
                    >
                      {bloodGroupId}
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
                      Selling Line
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "left", borderLeft: "2px solid" }}
                    >
                      {sellingLine}
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
                      {region_Id}
                    </TableCell>
                  </TableRow>
                  <TableRow style={{ border: "2px solid" }}>
                    <TableCell className={classes.styleTableHead}>
                      Zone
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "left", borderLeft: "2px solid" }}
                    >
                      {zone_Id}
                    </TableCell>
                  </TableRow>
                  <TableRow style={{ border: "2px solid" }}>
                    <TableCell className={classes.styleTableHead}>
                      Territory
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "left", borderLeft: "2px solid" }}
                    >
                      {territory_Id}
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
