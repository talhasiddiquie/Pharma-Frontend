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
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { object } from "joi";

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

const VerticalGroupCompany = () => {
  const classes = useStyles();
  const history = useHistory();
  const [emp, setEmp] = useState([]);
  const [load, setLoad] = useState(false);
  const [open, setOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [objectId, setObjectId] = useState("");
  const [name, setName] = useState("");
  const [abbreviation, setAbbreviation] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [address, setAddress] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [contactDetail, setContactDetail] = useState("");
  const [CompanyLogo, setCompanyLogo] = useState("");
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

  const addCompany = () => {
    const form = new FormData();
    form.append("objectId", objectId);
    form.append("name", name);
    form.append("abbreviation", abbreviation);
    form.append("identifier", identifier);
    form.append("address", address);
    form.append("contactPerson", contactPerson);
    form.append("contactNumber", contactNumber);
    form.append("contactDetail", contactDetail);
    form.append("companyLogo", CompanyLogo);
    console.log(form);
    axios
      .post(`${process.env.REACT_APP_URL}/companies/postCompany`, form, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        enqueueSnackbar("Company Add Successfully", { variant: "success" });
        setOpen(false);
        fetchCompany();
      })
      .catch(function (error) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
        console.log(error.response);
      });
  };

  const getCompanyById = async (id) => {
    const form = { id };
    let response = await axios.post(
      `${process.env.REACT_APP_URL}/companies/getCompany`,
      form
    );
    console.log(response.data);
    setId(response.data._id);
    setName(response.data.name);
    setObjectId(response.data.objectId);
    setAbbreviation(response.data.abbreviation);
    setIdentifier(response.data.identifier);
    setAddress(response.data.address);
    setContactPerson(response.data.contactPerson);
    setContactNumber(response.data.contactNumber);
    setContactDetail(response.data.contactDetail);
    setEditModal(true);
  };

  const editFormProvince = async (id) => {
    console.log(id, "-----------------------.");
    const form = new FormData();
    form.append("id", id);
    form.append("objectId", objectId);
    form.append("name", name);
    form.append("abbreviation", abbreviation);
    form.append("identifier", identifier);
    form.append("address", address);
    form.append("contactPerson", contactPerson);
    form.append("contactNumber", contactNumber);
    form.append("contactDetail", contactDetail);
    form.append("companyLogo", CompanyLogo);
    console.log(form);
    await axios
      .post(`${process.env.REACT_APP_URL}/companies/updateCompany`, form, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        setEditModal(false);
        enqueueSnackbar("Company Edit Successfully", { variant: "success" });
        fetchCompany();
      })
      .catch(function (error) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
        console.log(error.response);
      });
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
                `${process.env.REACT_APP_URL}/companies/deleteCompany`,
                form
              )
              .then((res) => {
                console.log(res.data);
                fetchCompany();
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

  const fetchCompany = async () => {
    await axios
      .get(`${process.env.REACT_APP_URL}/companies/getCompanies`)
      .then((response) => {
        const allCompany = response.data;
        console.log(allCompany);
        setEmp(allCompany);
        setLoad(false);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  useEffect(() => {
    fetchCompany();
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
        <Typography color="textPrimary">Vertical-Settings</Typography>
        <Typography color="textPrimary">Company</Typography>
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
          Add Company
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
                  ID
                </TableCell>
                <TableCell
                  style={{ fontWeight: "600", width: "15%", color: "white" }}
                >
                  Logo
                </TableCell>
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
                  Identifier
                </TableCell>
                <TableCell
                  style={{ fontWeight: "600", width: "15%", color: "white" }}
                >
                  Adress
                </TableCell>
                <TableCell
                  style={{ fontWeight: "600", width: "15%", color: "white" }}
                >
                  Contact Person
                </TableCell>

                <TableCell
                  style={{ fontWeight: "600", width: "15%", color: "white" }}
                >
                  Contact Number
                </TableCell>

                <TableCell
                  style={{ fontWeight: "600", width: "15%", color: "white" }}
                >
                  Contact Detail
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
                      <img
                        style={{ width: "100px" }}
                        src={`${process.env.REACT_APP_URL_IMAGE_URL}/${user.logoImg}`}
                      ></img>
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {user.name}
                    </TableCell>
                    <TableCell>{user.abbreviation}</TableCell>
                    <TableCell>{user.identifier}</TableCell>
                    <TableCell>{user.address}</TableCell>
                    <TableCell>{user.contactPerson}</TableCell>
                    <TableCell>{user.contactNumber}</TableCell>
                    <TableCell>{user.contactDetail}</TableCell>

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
                            getCompanyById(user._id);
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
                <h2 id="transition-modal-title">Add Comapny</h2>
                <div style={{ marginTop: "10px", width: "80%" }}>
                  <TextField
                    style={{ width: "100%", marginTop: "10px" }}
                    required
                    id="outlined-required"
                    label="ID"
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
                    value={abbreviation}
                    onChange={(e) => setAbbreviation(e.target.value)}
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

                  <TextField
                    style={{ width: "100%", marginTop: "10px" }}
                    required
                    id="outlined-required"
                    label="Address"
                    variant="outlined"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />

                  <TextField
                    style={{ width: "100%", marginTop: "10px" }}
                    required
                    id="outlined-required"
                    label="Contact Person"
                    variant="outlined"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                  />

                  <TextField
                    style={{ width: "100%", marginTop: "10px" }}
                    required
                    id="outlined-required"
                    label="Contact Number"
                    variant="outlined"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                  />

                  <TextField
                    style={{ width: "100%", marginTop: "10px" }}
                    required
                    id="outlined-required"
                    label="Contact Detail"
                    variant="outlined"
                    value={contactDetail}
                    onChange={(e) => setContactDetail(e.target.value)}
                  />

                  <Button
                    style={{ marginTop: "10px" }}
                    variant="contained"
                    component="label"
                    color="primary"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload Image
                    <input
                      name="CompanyLogo"
                      type="file"
                      onChange={(e) => setCompanyLogo(e.target.files[0])}
                      hidden
                    />
                  </Button>
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
                    onClick={addCompany}
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
                    label="ID"
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
                    value={abbreviation}
                    onChange={(e) => setAbbreviation(e.target.value)}
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

                  <TextField
                    style={{ width: "100%", marginTop: "10px" }}
                    required
                    id="outlined-required"
                    label="Address"
                    variant="outlined"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />

                  <TextField
                    style={{ width: "100%", marginTop: "10px" }}
                    required
                    id="outlined-required"
                    label="Contact Person"
                    variant="outlined"
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                  />

                  <TextField
                    style={{ width: "100%", marginTop: "10px" }}
                    required
                    id="outlined-required"
                    label="Contact Number"
                    variant="outlined"
                    value={contactNumber}
                    onChange={(e) => setContactNumber(e.target.value)}
                  />

                  <TextField
                    style={{ width: "100%", marginTop: "10px" }}
                    required
                    id="outlined-required"
                    label="Contact Detail"
                    variant="outlined"
                    value={contactDetail}
                    onChange={(e) => setContactDetail(e.target.value)}
                  />

                  <Button
                    style={{ marginTop: "10px" }}
                    variant="contained"
                    component="label"
                    color="primary"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload Image
                    <input
                      type="file"
                      onChange={(e) => setCompanyLogo(e.target.files[0])}
                      hidden
                    />
                  </Button>
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

export default VerticalGroupCompany;
