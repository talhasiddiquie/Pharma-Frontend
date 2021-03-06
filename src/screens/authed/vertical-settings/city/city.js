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
    inHeight: "55%",
    [theme.breakpoints.down("sm")]: {
      width: "70%",
      inHeight: "60%",
    },
  },
}));

const City = () => {
  const classes = useStyles();
  const history = useHistory();
  const [emp, setEmp] = useState([]);
  const [load, setLoad] = useState(false);
  const [open, setOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [name, setName] = useState("");
  const [abbreviation, setAbbreviation] = useState("");
  const [provinceId, setProvinceId] = useState("");
  const [regionId, setRegionId] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [Id, setId] = useState("");
  const [company, setCompany] = useState("");
  const [dropdownCompany, setDropDownCompany] = useState([]);
  const [dropdownProvince, setDropDownProvince] = useState([]);
  const [dropdownZone, setDropDownZone] = useState([]);
  const [dropdownRegion, setDropDownRegion] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAbbreviation("");
    setName("");
    setRegionId("");
    setZoneId("");
    setProvinceId("");
    setCompany("");
  };

  const handleEditOpen = (id) => {
    setEditModal(true);
  };

  const handleEditClose = () => {
    setEditModal(false);
    setAbbreviation("");
    setName("");
    setRegionId("");
    setZoneId("");
    setProvinceId("");
    setCompany("");
  };

  const handleRegionChange = async (e) => {
    setRegionId(e.target.value);
    const id = e.target.value;
    setProvinceId("");
    setZoneId("");
    await axios
      .post(`${process.env.REACT_APP_URL}/regions/getRegion`, { id })
      .then((res) => {
        setDropDownProvince(res.data?.provinceId);
      })
      .catch((err) => {
        console.log(err);
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
        setDropDownZone(res.data?.results);
      });
  };

  const addCity = () => {
    const form = {
      name,
      abbreviation,
      regionId,
      zoneId,
      provinceId,
      company,
    };
    axios
      .post(`${process.env.REACT_APP_URL}/cities/postCity`, form)
      .then((res) => {
        console.log(res.data);
        enqueueSnackbar("City Add Successfully", { variant: "success" });
        setOpen(false);
        fetchCity();
      })
      .catch(function (error) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
        console.log(error.response);
      });
    setAbbreviation("");
    setName("");
    setRegionId("");
    setZoneId("");
    setProvinceId("");
    setCompany("");
  };

  const editProvince = async (id) => {
    const form = { id };
    let response = await axios.post(
      `${process.env.REACT_APP_URL}/cities/getCity`,
      form
    );
    console.log(response.data);
    setId(response.data.id);
    setName(response.data.name);
    setAbbreviation(response.data.abbreviation);
    setRegionId(response.data.regionId?.id);
    setProvinceId(response.data.provinceId?.id);
    setZoneId(response.data.zoneId?.id);
    setCompany(response.data.company?.id);
    if (response.data?.provinceId == null) {
      console.log("empty valuee ");
    } else {
      setDropDownProvince([response.data?.provinceId]);
    }

    if (response.data.zoneId == null) {
      console.log("errror empty value");
    } else {
      setDropDownZone([response.data.zoneId]);
    }

    setEditModal(true);
  };

  const editFormProvince = async (id) => {
    const form = {
      id,
      name,
      abbreviation,
      regionId,
      zoneId,
      provinceId,
      company,
    };
    await axios
      .post(`${process.env.REACT_APP_URL}/cities/updateCity`, form)
      .then((res) => {
        console.log(res.data);
        setEditModal(false);
        enqueueSnackbar("City Edit Successfully", { variant: "success" });
        fetchCity();
      })
      .catch(function (error) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
        console.log(error.response);
      });
    setAbbreviation("");
    setName("");
    setRegionId("");
    setZoneId("");
    setProvinceId("");
    setCompany("");
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
              .post(`${process.env.REACT_APP_URL}/cities/deleteCity`, form)
              .then((res) => {
                console.log(res.data);
                fetchCity();
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

  const fetchCity = async () => {
    await axios
      .get(`${process.env.REACT_APP_URL}/cities/getCities`)
      .then((response) => {
        const allfetchCity = response.data.results;
        setEmp(allfetchCity);
        setLoad(false);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  useEffect(() => {
    fetchCity();
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

  useEffect(() => {}, []);
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
        <Typography color="textPrimary">City</Typography>
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
          Add City
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
                  style={{ fontWeight: "600", width: "15%", color: "white" }}
                >
                  Name
                </TableCell>
                <TableCell
                  style={{ fontWeight: "600", width: "15%", color: "white" }}
                >
                  Abbreviation
                </TableCell>

                <TableCell
                  style={{ fontWeight: "600", width: "15%", color: "white" }}
                >
                  Province
                </TableCell>

                <TableCell
                  style={{ fontWeight: "600", width: "15%", color: "white" }}
                >
                  Region
                </TableCell>

                <TableCell
                  style={{ fontWeight: "600", width: "15%", color: "white" }}
                >
                  Zone
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
                    <TableCell>{user.provinceId?.name}</TableCell>
                    <TableCell>{user.regionId?.name}</TableCell>
                    <TableCell>{user.zoneId?.name}</TableCell>
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
                <h2 id="transition-modal-title">Add City</h2>
                <div style={{ marginTop: "10px", width: "100%" }}>
                  <div style={{ display: "flex", width: "100%" }}>
                    <TextField
                      style={{
                        width: "100%",
                        marginTop: "10px",
                        marginRight: "10px",
                      }}
                      required
                      id="outlined-required"
                      label="Name"
                      variant="outlined"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />

                    <TextField
                      style={{
                        width: "100%",
                        marginTop: "10px",
                      }}
                      required
                      id="outlined-required"
                      label="Abbreviation"
                      variant="outlined"
                      value={abbreviation}
                      onChange={(e) => setAbbreviation(e.target.value)}
                    />
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
                        onChange={handleProvinceChange}
                        native
                        value={provinceId}
                        label="Province"
                      >
                        <option aria-label="None" />
                        {dropdownProvince?.map((value, index) => (
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
                        onChange={(e) => setZoneId(e.target.value)}
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
                  </div>
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
                    onClick={addCity}
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
                <h2 id="transition-modal-title">Edit City</h2>
                <div style={{ marginTop: "10px", width: "100%" }}>
                  <div style={{ display: "flex", width: "100%" }}>
                    <TextField
                      style={{
                        width: "100%",
                        marginTop: "10px",
                        marginRight: "10px",
                      }}
                      required
                      id="outlined-required"
                      label="Name"
                      variant="outlined"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />

                    <TextField
                      style={{
                        width: "100%",
                        marginTop: "10px",
                      }}
                      required
                      id="outlined-required"
                      label="Abbreviation"
                      variant="outlined"
                      value={abbreviation}
                      onChange={(e) => setAbbreviation(e.target.value)}
                    />
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
                        onChange={(e) => setZoneId(e.target.value)}
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
                  </div>
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

export default City;
