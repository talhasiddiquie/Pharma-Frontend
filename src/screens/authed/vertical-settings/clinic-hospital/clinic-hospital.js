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
import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Card from "@material-ui/core/Card";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SuccessIcon from "../../../components/Success&PendingIcon/SuccessIcon";
import PendingIcon from "../../../components/Success&PendingIcon/PendingIcon";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useSnackbar } from "notistack";
import { makeStyles } from "@material-ui/core/styles";

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
    width: "35%",
    inHeight: "65%",
    [theme.breakpoints.down("sm")]: {
      width: "70%",
      inHeight: "65%",
    },
  },
}));

const ClinicHospital = () => {
  const classes = useStyles();
  const history = useHistory();
  const [emp, setEmp] = useState([]);
  const [load, setLoad] = useState(false);
  const [open, setOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [name, setName] = useState("");
  const [abbreviation, setAbbreviation] = useState("");
  const [address, setAddress] = useState("");
  const [brickId, setBrickId] = useState("");
  const [territoryId, setTerritoryId] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [regionId, setRegionId] = useState("");
  const [cityId, setCityId] = useState("");
  const [phone, setPhone] = useState("");
  const [Id, setId] = useState("");
  const [company, setCompany] = useState("");
  const [dropdownCompany, setDropDownCompany] = useState([]);
  const [provinceId, setProvinceId] = useState("");
  const [dropdownProvince, setDropDownProvince] = useState([]);
  const [dropDownBrick, setDropDownBrick] = useState([]);
  const [dropDownTerritory, setDropDownTerritory] = useState([]);
  const [dropdownRegion, setDropDownRegion] = useState([]);
  const [dropdownZone, setDropDownZone] = useState([]);
  const [dropdownCity, setDropDownCity] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setName("");
    setCompany("");
    setAbbreviation("");
    setAddress("");
    setPhone("");
    setBrickId("");
    setRegionId("");
    setTerritoryId("");
    setCityId("");
    setProvinceId("");
    setZoneId("");
  };

  const handleEditOpen = (id) => {
    setEditModal(true);
  };

  const handleEditClose = () => {
    setEditModal(false);
    setName("");
    setCompany("");
    setAbbreviation("");
    setAddress("");
    setPhone("");
    setBrickId("");
    setRegionId("");
    setTerritoryId("");
    setCityId("");
    setProvinceId("");
    setZoneId("");
  };

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
        console.log(res.data, "--------------------------------->");
        setDropDownZone(res.data.results);
      });
  };

  const handleZoneChange = async (e) => {
    setZoneId(e.target.value);
    const id = e.target.value;
    const form = { id };
    setCityId("");
    setTerritoryId("");
    setBrickId("");
    console.log(form);
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
    setTerritoryId("");
    setBrickId("");
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

    setBrickId("");
    await axios
      .get(`${process.env.REACT_APP_URL}/bricks/getBricks/?territoryId=${id}`)
      .then((res) => {
        setDropDownBrick(res.data.results);
      });
  };

  const addHospital = () => {
    const form = {
      name,
      address,
      abbreviation,
      phone,
      brickId,
      zoneId,
      regionId,
      cityId,
      territoryId,
      provinceId,
      company,
    };
    axios
      .post(`${process.env.REACT_APP_URL}/hospitals/postHospital`, form)
      .then((res) => {
        console.log(res.data);
        enqueueSnackbar("Clinic-Hospital Add Successfully", {
          variant: "success",
        });
        setOpen(false);
        fetchHospital();
      })
      .catch(function (error) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
        console.log(error.response);
      });

    setName("");
    setCompany("");
    setAbbreviation("");
    setAddress("");
    setPhone("");
    setBrickId("");
    setRegionId("");
    setTerritoryId("");
    setCityId("");
    setProvinceId("");
    setZoneId("");
  };

  const editProvince = async (id) => {
    const form = { id };
    let response = await axios.post(
      `${process.env.REACT_APP_URL}/hospitals/getHospital`,
      form
    );
    console.log(response.data);
    setId(response.data.id);
    setName(response.data.name);
    setCompany(response.data?.company?.id);
    setAddress(response.data.address);
    setPhone(response.data.phone);
    setAbbreviation(response.data.abbreviation);
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

    setEditModal(true);
  };

  const editFormProvince = async (id) => {
    const form = {
      id,
      company,
      name,
      address,
      abbreviation,
      phone,
      brickId,
      zoneId,
      regionId,
      cityId,
      territoryId,
      provinceId,
    };
    await axios
      .post(`${process.env.REACT_APP_URL}/hospitals/updateHospital`, form)
      .then((res) => {
        console.log(res.data);
        setEditModal(false);
        enqueueSnackbar("Clinic-Hospital Edit Successfully", {
          variant: "success",
        });
        fetchHospital();
      })
      .catch(function (error) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
        console.log(error.response);
      });
    setName("");
    setCompany("");
    setAbbreviation("");
    setAddress("");
    setPhone("");
    setBrickId("");
    setRegionId("");
    setTerritoryId("");
    setCityId("");
    setProvinceId("");
    setZoneId("");
  };

  const deleteProvince = (id) => {
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
                `${process.env.REACT_APP_URL}/hospitals/deleteHospital`,
                form
              )
              .then((res) => {
                console.log(res.data);
                fetchHospital();
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

  const fetchHospital = async () => {
    await axios
      .get(`${process.env.REACT_APP_URL}/hospitals/getHospitals`)
      .then((response) => {
        const allHospitals = response.data.results;
        setEmp(allHospitals);
        setLoad(false);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  useEffect(() => {
    fetchHospital();
  }, [load]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/regions/getRegions`).then((res) => {
      setDropDownRegion(res.data.results);
    });
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/companies/getCompanies`)
      .then((res) => {
        setDropDownCompany(res.data?.results);
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
        <Typography color="textPrimary">Vertical-Settings</Typography>
        <Typography color="textPrimary">Clinic-Hospital</Typography>
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
          Add Clinic-Hosptal
        </Button>
      </div>
      <div>
        <TableContainer
          style={{
            borderRadius: "4px",
            width: "100%",
            overflow: "auto",
            minWidth: "450px",
          }}
          component={Paper}
        >
          <Table>
            <TableHead style={{ background: "#00AEEF" }}>
              <TableRow>
                <TableCell
                  style={{ fontWeight: "600", width: "10%", color: "white" }}
                >
                  Name
                </TableCell>
                <TableCell
                  style={{ fontWeight: "600", width: "10%", color: "white" }}
                >
                  Abbreviation
                </TableCell>
                <TableCell
                  style={{ fontWeight: "600", width: "10%", color: "white" }}
                >
                  Address
                </TableCell>
                <TableCell
                  style={{ fontWeight: "600", width: "10%", color: "white" }}
                >
                  Phone
                </TableCell>
                <TableCell
                  style={{ fontWeight: "600", width: "10%", color: "white" }}
                >
                  Province
                </TableCell>
                <TableCell
                  style={{ fontWeight: "600", width: "10%", color: "white" }}
                >
                  Region
                </TableCell>
                <TableCell
                  style={{ fontWeight: "600", width: "10%", color: "white" }}
                >
                  Zone
                </TableCell>
                <TableCell
                  style={{ fontWeight: "600", width: "10%", color: "white" }}
                >
                  City
                </TableCell>
                <TableCell
                  style={{ fontWeight: "600", width: "10%", color: "white" }}
                >
                  Territory
                </TableCell>

                <TableCell
                  style={{ fontWeight: "600", width: "10%", color: "white" }}
                >
                  Brick
                </TableCell>

                <TableCell
                  style={{ fontWeight: "600", width: "15%", color: "white" }}
                >
                  Company
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
                      {user.name}
                    </TableCell>
                    <TableCell>{user.abbreviation}</TableCell>
                    <TableCell>{user.address}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.provinceId?.name}</TableCell>
                    <TableCell>{user.regionId?.name}</TableCell>
                    <TableCell>{user.zoneId?.name}</TableCell>
                    <TableCell>{user.cityId?.name}</TableCell>
                    <TableCell>{user.territoryId?.name}</TableCell>
                    <TableCell>{user.brickId?.name}</TableCell>
                    <TableCell>{user.company?.name}</TableCell>
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
                            editProvince(user.id);
                          }}
                        >
                          <EditIcon color="primary" />
                        </Button>

                        <Button
                          onClick={() => {
                            deleteProvince(user.id);
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
                <h2 id="transition-modal-title">Add Clinic-Hospital</h2>
                <div style={{ marginTop: "10px", width: "100%" }}>
                  <div style={{ display: "flex", width: "100%" }}>
                    <TextField
                      style={{ width: "100%", marginTop: "10px" }}
                      required
                      id="outlined-required"
                      label="Name"
                      variant="outlined"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div style={{ display: "flex", width: "100%" }}>
                    <TextField
                      style={{
                        width: "100%",
                        marginTop: "10px",
                        marginRight: "10px",
                      }}
                      required
                      id="outlined-required"
                      label="Abbreviation"
                      variant="outlined"
                      value={abbreviation}
                      onChange={(e) => setAbbreviation(e.target.value)}
                    />

                    <TextField
                      style={{
                        width: "100%",
                        marginTop: "10px",
                      }}
                      required
                      id="outlined-required"
                      label="Phone"
                      variant="outlined"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <FormControl
                    variant="outlined"
                    style={{
                      width: "100%",
                      marginTop: "10px",
                    }}
                  >
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Company
                    </InputLabel>
                    <Select
                      onChange={(e) => setCompany(e.target.value)}
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

                  <FormControl
                    variant="outlined"
                    style={{ width: "100%", marginTop: "10px" }}
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
                    style={{ width: "100%", marginTop: "10px" }}
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

                  <FormControl
                    variant="outlined"
                    style={{ width: "100%", marginTop: "10px" }}
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

                  <FormControl
                    variant="outlined"
                    style={{ width: "100%", marginTop: "10px" }}
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
                    style={{ width: "100%", marginTop: "10px" }}
                  >
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Brick
                    </InputLabel>
                    <Select
                      // value={department}
                      onChange={(e) => setBrickId(e.target.value)}
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

                  <TextField
                    style={{ width: "100%", marginTop: "10px" }}
                    required
                    id="outlined-required"
                    label="Address"
                    variant="outlined"
                    value={address}
                    multiline
                    rows={4}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    marginTop: "15px",
                  }}
                >
                  <Button
                    style={{ width: "100%", color: "white" }}
                    variant="contained"
                    color="primary"
                    onClick={addHospital}
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
                <h2 id="transition-modal-title">Edit Clinic-Hospital</h2>
                <div style={{ marginTop: "10px", width: "100%" }}>
                  <div style={{ display: "flex", width: "100%" }}>
                    <TextField
                      style={{ width: "100%", marginTop: "10px" }}
                      required
                      id="outlined-required"
                      label="Name"
                      variant="outlined"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div style={{ display: "flex", width: "100%" }}>
                    <TextField
                      style={{
                        width: "100%",
                        marginTop: "10px",
                        marginRight: "10px",
                      }}
                      required
                      id="outlined-required"
                      label="Abbreviation"
                      variant="outlined"
                      value={abbreviation}
                      onChange={(e) => setAbbreviation(e.target.value)}
                    />

                    <TextField
                      style={{
                        width: "100%",
                        marginTop: "10px",
                      }}
                      required
                      id="outlined-required"
                      label="Phone"
                      variant="outlined"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>

                  <FormControl
                    variant="outlined"
                    style={{
                      width: "100%",
                      marginTop: "10px",
                    }}
                  >
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Company
                    </InputLabel>
                    <Select
                      onChange={(e) => setCompany(e.target.value)}
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

                  <FormControl
                    variant="outlined"
                    style={{ width: "100%", marginTop: "10px" }}
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
                    style={{ width: "100%", marginTop: "10px" }}
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

                  <FormControl
                    variant="outlined"
                    style={{ width: "100%", marginTop: "10px" }}
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

                  <FormControl
                    variant="outlined"
                    style={{ width: "100%", marginTop: "10px" }}
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
                    style={{ width: "100%", marginTop: "10px" }}
                  >
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Brick
                    </InputLabel>
                    <Select
                      // value={department}
                      onChange={(e) => setBrickId(e.target.value)}
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

                  <TextField
                    style={{ width: "100%", marginTop: "10px" }}
                    required
                    id="outlined-required"
                    label="Address"
                    variant="outlined"
                    value={address}
                    multiline
                    rows={4}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    marginTop: "15px",
                  }}
                >
                  <Button
                    style={{ width: "100%", color: "white" }}
                    variant="contained"
                    color="primary"
                    onClick={() => editFormProvince(Id)}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
};

export default ClinicHospital;
