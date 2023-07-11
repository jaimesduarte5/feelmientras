import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { GridSpinner } from "react-spinners-kit";
import { fechaYMD } from "../../helpers/dateHelper";
import {
  addEvent,
  postAgentTrackEvents,
} from "../../redux/User/coursesAgentSlice";
import ScormFrame from "../ScormFrame";
import PdfViewer from "./PdfViewer";
import UrlViewer from "./UrlViewer";
import VideoPlayer from "./VideoPlayer";
import { BACKEND_URL } from "../../apis/backendURL";

const UserPlayer = ({
  activity,
  first,
  file,
  idCourse,
  idCampaign,
  idLp,
  handleEndCourse,
  last,
}) => {
  const { userData } = useSelector((state) => state.login);
  const { trackEvents } = useSelector((state) => state.agentLearning);
  const dispatch = useDispatch();
  const playerRef = useRef();
  const { idActivity = 0, typeContent } = activity;
  const urlPlayer = BACKEND_URL;

  useEffect(() => {
    if (idActivity) {
      let content = typeContent.toString();
      // registra en en la db el evento de entrada al actividad
      const evento = {
        idActivity: idActivity,
        dateOpen: fechaYMD(),
        timeToActivity: "",
        progress: 1,
        typeConten: content,
        timeVideo: "",
        timeView: "",
        context: 3,
        views: 1,
        idEvent: 1,
        idLp: idLp === "undefined" ? 0 : idLp,
      };

      dispatch(
        postAgentTrackEvents({
          ...evento,
          evento: "registro de apertura de actividad",
        })
      );
      dispatch(
        addEvent({
          ...evento,
        })
      );
    }
  }, [activity]);

  if (activity?.typeContent === 1)
    return (
      <div>
        <VideoPlayer
          handleEndCourse={handleEndCourse}
          url={activity?.urlActivity}
          idCourse={idCourse}
          idCampaign={idCampaign}
          idLp={idLp}
          last={last}
        />
      </div>
    );

  if (activity?.typeContent === 2)
    return (
      <div className="w-full  flex justify-center">
        <img
          ref={playerRef}
          src={activity?.urlActivity}
          alt={activity?.descActivity}
          className="h-[30rem] 2xl:h-[45rem]"
        />
      </div>
    );

  if (activity?.typeContent === 3)
    return (
      <>
        <PdfViewer fileUrl={activity?.urlActivity} />
      </>
    );
  if (activity?.typeContent === 4)
    return (
      <>
        {first ? (
          <ScormFrame
            url={`${urlPlayer}/${userData.userName}/${file}`} //`https://feelsdev.teleperformance.co/${userData.userName}/1`} //https://feelsdev.teleperformance.co/scorm?folderName=${userData.userName}&context=1
          />
        ) : (
          <div className="bg-primaryPink h-full w-full flex justify-center items-center rounded-md">
            <GridSpinner size={50} />
          </div>
        )}
      </>
    );
  if (activity?.typeContent === 5)
    return (
      <>
        {first ? (
          <ScormFrame
            url={`${urlPlayer}/${userData.userName}/index.html`} //`https://feelsdev.teleperformance.co/${userData.userName}/1`} //https://feelsdev.teleperformance.co/scorm?folderName=${userData.userName}&context=1
          />
        ) : (
          <div className="bg-primaryPink h-full w-full flex justify-center items-center rounded-md">
            <GridSpinner size={50} />
          </div>
        )}
      </>
    );
  if (activity?.typeContent === 6)
    return (
      <>
        <UrlViewer url={activity.urlActivity} />
      </>
    );

  return <p>No data</p>;
};

export default UserPlayer;
