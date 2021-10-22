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
    width: "40%",
    inHeight: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "70%",
      inHeight: "55%",
    },
  },
}));

const AddSellingPitch = () => {
  const classes = useStyles();
  const history = useHistory();
  const [emp, setEmp] = useState([]);
  const [load, setLoad] = useState(false);
  const [open, setOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [productId, setProductId] = useState("");
  const [callOpening, setCallOpening] = useState("");
  const [callProbing, setCallProbing] = useState("");
  const [problemSetup, setProblemSetup] = useState("");
  const [keyMessages, setKeyMessages] = useState("");
  const [gainingCommitment, setGainingCommitment] = useState("");
  const [dropdownProduct, setDropdownProduct] = useState([]);
  const [Id, setId] = useState("");
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

  const AddSellingPitch = () => {
    const form = {
      productId,
      callOpening,
      callProbing,
      problemSetup,
      keyMessages,
      gainingCommitment,
    };
    axios
      .post(`${process.env.REACT_APP_URL}/selling/postSellingPitch`, form)
      .then((res) => {
        console.log(res.data);
        enqueueSnackbar("Selling Pitch Add Successfully", {
          variant: "success",
        });
        setOpen(false);
        fetchSellingPitch();
      })
      .catch(function (error) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
        console.log(error.response);
      });
  };

  const getSellingPitchById = async (id) => {
    const form = { id };
    let response = await axios.post(
      `${process.env.REACT_APP_URL}/selling/getSellingPitch`,
      form
    );
    console.log(response.data);
    setId(response.data.id);
    setProductId(response.data.productId?._id);
    setCallOpening(response.data.callOpening);
    setCallProbing(response.data.callProbing);
    setProblemSetup(response.data.problemSetup);
    setKeyMessages(response.data.keyMessages);
    setGainingCommitment(response.data.gainingCommitment);
    setEditModal(true);
  };

  const editSellingPitch = async (id) => {
    const form = {
      id,
      productId,
      callOpening,
      callProbing,
      problemSetup,
      keyMessages,
      gainingCommitment,
    };
    await axios
      .post(`${process.env.REACT_APP_URL}/selling/updateSellingPitch`, form)
      .then((res) => {
        console.log(res.data);
        setEditModal(false);
        enqueueSnackbar("SellingPitch Edit Successfully", {
          variant: "success",
        });
        fetchSellingPitch();
      })
      .catch(function (error) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
        console.log(error.response);
      });
  };

  const deleteSellingPitch = (id) => {
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
                `${process.env.REACT_APP_URL}/selling/deleteSellingPitch`,
                form
              )
              .then((res) => {
                console.log(res.data);
                enqueueSnackbar("SellingPitch Deleted Successfully", {
                  variant: "success",
                });
                fetchSellingPitch();
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

  const fetchSellingPitch = async () => {
    await axios
      .get(`${process.env.REACT_APP_URL}/selling/getSellingPitches`)
      .then((response) => {
        const allSellingPitchs = response.data.results;
        console.log(allSellingPitchs);
        setEmp(allSellingPitchs);
        setLoad(false);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  useEffect(() => {
    fetchSellingPitch();
  }, [load]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/products/getProducts`)
      .then((res) => {
        setDropdownProduct(res.data);
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
        <Typography color="textPrimary">Add Selling Pitch</Typography>
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
          Add Selling Pitch
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
                  Product
                </TableCell>
                <TableCell
                  style={{ fontWeight: "600", width: "15%", color: "white" }}
                >
                  Call Opening
                </TableCell>

                <TableCell
                  style={{ fontWeight: "600", width: "15%", color: "white" }}
                >
                  Call Probing
                </TableCell>

                <TableCell
                  style={{ fontWeight: "600", width: "15%", color: "white" }}
                >
                  Problem Setup
                </TableCell>

                <TableCell
                  style={{ fontWeight: "600", width: "15%", color: "white" }}
                >
                  Key Messages
                </TableCell>

                <TableCell
                  style={{ fontWeight: "600", width: "15%", color: "white" }}
                >
                  Gaining Commitment
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
                      {user.productId?.name}
                    </TableCell>
                    <TableCell>{user.callOpening}</TableCell>
                    <TableCell>{user.callProbing}</TableCell>
                    <TableCell>{user.problemSetup}</TableCell>
                    <TableCell>{user.keyMessages}</TableCell>
                    <TableCell>{user.gainingCommitment}</TableCell>
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
                            getSellingPitchById(user.id);
                          }}
                        >
                          <EditIcon color="primary" />
                        </Button>

                        <Button
                          onClick={() => {
                            deleteSellingPitch(user.id);
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
                <h2 id="transition-modal-title">Add Selling Pitch</h2>
                <div style={{ marginTop: "10px", width: "80%" }}>
                  <FormControl
                    variant="outlined"
                    style={{
                      width: "100%",
                      marginTop: "10px",
                    }}
                  >
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Product
                    </InputLabel>
                    <Select
                      onChange={(e) => setProductId(e.target.value)}
                      native
                      value={productId}
                      label="Product"
                    >
                      <option aria-label="None" />
                      {dropdownProduct.map((value, index) => (
                        <option key={value.id} value={value._id}>
                          {value.name}
                        </option>
                      ))}
                    </Select>
                  </FormControl>

                  <TextField
                    style={{ width: "100%", marginTop: "10px" }}
                    required
                    id="outlined-required"
                    label="Call Opening"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={callOpening}
                    onChange={(e) => setCallOpening(e.target.value)}
                  />

                  <TextField
                    style={{ width: "100%", marginTop: "10px" }}
                    required
                    id="outlined-required"
                    label="Call Probing"
                    variant="outlined"
                    value={callProbing}
                    multiline
                    rows={4}
                    onChange={(e) => setCallProbing(e.target.value)}
                  />

                  <TextField
                    style={{ width: "100%", marginTop: "10px" }}
                    required
                    id="outlined-required"
                    label="Problem Setup"
                    variant="outlined"
                    value={problemSetup}
                    multiline
                    rows={4}
                    onChange={(e) => setProblemSetup(e.target.value)}
                  />
                  <TextField
                    style={{ width: "100%", marginTop: "10px" }}
                    required
                    id="outlined-required"
                    label="Key Messages"
                    variant="outlined"
                    value={keyMessages}
                    multiline
                    rows={4}
                    onChange={(e) => setKeyMessages(e.target.value)}
                  />

                  <TextField
                    style={{ width: "100%", marginTop: "10px" }}
                    required
                    id="outlined-required"
                    label="Gaining Commitment"
                    variant="outlined"
                    value={gainingCommitment}
                    multiline
                    rows={4}
                    onChange={(e) => setGainingCommitment(e.target.value)}
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
                    style={{ width: "45%" }}
                    variant="contained"
                    color="primary"
                    onClick={AddSellingPitch}
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
                <h2 id="transition-modal-title">Edit Selling Pitch</h2>
                <div style={{ marginTop: "10px", width: "80%" }}>
                  <FormControl
                    variant="outlined"
                    style={{
                      width: "100%",
                      marginTop: "10px",
                    }}
                  >
                    <InputLabel htmlFor="outlined-age-native-simple">
                      Product
                    </InputLabel>
                    <Select
                      onChange={(e) => setProductId(e.target.value)}
                      native
                      value={productId}
                      label="Product"
                    >
                      <option aria-label="None" />
                      {dropdownProduct.map((value, index) => (
                        <option key={value.id} value={value._id}>
                          {value.name}
                        </option>
                      ))}
                    </Select>
                  </FormControl>

                  <TextField
                    style={{ width: "100%", marginTop: "10px" }}
                    required
                    id="outlined-required"
                    label="Call Opening"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={callOpening}
                    onChange={(e) => setCallOpening(e.target.value)}
                  />

                  <TextField
                    style={{ width: "100%", marginTop: "10px" }}
                    required
                    id="outlined-required"
                    label="Call Probing"
                    variant="outlined"
                    value={callProbing}
                    multiline
                    rows={4}
                    onChange={(e) => setCallProbing(e.target.value)}
                  />

                  <TextField
                    style={{ width: "100%", marginTop: "10px" }}
                    required
                    id="outlined-required"
                    label="Problem Setup"
                    variant="outlined"
                    value={problemSetup}
                    multiline
                    rows={4}
                    onChange={(e) => setProblemSetup(e.target.value)}
                  />
                  <TextField
                    style={{ width: "100%", marginTop: "10px" }}
                    required
                    id="outlined-required"
                    label="Key Messages"
                    variant="outlined"
                    value={keyMessages}
                    multiline
                    rows={4}
                    onChange={(e) => setKeyMessages(e.target.value)}
                  />

                  <TextField
                    style={{ width: "100%", marginTop: "10px" }}
                    required
                    id="outlined-required"
                    label="Gaining Commitment"
                    variant="outlined"
                    value={gainingCommitment}
                    multiline
                    row={4}
                    onChange={(e) => setGainingCommitment(e.target.value)}
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
                    style={{ width: "45%" }}
                    variant="contained"
                    color="primary"
                    onClick={() => editSellingPitch(Id)}
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

export default AddSellingPitch;
