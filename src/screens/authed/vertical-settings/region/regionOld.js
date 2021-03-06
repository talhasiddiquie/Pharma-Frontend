import React, { useState, useEffect } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import FormGridTabs from "../../../components/Tabs/Form-Grid-Tabs";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import SaveAltIcon from "@material-ui/icons/SaveAlt";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import GridTable from "../../../components/GridTable/grid-table";
import { useDispatch, useSelector } from "react-redux";
import * as Actions from "../../../../config/Store/Actions/region.action";
import { useAlert } from "react-alert";
import * as RegionActions from "../../../../config/Store/Actions/region.action";
import * as ProvinceActions from "../../../../config/Store/Actions/provice.action";
import axios from "axios";
import ApiService from "../../../../config/ApiService";

const useStyles = makeStyles({
  root: {
    // padding: 14
  },
});

function Region() {
  const classes = useStyles();
  const history = useHistory();
  const alert = useAlert();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [abbreviation, setAbbreviation] = useState("");
  const [objectId, setobjectId] = useState("");
  const [provinceId, setProvinceIds] = useState([]);
  const [previousProvinceId, setPreviousProvinceId] = useState([]);
  const [selectedData, setSelectedData] = useState(false);
  const [isEditingSelectedData, setIsEditingSelectedData] = useState(false);
  const [tab, setTab] = useState(0);
  const [addForm, setAddForm] = useState(false);
  const [open, setOpen] = useState(false);
  const user = useSelector((state) => state.user.user);
  const allRegion = useSelector((state) => state.region.allRegions);
  const allProvinces = useSelector((state) => state.province.allProvinces);

  useEffect(() => {
    if (!allProvinces) {
      dispatch(ProvinceActions.get_province());
    }
    if (!allRegion) {
      dispatch(RegionActions.get_regions());
    }
  }, [allRegion, allProvinces]);
console.log("dfdfdfdfd",allProvinces)
  useEffect(() => {});

  function handleRowClick(data) {
    setTab(1);
    setSelectedData(true);
    setobjectId(data._id);
    setName(data.name);
    setAbbreviation(data.abbreviation);
    setProvinceIds(data.provinceId);
    setPreviousProvinceId(data.provinceId);
    setIsEditingSelectedData(true);
    setAddForm(true);
  }

  const addRegion = () => {
    setName("");
    setAbbreviation("");
    setobjectId("");
    setProvinceIds([]);
    setTab(0);
    setSelectedData(false);
    setIsEditingSelectedData(false);
    setAddForm(false);
  };

  const editData = () => {
    setIsEditingSelectedData(false);
    setSelectedData(false);
    setAddForm(true);
  };

  function handleSave() {
    if (objectId !== "") {
      const body = {
        name,
        abbreviation,
        provinceId,
        updatedBy: user._id,
        objectId,
      };
      dispatch(Actions.update_region(body));
      for (var i = 0; i < provinceId.length; i++) {
        var provinceObj = {
          objectId: provinceId[i],
        };
        axios
          .post(
            ApiService.getBaseUrl() + "/provinces/getSpecificProvinceById",
            provinceObj
          )
          .then((response) => {
            var data = response.data.content[0];
            var regionsIds = [...data.regionId];
            if (!regionsIds.includes(objectId)) {
              regionsIds.push(objectId);
            }
            provinceObj["regionId"] = regionsIds;
            dispatch(ProvinceActions.update_province(provinceObj));
          })
          .catch((err) => {
            console.log(err, "err");
          });
      }

      for (var j = 0; j < previousProvinceId.length; j++) {
        if (!provinceId.includes(previousProvinceId[j])) {
          let objec = {
            objectId: previousProvinceId[j],
          };
          axios
            .post(
              ApiService.getBaseUrl() + "/provinces/getSpecificProvinceById",
              objec
            )
            .then((response) => {
              var data = response.data.content[0];
              var regionsIds = [...data.regionId];
              var arr = [];
              for (var k = 0; k < regionsIds.length; k++) {
                if (regionsIds[i] !== objectId) {
                  arr.push(regionsIds[i]);
                }
              }
              objec["regionId"] = arr;
              dispatch(ProvinceActions.update_province(objec));
            })
            .catch((err) => {
              console.log(err, "err");
            });
        }
      }

      alert.success("Region Updated!");
      addRegion();
    } else {
      if (name !== "" && abbreviation !== "") {
        let obj = {
          name,
          abbreviation,
          provinceId,
          createdBy: user._id,
        };

        axios
          .post(ApiService.getBaseUrl() + "/regions/postRegion", obj)
          .then((res) => {
            if (res.data) {
              if (res.data.code == 200) {
                var newRegionId = res.data.content._id;
                for (var i = 0; i < provinceId.length; i++) {
                  var provinceObj = {
                    objectId: provinceId[i],
                  };
                  axios
                    .post(
                      ApiService.getBaseUrl() +
                        "/provinces/getSpecificProvinceById",
                      provinceObj
                    )
                    .then((response) => {
                      var data = response.data.content[0];
                      var regionsIds = [...data.regionId];
                      regionsIds.push(newRegionId);
                      provinceObj["regionId"] = regionsIds;
                      dispatch(ProvinceActions.update_province(provinceObj));
                    })
                    .catch((err) => {
                      console.log(err, "err");
                    });
                }
              }
            }
            dispatch({ type: "ADD_REGION", payload: res.data.content });
          })
          .catch((error) => {
            dispatch({ type: "ADD_REGION_FAILURE", payload: error });
          });
        alert.success("Region Added!");
        addRegion();
      } else {
        alert.error("All fields are required!");
      }
    }
  }

  const deleteRegion = () => {
    let body = {
      objectId,
    };
    dispatch(RegionActions.delete_region(body));
    addRegion();
  };

  return (
    <>
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
        <Typography color="textPrimary">Region</Typography>
      </Breadcrumbs>
      <Card className={classes.root}>
        <CardContent>
          <FormGridTabs
            afterRowClick={() => {
              setTab(0);
            }}
            tab={tab}
            form={
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Region ID"
                    placeholder="type"
                    variant="outlined"
                    disabled
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Region Name"
                    placeholder="type"
                    variant="outlined"
                    fullWidth
                    name="name"
                    value={name}
                    disabled={isEditingSelectedData}
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Region Abbreviation"
                    placeholder="type"
                    variant="outlined"
                    fullWidth
                    name="abbreviation"
                    value={abbreviation}
                    disabled={isEditingSelectedData}
                    onChange={(e) => {
                      setAbbreviation(e.target.value);
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                    fullWidth
                  >
                    <InputLabel id="provinceId">Provinces</InputLabel>
                    <Select
                      labelId="provinceId"
                      label="Provinces"
                      fullWidth
                      multiple
                      name="provinceId"
                      value={provinceId}
                      input={<Input onClick={() => setOpen(!open)} />}
                      disabled={isEditingSelectedData}
                      onChange={(e) => {
                        setProvinceIds(e.target.value);
                        setOpen(!open);
                      }}
                      open={open}
                    >
                      {allProvinces &&
                        allProvinces.map((provinces) => {
                          return (
                            <MenuItem key={provinces._id} value={provinces._id}>
                              {provinces.name}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <ButtonGroup
                    variant="contained"
                    color="secondary"
                    size={"large"}
                  >
                    {addForm && (
                      <Button onClick={addRegion}>
                        <AddIcon style={{ marginRight: "2px" }} /> Add
                      </Button>
                    )}
                    {!selectedData && (
                      <Button
                        disabled={selectedData}
                        onClick={() => {
                          handleSave();
                        }}
                      >
                        <SaveAltIcon style={{ marginRight: "5px" }} /> Save
                      </Button>
                    )}
                    {isEditingSelectedData && (
                      <Button onClick={editData}>
                        <EditIcon style={{ marginRight: "5px" }} /> Edit
                      </Button>
                    )}
                    {isEditingSelectedData && (
                      <Button onClick={deleteRegion}>
                        <DeleteOutlineIcon style={{ marginRight: "5px" }} />{" "}
                        Delete
                      </Button>
                    )}
                  </ButtonGroup>
                </Grid>
              </Grid>
            }
            grid={
              <div>
                <GridTable
                  onRowClick={(data) => {
                    handleRowClick(data);
                  }}
                  headCells={[
                    { id: "id", label: "ID" },
                    { id: "name", label: "Name" },
                    { id: "province", label: "Province" },
                    { id: "abbreviation", label: "Abbreviation" },
                  ]}
                  rows={allRegion}
                />
              </div>
            }
          />
        </CardContent>
      </Card>
    </>
  );
}

export default Region;
