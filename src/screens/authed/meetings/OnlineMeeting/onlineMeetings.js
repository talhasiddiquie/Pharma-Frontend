import React, { useState, useEffect, useRef } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { CardMedia } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import TextField from "@material-ui/core/TextField";
import DialogTitle from "@material-ui/core/DialogTitle";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CardActionArea from "@material-ui/core/CardActionArea";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { Scrollbars } from "react-custom-scrollbars";
import { Radio, Checkbox, Row, Col } from "antd";
import {
  CarouselProvider,
  Slider,
  Slide,
  ButtonBack,
  ButtonNext,
} from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import FileViewer from "react-file-viewer";
import axios from "axios";
import moment from "moment";
import io from "socket.io-client";
import ApiServices from "../../../../config/ApiService";
import { iceServers } from "../../../../config/ice-server";
import SessionService from "../../../../config/session-service";
import ControllerBar from "../ControlBar/ControlBar";
import VideoPreview from "../VideoPreview/VideoPreview";
import "./OnlineMeeting.css";
import * as ActionsPlan from '../../../../config/Store/Actions/workPlan.action';
import * as MeetingAction from '../../../../config/Store/Actions/meetingInitiator.action';

const ENDPOINT = ApiServices.socketBaseUrl();

const PC_CONFIG = {
  iceServers: iceServers,
};

let socket,
  peerConnections = {},
  receivingPeerConnections = {};

const cleanupSocket = () => {
  socket = null;
  peerConnections = {};
  receivingPeerConnections = {};
};

const CheckboxGroup = Checkbox.Group;

const useStyles = makeStyles({
  root: {},
  filenames: {
    padding: "0.5% 0%",
  },
  imageThumbnail: {
    width: "70px",
    height: "70px",
  },
  media: {
    maxWidth: "100%",
    height: "100%",
    transform: "translate(0px, 25px)",
  },
});



