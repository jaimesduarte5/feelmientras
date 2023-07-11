import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TiThMenu } from "react-icons/ti";
import { CgCloseO } from "react-icons/cg";
import { useParams } from "react-router-dom";
import { reqWithData } from "../../apis/requestTypes";
import { toggleMenu } from "../../redux/responsiveSlice";
import { decryptURL } from "../../helpers/encryptHelper";
import { RotateSpinner } from "react-spinners-kit";
import { getViewerCourse } from "../../redux/Viewer/contentViewerCourseSlice";
import ActivitiesPlayer from "../../components/CoursePreView/ActivitiesPlayer";
import ActivitiesModule from "../../components/CoursePreView/ActivitiesModule";

const ViewerCourse = () => {
  const dispatch = useDispatch();
  const paramurl = useParams();
  // const idLp = decryptURL(paramurl.idLp);

  const { course, isLoading, activities } = useSelector(
    (state) => state.viewerCourse
  );
  const { videoFull, showMenu } = useSelector((state) => state.responsive);
  const { userData } = useSelector((state) => state.login);
  const { idCampaign } = userData;

  const [folderName, setFolderName] = useState(null);
  const [idCourse, setIdCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [first, setfirst] = useState(false);
  const [contador, setContador] = useState(0);
  const [file, setFile] = useState(false);
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    if (userData.role === "Viewer") {
      setFolderName(userData.email.split("@", 1));
    } else {
      setFolderName(userData.userName);
    }

    const decrypting = decryptURL(paramurl.idCourse);
    setIdCourse(decrypting);

    if (idCourse) {
      // consulta el curso de entrada con el idCourse que viene como parametro en la url
      dispatch(getViewerCourse({ idCourse: parseInt(idCourse), idCampaign }));
    }
    // eslint-disable-next-line
  }, [idCourse]);

  useEffect(() => {
    setfirst(false);
    setLoading(true);
    changeActivity(course[0]?.activities[0]);
    // if (!activity) {
    //   //setActivity(course[0]?.activities[0]);
    // }
    setLoading(false);
    // eslint-disable-next-line
  }, [course]);

  const changeActivity = async (act, indice) => {
    setContador(indice || 0);
    setActivity(act);
    setfirst(false);

    //crea la carpeta temporal en el servidor para cargar paquetes scorm
    window.API && delete window.API;

    await reqWithData("a/delscorm", { folderName });
    // } else {
    //   await reqWithData("a/delscorm", { folderName: userData.userName });
    // }
    if (act?.typeContent === 5) {
      addAPI();
      const dwSco = await reqWithData("a/downloadscorm", {
        url: act.urlActivity,
        context: 1,
        folderName,
      });
      if (dwSco.status === 200) {
        setTimeout(() => setfirst(true), 10000);
      }
    }

    if (act?.typeContent === 4) {
      addAPI();
      const dwSco = await reqWithData("a/downloadscorm", {
        url: act.urlActivity,
        context: 2,
        folderName,
      });
      if (dwSco.status === 200) {
        setTimeout(() => {
          setfirst(true);
          setFile(dwSco.data.file);
        }, 10000);
      }
    }
  };

  //Crea el lms para la captura de eventos de un paquete scorm (Arcade, Simulaciones)
  const addAPI = () => {
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/scorm-again@latest/dist/scorm-again.js";
    script.integrity =
      "sha384-IZOgoiUDFCdOtfmr0YnFFAc/xBqXX6utDAgQzVR1f6rsdAJB/AdkwfkAm3JMYi/T";
    script.crossOrigin = "anonymous";
    script.async = true;
    script.onload = () => {
      const settings = {
        autocommit: true,
        autocommitSeconds: 30,
        dataCommitFormat: "json",
        commitRequestDataType: "application/json;charset=UTF-8",
        autoProgress: false,
        logLevel: 1,
        mastery_override: false,
      };
      window.API = new window.Scorm12API(settings);
      window.API.on("LMSSetValue.cmi.*", function (CMIElement, value) {});
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      delete window.Scorm12API;
    };
  };

  if (isLoading)
    return (
      <div className="w-full h-56 flex justify-center items-center">
        <RotateSpinner size={60} color="#FF0082" />
      </div>
    );

  return (
    <div className="w-full min-h-full bg-primaryDark bg-opacity-75 rounded-lg p-4 ">
      {/* cabecera  */}
      <div className="mb-4">
        <h3 className="text-white font-medium text-2xl mb-2">
          {course[0]?.nameCourse || ""}
        </h3>
        <p className="text-white md:w-3/4 ">{course[0]?.descCourse || ""}</p>
      </div>

      {/* Vista de contenidos */}
      <div
        className={`grid grid-cols-1 relative ${
          activity?.typeContent === 1 && videoFull ? "" : "lg:grid-cols-4"
        }  gap-4`}
      >
        <div className="lg:col-span-3 rounded-lg overflow-hidden order-2 lg:order-1">
          {loading ? (
            <p>Loading...</p>
          ) : (
            activity && (
              <ActivitiesPlayer
                activity={activity}
                first={first}
                file={file}
                folderName={folderName}
              />
            )
          )}
        </div>
        {activity?.typeContent === 1 && videoFull && (
          <button
            className="border border-primaryPink p-2 absolute z-50 top-2 right-2 text-white rounded-full bg-primaryPink bg-opacity-10 hover:bg-white hover:bg-opacity-30 hover:text-primaryPink"
            onClick={() => dispatch(toggleMenu())}
          >
            {showMenu ? <TiThMenu size={20} /> : <CgCloseO size={20} />}
          </button>
        )}
        {activity?.typeContent === 1 && showMenu && videoFull ? (
          ""
        ) : (
          <div
            className={`
         bg-primaryDark  rounded-lg 
          ${
            activity?.typeContent === 1 && videoFull
              ? "w-[25%] absolute top-1 right-1 h-[calc(100%-3rem)] bg-opacity-90"
              : "flex flex-col    h-full  w-full order-1 lg:order-2"
          }
          `}
          >
            <p className="text-primaryPink text-md font-semibold text-center my-6 underline outline-offset-2">
              MODULE
            </p>
            <ActivitiesModule
              activities={activities}
              activity={activity}
              changeActivity={changeActivity}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewerCourse;
