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
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Input from "@material-ui/core/Input";
import { useDispatch, useSelector } from "react-redux";
import VisibilityIcon from "@material-ui/icons/Visibility";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import * as WorkPlanActions from "../../../../config/Store/Actions/workPlan.action";
import * as ProductActions from "../../../../config/Store/Actions/products.actions";
import * as SurveyActions from "../../../../config/Store/Actions/survey.action";
import * as RepresentativeActions from "../../../../config/Store/Actions/representative.actions";
import moment from "moment";
import { Slider } from "antd";
import { useAlert } from "react-alert";
import Modal from "../../../components/Modal/Modal";
import PDFIMAGE from "../../../../assets/images/pdf.png";
import DOCSIMAGE from "../../../../assets/images/docx.jpg";
import GIFIMAGE from "../../../../assets/images/gif.png";
import JPGIMAGE from "../../../../assets/images/jpg.png";
import PNGIMAGE from "../../../../assets/images/png.png";
import CSVIMAGE from "../../../../assets/images/csv.jpg";
import MP3IMAGE from "../../../../assets/images/mp3.png";
import MP4IMAGE from "../../../../assets/images/mp4.png";
import TEXTIMAGE from "../../../../assets/images/text.png";
import WEBMIMAGE from "../../../../assets/images/webm.png";
import WEBPIMAGE from "../../../../assets/images/webp.png";
import XLSXIMAGE from "../../../../assets/images/xlsx.png";
import ZIPIMAGE from "../../../../assets/images/zip.png";
import axios from "axios";
import ApiService from "../../../../config/ApiService";

var todayDate = new Date();
todayDate = moment(todayDate).format("YYYY-MM-DD");

const useStyles = makeStyles({
  root: {},
  filenames: {
    padding: "0.5% 0%",
  },
  imageThumbnail: {
    width: "70px",
    height: "70px",
  },
});

