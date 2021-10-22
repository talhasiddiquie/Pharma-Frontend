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
    width: "35%",
    inHeight: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "70%",
      inHeight: "55%",
    },
  },
}));

const Product = () => {
  const classes = useStyles();
  const history = useHistory();
  const [emp, setEmp] = useState([]);
  const [load, setLoad] = useState(false);
  const [open, setOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [name, setName] = useState("");
  const [abbreviation, setAbbreviation] = useState("");
  const [molecule, setMolecule] = useState("");
  const [company, setCompany] = useState("");
  const [sellingLine, setSellingLine] = useState("");
  const [approvedIndication, setApprovedIndication] = useState("");
  const [mrp, setMrp] = useState("");
  const [tp, setTp] = useState("");
  const [discount, setDiscount] = useState("");
  const [keySellingMessage, setKeySellingMessage] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [Id, setId] = useState("");
  const [dropdownSellingLine, setDropDownSellingLine] = useState([]);
  const [files, setFiles] = useState([]);
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

  const uploadImages = (e) => {
    const images = [];
    for (let i = 0; i < e.target.files.length; i++) {
      images.push(e.target.files[i]);
    }
    console.log(images, "----------=======--------Files");
    setFiles(images);
  };

  const handleEditClose = () => {
    setEditModal(false);
  };

  const addProduct = () => {
    const form = new FormData();

    form.append("name", name);
    form.append("abbreviation", abbreviation);
    form.append("sellingLine", sellingLine);
    form.append("company", company);
    form.append("molecule", molecule);
    form.append("approvedIndication", approvedIndication);
    form.append("mrp", mrp);
    form.append("tp", tp);
    form.append("sellingMessage", keySellingMessage);
    form.append("discount", discount);
    form.append("additionalInfo", additionalInfo);
    //For send multiple images append data
    files.forEach((value) => form.append("files", value));

    axios
      .post(`${process.env.REACT_APP_URL}/products/postProduct`, form, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        enqueueSnackbar("Product Add Successfully", { variant: "success" });
        setOpen(false);
        fetchProduct();
      })
      .catch(function (error) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
        console.log(error.response);
      });
  };

  const getCompanyById = async (id) => {
    console.log();
    const form = { id };
    let response = await axios.post(
      `${process.env.REACT_APP_URL}/products/getProduct`,
      form
    );
    console.log(response.data);
    setId(response.data._id);
    setName(response.data.name);

    setAbbreviation(response.data.abbreviation);
    setMolecule(response.data.molecule);
    setCompany(response.data.company);
    setSellingLine(response.data.sellingLine?._id);
    setApprovedIndication(response.data.approvedIndication);
    setMrp(response.data.mrp);
    setTp(response.data.tp);
    setDiscount(response.data.discount);
    setKeySellingMessage(response.data.sellingMessage);
    setAdditionalInfo(response.data.additionalInfo);

    setEditModal(true);
  };

  const editFormProvince = async (id) => {
   
    const form = new FormData();
    form.append("id", id);
    form.append("name", name);
    form.append("abbreviation", abbreviation);
    form.append("sellingLine", sellingLine);
    form.append("company", company);
    form.append("molecule", molecule);
    form.append("approvedIndication", approvedIndication);
    form.append("mrp", mrp);
    form.append("tp", tp);
    form.append("sellingMessage", keySellingMessage);
    form.append("discount", discount);
    form.append("additionalInfo", additionalInfo);
    files.forEach((value) => form.append("files", value));
   
    await axios
      .post(`${process.env.REACT_APP_URL}/products/updateProduct`, form, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        setEditModal(false);
        enqueueSnackbar("Product Edit Successfully", { variant: "success" });
        fetchProduct();
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
              .post(`${process.env.REACT_APP_URL}/products/deleteProduct`, form)
              .then((res) => {
                console.log(res.data);
                fetchProduct();
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

  const fetchProduct = async () => {
    await axios
      .get(`${process.env.REACT_APP_URL}/products/getProducts`)
      .then((response) => {
        const allProduct = response.data;
        console.log(allProduct);
        setEmp(allProduct);
        setLoad(false);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  useEffect(() => {
    fetchProduct();
  }, [load]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/companies/getCompanies`)
      .then((res) => {
        setDropDownSellingLine(res.data?.results);
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
        <Typography color="textPrimary">Product</Typography>
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
          Add Product
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
                  Abbrevation
                </TableCell>
                <TableCell
                  style={{ fontWeight: "600", width: "15%", color: "white" }}
                >
                  Molecule
                </TableCell>
                <TableCell
                  style={{ fontWeight: "600", width: "15%", color: "white" }}
                >
                  Company
                </TableCell>
                <TableCell
                  style={{ fontWeight: "600", width: "15%", color: "white" }}
                >
                  Selling Line
                </TableCell>
                <TableCell
                  style={{ fontWeight: "600", width: "15%", color: "white" }}
                >
                  Approved Indication
                </TableCell>

                <TableCell
                  style={{ fontWeight: "600", width: "15%", color: "white" }}
                >
                  Mrp
                </TableCell>

                <TableCell
                  style={{ fontWeight: "600", width: "15%", color: "white" }}
                >
                  Tp
                </TableCell>

                <TableCell
                  style={{ fontWeight: "600", width: "15%", color: "white" }}
                >
                  Discount
                </TableCell>

                <TableCell
                  style={{ fontWeight: "600", width: "15%", color: "white" }}
                >
                  Key Selling Message
                </TableCell>

                <TableCell
                  style={{ fontWeight: "600", width: "15%", color: "white" }}
                >
                  Additional Info
                </TableCell>

                {/* <TableCell
                  style={{ fontWeight: "600", width: "15%", color: "white" }}
                >
                  File
                </TableCell> */}

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
                      {user.name}
                    </TableCell>
                    <TableCell>{user.abbreviation}</TableCell>
                    <TableCell>{user.molecule}</TableCell>
                    <TableCell>{user.company}</TableCell>
                    <TableCell>{user.sellingLine?.name}</TableCell>
                    <TableCell>{user.approvedIndication}</TableCell>
                    <TableCell>{user.mrp}</TableCell>
                    <TableCell>{user.tp}</TableCell>
                    <TableCell>{user.discount}</TableCell>
                    <TableCell>{user.sellingMessage}</TableCell>
                    <TableCell>{user.additionalInfo}</TableCell>
                    {/* <TableCell>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          flexWrap: "nowrap",
                          width: "150px",
                        }}
                      >
                        <strong>
                          {user.fileName ? (
                            <a
                              style={{ textDecoration: "none" }}
                              //   href={`${BASE_ASSET}${user.fileName}`}
                            >
                              <Button
                                variant="contained"
                                color="primary"
                                size="small"
                                style={{ marginLeft: 16 }}
                              >
                                Download CV
                              </Button>
                            </a>
                          ) : null}
                        </strong>
                      </div>
                    </TableCell> */}
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
                <h2 id="transition-modal-title">Add Product</h2>
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
                      style={{ width: "100%", marginTop: "10px" }}
                      required
                      id="outlined-required"
                      label="Molecule"
                      variant="outlined"
                      value={molecule}
                      onChange={(e) => setMolecule(e.target.value)}
                    />
                  </div>

                  <div style={{ display: "flex" }}>
                    <TextField
                      style={{
                        marginTop: "10px",
                        marginRight: "10px",
                        width: "100%",
                      }}
                      required
                      id="outlined-required"
                      label="Company"
                      variant="outlined"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />

                    <FormControl
                      variant="outlined"
                      className={classes.textFieldSsid}
                      style={{ width: "100%", marginTop: "10px" }}
                    >
                      <InputLabel htmlFor="outlined-age-native-simple">
                        Selling Line
                      </InputLabel>
                      <Select
                        // value={department}
                        onChange={(e) => setSellingLine(e.target.value)}
                        id="abc"
                        native
                        value={sellingLine}
                        label="Selling Line"
                      >
                        <option aria-label="None" />
                        {dropdownSellingLine.map((value, index) => (
                          <option key={value.id} value={value.id}>
                            {value.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  <TextField
                    style={{ width: "100%", marginTop: "10px" }}
                    required
                    id="outlined-required"
                    label="Approved Indication"
                    variant="outlined"
                    value={approvedIndication}
                    onChange={(e) => setApprovedIndication(e.target.value)}
                  />

                  <TextField
                    style={{ width: "100%", marginTop: "10px" }}
                    required
                    id="outlined-required"
                    label="mrp"
                    variant="outlined"
                    value={mrp}
                    onChange={(e) => setMrp(e.target.value)}
                  />

                  <TextField
                    style={{ width: "100%", marginTop: "10px" }}
                    required
                    id="outlined-required"
                    label="Tp"
                    variant="outlined"
                    value={tp}
                    onChange={(e) => setTp(e.target.value)}
                  />

                  <TextField
                    style={{ width: "100%", marginTop: "10px" }}
                    required
                    id="outlined-required"
                    label="Discount"
                    variant="outlined"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                  />

                  <TextField
                    style={{ width: "100%", marginTop: "10px" }}
                    required
                    id="outlined-required"
                    label="Key Selling Message"
                    variant="outlined"
                    value={keySellingMessage}
                    onChange={(e) => setKeySellingMessage(e.target.value)}
                  />

                  <TextField
                    style={{ width: "100%", marginTop: "10px" }}
                    required
                    id="outlined-required"
                    label="Addtional Info"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                  />
                  <Button
                    style={{ marginTop: "10px", color: "white" }}
                    variant="contained"
                    component="label"
                    color="primary"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload Image
                    <input
                      name="flies"
                      type="file"
                      multiple
                      onChange={uploadImages}
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
                    style={{ width: "100%", color: "white" }}
                    variant="contained"
                    color="primary"
                    onClick={addProduct}
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
                <h2 id="transition-modal-title">Edit Company</h2>
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
                      style={{ width: "100%", marginTop: "10px" }}
                      required
                      id="outlined-required"
                      label="Molecule"
                      variant="outlined"
                      value={molecule}
                      onChange={(e) => setMolecule(e.target.value)}
                    />
                  </div>

                  <div style={{ display: "flex" }}>
                    <TextField
                      style={{
                        marginTop: "10px",
                        marginRight: "10px",
                        width: "100%",
                      }}
                      required
                      id="outlined-required"
                      label="Company"
                      variant="outlined"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                    />

                    <FormControl
                      variant="outlined"
                      className={classes.textFieldSsid}
                      style={{ width: "100%", marginTop: "10px" }}
                    >
                      <InputLabel htmlFor="outlined-age-native-simple">
                        Selling Line
                      </InputLabel>
                      <Select
                        // value={department}
                        onChange={(e) => setSellingLine(e.target.value)}
                        id="abc"
                        native
                        value={sellingLine}
                        label="Selling Line"
                      >
                        <option aria-label="None" />
                        {dropdownSellingLine.map((value, index) => (
                          <option key={value.id} value={value.id}>
                            {value.name}
                          </option>
                        ))}
                      </Select>
                    </FormControl>
                  </div>

                  <TextField
                    style={{ width: "100%", marginTop: "10px" }}
                    required
                    id="outlined-required"
                    label="Approved Indication"
                    variant="outlined"
                    value={approvedIndication}
                    onChange={(e) => setApprovedIndication(e.target.value)}
                  />

                  <TextField
                    style={{ width: "100%", marginTop: "10px" }}
                    required
                    id="outlined-required"
                    label="mrp"
                    variant="outlined"
                    value={mrp}
                    onChange={(e) => setMrp(e.target.value)}
                  />

                  <TextField
                    style={{ width: "100%", marginTop: "10px" }}
                    required
                    id="outlined-required"
                    label="Tp"
                    variant="outlined"
                    value={tp}
                    onChange={(e) => setTp(e.target.value)}
                  />

                  <TextField
                    style={{ width: "100%", marginTop: "10px" }}
                    required
                    id="outlined-required"
                    label="Discount"
                    variant="outlined"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                  />

                  <TextField
                    style={{ width: "100%", marginTop: "10px" }}
                    required
                    id="outlined-required"
                    label="Key Selling Message"
                    variant="outlined"
                    value={keySellingMessage}
                    onChange={(e) => setKeySellingMessage(e.target.value)}
                  />

                  <TextField
                    style={{ width: "100%", marginTop: "10px" }}
                    required
                    id="outlined-required"
                    label="Addtional Info"
                    variant="outlined"
                    multiline
                    rows={4}
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                  />
                  <Button
                    style={{ marginTop: "10px", color: "white" }}
                    variant="contained"
                    component="label"
                    color="primary"
                    startIcon={<CloudUploadIcon />}
                  >
                    Upload Image
                    <input
                      name="flies"
                      type="file"
                      multiple
                      onChange={uploadImages}
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

export default Product;
