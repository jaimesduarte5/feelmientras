import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  FaPauseCircle,
  FaPlayCircle,
  FaVolumeMute,
  FaVolumeOff,
  FaVolumeDown,
  FaVolumeUp,
  FaExpand,
} from "react-icons/fa";
import { toggleVideoFull } from "../../redux/responsiveSlice";
import { postAgentTrackEvents } from "../../redux/User/coursesAgentSlice";
import { getCourse } from "../../redux/POC/contentManagePocSlice";
import { RotateSpinner } from "react-spinners-kit";

function VideoPlayer({
  url,
  idCourse,
  idCampaign,
  idLp,
  last,
  handleEndCourse,
}) {
  const dispatch = useDispatch();
  const { trackEvents } = useSelector((state) => state.agentLearning);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showToolbar, setShowToolbar] = useState(true);
  const [loadVideo, setLoadVideo] = useState(false);
  const [waiting, setWaiting] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const videoRef = useRef(null);

  function handlePlay() {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
      handlePause();
    }
  }

  function handleTimeUpdate() {
    setCurrentTime(videoRef.current.currentTime);
  }

  function handleLoadedMetadata() {
    setDuration(videoRef.current.duration);
  }

  function handleVolumeChange(event) {
    setVolume(event.target.value);
    videoRef.current.volume = event.target.value;
  }

  //Funcion que registra en la DB las pausas del video
  function handlePause() {
    let timeVideo = formatTime(duration.toFixed(2));
    let timeView = formatTime(currentTime.toFixed(2));
    setWaiting(false);
    dispatch(
      postAgentTrackEvents({
        ...trackEvents,
        timeVideo,
        timeView,
        idEvent: 8,
        context: 3,
        evento: "Se pauso el Video",
        idLp: idLp === "undefined" ? 0 : idLp,
      })
    );
  }

  //Funcion que registra en la DB que se vio todo el video
  function handleEnded() {
    let timeVideo = formatTime(duration.toFixed(2));
    let timeView = formatTime(currentTime.toFixed(2));

    let eventActivity = {
      ...trackEvents,
      timeVideo,
      timeView,
      progress: 100,
      idEvent: 9,
      context: 3,
      evento: "Se vio todo el Video",
      idLp: idLp === "undefined" ? 0 : idLp,
    };
    let actualization = false;

    dispatch(
      postAgentTrackEvents({
        idCourse,
        idCampaign,
        actualization,
        eventActivity,
      })
    );

    eventActivity.idEvent = 2;
    eventActivity.evento = "finalizo actividad por llegar al fin del video";
    dispatch(
      postAgentTrackEvents({
        idCourse,
        idCampaign,
        actualization,
        eventActivity,
      })
    );

    if (last) handleEndCourse();

    setIsPlaying(!isPlaying);
  }

  function handleSeek(event) {
    const time = event.target.value * videoRef.current.duration;
    videoRef.current.currentTime = time;
    setCurrentTime(time);
  }

  function handleContextMenu(event) {
    event.preventDefault();
  }

  function handleKeyDown(event) {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
    }
  }

  function handleMute() {
    if (volume > 0) {
      setVolume(0);
      videoRef.current.volume = 0;
    } else {
      setVolume(0.75);
      videoRef.current.volume = 0.75;
    }
  }

  //TODO eliminar este useEFect es solo para pruebas TAMBIEN borrar la importacion
  useEffect(() => {
    setIsPlaying(false);
    setWaiting(false);
  }, [url]);

  const handleWaiting = () => {
    setWaiting(true);
  };

  return (
    <div
      onContextMenu={handleContextMenu}
      onKeyDown={handleKeyDown}
      className="relative  h-4/5"
      onMouseEnter={() => {
        setShowToolbar(true);
      }}
      onMouseLeave={() => {
        setShowToolbar(false);
      }}
    >
      {loadVideo || waiting ? (
        <div className="absolute h-full w-full bg-primaryDark bg-opacity-40 text-center flex flex-col justify-center items-center">
          <RotateSpinner size={60} color="#fff" />
          {waiting ? (
            <p className="text-white">
              Buffering Video... <br />
              <span className="text-sm text-[#b8adad]">Slow Conection</span>
            </p>
          ) : (
            <p className="text-white">Loading Video</p>
          )}
        </div>
      ) : (
        ""
      )}
      <video
        ref={videoRef}
        src={url}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        controls={false}
        onEnded={handleEnded}
        onLoadStart={() => setLoadVideo(true)}
        onLoadedData={() => setLoadVideo(false)}
        onWaiting={handleWaiting}
        onPlaying={() => setWaiting(false)}
      />

      {/* Barra de navegacion del video  */}
      {!loadVideo && (
        <div
          className={` absolute left-0  bg-primaryPurple bg-opacity-30 w-full px-4 py-2 flex justify-between items-center transition-all ease-in-out 
      ${showToolbar ? "bottom-0" : "-bottom-10"}
      `}
        >
          <div className="flex items-center">
            <button onClick={handlePlay}>
              {isPlaying ? (
                <FaPauseCircle color="#fff" size={25} />
              ) : (
                <FaPlayCircle color="#fff" size={25} />
              )}
            </button>
            <span className="ml-4 text-xs font-bold text-white">
              {formatTime(currentTime.toFixed(2))} /{" "}
              {formatTime(duration.toFixed(2))}
            </span>
          </div>
          <input
            type="range"
            disabled={true}
            min="0"
            max="1"
            step="0.01"
            value={currentTime / duration}
            onChange={handleSeek}
            className="flex-1 mx-4 hidden lg:block "
          />
          <div className="flex items-center">
            <button onClick={() => handleMute()}>
              {volume < 0.01 && <FaVolumeMute color="#fff" />}
              {volume > 0.01 && volume < 0.2 && <FaVolumeOff color="#fff" />}
              {volume > 0.2 && volume < 0.6 && <FaVolumeDown color="#fff" />}
              {volume > 0.6 && <FaVolumeUp color="#fff" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="custom-range mx-4"
            />
            <button
              className="hidden lg:block"
              onClick={() => {
                dispatch(toggleVideoFull());
              }}
            >
              <FaExpand color="#fff" />
            </button>
          </div>
          {/* <button onClick={handleFullScreen}>Full Screen</button> */}
        </div>
      )}
    </div>
  );
}

export default VideoPlayer;

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${pad(minutes)}:${pad(seconds)}`;
}

function pad(number) {
  return number.toString().padStart(2, "0");
}
