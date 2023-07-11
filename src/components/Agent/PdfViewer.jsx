import React, { useRef, useState, useEffect } from "react";
import { FaExpand } from "react-icons/fa";
import { VscScreenNormal } from "react-icons/vsc";

const PDFViewer = ({ fileUrl }) => {
  const pdfRef = useRef(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showToolbar, setShowToolbar] = useState(true);

  useEffect(() => {
    if (pdfRef?.current?.ownerDocument?.fullscreen === false) {
      setIsFullscreen(false);
    }
  }, [pdfRef?.current?.ownerDocument?.fullscreen]);

  const enterFullscreen = () => {
    if (pdfRef.current.requestFullscreen) {
      pdfRef.current.requestFullscreen();
    }
    setIsFullscreen(true);
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    setIsFullscreen(false);
  };

  return (
    <div
      ref={pdfRef}
      className="relative "
      onMouseEnter={() => setShowToolbar(true)}
      onMouseLeave={() => setShowToolbar(false)}
    >
      {/* <div className="bg-primaryPurple z-50 relative bottom-0  h-14 cursor-not-allowed"></div> */}

      <embed
        src={fileUrl}
        allow="fullscreen"
        className={`w-full
        ${isFullscreen ? "h-screen" : "h-[30rem] 2xl:h-[45rem] "}
        `}
      />

      {isFullscreen ? (
        <button
          onClick={exitFullscreen}
          className=" animate-pulse hover:animate-none fixed bottom-20 right-16 h-12 w-12 bg-primaryPink bg-opacity-30 rounded-full p-2 border border-white border-opacity-25 shadow-md hover:scale-95"
        >
          <VscScreenNormal color="#fff" size={30} />
        </button>
      ) : (
        <button
          onClick={enterFullscreen}
          // className=" mr-6 p-1 hover:scale-105"
          className={`absolute animate-pulse  bg-primaryPurple p-3 opacity-50 rounded-full bg-opacity-100 bottom-10 shadow-md text-right transition-all ease-in-out
        ${showToolbar ? "right-10" : "-right-20"}`}
        >
          <FaExpand color="#fff" size={20} />
        </button>
      )}
      <div
        className={`absolute top-0  right-0 bg-primaryPurple bg-opacity-0 w-1/4 h-14 cursor-not-allowed`}
      />
    </div>
  );
};

export default PDFViewer;