function MeetingOnline() {
  const location = useLocation();
  const history = useHistory();
  const classes = useStyles();
  const [meetingId, setMeetingId] = useState("");
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [meeting, setMeeting] = useState(null);
  const [totalFiles, setTotalFiles] = useState(0);
  const [meetingData, setMeetingData] = useState("");
  const [filesAndSurvey, setFilesAndSurvey] = useState("");
  const [refresh, setRefresh] = useState(false);

  const meetingRef = useRef(null);
  const usersRef = useRef([]);
  const currentUserRef = useRef(null);
  meetingRef.current = meeting;
  usersRef.current = users;
  currentUserRef.current = currentUser;

  var todayDate = new Date();
  todayDate = moment(todayDate).format("DD-MM-YYYY");

  useEffect(() => {
    getMeetingData();
  });

  const getMeetingData = async () => {
    var id;
    if (location.state !== undefined) {
      id = location.state;
    } else {
      id = location.pathname.slice(location.pathname.lastIndexOf("/") + 1);
    }

    if (!refresh) {
      let obj = {
        objectId: id,
      };
      await axios
        .post(
          ApiServices.getBaseUrl() + "/workPlans/getSpecificWorkPlanByUserId",
          obj
        )
        .then((res) => {
          var data = res.data.content[0];
          const filesAndSurvey = data.filesAndSurvey;
          const totalFiles = data.filesAndSurvey.length;
          setMeetingData(data);
          setFilesAndSurvey(filesAndSurvey);
          setTotalFiles(totalFiles);
        })
        .catch((error) => {
          console.log(error, "error");
        });
      setRefresh(true);
    }
  };

  useEffect(() => {
    // that behavciour is componet will mount
    // Anything in here is fired on component mount.
    var id;
    let currentSession = SessionService.getSession();

    if (location.state !== undefined) {
      id = location.state;
    } else {
      id = location.pathname.slice(location.pathname.lastIndexOf("/") + 1);
    }

    if (!socket) {
      socket = io(ENDPOINT, { 'path': '/api/sockets/' }, { transports: ["websocket"] });
      // console.log(socket, 'socket');
      // socket = io(ENDPOINT, { transports: ["websocket"] });

      socket.on("reconnect_attempt", () => {
        socket.io.opts.transports = ["polling", "websocket"];
      });

      // if (!currentSession) {
      //   history.push('/login');


      // console.log(socket, 'socket');
      socket.emit(
        "join",
        { username: currentSession.email, meetingId: id },
        (joinedMeeting) => {
          const thisUser = joinedMeeting.users.find(
            (u) => u.socketId === socket.id
          );
          thisUser.isThis = true;
          if (
            thisUser &&
            thisUser.socketId === joinedMeeting.initiator.socketId
          ) {
            thisUser.isInitiator = true;
          }

          setUsers(joinedMeeting.users);
          setCurrentUser(thisUser);
          setMeeting(joinedMeeting);
          setMeetingId(id);
        }
      );
      // }
      socket.on("joined", ({ user }) => {
        var userIndex;
        var previousUsers = usersRef.current;

        userIndex = previousUsers.findIndex(
          (users) => users.username == user.username
        );
        previousUsers[userIndex] = user;

        if (userIndex === -1) {
          setUsers([...usersRef.current, user]);
        } else {
          setUsers([...previousUsers]);
        }
      });

      socket.on("left", ({ user }) => {
        if (user) {
          const leftUser = usersRef.current.find(
            (u) => u.socketId === user.socketId
          );
          usersRef.current.splice(usersRef.current.indexOf(leftUser), 1);
          if (currentUserRef.current === leftUser) {
            setCurrentUser(null);
          }
          setUsers([...usersRef.current]);
        }
      });

      socket.on("notification", ({ text }) => {
        //alert(text);
      });

      socket.on("offer-made", async function ({ offer, by }) {
        //offer = data.offer;
        let pc;
        if (!receivingPeerConnections[by]) {
          pc = new RTCPeerConnection(PC_CONFIG);

          receivingPeerConnections[by] = pc;

          pc.ontrack = function (e) {
            const user = usersRef.current.find((u) => u.socketId === by);
            if (user && e.streams && e.streams.length) {
              user.stream = e.streams[0];
              setUsers([...usersRef.current]);
            }
          };

          pc.onicecandidate = (event) => {
            socket.emit("p2-ice-candidate", {
              candidate: event.candidate,
              to: by,
            });
          };
        } else {
          pc = receivingPeerConnections[by];
        }

        try {
          await pc.setRemoteDescription(new RTCSessionDescription(offer));
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(new RTCSessionDescription(answer));
          socket.emit("make-answer", {
            answer: answer,
            to: by,
          });
        } catch (error) {
          console.log("Error occurred during on:offer-made", error);
        }
      });

      socket.on("answer-made", async function ({ answer, by }) {
        const pc = peerConnections[by];
        try {
          await pc.setRemoteDescription(new RTCSessionDescription(answer));
        } catch (error) {
          console.log("Error occurred during on:answer-made", error);
        }
      });

      socket.on("p1-ice-candidate", function ({ candidate, by }) {
        const pc = peerConnections[by];
        if (pc && candidate) {
          const iceCandidate = new RTCIceCandidate(candidate);
          pc.addIceCandidate(iceCandidate);
        }
      });

      socket.on("p2-ice-candidate", function ({ candidate, by }) {
        const pc = receivingPeerConnections[by];
        if (pc && candidate) {
          const iceCandidate = new RTCIceCandidate(candidate);
          pc.addIceCandidate(iceCandidate);
        }
      });
    }

    return () => {
      // that behavciour is componet will mount
      // Anything in here is fired on component unmount.
      const currentSession = SessionService.getSession();

      if (socket && currentSession) {
        socket.emit("leave", { username: currentSession.email, meetingId: id });
      }
      cleanupSocket();
    };
  }, []);

  useEffect(() => {
    const thisUser = users.find((u) => u.isThis);
    if (thisUser && thisUser.stream) {
      users.forEach((user) => {
        // console.log(user, 'thisUser');
        // console.log(peerConnections, 'peerConnections');
        if (
          user !== thisUser &&
          user.socketId &&
          (!peerConnections[user.socketId] ||
            peerConnections[user.socketId].connectionState === "failed")
        ) {
          initiatePeerConnection(user.socketId, thisUser.stream);
        }
      });
    }
  }, [users]);

  useEffect(() => {
    // free audio/video connections
    // console.log(usersRef, 'usersRef');
    return () => {
      const thisUser = usersRef.current.find((u) => u.isThis);
      if (thisUser && thisUser.stream) {
        thisUser.stream.getTracks().forEach((track) => {
          // console.log(track, 'track');
          if (track.kind === "video") {
            track.stop();
          } else if (track.kind === "audio") {
            track.stop();
          }
        });
      }
    };
  }, []);

  // console.log(currentUser, 'currentUser');
  const initiatePeerConnection = (socketId, stream) => {
    const peerConnection = new RTCPeerConnection(PC_CONFIG);
    createOffer(peerConnection, socketId, stream);

    peerConnection.ontrack = function (e) {
      const user = usersRef.current.find((u) => u.socketId === socketId);
      if (user && e.streams && e.streams.length) {
        user.stream = e.streams[0];
      }
      setUsers([...usersRef.current]);
    };

    peerConnection.onicecandidate = (event) => {
      socket.emit("p1-ice-candidate", {
        candidate: event.candidate,
        to: socketId,
      });
    };

    peerConnection.oniceconnectionstatechange = (event) => {
      if (event.target.connectionState === "failed") {
        setUsers([...usersRef.current]);
      }
    };
    peerConnections[socketId] = peerConnection;
  };

  const createOffer = (peerConnection, socketId, stream) => {
    stream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, stream);
    });
    peerConnection
      .createOffer({ offerToReceiveVideo: true, offerToReceiveAudio: true })
      .then(
        (offer) => {
          peerConnection
            .setLocalDescription(new RTCSessionDescription(offer))
            .then(
              () => {
                socket.emit("make-offer", { offer, to: socketId });
              },
              (err) => console.log(err)
            );
        },
        (err) => console.log(err)
      );
  };

  const notifyMeetingEnd = () => {
    // socket.emit('meeting-end', { meetingId }, (response) => { });
    var id;
    let currentSession = SessionService.getSession();
    if (location.state !== undefined) {
      id = location.state;
    } else {
      id = location.pathname.slice(location.pathname.lastIndexOf("/") + 1);
    }

    if (socket && currentSession) {
      socket.emit("leave", { username: currentSession.email, meetingId: id });
    }
    history.push("/dashboard");
  };

  const handleChangeAnswer = (event, index, id) => {
    var arr = [];
    var answerSurvey = [...filesAndSurvey];
    for (var key in answerSurvey) {
      var survey = { ...answerSurvey[key] };
      if (survey.objectId === id) {
        var surveyQuestionAns = survey.questionsAnswers;
        surveyQuestionAns[`answer${index}`] = event;
      }
      arr.push(survey);
    }
    setFilesAndSurvey(arr);
  };

  // console.log(users, 'users');
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
        <Typography color="textPrimary">Online-Meeting</Typography>
      </Breadcrumbs>
      <Grid>
        <section style={{ height: "calc(100vh - 65px)" }}>
          {/* <p>{formatTime()}</p> */}
          <div className="col-md-10 col-sm-10 h-100">
            <div className="card h-100">
              <div className="card-header card-header-sm">
                {/* <div className="audios">
                                    {users &&
                                        users.map((user) => {
                                            return !user.isThis && user.stream ? (
                                                <video
                                                    ref={(video) =>
                                                        video && user.stream ? (video.srcObject = user.stream) : null
                                                    }
                                                    autoPlay
                                                    muted={false}
                                                />
                                            ) : null;
                                        })}
                                </div> */}

                <ControllerBar
                  onEnd={notifyMeetingEnd}
                  users={users}
                  currentUser={currentUser}
                  onSelectUser={setCurrentUser}
                  setUsers={setUsers}
                  meetingId={meetingId}
                />
              </div>

              <div className="card-body">
                <div className="container h-100">
                  <VideoPreview user={currentUser}></VideoPreview>
                </div>

                {filesAndSurvey && filesAndSurvey.length > 0 ? (
                  <CarouselProvider
                    naturalSlideWidth={400}
                    naturalSlideHeight={450}
                    totalSlides={totalFiles}
                  >
                    <Grid
                      style={{ textAlign: "center" }}
                      container
                      direction="row"
                      justify="center"
                      alignItems="center"
                      spacing={2}
                    >
                      <Grid item sm={2} style={{ textAlign: "initial" }}>
                        <ButtonBack>
                          <ArrowBackIosIcon style={{ fontSize: "xxx-large" }} />
                        </ButtonBack>
                      </Grid>
                      <Grid item sm={8}>
                        <Slider>
                          {meetingData &&
                            filesAndSurvey &&
                            filesAndSurvey.map((elem, key) => {
                              return (
                                <Slide index={key}>
                                  <div>
                                    {elem.filedType === "product" ? (
                                      <Grid
                                        item
                                        sm={12}
                                        style={{ textAlign: "-webkit-center" }}
                                      >
                                        <CarouselProvider
                                          naturalSlideWidth={300}
                                          naturalSlideHeight={350}
                                          totalSlides={elem.files.length}
                                        >
                                          <Grid item sm={2}>
                                            <ButtonBack>&#8592;</ButtonBack>
                                          </Grid>
                                          <Grid item sm={10}>
                                            <Slider>
                                              {elem.files.map((ele, k) => {
                                                var fileTypes =
                                                  ele.fileName.substring(
                                                    ele.fileName.lastIndexOf(
                                                      "."
                                                    ) + 1,
                                                    ele.fileName.length
                                                  );
                                                return (
                                                  <Slide index={k}>
                                                    <Grid item xs={12}>
                                                      <DialogTitle id="alert-dialog-title">
                                                        <AppBar position="static">
                                                          <Toolbar>
                                                            <Typography variant="h6">
                                                              Files Preview
                                                            </Typography>
                                                          </Toolbar>
                                                        </AppBar>
                                                      </DialogTitle>
                                                      <div
                                                        style={{
                                                          textAlign: "left",
                                                        }}
                                                      >
                                                        {fileTypes === "gif" ||
                                                          fileTypes === "jpg" ||
                                                          fileTypes === "png" ||
                                                          fileTypes === "webp" ? (
                                                          <Card
                                                            className={
                                                              classes.media
                                                            }
                                                          >
                                                            <CardActionArea>
                                                              <CardMedia
                                                                component="img"
                                                                alt="Product Image"
                                                                src={
                                                                  ApiServices.getBaseUrl() +
                                                                  `/uploads/${ele.fileName}`
                                                                }
                                                                title="Product Image"
                                                              />
                                                            </CardActionArea>
                                                          </Card>
                                                        ) : (
                                                          <div
                                                            style={{
                                                              transform:
                                                                "translate(0px, 25px)",
                                                            }}
                                                          >
                                                            <Scrollbars
                                                              style={{
                                                                width: 705,
                                                                height: 650,
                                                              }}
                                                            >
                                                              <FileViewer
                                                                fileType={
                                                                  fileTypes
                                                                }
                                                                filePath={
                                                                  ApiServices.getBaseUrl() +
                                                                  `/uploads/${ele.fileName}`
                                                                }
                                                              />
                                                            </Scrollbars>
                                                          </div>
                                                        )}
                                                      </div>
                                                    </Grid>
                                                  </Slide>
                                                );
                                              })}
                                            </Slider>
                                          </Grid>
                                          <Grid item sm={2}>
                                            <ButtonNext>&#8594;</ButtonNext>
                                          </Grid>
                                        </CarouselProvider>
                                      </Grid>
                                    ) : elem.filedType === "survey" ? (
                                      <Grid
                                        item
                                        sm={12}
                                        style={{ textAlign: "-webkit-center" }}
                                      >
                                        <CarouselProvider
                                          naturalSlideWidth={80}
                                          naturalSlideHeight={50}
                                          totalSlides={elem.questionsNo.length}
                                        >
                                          <Grid item sm={2}>
                                            <ButtonBack>&#8592;</ButtonBack>
                                          </Grid>
                                          <Grid item sm={8}>
                                            <Slider>
                                              {elem.questionsNo.map(
                                                (el, index) => {
                                                  return (
                                                    <Slide index={index}>
                                                      <div
                                                        style={{
                                                          display: "grid",
                                                          margin: "5px",
                                                          textAlign: "left",
                                                          justifyContent:
                                                            "center",
                                                        }}
                                                      >
                                                        <div
                                                          style={{
                                                            margin: "5px",
                                                          }}
                                                        >
                                                          {elem.name}
                                                        </div>
                                                        <div
                                                          style={{
                                                            margin: "5px",
                                                          }}
                                                        >
                                                          {" "}
                                                          {`Question No ${el + 1
                                                            }`}
                                                        </div>

                                                        <div
                                                          style={{
                                                            margin: "5px",
                                                          }}
                                                        >
                                                          {" "}
                                                          {`${elem
                                                            .questionsAnswers[
                                                            `question${el}`
                                                          ]
                                                            }`}
                                                        </div>
                                                        <div
                                                          style={{
                                                            margin: "5px",
                                                          }}
                                                        >
                                                          {
                                                            <FormLabel
                                                              component="legend"
                                                              key={index}
                                                            >
                                                              Answer
                                                            </FormLabel>
                                                          }
                                                        </div>
                                                        <div
                                                          style={{
                                                            display: "flex",
                                                            marginLeft: "10px",
                                                          }}
                                                        >
                                                          {elem
                                                            .questionsAnswers[
                                                            `answerFormat${index}`
                                                          ] === `radio` &&
                                                            elem
                                                              .questionsAnswers[
                                                            `answerOption${index}`
                                                            ] &&
                                                            elem.questionsAnswers[
                                                              `answerOption${index}`
                                                            ].map(
                                                              (ans, key) => {
                                                                return (
                                                                  <Radio.Group
                                                                    value={
                                                                      elem
                                                                        .questionsAnswers[
                                                                      `answer${index}`
                                                                      ]
                                                                    }
                                                                    onChange={(
                                                                      event
                                                                    ) => {
                                                                      handleChangeAnswer(
                                                                        event
                                                                          .target
                                                                          .value,
                                                                        index,
                                                                        elem.objectId
                                                                      );
                                                                    }}
                                                                  >
                                                                    <Row>
                                                                      <Col>
                                                                        <Radio
                                                                          value={
                                                                            ans
                                                                          }
                                                                        >
                                                                          {ans}
                                                                        </Radio>
                                                                      </Col>
                                                                    </Row>
                                                                  </Radio.Group>
                                                                );
                                                              }
                                                            )}
                                                        </div>
                                                        <div
                                                          style={{
                                                            display: "flex",
                                                            marginLeft: "10px",
                                                          }}
                                                        >
                                                          {elem
                                                            .questionsAnswers[
                                                            `answerFormat${index}`
                                                          ] === "textBox" && (
                                                              <TextField
                                                                label="Free Text Box"
                                                                variant="outlined"
                                                                fullWidth
                                                              />
                                                            )}
                                                        </div>
                                                        <div
                                                          style={{
                                                            display: "flex",
                                                            marginLeft: "10px",
                                                          }}
                                                        >
                                                          {elem
                                                            .questionsAnswers[
                                                            `answerFormat${index}`
                                                          ] === `checkboxes` &&
                                                            elem
                                                              .questionsAnswers[
                                                            `answerOption${index}`
                                                            ] &&
                                                            elem.questionsAnswers[
                                                              `answerOption${index}`
                                                            ].map(
                                                              (ans, key) => {
                                                                return (
                                                                  <FormGroup>
                                                                    <CheckboxGroup
                                                                      style={{
                                                                        width:
                                                                          "100%",
                                                                      }}
                                                                      value={
                                                                        elem
                                                                          .questionsAnswers[
                                                                        `answer${index}`
                                                                        ]
                                                                      }
                                                                      onChange={(
                                                                        e
                                                                      ) => {
                                                                        handleChangeAnswer(
                                                                          e,
                                                                          index,
                                                                          elem.objectId
                                                                        );
                                                                      }}
                                                                    >
                                                                      <Row>
                                                                        <Checkbox
                                                                          value={
                                                                            ans
                                                                          }
                                                                        >
                                                                          {ans}
                                                                        </Checkbox>
                                                                      </Row>
                                                                    </CheckboxGroup>
                                                                  </FormGroup>
                                                                );
                                                              }
                                                            )}
                                                        </div>
                                                        <div
                                                          style={{
                                                            display: "flex",
                                                            marginLeft: "10px",
                                                          }}
                                                        >
                                                          {elem
                                                            .questionsAnswers[
                                                            `answerFormat${index}`
                                                          ] === `dropdown` &&
                                                            elem
                                                              .questionsAnswers[
                                                            `answerOption${index}`
                                                            ] && (
                                                              <Select
                                                                labelId="answer"
                                                                label="Anwer"
                                                                fullWidth
                                                                value={
                                                                  elem
                                                                    .questionsAnswers[
                                                                  `answer${index}`
                                                                  ]
                                                                }
                                                                onChange={(
                                                                  event
                                                                ) => {
                                                                  handleChangeAnswer(
                                                                    event.target
                                                                      .value,
                                                                    index,
                                                                    elem.objectId
                                                                  );
                                                                }}
                                                              >
                                                                {elem.questionsAnswers[
                                                                  `answerOption${index}`
                                                                ].map(
                                                                  (
                                                                    ans,
                                                                    key
                                                                  ) => {
                                                                    return (
                                                                      <MenuItem
                                                                        key={
                                                                          key
                                                                        }
                                                                        value={
                                                                          ans
                                                                        }
                                                                      >
                                                                        {ans}
                                                                        <Button></Button>
                                                                      </MenuItem>
                                                                    );
                                                                  }
                                                                )}
                                                              </Select>
                                                            )}
                                                        </div>
                                                        <div
                                                          style={{
                                                            display: "flex",
                                                            marginLeft: "10px",
                                                          }}
                                                        >
                                                          {elem
                                                            .questionsAnswers[
                                                            `answerFormat${index}`
                                                          ] === "link" &&
                                                            elem
                                                              .questionsAnswers[
                                                            `answerOption${index}`
                                                            ] &&
                                                            elem.questionsAnswers[
                                                              `answerOption${index}`
                                                            ].map(
                                                              (ans, key) => {
                                                                return (
                                                                  <FormGroup>
                                                                    <Checkbox.Group
                                                                      style={{
                                                                        width:
                                                                          "100%",
                                                                      }}
                                                                      value={
                                                                        elem
                                                                          .questionsAnswers[
                                                                        `answer${index}`
                                                                        ]
                                                                      }
                                                                      onChange={(
                                                                        event
                                                                      ) => {
                                                                        handleChangeAnswer(
                                                                          event,
                                                                          index,
                                                                          elem.objectId
                                                                        );
                                                                      }}
                                                                    >
                                                                      <Row>
                                                                        <Checkbox
                                                                          value={
                                                                            ans
                                                                          }
                                                                        >
                                                                          {ans}
                                                                        </Checkbox>
                                                                      </Row>
                                                                    </Checkbox.Group>
                                                                  </FormGroup>
                                                                );
                                                              }
                                                            )}
                                                        </div>
                                                      </div>
                                                    </Slide>
                                                  );
                                                }
                                              )}
                                            </Slider>
                                          </Grid>
                                          <Grid item sm={2}>
                                            <ButtonNext>&#8594;</ButtonNext>
                                          </Grid>
                                        </CarouselProvider>
                                      </Grid>
                                    ) : null}
                                  </div>
                                </Slide>
                              );
                            })}
                        </Slider>
                      </Grid>
                      <Grid item sm={2} style={{ textAlign: "end" }}>
                        <ButtonNext>
                          <ArrowForwardIosIcon
                            style={{ fontSize: "xxx-large" }}
                          />
                        </ButtonNext>
                      </Grid>
                    </Grid>
                  </CarouselProvider>
                ) : (
                  <div>
                    <span>
                      Meeting Start You have not select any product or survey
                    </span>
                  </div>
                )}
              </div>

              <div className="card-footer card-header-sm"></div>
            </div>
          </div>
        </section>
      </Grid>
    </>
  );
}

export default MeetingOnline;