function MeetingInitiate() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [tab, setTab] = useState(0);
  const alert = useAlert();
  const user = useSelector((state) => state.user.user);
  const allWorkPlan = useSelector((state) => state.workPlan.allWorkPlan);
  const allProducts = useSelector((state) => state.product.allProducts);
  const allSurveys = useSelector((state) => state.survey.allSurvey);
  const allRepresentatives = useSelector(
    (state) => state.representative.allRepresentatives
  );
  const [userWorkPlan, setUserWorkPlan] = useState([]);
  const [isEditingSelectedData, setIsEditingSelectedData] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openColleague, setOpenColleague] = useState(false);
  const [openProduct, setOpenProduct] = useState(false);
  const [openSurvey, setOpenSurvey] = useState(false);
  const [previewFile, setPreviewFile] = useState("");
  const [event, setEvent] = useState("");
  const [product, setProduct] = useState([]);
  const [survey, setSurvey] = useState([]);
  const [callObjective, setCallObjective] = useState("");
  const [callMode, setCallMode] = useState("");
  const [colleague, setColleague] = useState("");
  const [colleagueId, setColleagueId] = useState([]);
  const [callDuartion, setCallDuration] = useState(0);
  const [filesAndSurvey, setFilesAndSurvey] = useState([]);
  const [surveys, setSurveys] = useState("");

  useEffect(() => {
    if (!allProducts) {
      dispatch(ProductActions.get_all_products());
    }
    if (!allSurveys) {
      dispatch(SurveyActions.get_all_surveys());
    } else {
      var arr = [...allSurveys];
      setSurveys(arr);
    }
    if (!allRepresentatives) {
      dispatch(RepresentativeActions.get_all_representatives());
    } else {
      if (allRepresentatives) {
        const colleague = [];
        for (var k in allRepresentatives) {
          if (allRepresentatives[k].representativeId !== user._id) {
            colleague.push(allRepresentatives[k]);
          }
        }
        setColleague(colleague);
      }
    }

    if (!allWorkPlan) {
      dispatch(WorkPlanActions.get_workPlan());
    } else {
      if (allWorkPlan) {
        console.log(user ,"condition true");
        const arr = [];
        for (var key in allWorkPlan) {
          if (user._id === allWorkPlan[key].user_id) {
            if (
              todayDate === moment(allWorkPlan[key].start).format("YYYY-MM-DD")
            ) {
              if (allWorkPlan[key].status === "approved") {
                if (allWorkPlan[key].statusEvent === "open") {
                  arr.push(allWorkPlan[key]);
                }
              }
            }
          }
        }
        setUserWorkPlan(arr);
      }
    }
  }, [allWorkPlan, allProducts, allSurveys, allRepresentatives]);
  console.log(userWorkPlan, 'userWorkPlan');
  const handleAdd = async () => {
    let obj = {
      callMode,
      callObjective,
      callDuartion,
      colleagueId,
      product,
      survey,
      filesAndSurvey,
      objectId: event._id,
    };

    if (
      event !== "" &&
      callMode !== "" &&
      callObjective !== "" &&
      product !== "" &&
      survey !== "" &&
      colleagueId.length > 0 &&
      callDuartion > 0
    ) {
      await axios
        .get(ApiService.getBaseUrl() + "/meeting/meetingID")
        .then(async (res) => {
          var data = res.data.content;
          obj.meetingId = data;
          dispatch(WorkPlanActions.update_workPlan(obj));
          let docObj = {
            objectId: event.doctor_id
          }
          await axios
            .post(ApiService.getBaseUrl() + `/doctors/getSpecificDoctorById`, docObj)
            .then(async (res) => {
              console.log(res, 'response');
              var doctData = res.data.content[0];
              let emailSignUpObj = {
                name: doctData.name,
                email: doctData.email,
                meetingId: data,
              };
              axios
                .post(
                  ApiService.getBaseUrl() + "/doctors/sendEmail",
                  emailSignUpObj
                )
                .then(async (res) => {
                  console.log(res, "response email");
                  if (res.status === 200) {
                    if (res.data.success) {
                    }
                  }
                })
                .catch((error) => {
                  console.log(error, "error");
                });
            })
            .catch((error) => {
              console.log(error, "error");
            });
        })
        .catch((error) => {
          console.log(error, "error");
        });
    } else {
      alert.error("All fields are required!");
    }

    if (callMode === "remote") {
      await history.push({
        pathname: `/meetings-parameters/online-meeting/${obj.meetingId}`,
        state: obj.meetingId,
      });
    } else if (callMode === "chamber") {
      await history.push({
        pathname: `/meetings-parameters/chamber-meeting/${obj.meetingId}`,
        state: obj.meetingId,
      });
    }

    alert.success("Meeting Initiate");
  };

  function onAfterChange(value) {
    setCallDuration(value);
  }

  const handleGridDataProductAndSurvey = (data, actionCalled) => {
    var obj = {};
    var arr = [...filesAndSurvey];
    var objectsIds = [];

    if (actionCalled === "product") {
      if (arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
          objectsIds.push(arr[i].objectId);
        }
        for (var key in data) {
          if (!objectsIds.includes(data[key]._id)) {
            obj.name = data[key].name;
            obj.objectId = data[key]._id;
            obj.files = data[key].files;
            obj.filedType = "product";
            arr.push(obj);
          }
        }
      } else {
        for (var key in data) {
          obj.name = data[key].name;
          obj.objectId = data[key]._id;
          obj.files = data[key].files;
          obj.filedType = "product";
          arr.push(obj);
        }
      }
      const product = [...data];
      setProduct(product);
    } else if (actionCalled === "survey") {
      if (arr.length > 0) {
        for (var i = 0; i < arr.length; i++) {
          objectsIds.push(arr[i].objectId);
        }
        for (var key in data) {
          if (!objectsIds.includes(data[key]._id)) {
            obj.name = data[key].documentType;
            obj.objectId = data[key]._id;
            obj.questionsNo = data[key].keys;
            obj.questionsAnswers = data[key].questionsAnswerObj;
            obj.filedType = "survey";
            arr.push(obj);
          }
        }
      } else {
        for (var key in data) {
          obj.name = data[key].documentType;
          obj.objectId = data[key]._id;
          obj.questionsAnswers = data[key].questionsAnswerObj;
          obj.questionsNo = data[key].keys;
          obj.filedType = "survey";
          arr.push(obj);
        }
      }
      const survey = [...data];
      setSurvey(survey);
    }
    setFilesAndSurvey(arr);
  };

  const handleChangeDelete = (file, index) => {
    var filesAndSurveyChanged = [];
    for (var keys in filesAndSurvey) {
      var data = filesAndSurvey[keys];
      if (data.filedType === "product") {
        var files = data.files;
        var afterRemoveFiles = [];
        for (var key in files) {
          if (files[key]._id !== file._id) {
            afterRemoveFiles.push(files[key]);
          }
        }
        data["files"] = afterRemoveFiles;
      }
      filesAndSurveyChanged.push(data);
    }
    setFilesAndSurvey(filesAndSurveyChanged);
  };

  const handleChanged = (file, index) => {
    setPreviewFile(file);
    setOpenDialog(true);
  };

  //   console.log(userWorkPlan, "userWorkPlan");

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
        <Typography color="textPrimary">Meetings-Parameters</Typography>
        <Typography color="textPrimary">Meeting-Initiator</Typography>
      </Breadcrumbs>
      <Modal
        open={openDialog}
        previewFile={previewFile}
        close={() => {
          setOpenDialog(false);
        }}
      />
      <Card className={classes.root}>
        <CardContent>
          <FormGridTabs
            tab={tab}
            afterRowClick={() => {
              setTab(0);
            }}
            form={
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Meeting Initiator ID"
                    placeholder="type"
                    variant="outlined"
                    disabled
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                    fullWidth
                  >
                    <InputLabel id="Today Meetings Doctors">
                      Today Meetings Doctors
                    </InputLabel>
                    <Select
                      labelId="Today Meetings Doctors"
                      label="Today Meetings Doctors"
                      fullWidth
                      onChange={(e) => {
                        setEvent(e.target.value);
                        console.log(e.target.value, 'event data');
                      }}
                      value={event}
                      disabled={isEditingSelectedData}
                    >
                      {userWorkPlan &&
                        userWorkPlan.map((elem, i) => {
                          return (
                            <MenuItem value={elem}>{elem.doctor}</MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                    fullWidth
                  >
                    <InputLabel id="Call Mode">Call Mode</InputLabel>
                    <Select
                      labelId="Call Mode"
                      label="Call Mode"
                      fullWidth
                      onChange={(e) => {
                        setCallMode(e.target.value);
                      }}
                      value={callMode}
                      disabled={isEditingSelectedData}
                    >
                      <MenuItem value={"remote"}>Remote Call</MenuItem>
                      <MenuItem value={"chamber"}>Chamber</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                    fullWidth
                  >
                    <InputLabel id="Call Objective">Call Objective</InputLabel>
                    <Select
                      labelId="Call Objective"
                      label="Call Objective"
                      fullWidth
                      onChange={(e) => {
                        setCallObjective(e.target.value);
                      }}
                      value={callObjective}
                      disabled={isEditingSelectedData}
                    >
                      <MenuItem value={"Business Call"}>Business Call</MenuItem>
                      <MenuItem value={"Reminder Call"}>Reminder Call</MenuItem>
                      <MenuItem value={"Thank You Call"}>
                        Thank You Call
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                    fullWidth
                  >
                    <InputLabel id="Colleague ID">Colleague ID</InputLabel>
                    <Select
                      labelId="Colleague ID"
                      label="Colleague ID"
                      fullWidth
                      multiple
                      input={
                        <Input
                          onClick={() => setOpenColleague(!openColleague)}
                        />
                      }
                      onChange={(e) => {
                        setColleagueId(e.target.value);
                        setOpenColleague(!openColleague);
                      }}
                      value={colleagueId}
                      disabled={isEditingSelectedData}
                      open={openColleague}
                    >
                      {colleague &&
                        colleague.map((elem, i) => {
                          return (
                            <MenuItem value={elem._id}>{elem.name}</MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <h4>Meeting Duartion</h4>
                  <Slider defaultValue={0} onAfterChange={onAfterChange} />
                  <h6>Minutes</h6>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                    fullWidth
                  >
                    <InputLabel id="Product ID">Product ID</InputLabel>
                    <Select
                      labelId="Product ID"
                      label="Product ID"
                      fullWidth
                      multiple
                      input={
                        <Input onClick={() => setOpenProduct(!openProduct)} />
                      }
                      onChange={(e) => {
                        handleGridDataProductAndSurvey(
                          e.target.value,
                          "product"
                        );
                        setOpenProduct(!openProduct);
                      }}
                      value={product}
                      disabled={isEditingSelectedData}
                      open={openProduct}
                    >
                      {allProducts &&
                        allProducts.map((elem, i) => {
                          return <MenuItem value={elem}>{elem.name}</MenuItem>;
                        })}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                    fullWidth
                  >
                    <InputLabel id="Survey ID">Survey ID</InputLabel>
                    <Select
                      labelId="Survey ID"
                      label="Survey ID"
                      fullWidth
                      multiple
                      input={
                        <Input onClick={() => setOpenSurvey(!openSurvey)} />
                      }
                      onChange={(e) => {
                        handleGridDataProductAndSurvey(
                          e.target.value,
                          "survey"
                        );
                        setOpenSurvey(!openSurvey);
                      }}
                      value={survey}
                      disabled={isEditingSelectedData}
                      open={openSurvey}
                    >
                      {surveys &&
                        surveys.map((elem, i) => {
                          return <MenuItem value={elem}>{elem.name}</MenuItem>;
                        })}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} sm={6}>
                  {filesAndSurvey &&
                    filesAndSurvey.map((elem, key) => {
                      return (
                        <div
                          style={{
                            display: "flex",
                          }}
                        >
                          {elem.filedType === "product" ? (
                            elem.files.map((ele, k) => {
                              var fileTypes = ele.fileName.substring(
                                ele.fileName.lastIndexOf("."),
                                ele.fileName.length
                              );
                              var fileName = ele.fileName.substring(
                                ele.fileName.indexOf("f"),
                                ele.fileName.lastIndexOf("-")
                              );
                              return (
                                <Grid item xs={12} sm={6}>
                                  <Button
                                    onClick={() => {
                                      handleChangeDelete(ele, k);
                                    }}
                                  >
                                    <RemoveCircleOutlineIcon />
                                  </Button>
                                  <Button
                                    onClick={() => {
                                      handleChanged(ele, k);
                                    }}
                                  >
                                    <VisibilityIcon />
                                  </Button>

                                  <div
                                    style={{
                                      alignItems: "center",
                                      justifyContent: "space-between",
                                      margin: "15px",
                                    }}
                                  >
                                    <div>{fileName}</div>
                                    <div>{fileTypes}</div>

                                    <div className={classes.filenames}>
                                      {fileTypes === ".pdf" ? (
                                        <img
                                          src={PDFIMAGE}
                                          alt="img"
                                          className={classes.imageThumbnail}
                                        />
                                      ) : fileTypes === ".docx" ? (
                                        <img
                                          src={DOCSIMAGE}
                                          alt="img"
                                          className={classes.imageThumbnail}
                                        />
                                      ) : fileTypes === ".gif" ? (
                                        <img
                                          src={GIFIMAGE}
                                          alt="img"
                                          className={classes.imageThumbnail}
                                        />
                                      ) : fileTypes === ".jpg" ? (
                                        <img
                                          src={JPGIMAGE}
                                          alt="img"
                                          className={classes.imageThumbnail}
                                        />
                                      ) : fileTypes === ".png" ? (
                                        <img
                                          src={PNGIMAGE}
                                          alt="img"
                                          className={classes.imageThumbnail}
                                        />
                                      ) : fileTypes === ".csv" ? (
                                        <img
                                          src={CSVIMAGE}
                                          alt="img"
                                          className={classes.imageThumbnail}
                                        />
                                      ) : fileTypes === ".mp3" ? (
                                        <img
                                          src={MP3IMAGE}
                                          alt="img"
                                          className={classes.imageThumbnail}
                                        />
                                      ) : fileTypes === ".mp4" ? (
                                        <img
                                          src={MP4IMAGE}
                                          alt="img"
                                          className={classes.imageThumbnail}
                                        />
                                      ) : fileTypes === ".txt" ? (
                                        <img
                                          src={TEXTIMAGE}
                                          alt="img"
                                          className={classes.imageThumbnail}
                                        />
                                      ) : fileTypes === ".webm" ? (
                                        <img
                                          src={WEBMIMAGE}
                                          alt="img"
                                          className={classes.imageThumbnail}
                                        />
                                      ) : fileTypes === ".webp" ? (
                                        <img
                                          src={WEBPIMAGE}
                                          alt="img"
                                          className={classes.imageThumbnail}
                                        />
                                      ) : fileTypes === ".xlsx" ? (
                                        <img
                                          src={XLSXIMAGE}
                                          alt="img"
                                          className={classes.imageThumbnail}
                                        />
                                      ) : fileTypes === ".zip" ? (
                                        <img
                                          src={ZIPIMAGE}
                                          alt="img"
                                          className={classes.imageThumbnail}
                                        />
                                      ) : null}
                                    </div>
                                  </div>
                                </Grid>
                              );
                            })
                          ) : elem.filedType === "survey" ? (
                            <Grid item xs={12} sm={6}>
                              <div>
                                <div
                                  style={{
                                    marginBottom: "5px",
                                    marginTop: "5px",
                                    fontSize: "large",
                                  }}
                                >
                                  {`Survey Name: ${elem.name}`}
                                </div>
                                <div
                                  style={{
                                    marginBottom: "5px",
                                    marginTop: "5px",
                                    fontSize: "large",
                                  }}
                                >
                                  {`Total Questions in survey: ${elem.questionsNo.length}`}
                                </div>
                              </div>
                            </Grid>
                          ) : null}
                        </div>
                      );
                    })}
                </Grid>

                <Grid item xs={12}>
                  <ButtonGroup
                    variant="contained"
                    color="secondary"
                    size={"large"}
                  >
                    <Button onClick={handleAdd}>Meeting Initiate</Button>
                  </ButtonGroup>
                </Grid>
              </Grid>
            }
          />
        </CardContent>
      </Card>
    </>
  );
}

export default MeetingInitiate;
