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
    inHeight: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "70%",
      inHeight: "55%",
    },
  },
}));

const Designation = () => {
  const classes = useStyles();
  const history = useHistory();
  const [emp, setEmp] = useState([]);
  const [load, setLoad] = useState(false);
  const [open, setOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [Id, setId] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

    setName("");

    setType("");
  };

  const handleEditOpen = (id) => {
    setEditModal(true);
  };

  const handleEditClose = () => {
    setEditModal(false);

    setName("");

    setType("");
  };

  const addDesigantion = () => {
    const form = { name, type };
    axios
      .post(`${process.env.REACT_APP_URL}/designations/postDesignation`, form)
      .then((res) => {
        console.log(res.data);
        enqueueSnackbar("Designation Add Successfully", { variant: "success" });
        setOpen(false);
        fetchDesignation();
      })
      .catch(function (error) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
        console.log(error.response);
      });

    setName("");

    setType("");
  };

  const getDesignationById = async (id) => {
    console.log(id, "=========================IDDDDDDDDDd");
    const form = { id };
    let response = await axios.post(
      `${process.env.REACT_APP_URL}/designations/getDesignation`,
      form
    );
    console.log(response.data);
    setId(response.data.id);
    setName(response.data.name);

    setType(response.data.type);
    setEditModal(true);
  };

  const editDesignation = async (id) => {
    const form = { id, name, type };
    await axios
      .post(`${process.env.REACT_APP_URL}/designations/updateDesignation`, form)
      .then((res) => {
        console.log(res.data);
        setEditModal(false);
        enqueueSnackbar("Designation Edit Successfully", {
          variant: "success",
        });
        fetchDesignation();
      })
      .catch(function (error) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
        console.log(error.response);
      });

    setName("");

    setType("");
  };

  const deleteDesignation = (id) => {
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
                `${process.env.REACT_APP_URL}/designations/deleteDesignation`,
                form
              )
              .then((res) => {
                console.log(res.data);
                enqueueSnackbar("Designation Deleted Successfully", {
                  variant: "success",
                });
                fetchDesignation();
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

  const fetchDesignation = async () => {
    await axios
      .get(`${process.env.REACT_APP_URL}/designations/getDesignations`)
      .then((response) => {
        const allRegion = response.data.results;
        console.log(allRegion);
        setEmp(allRegion);
        setLoad(false);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  useEffect(() => {
    fetchDesignation();
  }, [load]);

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
        <Typography color="textPrimary">Designation</Typography>
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
          Add Desigantion
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
                  Type
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
                    <TableCell>{user.type}</TableCell>

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
                            getDesignationById(user.id);
                          }}
                        >
                          <EditIcon color="primary" />
                        </Button>

                        <Button
                          onClick={() => {
                            deleteDesignation(user.id);
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
                <h2 id="transition-modal-title">Add Designation</h2>
                <div style={{ marginTop: "10px", width: "80%" }}>
                  <TextField
                    style={{ width: "100%", marginTop: "10px" }}
                    required
                    id="outlined-required"
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <FormControl
                    style={{ width: "100%", marginTop: "10px" }}
                    variant="outlined"
                  >
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Type
                    </InputLabel>
                    <Select
                      native
                      label="Type"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option aria-label="None"> </option>
                      <option value="doctor">Doctor</option>
                      <option value="representative">Representative</option>
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
                    onClick={addDesigantion}
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
                <h2 id="transition-modal-title">Edit Region</h2>
                <div style={{ marginTop: "10px", width: "80%" }}>
                  <TextField
                    style={{ width: "100%", marginTop: "10px" }}
                    required
                    id="outlined-required"
                    label="Name"
                    variant="outlined"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <FormControl
                    style={{ width: "100%", marginTop: "10px" }}
                    variant="outlined"
                  >
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Type
                    </InputLabel>
                    <Select
                      native
                      label="Type"
                      value={type}
                      onChange={(e) => setType(e.target.value)}
                    >
                      <option aria-label="None"> </option>
                      <option value="doctor">Doctor</option>
                      <option value="representative">Representative</option>
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
                    onClick={() => editDesignation(Id)}
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

export default Designation;
