import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { TiThMenu } from "react-icons/ti";
import { CgCloseO } from "react-icons/cg";
import { useParams } from "react-router-dom";
import { reqWithData } from "../../apis/requestTypes";
import UserPlayer from "../../components/Agent/UserPlayer";
import { fechaYMD } from "../../helpers/dateHelper";
import useCounter from "../../Hooks/useCounter";
import { getCourse } from "../../redux/POC/contentManagePocSlice";
import { postAgentTrackEvents } from "../../redux/User/coursesAgentSlice";
import { toggleMenu } from "../../redux/responsiveSlice";
import { decryptURL } from "../../helpers/encryptHelper";
import { RotateSpinner } from "react-spinners-kit";
import ActivitiesModule from "../../components/Agent/course/ActivitiesModule";
import Modal from "../../components/Modals/Modal";

const AgentViewCourse = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const paramurl = useParams();
  const { start, time } = useCounter();
  const idLp = decryptURL(paramurl.idLp);
  const idCourse = decryptURL(paramurl.idCourse);

  const { course, isLoading, activities } = useSelector(
    (state) => state.contentManagePoc
  );
  const { trackEvents, loadingUpTracks } = useSelector(
    (state) => state.agentLearning
  );
  const { videoFull, showMenu } = useSelector((state) => state.responsive);
  const { userData } = useSelector((state) => state.login);
  const { idCampaign } = userData;
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [first, setfirst] = useState(false);
  const [contador, setContador] = useState(0);
  const [file, setFile] = useState(false);
  const [activity, setActivity] = useState(null);

  useEffect(() => {
    if (idCourse) {
      // consulta el curso de entrada con el idCourse que viene como parametro en la url
      dispatch(getCourse({ idCourse, idCampaign }));
      // registra en en la db el evento de entrada al curso
      dispatch(
        postAgentTrackEvents({
          idActivity: idCourse,
          dateOpen: fechaYMD(),
          timeToActivity: "",
          typeConten: "",
          progress: 0,
          timeVideo: "",
          timeView: "",
          context: 2,
          views: 0,
          idEvent: 3,
          idLp: idLp === "undefined" ? 0 : idLp,
          evento: "Registro de apertura del curso",
        })
      );
    }
  }, [idCourse]);

  useEffect(() => {
    setfirst(false);
    setLoading(true);
    if (!activity) {
      changeActivity(course[0]?.activities[0]);
      setActivity(course[0]?.activities[0]);
    }
    setLoading(false);
  }, [course]);

  // funcion para registrar  una actividad completa en la DB
  const completeActivity = async () => {
    setModal(false);
    let eventActivity = {
      ...trackEvents,
      timeToActivity: time,
      progress: 100,
      context: 3,
      idEvent: 2,
      evento: "finalizacion de actividad",
      idLp: idLp === "undefined" ? 0 : idLp,
    };

    if (trackEvents.idActivity) {
      await dispatch(
        postAgentTrackEvents({
          idCourse,
          idCampaign,
          eventActivity,
        })
      );
    }

    changeActivity(activities[contador + 1], contador + 1);

    //setActualization(true);
  };

  const changeActivity = async (act, indice) => {
    setContador(indice || 0);
    setActivity(act);
    setfirst(false);

    //crea la carpeta temporal en el servidor para cargar paquetes scorm
    window.API && delete window.API;
    await reqWithData("a/delscorm", { folderName: userData.userName });
    if (act?.typeContent === 5) {
      addAPI();
      const dwSco = await reqWithData("a/downloadscorm", {
        url: act.urlActivity,
        context: 1,
        folderName: userData.userName,
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
        folderName: userData.userName,
      });
      if (dwSco.status === 200) {
        setTimeout(() => {
          setfirst(true);
          setFile(dwSco.data.file);
        }, 10000);
      }
    }

    start();
  };

  //funcion que registra en DB la finalizacion del curso
  const handleEndCourse = async () => {
    completeActivity();

    //registro de terminacion de curso
    let eventActivity = {
      ...trackEvents,
      timeToActivity: time,
      progress: 100,
      context: 2,
      idEvent: 4,
      idActivity: idCourse,
      idLp: idLp === "undefined" ? 0 : idLp,
      idCampaign,
      evento: "finalizacion del Curso",
    };

    dispatch(
      postAgentTrackEvents({
        eventActivity,
      })
    );

    navigate("/user/my-activities");
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

  const confirmActivity = () => {
    setModal(true);
  };

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
              <>
                <UserPlayer
                  activity={activity}
                  first={first}
                  file={file}
                  idCourse={idCourse}
                  handleEndCourse={handleEndCourse}
                  idCampaign={idCampaign}
                  idLp={idLp}
                  last={
                    activity?.idActivity ===
                    activities[activities.length - 1]?.idActivity
                      ? true
                      : false
                  }
                />
              </>
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
            className={`bg-primaryDark  rounded-lg 
                ${
                  activity?.typeContent === 1 && videoFull
                    ? "w-[25%] absolute top-1 right-1 h-[calc(100%-3rem)] bg-opacity-90"
                    : "flex flex-col    h-full  w-full order-1 lg:order-2"
                }`}
          >
            <p className="text-primaryPink text-md font-semibold text-center my-6 underline outline-offset-2">
              MODULE
            </p>
            <ActivitiesModule
              activities={activities}
              activity={activity}
              changeActivity={changeActivity}
              loadingUpTracks={loadingUpTracks}
            />

            <div className="flex flex-1 items-end justify-end p-4 ">
              {activity?.progressActivity !== 100 && (
                <div className="flex flex-1 items-end justify-end p-4 ">
                  {activity?.idActivity ===
                  activities[activities.length - 1]?.idActivity ? (
                    <button
                      className="w-full md:w-auto mb-4 md:mb-0  text-primaryPink font-medium bg-white rounded-md px-3 py-1 hover:bg-primaryPink hover:text-white transition ease-in-out duration-150 "
                      onClick={handleEndCourse}
                    >
                      Complete the Course
                    </button>
                  ) : (
                    activity?.typeContent !== 1 && (
                      <button
                        className="w-full md:w-auto mb-4 md:mb-0  text-primaryPink font-medium bg-white rounded-md px-3 py-1 hover:bg-primaryPink hover:text-white transition ease-in-out duration-150 "
                        onClick={confirmActivity}
                        //onClick={completeActivity}
                        disabled={loadingUpTracks ? true : false}
                      >
                        Complete Activity {contador + 1}
                      </button>
                    )
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* modal verification complete activity section  */}
      <Modal
        visible={modal}
        onClose={() => {}}
        //onClose={() => handleReset(true)}
      >
        <div className=" rounded-lg  flex flex-col w-full bg-primaryDark opacity-95 outline-none max-w-xs md:mb-auto p-4">
          <div>
            <p className="text-white text-xl text-center font-bold">
              Are you sure you did all the content conscientiously?
            </p>
            <p className="text-white text-sm my-4">
              Remember that in case you have not completed the content you may
              be credited with a negative feedback
            </p>
          </div>
          <div className="my-4 flex justify-around ">
            <button
              className="text-primaryPink  bg-white border border-white  hover:border-primaryPink focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => setModal(false)}
            >
              Cancel
            </button>
            <button
              className="text-primaryPink  bg-white  border  border-white   hover:border-primaryPink focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => completeActivity()}
            >
              Yes, i´m sure!
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AgentViewCourse;
