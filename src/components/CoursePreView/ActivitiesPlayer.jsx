import React, { useRef } from "react";
import { useSelector } from "react-redux";
import { GridSpinner } from "react-spinners-kit";

import { BACKEND_URL } from "../../apis/backendURL";
import VideoPlayer from "../Agent/VideoPlayer";
import PDFViewer from "../Agent/PdfViewer";
import ScormFrame from "../ScormFrame";
import UrlViewer from "../Agent/UrlViewer";
import VideoPreview from "./VideoPreview";

const ActivitiesPlayer = ({ activity, first, file, folderName }) => {
  const { userData } = useSelector((state) => state.login);

  const playerRef = useRef();
  const urlPlayer = BACKEND_URL;

  if (activity?.typeContent === 1)
    return (
      <div>
        {/* <VideoPlayer url={activity?.urlActivity} /> */}
        <VideoPreview url={activity?.urlActivity} />
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
        <PDFViewer fileUrl={activity?.urlActivity} />
      </>
    );
  if (activity?.typeContent === 4)
    return (
      <>
        {first ? (
          <ScormFrame url={`${urlPlayer}/${folderName}/${file}`} />
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
          <ScormFrame url={`${urlPlayer}/${folderName}/index.html`} />
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

export default ActivitiesPlayer;
