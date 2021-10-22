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
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
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
    inHeight: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "70%",
      inHeight: "55%",
    },
  },
}));

const Brick = () => {
  const classes = useStyles();
  const history = useHistory();
  const [emp, setEmp] = useState([]);
  const [load, setLoad] = useState(false);
  const [open, setOpen] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [name, setName] = useState("");
  const [abbreviation, setAbbreviation] = useState("");
  const [brickType, setBrickType] = useState("");
  const [territoryId, setTerritoryId] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [regionId, setRegionId] = useState("");
  const [cityId, setCityId] = useState("");
  const [provinceId, setProvinceId] = useState("");
  const [Id, setId] = useState("");
  const [company, setCompany] = useState("");
  const [dropdownCompany, setDropDownCompany] = useState([]);
  const [dropDownTerritory, setDropDownTerritory] = useState([]);
  const [dropdownProvince, setDropDownProvince] = useState([]);
  const [dropdownRegion, setDropDownRegion] = useState([]);
  const [dropdownZone, setDropDownZone] = useState([]);
  const [dropdownCity, setDropDownCity] = useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setAbbreviation("");
    setName("");
    setBrickType("");
    setTerritoryId("");
    setRegionId("");
    setProvinceId("");
    setZoneId("");
    setCityId("");
    setCompany("");
  };

  const handleEditOpen = (id) => {
    setEditModal(true);
  };

  const handleEditClose = () => {
    setEditModal(false);
    setAbbreviation("");
    setName("");
    setBrickType("");
    setTerritoryId("");
    setRegionId("");
    setProvinceId("");
    setZoneId("");
    setCityId("");
    setCompany("");
  };

  const handleRegionChange = async (e) => {
    setRegionId(e.target.value);
    const id = e.target.value;
    setProvinceId("");
    setZoneId("");
    setCityId("");
    setTerritoryId("");
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
    setCityId("");
    setTerritoryId("");
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
    setTerritoryId("");
    await axios
      .get(
        `${process.env.REACT_APP_URL}/territory/getTerritories/?cityId=${id}`
      )
      .then((res) => {
        setDropDownTerritory(res.data.results);
      });
  };

  const addBrick = () => {
    const form = {
      name,
      abbreviation,
      brickType,
      territoryId,
      zoneId,
      regionId,
      cityId,
      provinceId,
      company,
    };
    axios
      .post(`${process.env.REACT_APP_URL}/bricks/postBrick`, form)
      .then((res) => {
        console.log(res.data);
        enqueueSnackbar("City Add Successfully", { variant: "success" });
        setOpen(false);
        fetchBrick();
      })
      .catch(function (error) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
        console.log(error.response);
      });
    setAbbreviation("");
    setName("");

    setBrickType("");
    setTerritoryId("");
    setRegionId("");
    setProvinceId("");
    setZoneId("");
    setCityId("");
    setCompany("");
  };

  const editProvince = async (id) => {
    const form = { id };
    let response = await axios.post(
      `${process.env.REACT_APP_URL}/bricks/getBrick`,
      form
    );
    console.log(response.data);
    setId(response.data.id);
    setName(response.data.name);
    setCompany(response.data.company?.id);
    setAbbreviation(response.data.abbreviation);
    setBrickType(response.data.brickType);
    setRegionId(response.data.regionId?.id);
    setDropDownProvince([response.data.provinceId]);
    setProvinceId(response.data.provinceId?.id);
    setDropDownZone([response.data.zoneId]);
    setZoneId(response.data.zoneId?.id);
    setDropDownCity([response.data.cityId]);
    setCityId(response.data.cityId?.id);
    setDropDownTerritory([response.data.territoryId]);
    setTerritoryId(response.data.territoryId?.id);

    setEditModal(true);
  };

  const editFormProvince = async (id) => {
    const form = {
      id,
      name,
      abbreviation,
      brickType,
      territoryId,
      zoneId,
      regionId,
      cityId,
      provinceId,
      company,
    };
    await axios
      .post(`${process.env.REACT_APP_URL}/bricks/updateBrick`, form)
      .then((res) => {
        console.log(res.data);
        setEditModal(false);
        enqueueSnackbar("City Edit Successfully", { variant: "success" });
        fetchBrick();
      })
      .catch(function (error) {
        enqueueSnackbar(error.response.data.message, { variant: "error" });
        console.log(error.response);
      });
    setAbbreviation("");
    setName("");

    setBrickType("");
    setTerritoryId("");
    setRegionId("");
    setProvinceId("");
    setZoneId("");
    setCityId("");
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
              .post(`${process.env.REACT_APP_URL}/bricks/deleteBrick`, form)
              .then((res) => {
                console.log(res.data);
                enqueueSnackbar("Brick Delete Successfully", {
                  variant: "success",
                });
                fetchBrick();
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

  const fetchBrick = async () => {
    await axios
      .get(`${process.env.REACT_APP_URL}/bricks/getBricks`)
      .then((response) => {
        const allfetchBrick = response.data?.results;
        setEmp(allfetchBrick);
        setLoad(false);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  useEffect(() => {
    fetchBrick();
  }, [load]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/regions/getRegions`).then((res) => {
      setDropDownRegion(res.data?.results);
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
        <Typography color="textPrimary">Brick</Typography>
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
          Add Brick
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
                  Brick Type
                </TableCell>

                <TableCell
                  style={{ fontWeight: "600", width: "15%", color: "white" }}
                >
                  Territory
                </TableCell>

                <TableCell
                  style={{ fontWeight: "600", width: "15%", color: "white" }}
                >
                  Zone
                </TableCell>

                <TableCell
                  style={{ fontWeight: "600", width: "15%", color: "white" }}
                >
                  Region
                </TableCell>

                <TableCell
                  style={{ fontWeight: "600", width: "15%", color: "white" }}
                >
                  Province
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
                    <TableCell>{user.brickType}</TableCell>
                    <TableCell>{user.territoryId?.name}</TableCell>
                    <TableCell>{user.zoneId?.name}</TableCell>
                    <TableCell>{user.regionId?.name}</TableCell>
                    <TableCell>{user.cityId?.name}</TableCell>
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
                <h2 id="transition-modal-title">Add Brick</h2>
                <div style={{ marginTop: "10px", width: "100%" }}>
                  <div style={{ width: "100%", display: "flex" }}>
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

                  <div style={{ width: "100%", display: "flex" }}>
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

                    <FormControl
                      style={{
                        width: "100%",
                        marginTop: "10px",
                      }}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="outlined-age-native-simple">
                        Brick Type
                      </InputLabel>
                      <Select
                        native
                        label="Brick Type"
                        value={brickType}
                        onChange={(e) => setBrickType(e.target.value)}
                      >
                        <option aria-label="None"> </option>
                        <option value="Ims Brick">Ims Brick</option>
                        <option value="Distributor Brick">
                          Distributor Brick
                        </option>
                      </Select>
                    </FormControl>
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
                      onChange={(e) => setTerritoryId(e.target.value)}
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
                    onClick={addBrick}
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
                <h2 id="transition-modal-title">Edit Brick</h2>
                <div style={{ marginTop: "10px", width: "100%" }}>
                  <div style={{ width: "100%", display: "flex" }}>
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

                  <div style={{ width: "100%", display: "flex" }}>
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

                    <FormControl
                      style={{
                        width: "100%",
                        marginTop: "10px",
                      }}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="outlined-age-native-simple">
                        Brick Type
                      </InputLabel>
                      <Select
                        native
                        label="Brick Type"
                        value={brickType}
                        onChange={(e) => setBrickType(e.target.value)}
                      >
                        <option aria-label="None"> </option>
                        <option value="Ims Brick">Ims Brick</option>
                        <option value="Distributor Brick">
                          Distributor Brick
                        </option>
                      </Select>
                    </FormControl>
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
                      onChange={(e) => setTerritoryId(e.target.value)}
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

export default Brick;
