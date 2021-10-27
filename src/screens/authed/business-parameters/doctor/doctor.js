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
import Pagination from "@mui/material/Pagination";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useSnackbar } from "notistack";
import { makeStyles } from "@material-ui/core/styles";
import moment from "moment";
import "./doctor.css";
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

const Doctor = () => {
  const classes = useStyles();
  const history = useHistory();
  const [emp, setEmp] = useState([]);
  const [load, setLoad] = useState(false);
  const [open, setOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [getModal, setGetModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(0);
  const [name, setName] = useState("");
  const [abbreviation, setAbbreviation] = useState("");
  const [pmdcRegistration, setPmdcRegistration] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [district, setDistrict] = useState("");
  const [fee, setFee] = useState("");
  const [potential, setPotential] = useState("");
  const [qualificationId, setQualificationId] = useState("");
  const [representativeId, setRepresentativeId] = useState("");
  const [regionId, setRegionId] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [territoryId, setTerritoryId] = useState("");
  const [designationId, setDesignationId] = useState("");
  const [specialityId, setSpecialityId] = useState("");
  const [hospitalId, setHospitalId] = useState("");
  const [provinceId, setProvinceId] = useState("");
  const [cityId, setCityId] = useState("");
  const [brickId, setBrickId] = useState("");
  const [preferredDay, setPreferredDay] = useState([]);
  const [tierId, setTierId] = useState("");
  const [Id, setId] = useState("");
  const [dropdownQualification, setDropDownQualification] = useState([]);
  const [dropdownRepresentative, setDropDownRepresentative] = useState([]);
  const [dropdownRegion, setDropDownRegion] = useState([]);
  const [dropdownZone, setDropDownZone] = useState([]);
  const [dropDownTerritory, setDropDownTerritory] = useState([]);
  const [dropDownDesignation, setDropDownDesignation] = useState([]);
  const [dropdownSpeciality, setDropDownSpeciality] = useState([]);
  const [dropdownHospital, setDropDownHospital] = useState([]);
  const [dropdownProvince, setDropDownProvince] = useState([]);
  const [dropdownCity, setDropDownCity] = useState([]);
  const [dropDownBrick, setDropDownBrick] = useState([]);
  const [dropDownTier, setDropDownTier] = useState([]);
  const [searchByHosp, setSearchByHosp] = useState("");
  const [renderfilter, setRenderFilter] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const totalDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thrusday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

    setName("");
    setAbbreviation("");
    setPmdcRegistration("");
    setPhone("");
    setEmail("");
    setPreferredTime("");
    setDistrict("");
    setFee("");
    setPotential("");
    setQualificationId("");
    setRepresentativeId("");
    setRegionId("");
    setZoneId("");
    setTerritoryId("");
    setDesignationId("");
    setSpecialityId("");
    setHospitalId("");
    setProvinceId("");
    setCityId("");
    setBrickId("");
    setPreferredDay([]);
    setTierId("");
  };

  const handleEditOpen = (id) => {
    setEditModal(true);
  };

  const handleEditClose = () => {
    setEditModal(false);

    setName("");
    setAbbreviation("");
    setPmdcRegistration("");
    setPhone("");
    setEmail("");
    setPreferredTime("");
    setDistrict("");
    setFee("");
    setPotential("");
    setQualificationId("");
    setRepresentativeId("");
    setRegionId("");
    setZoneId("");
    setTerritoryId("");
    setDesignationId("");
    setSpecialityId("");
    setHospitalId("");
    setProvinceId("");
    setCityId("");
    setBrickId("");
    setPreferredDay([]);
    setTierId("");
  };

  const handleGetOpen = (id) => {
    setGetModal(true);
  };

  const handleGetClose = () => {
    setGetModal(false);
    setName("");
    setAbbreviation("");
    setPmdcRegistration("");
    setPhone("");
    setEmail("");
    setPreferredTime("");
    setDistrict("");
    setFee("");
    setPotential("");
    setQualificationId("");
    setRepresentativeId("");
    setRegionId("");
    setZoneId("");
    setTerritoryId("");
    setDesignationId("");
    setSpecialityId("");
    setHospitalId("");
    setProvinceId("");
    setCityId("");
    setBrickId("");
    setPreferredDay([]);
    setTierId("");
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    setLoad(true);
  };

  const searchFilterByName = async (e) => {
    if (e.target.value == "") {
      setRenderFilter(!renderfilter);
    } else {
      const filter = e.target.value;
      await axios
        .get(`${process.env.REACT_APP_URL}/doctors/getDoctors?name=${filter}`)
        .then((response) => {
          const allDoctor = response.data.results;
          console.log(allDoctor);
          setEmp(allDoctor);
          setTotalPages(response.data.totalPages);
          setPage(response.data.page);
          setLoad(false);
        })
        .catch((error) => console.log(`Error: ${error}`));
    }
  };

  const searchFilterByEmail = async (e) => {
    if (e.target.value == "") {
      setRenderFilter(!renderfilter);
    } else {
      const filter = e.target.value;
      await axios
        .get(`${process.env.REACT_APP_URL}/doctors/getDoctors?email=${filter}`)
        .then((response) => {
          const allDoctor = response.data.results;
          console.log(allDoctor);
          setEmp(allDoctor);
          setTotalPages(response.data.totalPages);
          setPage(response.data.page);
          setLoad(false);
        })
        .catch((error) => console.log(`Error: ${error}`));
    }
  };

  const searchFilterByPhone = async (e) => {
    if (e.target.value == "") {
      setRenderFilter(!renderfilter);
    } else {
      const filter = e.target.value;
      await axios
        .get(`${process.env.REACT_APP_URL}/doctors/getDoctors?phone=${filter}`)
        .then((response) => {
          const allDoctor = response.data.results;
          console.log(allDoctor);
          setEmp(allDoctor);
          setTotalPages(response.data.totalPages);
          setPage(response.data.page);
          setLoad(false);
        })
        .catch((error) => console.log(`Error: ${error}`));
    }
  };

  const searchFilterByHospital = async (e) => {
    console.log(e.target.value, "=======================>");
    setSearchByHosp(e.target.value);
    if (e.target.value == "") {
      setRenderFilter(!renderfilter);
    } else {
      const filter = e.target.value;
      await axios
        .get(
          `${process.env.REACT_APP_URL}/doctors/getDoctors?hospitalId=${filter}`
        )
        .then((response) => {
          const allDoctor = response.data.results;
          console.log(allDoctor);
          setEmp(allDoctor);
          setTotalPages(response.data.totalPages);
          setPage(response.data.page);
          setLoad(false);
        })
        .catch((error) => console.log(`Error: ${error}`));
    }
  };

  function tConvert(time) {
    // Check correct time format and split into components
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? " AM" : " PM"; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(""); // return adjusted time or original string
  }

  const handleRegionChange = async (e) => {
    setRegionId(e.target.value);
    const id = e.target.value;
    setProvinceId("");
    setZoneId("");
    await axios
      .post(`${process.env.REACT_APP_URL}/regions/getRegion`, { id })
      .then((res) => {
        setDropDownProvince(res.data.provinceId);
      });
  };

  const handleProvinceChange = async (e) => {
    setProvinceId(e.target.value);
    console.log(e.target.value);
    const id = e.target.value;
    setZoneId("");
    await axios
      .get(`${process.env.REACT_APP_URL}/zones/getZones?provinceId=${id}`)
      .then((res) => {
        setDropDownZone(res.data.results);
      });
  };

  const handleZoneChange = async (e) => {
    setZoneId(e.target.value);
    const id = e.target.value;
    const form = { id };
    console.log(form);
    setCityId("");
    setTerritoryId("");
    await axios
      .get(`${process.env.REACT_APP_URL}/cities/getCities?zoneId=${id}`)
      .then((res) => {
        setDropDownCity(res.data.results);
      });
  };

  const handleCityChange = async (e) => {
    setCityId(e.target.value);
    const id = e.target.value;
    const form = { id };
    console.log(form);

    await axios
      .get(
        `${process.env.REACT_APP_URL}/territory/getTerritories/?cityId=${id}`
      )
      .then((res) => {
        setDropDownTerritory(res.data.results);
      });
  };

  const handleTerritoryChange = async (e) => {
    setTerritoryId(e.target.value);
    const id = e.target.value;
    const form = { id };
    console.log(form);

    await axios
      .get(`${process.env.REACT_APP_URL}/bricks/getBricks/?territoryId=${id}`)
      .then((res) => {
        setDropDownBrick(res.data.results);
      });
  };

  const addDoctor = async () => {
    const form = {
      name,
      abbreviation,
      pmdcRegistration,
      phone,
      email,
      preferredTime,
      district,
      fee,
      potential,
      qualificationId,
      assignedRepresentativeId: representativeId,
      regionId,
      zoneId,
      territoryId,
      designationId,
      specialityId,
      hospitalId,
      provinceId,
      cityId,
      brickId,
      preferredDay,
      tierId,
    };
    console.log(form);
    await axios
      .post(`${process.env.REACT_APP_URL}/doctors/postDoctor`, form)
      .then((res) => {
        console.log(res.data);
        enqueueSnackbar("Doctor Add Successfully", {
          variant: "success",
        });
        setOpen(false);
        fetchDoctor();
      })
      .catch(function (error) {
        enqueueSnackbar("error", { variant: "error" });
        console.log(error.response);
      });

    setName("");
    setAbbreviation("");
    setPmdcRegistration("");
    setPhone("");
    setEmail("");
    setPreferredTime("");
    setDistrict("");
    setFee("");
    setPotential("");
    setQualificationId("");
    setRepresentativeId("");
    setRegionId("");
    setZoneId("");
    setTerritoryId("");
    setDesignationId("");
    setSpecialityId("");
    setHospitalId("");
    setProvinceId("");
    setCityId("");
    setBrickId("");
    setTierId("");
    setPreferredDay([]);
  };

  const viewDoctorData = async (id) => {
    const form = { id };
    let response = await axios.post(
      `${process.env.REACT_APP_URL}/doctors/getDoctor`,
      form
    );

    setName(response.data.name);
    setAbbreviation(response.data.abbreviation);
    setPmdcRegistration(response.data.pmdcRegistration);
    setPhone(response.data.phone);
    setEmail(response.data.email);
    setPreferredTime(response.data.preferredTime);
    setDistrict(response.data.district);
    setTierId(response.data.tierId?.id);
    setFee(response.data.fee);
    setPotential(response.data.potential);
    setQualificationId(response.data.qualificationId?.name);
    setRepresentativeId(response.data.assignedRepresentativeId?.name);
    setRegionId(response.data.regionId?.name);
    setZoneId(response.data.zoneId?.name);
    setTerritoryId(response.data.territoryId?.name);
    setDesignationId(response.data.designationId?.name);
    setSpecialityId(response.data.specialityId?.name);
    setHospitalId(response.data.hospitalId?.name);
    setProvinceId(response.data.provinceId?.name);
    setCityId(response.data.cityId?.name);
    setBrickId(response.data.brickId?.name);
    setPreferredDay(response.data.preferredDay + " ");
    handleGetOpen(true);
  };

  const getDoctorById = async (id) => {
    const form = { id };
    let response = await axios.post(
      `${process.env.REACT_APP_URL}/doctors/getDoctor`,
      form
    );
    const dob = moment(response.data.dateOfBirth).format("YYYY-MM-DD");
    setId(response.data.id);

    setName(response.data.name);
    setAbbreviation(response.data.abbreviation);
    setPmdcRegistration(response.data.pmdcRegistration);
    setPhone(response.data.phone);
    setEmail(response.data.email);
    setPreferredTime(response.data.preferredTime);
    setDistrict(response.data.district);
    setFee(response.data.fee);
    setPotential(response.data.potential);
    setQualificationId(response.data.qualificationId?._id);
    // setDropDownRepresentative([response.data.assignedRepresentativeId]);
    setRepresentativeId(response.data.assignedRepresentativeId?.id);
    setDesignationId(response.data.designationId?.id);
    setSpecialityId(response.data.specialityId?._id);
    setHospitalId(response.data.hospitalId?.id);
    setDropDownRegion([response.data.regionId]);
    setRegionId(response.data.regionId?.id);
    setDropDownProvince([response.data.provinceId]);
    setProvinceId(response.data.provinceId?.id);
    setDropDownZone([response.data.zoneId]);
    setZoneId(response.data.zoneId?.id);
    setDropDownCity([response.data.cityId]);
    setCityId(response.data.cityId?.id);
    setDropDownTerritory([response.data.territoryId]);
    setTerritoryId(response.data.territoryId?.id);
    setDropDownBrick([response.data.brickId]);
    setBrickId(response.data.brickId?.id);
    setPreferredDay(response.data.preferredDay);

    setTierId(response.data.tierId?._id);

    setEditModal(true);
  };

  const editDoctor = async (id) => {
    const form = {
      id,
      name,
      abbreviation,
      pmdcRegistration,
      phone,
      email,
      preferredTime,
      district,
      fee,
      potential,
      qualificationId,
      assignedRepresentativeId: representativeId,
      regionId,
      zoneId,
      territoryId,
      designationId,
      specialityId,
      hospitalId,
      provinceId,
      cityId,
      brickId,
      preferredDay,
      tierId,
    };
    await axios
      .post(`${process.env.REACT_APP_URL}/doctors/updateDoctor`, form)
      .then((res) => {
        console.log(res.data);
        setEditModal(false);
        enqueueSnackbar("Doctor Edit Successfully", {
          variant: "success",
        });
        fetchDoctor();
      })
      .catch(function (error) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
        console.log(error.response);
      });
  };

  const deleteDoctor = (id) => {
    const form = { id };
    confirmAlert({
      title: "Confirm to Delete",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            axios
              .post(`${process.env.REACT_APP_URL}/doctors/deleteDoctor`, form)
              .then((res) => {
                enqueueSnackbar("Doctor Delete Successfully", {
                  variant: "success",
                });
                fetchDoctor();
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

  const fetchDoctor = async () => {
    let filter = { page };
    filter.status = false;
    filter.limit = 10;
    await axios
      .get(`${process.env.REACT_APP_URL}/doctors/getDoctors`, {
        params: filter,
      })
      .then((response) => {
        const allDoctor = response.data.results;
        console.log(allDoctor);
        setEmp(allDoctor);
        setTotalPages(response.data.totalPages);
        setPage(response.data.page);
        setLoad(false);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  useEffect(() => {
    fetchDoctor();
  }, [load]);

  useEffect(() => {
    fetchDoctor();
  }, [renderfilter]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/qualifications/getQualifications`)
      .then(async (res) => {
        setDropDownQualification(res.data);
        console.log(res, "===============>");
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/representative/getRepresentatives`)
      .then(async (res) => {
        setDropDownRepresentative(res.data.results);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/designations/getDesignations`)
      .then((res) => {
        setDropDownDesignation(res.data.results);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/speciality/getSpecialities`)
      .then((res) => {
        setDropDownSpeciality(res.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/hospitals/getHospitals`)
      .then((res) => {
        setDropDownHospital(res.data.results);
      });
  }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/regions/getRegions`).then((res) => {
      setDropDownRegion(res.data.results);
    });
  }, []);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/tiers/getTiers`).then((res) => {
      setDropDownTier(res.data);
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
        <Typography color="textPrimary">Doctor</Typography>
      </Breadcrumbs>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <TextField
            style={{ marginRight: "10px" }}
            id="outlined-basic"
            label="Name"
            variant="outlined"
            onChange={searchFilterByName}
          />
          <TextField
            style={{ marginRight: "10px" }}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            onChange={searchFilterByEmail}
          />
          <TextField
            style={{ marginRight: "10px" }}
            id="outlined-basic"
            label="Phone"
            variant="outlined"
            onChange={searchFilterByPhone}
          />
          <FormControl
            variant="outlined"
            className={classes.textFieldSsid}
            style={{ marginRight: "10px", width: "15%", marginBottom: "10px" }}
          >
            <InputLabel htmlFor="outlined-age-native-simple">
              Hospital
            </InputLabel>
            <Select
              // value={department}
              onChange={searchFilterByHospital}
              id="outlined-basic"
              native
              value={searchByHosp}
              label="Hospital"
            >
              <option aria-label="None" />
              {dropdownHospital.map((value, index) => (
                <option key={value.id} value={value.id}>
                  {value.name}
                </option>
              ))}
            </Select>
          </FormControl>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            width: "15%",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            style={{ width: "200px", color: "white", height: "50px" }}
            onClick={handleOpen}
          >
            Add Doctor
          </Button>
        </div>
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
                  Name
                </TableCell>
                <TableCell
                  style={{ fontWeight: "600", width: "15%", color: "white" }}
                >
                  Abbrevation
                </TableCell>

                <TableCell
                  style={{ fontWeight: "600", width: "15%", color: "white" }}
                >
                  PMDC Registration
                </TableCell>
                <TableCell
                  style={{ fontWeight: "600", width: "15%", color: "white" }}
                >
                  Phone
                </TableCell>
                <TableCell
                  style={{ fontWeight: "600", width: "15%", color: "white" }}
                >
                  Email
                </TableCell>

                <TableCell
                  style={{ fontWeight: "600", width: "15%", color: "white" }}
                >
                  Preferred Time
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
                var convertedTime = tConvert(`${user.preferredTime}`);

                return (
                  <TableRow key={user._id}>
                    <TableCell component="th" scope="row">
                      {user.name}
                    </TableCell>
                    <TableCell>{user.abbreviation}</TableCell>

                    <TableCell>{user.pmdcRegistration} </TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{convertedTime}</TableCell>

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
                            viewDoctorData(user.id);
                          }}
                        >
                          <VisibilityIcon color="primary" />
                        </Button>
                        <Button
                          onClick={() => {
                            getDoctorById(user.id);
                          }}
                        >
                          <EditIcon color="primary" />
                        </Button>

                        <Button
                          onClick={() => {
                            deleteDoctor(user.id);
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

      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "flex-end",
          marginTop: "10px",
        }}
      >
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          disabled={load}
          color="primary"
        />
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
                <h2 id="transition-modal-title">Add Doctor</h2>

                <div className={classes.formDiv}>
                  <div style={{ display: "flex", width: "100%" }}>
                    <TextField
                      className={classes.textFieldName}
                      style={{ marginRight: "10px" }}
                      id="abc"
                      label="Name"
                      name="Name"
                      variant="outlined"
                      value={name}
                      inputProps={{ style: { textTransform: "uppercase" } }}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                      // className={classes.textFieldSsid}
                      style={{ width: "100%" }}
                      id="abc"
                      label="Abbreviation"
                      name="abbreviation"
                      variant="outlined"
                      value={abbreviation}
                      onChange={(e) => setAbbreviation(e.target.value)}
                    />
                  </div>

                  <div style={{ display: "flex", width: "100%" }}>
                    <TextField
                      className={classes.textFieldSsid}
                      style={{ marginRight: "10px" }}
                      id="abc"
                      label="PMDCRegistration"
                      name="pmdcRegistration"
                      variant="outlined"
                      value={pmdcRegistration}
                      onChange={(e) => setPmdcRegistration(e.target.value)}
                    />
                    <TextField
                      className={classes.textFieldSsid}
                      id="abc"
                      label="Phone"
                      name="phone"
                      variant="outlined"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
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
                      id="time"
                      label="Preferred Time"
                      variant="outlined"
                      type="time"
                      ampm="true"
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </div>

                  <div style={{ display: "flex", width: "100%" }}>
                    <TextField
                      className={classes.textFieldSsid}
                      style={{ marginRight: "10px" }}
                      id="abc"
                      label="District"
                      name="district"
                      variant="outlined"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                    />
                    <TextField
                      className={classes.textFieldSsid}
                      id="abc"
                      label="Fee"
                      name="fee"
                      variant="outlined"
                      value={fee}
                      onChange={(e) => setFee(e.target.value)}
                    />
                  </div>
                  <div style={{ display: "flex", width: "100%" }}>
                    <FormControl
                      variant="outlined"
                      className={classes.textFieldSsid}
                      style={{ marginRight: "10px" }}
                    >
                      <Autocomplete
                        multiple
                        id="tags-outlined"
                        options={totalDays}
                        getOptionLabel={(option) => option}
                        value={preferredDay}
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
                            setPreferredDay(List);
                          }
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            label="Prefered Days"
                          />
                        )}
                      />
                    </FormControl>

                    <FormControl
                      variant="outlined"
                      className={classes.textFieldSsid}
                    >
                      <InputLabel htmlFor="outlined-age-native-simple">
                        Tier
                      </InputLabel>
                      <Select
                        // value={department}
                        onChange={(e) => setTierId(e.target.value)}
                        id="abc"
                        native
                        value={tierId}
                        label="Tier"
                      >
                        <option aria-label="None" />
                        {dropDownTier.map((value, index) => (
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
                      label="Potential"
                      name="potential"
                      variant="outlined"
                      value={potential}
                      onChange={(e) => setPotential(e.target.value)}
                    />
                    <FormControl
                      variant="outlined"
                      className={classes.textFieldSsid}
                    >
                      <InputLabel htmlFor="outlined-age-native-simple">
                        Qualification
                      </InputLabel>
                      <Select
                        // value={department}
                        onChange={(e) => setQualificationId(e.target.value)}
                        id="abc"
                        native
                        value={qualificationId}
                        label="Qualification"
                      >
                        <option aria-label="None" />
                        {dropdownQualification.map((value, index) => (
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
                      style={{ marginRight: "10px" }}
                    >
                      <InputLabel htmlFor="outlined-age-native-simple">
                        Hospital
                      </InputLabel>
                      <Select
                        // value={department}
                        onChange={(e) => setHospitalId(e.target.value)}
                        id="abc"
                        native
                        value={hospitalId}
                        label="Designation"
                      >
                        <option aria-label="None" />
                        {dropdownHospital.map((value, index) => (
                          <option key={value.id} value={value.id}>
                            {value.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl
                      variant="outlined"
                      className={classes.textFieldSsid}
                    >
                      <InputLabel htmlFor="outlined-age-native-simple">
                        Representative
                      </InputLabel>
                      <Select
                        // value={department}
                        onChange={(e) => setRepresentativeId(e.target.value)}
                        id="abc"
                        native
                        value={representativeId}
                        label="Representative"
                      >
                        <option aria-label="None" />
                        {dropdownRepresentative.map((value, index) => (
                          <option key={value.id} value={value.id}>
                            {value.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  <div style={{ display: "flex", width: "100%" }}>
                    <FormControl
                      variant="outlined"
                      style={{ marginRight: "10px" }}
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

                    <FormControl
                      variant="outlined"
                      className={classes.textFieldSsid}
                    >
                      <InputLabel htmlFor="outlined-age-native-simple">
                        Speciality
                      </InputLabel>
                      <Select
                        // value={department}
                        onChange={(e) => setSpecialityId(e.target.value)}
                        id="abc"
                        native
                        value={specialityId}
                        label="Speciality"
                      >
                        <option aria-label="None" />
                        {dropdownSpeciality.map((value, index) => (
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
                      style={{
                        width: "100%",
                        marginTop: "10px",
                        marginRight: "10px",
                      }}
                    >
                      <InputLabel htmlFor="outlined-age-native-simple">
                        Region
                      </InputLabel>
                      <Select
                        // value={department}
                        onChange={handleRegionChange}
                        native
                        value={regionId}
                        label="Region"
                      >
                        <option aria-label="None" />
                        {dropdownRegion.map((value, index) => (
                          <option key={value.id} value={value.id}>
                            {value.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl
                      variant="outlined"
                      style={{
                        width: "100%",
                        marginTop: "10px",
                      }}
                    >
                      <InputLabel htmlFor="outlined-age-native-simple">
                        Province
                      </InputLabel>
                      <Select
                        // value={department}
                        onChange={handleProvinceChange}
                        native
                        value={provinceId}
                        label="Province"
                      >
                        <option aria-label="None" />
                        {dropdownProvince.map((value, index) => (
                          <option key={value.id} value={value.id}>
                            {value.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div style={{ display: "flex", width: "100%" }}>
                    <FormControl
                      variant="outlined"
                      style={{
                        width: "100%",
                        marginTop: "10px",
                        marginRight: "10px",
                      }}
                    >
                      <InputLabel htmlFor="outlined-age-native-simple">
                        Zone
                      </InputLabel>
                      <Select
                        // value={department}
                        onChange={handleZoneChange}
                        native
                        value={zoneId}
                        label="Zone"
                      >
                        <option aria-label="None" />
                        {dropdownZone.map((value, index) => (
                          <option key={value.id} value={value.id}>
                            {value.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl
                      variant="outlined"
                      style={{ width: "100%", marginTop: "10px" }}
                    >
                      <InputLabel htmlFor="outlined-age-native-simple">
                        City
                      </InputLabel>
                      <Select
                        // value={department}
                        onChange={handleCityChange}
                        native
                        value={cityId}
                        label="City"
                      >
                        <option aria-label="None" />
                        {dropdownCity.map((value, index) => (
                          <option key={value.id} value={value.id}>
                            {value.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div style={{ display: "flex", width: "100%" }}>
                    <FormControl
                      variant="outlined"
                      style={{
                        width: "100%",
                        marginTop: "10px",
                        marginRight: "10px",
                      }}
                    >
                      <InputLabel htmlFor="outlined-age-native-simple">
                        Territory
                      </InputLabel>
                      <Select
                        // value={department}
                        onChange={handleTerritoryChange}
                        native
                        value={territoryId}
                        label="Territory"
                      >
                        <option aria-label="None" />
                        {dropDownTerritory.map((value, index) => (
                          <option key={value.id} value={value.id}>
                            {value.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl
                      variant="outlined"
                      className={classes.textFieldSsid}
                    >
                      <InputLabel htmlFor="outlined-age-native-simple">
                        Brick
                      </InputLabel>
                      <Select
                        // value={department}
                        onChange={(e) => setBrickId(e.target.value)}
                        id="abc"
                        native
                        value={brickId}
                        label="Brick"
                      >
                        <option aria-label="None" />
                        {dropDownBrick.map((value, index) => (
                          <option key={value.id} value={value.id}>
                            {value.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  <Button
                    onClick={addDoctor}
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
                <h2 id="transition-modal-title">Edit Doctor</h2>

                <div className={classes.formDiv}>
                  <div style={{ display: "flex", width: "100%" }}>
                    <TextField
                      className={classes.textFieldName}
                      style={{ marginRight: "10px" }}
                      id="abc"
                      label="Name"
                      name="Name"
                      variant="outlined"
                      value={name}
                      inputProps={{ style: { textTransform: "uppercase" } }}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                      // className={classes.textFieldSsid}
                      style={{ width: "100%" }}
                      id="abc"
                      label="Abbreviation"
                      name="abbreviation"
                      variant="outlined"
                      value={abbreviation}
                      onChange={(e) => setAbbreviation(e.target.value)}
                    />
                  </div>

                  <div style={{ display: "flex", width: "100%" }}>
                    <TextField
                      className={classes.textFieldSsid}
                      style={{ marginRight: "10px" }}
                      id="abc"
                      label="PMDCRegistration"
                      name="pmdcRegistration"
                      variant="outlined"
                      value={pmdcRegistration}
                      onChange={(e) => setPmdcRegistration(e.target.value)}
                    />
                    <TextField
                      className={classes.textFieldSsid}
                      id="abc"
                      label="Phone"
                      name="phone"
                      variant="outlined"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
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
                      id="time"
                      label="Preferred Time"
                      variant="outlined"
                      type="time"
                      ampm="true"
                      value={preferredTime}
                      onChange={(e) => setPreferredTime(e.target.value)}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </div>

                  <div style={{ display: "flex", width: "100%" }}>
                    <TextField
                      className={classes.textFieldSsid}
                      style={{ marginRight: "10px" }}
                      id="abc"
                      label="District"
                      name="district"
                      variant="outlined"
                      value={district}
                      onChange={(e) => setDistrict(e.target.value)}
                    />
                    <TextField
                      className={classes.textFieldSsid}
                      id="abc"
                      label="Fee"
                      name="fee"
                      variant="outlined"
                      value={fee}
                      onChange={(e) => setFee(e.target.value)}
                    />
                  </div>
                  <div style={{ display: "flex", width: "100%" }}>
                    <FormControl
                      variant="outlined"
                      className={classes.textFieldSsid}
                      style={{ marginRight: "10px" }}
                    >
                      <Autocomplete
                        multiple
                        id="tags-outlined"
                        options={totalDays}
                        getOptionLabel={(option) => option}
                        value={preferredDay}
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
                            setPreferredDay(List);
                          }
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            label="Prefered Days"
                          />
                        )}
                      />
                    </FormControl>

                    <FormControl
                      variant="outlined"
                      className={classes.textFieldSsid}
                    >
                      <InputLabel htmlFor="outlined-age-native-simple">
                        Tier
                      </InputLabel>
                      <Select
                        // value={department}
                        onChange={(e) => setTierId(e.target.value)}
                        id="abc"
                        native
                        value={tierId}
                        label="Tier"
                      >
                        <option aria-label="None" />
                        {dropDownTier.map((value, index) => (
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
                      label="Potential"
                      name="potential"
                      variant="outlined"
                      value={potential}
                      onChange={(e) => setPotential(e.target.value)}
                    />
                    <FormControl
                      variant="outlined"
                      className={classes.textFieldSsid}
                    >
                      <InputLabel htmlFor="outlined-age-native-simple">
                        Qualification
                      </InputLabel>
                      <Select
                        // value={department}
                        onChange={(e) => setQualificationId(e.target.value)}
                        id="abc"
                        native
                        value={qualificationId}
                        label="Qualification"
                      >
                        <option aria-label="None" />
                        {dropdownQualification.map((value, index) => (
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
                      style={{ marginRight: "10px" }}
                    >
                      <InputLabel htmlFor="outlined-age-native-simple">
                        Hospital
                      </InputLabel>
                      <Select
                        // value={department}
                        onChange={(e) => setHospitalId(e.target.value)}
                        id="abc"
                        native
                        value={hospitalId}
                        label="Designation"
                      >
                        <option aria-label="None" />
                        {dropdownHospital.map((value, index) => (
                          <option key={value.id} value={value.id}>
                            {value.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl
                      variant="outlined"
                      className={classes.textFieldSsid}
                    >
                      <InputLabel htmlFor="outlined-age-native-simple">
                        Representative
                      </InputLabel>
                      <Select
                        // value={department}
                        onChange={(e) => setRepresentativeId(e.target.value)}
                        id="abc"
                        native
                        value={representativeId}
                        label="Representative"
                      >
                        <option aria-label="None" />
                        {dropdownRepresentative.map((value, index) => (
                          <option key={value.id} value={value.id}>
                            {value.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  <div style={{ display: "flex", width: "100%" }}></div>

                  <div style={{ display: "flex", width: "100%" }}>
                    <FormControl
                      variant="outlined"
                      style={{ marginRight: "10px" }}
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

                    <FormControl
                      variant="outlined"
                      className={classes.textFieldSsid}
                    >
                      <InputLabel htmlFor="outlined-age-native-simple">
                        Speciality
                      </InputLabel>
                      <Select
                        // value={department}
                        onChange={(e) => setSpecialityId(e.target.value)}
                        id="abc"
                        native
                        value={specialityId}
                        label="Speciality"
                      >
                        <option aria-label="None" />
                        {dropdownSpeciality.map((value, index) => (
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
                      style={{
                        width: "100%",
                        marginTop: "10px",
                        marginRight: "10px",
                      }}
                    >
                      <InputLabel htmlFor="outlined-age-native-simple">
                        Region
                      </InputLabel>
                      <Select
                        // value={department}
                        onChange={handleRegionChange}
                        native
                        value={regionId}
                        label="Region"
                      >
                        <option aria-label="None" />
                        {dropdownRegion.map((value, index) => (
                          <option key={value.id} value={value.id}>
                            {value.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl
                      variant="outlined"
                      style={{
                        width: "100%",
                        marginTop: "10px",
                      }}
                    >
                      <InputLabel htmlFor="outlined-age-native-simple">
                        Province
                      </InputLabel>
                      <Select
                        // value={department}
                        onChange={handleProvinceChange}
                        native
                        value={provinceId}
                        label="Province"
                      >
                        <option aria-label="None" />
                        {dropdownProvince.map((value, index) => (
                          <option key={value.id} value={value.id}>
                            {value.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div style={{ display: "flex", width: "100%" }}>
                    <FormControl
                      variant="outlined"
                      style={{
                        width: "100%",
                        marginTop: "10px",
                        marginRight: "10px",
                      }}
                    >
                      <InputLabel htmlFor="outlined-age-native-simple">
                        Zone
                      </InputLabel>
                      <Select
                        // value={department}
                        onChange={handleZoneChange}
                        native
                        value={zoneId}
                        label="Zone"
                      >
                        <option aria-label="None" />
                        {dropdownZone.map((value, index) => (
                          <option key={value.id} value={value.id}>
                            {value.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl
                      variant="outlined"
                      style={{ width: "100%", marginTop: "10px" }}
                    >
                      <InputLabel htmlFor="outlined-age-native-simple">
                        City
                      </InputLabel>
                      <Select
                        // value={department}
                        onChange={handleCityChange}
                        native
                        value={cityId}
                        label="City"
                      >
                        <option aria-label="None" />
                        {dropdownCity.map((value, index) => (
                          <option key={value.id} value={value.id}>
                            {value.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </div>
                  <div style={{ display: "flex", width: "100%" }}>
                    <FormControl
                      variant="outlined"
                      style={{
                        width: "100%",
                        marginTop: "10px",
                        marginRight: "10px",
                      }}
                    >
                      <InputLabel htmlFor="outlined-age-native-simple">
                        Territory
                      </InputLabel>
                      <Select
                        // value={department}
                        onChange={handleTerritoryChange}
                        native
                        value={territoryId}
                        label="Territory"
                      >
                        <option aria-label="None" />
                        {dropDownTerritory.map((value, index) => (
                          <option key={value.id} value={value.id}>
                            {value.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>

                    <FormControl
                      variant="outlined"
                      className={classes.textFieldSsid}
                    >
                      <InputLabel htmlFor="outlined-age-native-simple">
                        Brick
                      </InputLabel>
                      <Select
                        // value={department}
                        onChange={(e) => setBrickId(e.target.value)}
                        id="abc"
                        native
                        value={brickId}
                        label="Brick"
                      >
                        <option aria-label="None" />
                        {dropDownBrick.map((value, index) => (
                          <option key={value.id} value={value.id}>
                            {value.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  <Button
                    onClick={() => editDoctor(Id)}
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
                <h2 id="transition-modal-title">View Doctor</h2>
                <Table style={{ border: "2px solid" }}>
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
                      Abbreviation
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "left", borderLeft: "2px solid" }}
                    >
                      {abbreviation}
                    </TableCell>
                  </TableRow>

                  <TableRow style={{ border: "2px solid" }}>
                    <TableCell className={classes.styleTableHead}>
                      PMDC Registartaion
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "left", borderLeft: "2px solid" }}
                    >
                      {pmdcRegistration}
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
                      Preferred Time
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "left", borderLeft: "2px solid" }}
                    >
                      {preferredTime}
                    </TableCell>
                  </TableRow>
                  <TableRow style={{ border: "2px solid" }}>
                    <TableCell className={classes.styleTableHead}>
                      District
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "left", borderLeft: "2px solid" }}
                    >
                      {district}
                    </TableCell>
                  </TableRow>

                  <TableRow style={{ border: "2px solid" }}>
                    <TableCell className={classes.styleTableHead}>
                      Fee
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "left", borderLeft: "2px solid" }}
                    >
                      {fee}
                    </TableCell>
                  </TableRow>

                  <TableRow style={{ border: "2px solid" }}>
                    <TableCell className={classes.styleTableHead}>
                      Potential
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "left", borderLeft: "2px solid" }}
                    >
                      {potential}
                    </TableCell>
                  </TableRow>

                  <TableRow style={{ border: "2px solid" }}>
                    <TableCell className={classes.styleTableHead}>
                      Qualification
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "left", borderLeft: "2px solid" }}
                    >
                      {qualificationId}
                    </TableCell>
                  </TableRow>

                  <TableRow style={{ border: "2px solid" }}>
                    <TableCell className={classes.styleTableHead}>
                      Representative
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "left", borderLeft: "2px solid" }}
                    >
                      {representativeId}
                    </TableCell>
                  </TableRow>

                  <TableRow style={{ border: "2px solid" }}>
                    <TableCell className={classes.styleTableHead}>
                      Region
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "left", borderLeft: "2px solid" }}
                    >
                      {regionId}
                    </TableCell>
                  </TableRow>

                  <TableRow style={{ border: "2px solid" }}>
                    <TableCell className={classes.styleTableHead}>
                      Zone
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "left", borderLeft: "2px solid" }}
                    >
                      {zoneId}
                    </TableCell>
                  </TableRow>

                  <TableRow style={{ border: "2px solid" }}>
                    <TableCell className={classes.styleTableHead}>
                      Territory
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "left", borderLeft: "2px solid" }}
                    >
                      {territoryId}
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
                      Speciality
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "left", borderLeft: "2px solid" }}
                    >
                      {specialityId}
                    </TableCell>
                  </TableRow>
                  <TableRow style={{ border: "2px solid" }}>
                    <TableCell className={classes.styleTableHead}>
                      Hospital
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "left", borderLeft: "2px solid" }}
                    >
                      {hospitalId}
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
                      City
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "left", borderLeft: "2px solid" }}
                    >
                      {cityId}
                    </TableCell>
                  </TableRow>
                  <TableRow style={{ border: "2px solid" }}>
                    <TableCell className={classes.styleTableHead}>
                      Brick
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "left", borderLeft: "2px solid" }}
                    >
                      {brickId}
                    </TableCell>
                  </TableRow>
                  <TableRow style={{ border: "2px solid" }}>
                    <TableCell className={classes.styleTableHead}>
                      Preferred Day
                    </TableCell>
                    <TableCell
                      style={{ textAlign: "left", borderLeft: "2px solid" }}
                    >
                      {preferredDay}
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

export default Doctor;
