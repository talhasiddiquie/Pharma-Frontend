import React, { useState, useRef, forwardRef, useImperativeHandle, useEffect } from 'react';
import screenfull from 'screenfull';
import './VideoPreview.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFull } from '@fortawesome/free-solid-svg-icons';
import { Button } from 'react-bootstrap';

const VideoPreview = forwardRef(
  (
    {
      user,
      onVideoFullscreenChange,
    },
    ref
  ) => {
    const [videoPlaying, setVideoPlaying] = useState(false);
    const [userVideoFullscreen, setUserVideoFullscreen] = useState(false);
    const [showUserVideo, setShowUserVideo] = useState(false);

    let isVideo = false;

    let videoPlayer = useRef(null);
    //let cameraPlayer = useRef(null);

    useImperativeHandle(ref, () => ({
      playVideo: (doNotify) => {
        ref.current.donotNotifyPlay = true;
        setVideoPlaying(true);
      },
      pauseVideo: (doNotify) => {
        ref.current.donotNotifyPause = true;
        setVideoPlaying(false);
      },
      seekVideo: (seconds) => {
        ref.current.donotNotifySeek = true;
        videoPlayer.current.seekTo(seconds, 'seconds');
      },
      videoFullscreen: (isFullscreen) => {
        if (isFullscreen) {
          screenfull.request(videoPlayer.current.wrapper).then(
            () => {
              return true;
            },
            (error) => {
              return false;
            }
          );
        } else {
          screenfull.exit().then(
            () => {
              return true;
            },
            (error) => { }
          );
        }
      },
    }));

    useEffect(() => {
      if (user != null) {
        setShowUserVideo(true);
      }
    }, [user]);

    let slideTemplate = <div>Loading, Please Wait...</div>;
    if (user && userVideoFullscreen) {
      slideTemplate = (
        <div className="stretched">
          <video
            ref={(video) => {
              if (video) {
                video.srcObject = user.stream;
              }
            }}
            autoPlay
            muted={true}
            id="large-video"
            className="stretched"
          ></video>
          <Button
            size="sm"
            variant="outline-secondary"
            className="fullscreen-button shadow"
            onClick={() => setUserVideoFullscreen(false)}
          >
            <FontAwesomeIcon icon={faSquareFull} />
          </Button>
        </div>
      );
    }

    useEffect(() => {
      if (isVideo) {
        const fullScreenListener = (e) => {
          var isFullscreen =
            document.fullScreen || document.mozFullScreen || document.webkitIsFullScreen;
          onVideoFullscreenChange(isFullscreen);
        };
        document.addEventListener('fullscreenchange', fullScreenListener);
        document.addEventListener('mozfullscreenchange', fullScreenListener);
        document.addEventListener('webkitfullscreenchange', fullScreenListener);
        document.addEventListener('msfullscreenchange', fullScreenListener);
        return () => {
          document.removeEventListener('fullscreenchange', fullScreenListener);
          document.removeEventListener('mozfullscreenchange', fullScreenListener);
          document.removeEventListener('webkitfullscreenchange', fullScreenListener);
          document.removeEventListener('msfullscreenchange', fullScreenListener);
        };
      }
    }, [user]);

    return (
      <div
        className="row h-100 justify-content-center align-items-center"
        style={{ position: 'relative' }}
      >
        {slideTemplate}
        {user && showUserVideo && !userVideoFullscreen ? (
          <div className="user-video-small shadow">
            <video
              ref={(video) => {
                // console.log(user.stream , 'video in preview');
                if (video) {
                  video.srcObject = user.stream;
                }
              }}
              autoPlay
              muted={false}
              id="small-video"
              className="stretched"
            ></video>

            <Button
              size="xs"
              variant="outline-secondary"
              className="fullscreen-button shadow"
              onClick={() => setUserVideoFullscreen(true)}
            >
              <FontAwesomeIcon icon={faSquareFull} />
            </Button>
          </div>
        ) : null}
      </div>
    );
  }
);

export default VideoPreview;
