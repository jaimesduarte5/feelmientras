import React, { useEffect } from "react";

import { GridSpinner } from "react-spinners-kit";

const UrlViewer = ({ url }) => {
  useEffect(() => {
    const popupWindow = window.open(url, "URL Player", `width=600, height=400`);
    const encryptedURL = btoa(url);
    // popupWindow.history.replaceState()
    // popupWindow.location.href = `/player?url=${encryptedURL}`;
  }, []);
  return (
    <div className="bg-primaryPink h-full w-full px-4  rounded-md flex flex-col justify-center items-center">
      {/* <GridSpinner />
      <h2 className="text-white font-semibold">Activity in progress</h2> */}
      <embed>
        <iframe
          // onLoad={() => ("Loading Simulation ...")}
          className="bg-primaryPink"
          title="Feel Scorm Player"
          width={"100%"}
          height={600}
          src={url}
        ></iframe>
      </embed>
    </div>
  );
};

export default UrlViewer;
