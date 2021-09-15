import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVideo,
  faVideoSlash,
  faMicrophone,
  faMicrophoneSlash,
  faEnvelope,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import "./ControlBar.css";
import { Button } from "react-bootstrap";
import FeedbackModal from "../FeedBack/FeedbackModal";

const ControlBar = ({
  onEnd,
  users,
  currentUser,
  onSelectUser,
  setUsers,
  meetingId,
}) => {
  const [isVideo, setIsVideo] = useState(false);
  const [isAudio, setIsAudio] = useState(false);
  const [showSendEmail, setShowSendEmail] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const toggleVideo = () => {
    setIsVideo(!isVideo);
  };

  const toggleAudio = () => {
    setIsAudio(!isAudio);
  };

  const extractInitials = (name) => {
    let initials = name.match(/\b\w/g) || [];
    initials = (
      (initials.shift() || "") + (initials.pop() || "")
    ).toUpperCase();
    return initials;
  };

  const updateStream = (stream, video, audio) => {
    // console.log(stream , 'stream');
    console.log(video, 'video');
    console.log(audio, 'audio');


    stream.getTracks().forEach((track) => {
      console.log(track, 'track');
      if (track.kind === "video") {
        track.enabled = video;
        // track.muted = !video;
      } else if (track.kind === "audio") {
        track.enabled = audio;
        // track.muted = !audio;

      }
    });
  };

  useEffect(() => {
    if (users) {
      const thisUser = users.find((u) => u.isThis);
      if (thisUser) {
        if (!thisUser.stream) {
          // console.log(navigator.mediaDevices.getUserMedia({ audio: true }), 'condition true');
          navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then(
              (stream) => {
                // console.log(stream, 'stream');

                updateStream(stream, isVideo, isAudio);
                thisUser.stream = stream;
                setUsers([...users]);
              },
              (error) => {
                console.error(error);
              }
            );
        } else {
          updateStream(thisUser.stream, isVideo, isAudio);
        }
      }
    }
  }, [isVideo, isAudio]);
  // console.log(users , 'users , in ctrool bar');
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: "25px",
      }}
    >
      <div className="float-left">
        {users && users
          ? users.map((user) => (
            <img
              key={user.socketId}
              src={`https://via.placeholder.com/50?text=${extractInitials(
                user.name
              )}`}
              alt="U"
              className={
                "rounded-circle" +
                (currentUser === user ? " shadow selected-user" : "")
              }
              style={{ width: "2rem", borderRadius: "50%" }}
              onClick={() => {
                onSelectUser(user);
              }}
            />
          ))
          : null}
      </div>
      <div className="float-right">
        <Button size="sm" variant="outline-primary" onClick={toggleAudio}>
          <FontAwesomeIcon icon={isAudio ? faMicrophone : faMicrophoneSlash} />
        </Button>
        <Button size="sm" variant="outline-primary" onClick={toggleVideo}>
          <FontAwesomeIcon icon={isVideo ? faVideo : faVideoSlash} />
        </Button>
        <Button
          size="sm"
          className="btn btn-danger"
          onClick={onEnd}
          style={{
            color: "white",
            backgroundColor: "#dc3545",
            borderColor: "#dc3545",
          }}
        >
          <FontAwesomeIcon icon={faPowerOff} />
        </Button>
      </div>
    </div>
  );
};

export default ControlBar;
