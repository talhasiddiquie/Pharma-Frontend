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
    width: "25%",
    height: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "70%",
      height: "55%",
    },
  },
}));

const Territory = () => {
  const classes = useStyles();
  const history = useHistory();
  const [emp, setEmp] = useState([]);
  const [load, setLoad] = useState(false);
  const [open, setOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [objectId, setObjectId] = useState("");
  const [name, setName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [isActive, setIsActive] = useState("");
  const [Id, setId] = useState("");
  const [dropdownProvince, setDropDownProvince] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEditOpen = (id) => {
    setEditModal(true);
  };

  const handleEditClose = () => {
    setEditModal(false);
  };

  const addTerritory = () => {
    const form = { objectId, name, isActive, identifier, zoneId };
    axios
      .post(`${process.env.REACT_APP_URL}/territory/postTerritory`, form)
      .then((res) => {
        console.log(res.data);
        enqueueSnackbar("Territory Add Successfully", { variant: "success" });
        setOpen(false);
        fetchTerritory();
      })
      .catch(function (error) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
        console.log(error.response);
      });
    setIsActive("");
    setName("");
    setObjectId("");
    setIdentifier("");
    setZoneId("");
  };

  const editProvince = async (id) => {
    const form = { id };
    let response = await axios.post(
      `${process.env.REACT_APP_URL}/territory/getTerritory`,
      form
    );
    console.log(response.data);
    setId(response.data._id);
    setName(response.data.name);
    setObjectId(response.data.objectId);
    setIsActive(response.data.isActive);
    setZoneId(response.data.zoneId._id);
    setIdentifier(response.data.identifier);
    setEditModal(true);
  };

  const editFormProvince = async (id) => {
    const form = { id, objectId, name, isActive, identifier, zoneId };
    await axios
      .post(`${process.env.REACT_APP_URL}/territory/updateTerritory`, form)
      .then((res) => {
        console.log(res.data);
        setEditModal(false);
        enqueueSnackbar("Territory Edit Successfully", { variant: "success" });
        fetchTerritory();
      })
      .catch(function (error) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
        console.log(error.response);
      });
    setIsActive("");
    setName("");
    setObjectId("");
    setIdentifier("");
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
                `${process.env.REACT_APP_URL}/territory/deleteTerritory`,
                form
              )
              .then((res) => {
                console.log(res.data);
                fetchTerritory();
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

  const fetchTerritory = async () => {
    await axios
      .get(`${process.env.REACT_APP_URL}/territory/getTerritories`)
      .then((response) => {
        const allTerritory = response.data;
        setEmp(allTerritory);
        setLoad(false);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  useEffect(() => {
    fetchTerritory();
  }, [load]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/zones/getZones`).then((res) => {
      setDropDownProvince(res.data);
      console.log(res.data);
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
        <Typography color="textPrimary">Territory</Typography>
      </Breadcrumbs>
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
                <TableCell style={{ fontWeight: "600", width: "15%" }}>
                  Object ID
                </TableCell>
                <TableCell style={{ fontWeight: "600", width: "15%" }}>
                  Name
                </TableCell>
                <TableCell style={{ fontWeight: "600", width: "15%" }}>
                  Identifier
                </TableCell>
                <TableCell style={{ fontWeight: "600", width: "15%" }}>
                  Zone ID
                </TableCell>
                <TableCell style={{ fontWeight: "600", width: "15%" }}>
                  Zone Name
                </TableCell>
                <TableCell style={{ fontWeight: "600", width: "15%" }}>
                  RegionID
                </TableCell>
                <TableCell style={{ fontWeight: "600", width: "15%" }}>
                  Region Name
                </TableCell>
                <TableCell style={{ fontWeight: "600", width: "15%" }}>
                  Province ID
                </TableCell>
                <TableCell style={{ fontWeight: "600", width: "15%" }}>
                  Province Name
                </TableCell>
                <TableCell style={{ fontWeight: "600", width: "15%" }}>
                  isActive
                </TableCell>
                <TableCell
                  style={{
                    fontWeight: "600",
                    width: "15%",
                    textAlign: "center",
                  }}
                >
                  Actions
                </TableCell>
                <TableCell
                  style={{ fontWeight: "600", width: "15%" }}
                  align="right"
                >
                  <Button
                    style={{ width: "150px" }}
                    variant="outlined"
                    onClick={handleOpen}
                  >
                    Add Territory
                  </Button>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {emp.map((user, key, index) => {
                return (
                  <TableRow key={user.id}>
                    <TableCell component="th" scope="row">
                      {user.objectId}
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {user.name}
                    </TableCell>

                    <TableCell>{user.identifier}</TableCell>
                    <TableCell>{user.zoneId.objectId}</TableCell>
                    <TableCell>{user.zoneId.name}</TableCell>
                    <TableCell>{user.zoneId.regionId.objectId}</TableCell>
                    <TableCell>{user.zoneId.regionId.name}</TableCell>
                    <TableCell>
                      {user.zoneId.regionId.provinceId.objectId}
                    </TableCell>
                    <TableCell>
                      {user.zoneId.regionId.provinceId.name}
                    </TableCell>
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
                            editProvince(user._id);
                          }}
                        >
                          <EditIcon color="primary" />
                        </Button>

                        <Button
                          onClick={() => {
                            deleteProvince(user._id);
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
                <h2 id="transition-modal-title">Add Territory</h2>
                <div style={{ marginTop: "10px", width: "80%" }}>
                  <TextField
                    style={{ width: "100%", marginTop: "10px" }}
                    required
                    id="outlined-required"
                    label="Object ID"
                    variant="outlined"
                    value={objectId}
                    onChange={(e) => setObjectId(e.target.value)}
                  />
                  <TextField
                    style={{ width: "100%", marginTop: "10px" }}
                    required
                    id="outlined-required"
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <TextField
                    style={{ width: "100%", marginTop: "10px" }}
                    required
                    id="outlined-required"
                    label="Identifier"
                    variant="outlined"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                  />
                  <FormControl
                    style={{ width: "100%", marginTop: "10px" }}
                    variant="outlined"
                  >
                    <InputLabel htmlFor="outlined-age-native-simple">
                      isActive
                    </InputLabel>
                    <Select
                      native
                      label="isActive"
                      value={isActive}
                      onChange={(e) => setIsActive(e.target.value)}
                    >
                      <option aria-label="None"> </option>
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </Select>
                  </FormControl>
                  <FormControl
                    variant="outlined"
                    style={{ width: "100%", marginTop: "10px" }}
                  >
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Zone ID
                    </InputLabel>
                    <Select
                      // value={department}
                      onChange={(e) => setZoneId(e.target.value)}
                      native
                      value={zoneId}
                      label="Zone ID"
                    >
                      <option aria-label="None" />
                      {dropdownProvince.map((value, index) => (
                        <option key={value.id} value={value._id}>
                          {value.objectId}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
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
                    style={{ width: "45%" }}
                    variant="contained"
                    color="primary"
                    onClick={addTerritory}
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
                <h2 id="transition-modal-title">Edit Territory</h2>
                <div style={{ marginTop: "10px", width: "80%" }}>
                  <TextField
                    style={{ width: "100%", marginTop: "10px" }}
                    required
                    id="outlined-required"
                    label="Object ID"
                    variant="outlined"
                    value={objectId}
                    onChange={(e) => setObjectId(e.target.value)}
                  />
                  <TextField
                    style={{ width: "100%", marginTop: "10px" }}
                    required
                    id="outlined-required"
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <TextField
                    style={{ width: "100%", marginTop: "10px" }}
                    required
                    id="outlined-required"
                    label="Abbreviation"
                    variant="outlined"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                  />
                  <FormControl
                    style={{ width: "100%", marginTop: "10px" }}
                    variant="outlined"
                  >
                    <InputLabel htmlFor="outlined-age-native-simple">
                      isActive
                    </InputLabel>
                    <Select
                      native
                      label="isActive"
                      value={isActive}
                      onChange={(e) => setIsActive(e.target.value)}
                    >
                      <option aria-label="None"> </option>
                      <option value="true">True</option>
                      <option value="false">False</option>
                    </Select>
                  </FormControl>
                  <FormControl
                    variant="outlined"
                    style={{ width: "100%", marginTop: "10px" }}
                  >
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Zone ID
                    </InputLabel>
                    <Select
                      // value={department}
                      onChange={(e) => setZoneId(e.target.value)}
                      native
                      value={zoneId}
                      label="Province ID"
                    >
                      <option aria-label="None" />
                      {dropdownProvince.map((value, index) => (
                        <option key={value.id} value={value._id}>
                          {value.objectId}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
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
                    style={{ width: "45%" }}
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

export default Territory;
