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
import Autocomplete from "@mui/material/Autocomplete";
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
    inHeight: "50%",
    [theme.breakpoints.down("sm")]: {
      width: "70%",
      inHeight: "55%",
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
  const [abberivation, setAbberivation] = useState("");
  const [name, setName] = useState("");
  const [province_Id, setProvince_Id] = useState([]);
  const [zoneId, setZoneId] = useState("");
  const [regionId, setRegionId] = useState("");
  const [city_Id, setCity_Id] = useState([]);
  const [Id, setId] = useState("");
  const [company, setCompany] = useState("");
  const [dropdownCompany, setDropDownCompany] = useState([]);
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
    setName("");
    setAbberivation("");
    setZoneId("");
    setRegionId("");
    setCity_Id([]);
    setProvince_Id([]);
    setCompany("");
  };

  const handleEditOpen = (id) => {
    setEditModal(true);
  };

  const handleEditClose = () => {
    setEditModal(false);
    setName("");
    setAbberivation("");
    setZoneId("");
    setRegionId("");
    setCity_Id([]);
    setProvince_Id([]);
    setCompany("");
  };

  const handleRegionChange = async (e) => {
    setRegionId(e.target.value);
    const id = e.target.value;
    const form = { id };
    setProvince_Id([]);
    setZoneId("");
    setCity_Id([]);
    console.log(form);
    await axios
      .post(`${process.env.REACT_APP_URL}/regions/getRegion`, form)
      .then((res) => {
        setDropDownProvince(res.data.provinceId);
      });
  };

  const handleProvinceChange = async (e, selectedObject) => {
    let List = [];
    if (selectedObject !== null) {
      for (let i = 0; i < selectedObject.length; i++) {
        List.push(selectedObject[i]);
      }
      setProvince_Id(List);
    }
    setZoneId("");
    setCity_Id([]);
    const Arr = [];
    let a = "";
    List.map((x) => {
      Arr.push({ provinceId: x.id });
      a = a + "provinceId=" + x.id + "&";
    });

    await axios
      .get(`${process.env.REACT_APP_URL}/zones/getZones?${a}`)
      .then((res) => {
        setDropDownZone(res.data.results);
      });
  };

  const handleZoneChange = async (e) => {
    setZoneId(e.target.value);
    const id = e.target.value;
    const form = { id };

    setCity_Id([]);
    await axios
      .get(`${process.env.REACT_APP_URL}/cities/getCities?zoneId=${id}`)
      .then((res) => {
        setDropDownCity(res.data.results);
      });
  };

  const addTerritory = () => {
    const provinceId = [];
    province_Id.forEach((value) => provinceId.push(value.id));

    const cityId = [];
    city_Id.forEach((value) => cityId.push(value.id));
    const form = {
      name,
      abbreviation: abberivation,
      zoneId,
      regionId,
      cityId,
      provinceId,
      company,
    };
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

    setName("");
    setAbberivation("");
    setZoneId("");
    setRegionId("");
    setCity_Id([]);
    setProvince_Id([]);
    setCompany("");
  };

  const editProvince = async (id) => {
    const form = { id };
    let response = await axios.post(
      `${process.env.REACT_APP_URL}/territory/getTerritory`,
      form
    );

    setId(response.data.id);
    setName(response.data.name);
    setAbberivation(response.data.abbreviation);
    setCompany(response.data.company?.id);
    setRegionId(response.data.regionId.id);
    setProvince_Id([response.data.provinceId]);
    setDropDownZone([response.data.zoneId]);
    setZoneId(response.data.zoneId?.id);
    setDropDownCity([response.data.cityId]);
    response.data.cityId.map((value) => {
      setCity_Id([value]);
    });
   

    setEditModal(true);
  };

  const editFormProvince = async (id) => {
    const provinceId = [];
    province_Id.forEach((value) => provinceId.push(value.id));

    const cityId = [];
    city_Id.forEach((value) => cityId.push(value.id));
    const form = {
      id,
      name,
      abbreviation: abberivation,
      zoneId,
      regionId,
      cityId,
      provinceId,
      company,
    };
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
    setName("");
    setAbberivation("");
    setZoneId("");
    setRegionId("");
    setCity_Id([]);
    setProvince_Id([]);
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

  const fetchTerritory = async () => {
    await axios
      .get(`${process.env.REACT_APP_URL}/territory/getTerritories`)
      .then((response) => {
        const allTerritory = response.data.results;
        setEmp(allTerritory);
        setLoad(false);
      })
      .catch((error) => console.log(`Error: ${error}`));
  };

  useEffect(() => {
    fetchTerritory();
  }, [load]);

  const provinceList = [];

  const filterprovince_Id = (res) => {
    for (let i = 0; i < res.data.results.length; i++) {
      provinceList.push(res.data.results);
    }
    let newList = [];
    provinceList[0].map((item) => {
      newList.push(item);
    });
    setDropDownProvince(newList);
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_URL}/provinces/getProvinces`)
      .then(async (res) => {
        await filterprovince_Id(res);
      });
  }, []);

  //cities/getCities

  const cityList = [];

  const filterCityId = (res) => {
    for (let i = 0; i < res.data.results.length; i++) {
      cityList.push(res.data.results);
    }
    let newList = [];
    cityList[0].map((item) => {
      newList.push(item);
    });
    setDropDownCity(newList);
  };
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
        <Typography color="textPrimary">Territory</Typography>
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
          Add Territory
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
                  Abberivation
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
                  City
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
                {/* <TableCell
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
                </TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {emp.map((user, key, index) => {
                // const provinceArr = [];
                // const arr = user.provinceId?.forEach((value) =>
                //   provinceArr.push(value.name + ", ")
                // );

                const cityArr = [];
                const arr3 = user.cityId?.forEach((value) =>
                  cityArr.push(value.name + ", ")
                );
                return (
                  <TableRow key={user.id}>
                    <TableCell component="th" scope="row">
                      {user.name}
                    </TableCell>

                    <TableCell>{user.abbreviation}</TableCell>

                    <TableCell>{user.zoneId?.name}</TableCell>

                    <TableCell>{user.regionId?.name}</TableCell>

                    <TableCell>{user.provinceId?.name}</TableCell>
                    <TableCell>{cityArr}</TableCell>
                    <TableCell>{user.company?.name}</TableCell>
                    {/* <TableCell>
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
                <h2 id="transition-modal-title">Add Territory</h2>
                <div style={{ marginTop: "10px", width: "100%" }}>
                  <div style={{ display: "flex" }}>
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
                      label="Abberivation"
                      variant="outlined"
                      value={abberivation}
                      onChange={(e) => setAbberivation(e.target.value)}
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
                      style={{
                        width: "100%",

                        marginTop: "10px",
                      }}
                      variant="outlined"
                    >
                      <Autocomplete
                        multiple
                        id="tags-outlined"
                        options={dropdownProvince}
                        getOptionLabel={(option) => option.name}
                        value={province_Id}
                        filterSelectedOptions
                        getOptionSelected={(option, value) => {
                          if (value === "") {
                            return true;
                          } else if (value === option) {
                            return true;
                          }
                        }}
                        onChange={handleProvinceChange}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            label="Province"
                          />
                        )}
                      />
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
                      style={{
                        width: "100%",
                        marginTop: "10px",
                      }}
                      variant="outlined"
                    >
                      <Autocomplete
                        multiple
                        id="tags-outlined"
                        options={dropdownCity}
                        getOptionLabel={(option) => option.name}
                        value={city_Id}
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
                            setCity_Id(List);
                          }
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            label="City"
                          />
                        )}
                      />
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
                      label="Abberivation"
                      variant="outlined"
                      value={abberivation}
                      onChange={(e) => setAbberivation(e.target.value)}
                    />

                    <FormControl
                      variant="outlined"
                      style={{
                        width: "100%",
                        marginTop: "10px",
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
                  </div>

                  <div style={{ display: "flex", width: "100%" }}>
                    <FormControl
                      style={{
                        width: "100%",
                        marginTop: "10px",
                        marginRight: "10px",
                      }}
                      variant="outlined"
                    >
                      <Autocomplete
                        multiple
                        id="tags-outlined"
                        options={dropdownProvince}
                        getOptionLabel={(option) => option.name}
                        value={province_Id}
                        filterSelectedOptions
                        getOptionSelected={(option, value) => {
                          if (value === "") {
                            return true;
                          } else if (value === option) {
                            return true;
                          }
                        }}
                        onChange={handleProvinceChange}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            variant="outlined"
                            label="Province"
                          />
                        )}
                      />
                    </FormControl>
                    <FormControl
                      variant="outlined"
                      style={{
                        width: "100%",
                        marginTop: "10px",
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
                  </div>
                  <FormControl
                    style={{
                      width: "100%",
                      marginTop: "10px",
                    }}
                    variant="outlined"
                  >
                    <Autocomplete
                      multiple
                      id="tags-outlined"
                      options={dropdownCity}
                      getOptionLabel={(option) => option.name}
                      value={city_Id}
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
                          setCity_Id(List);
                        }
                      }}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="City"
                        />
                      )}
                    />
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
