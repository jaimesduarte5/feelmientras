import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const ScormFrame = ({ url }) => {
  const { userData } = useSelector((state) => state.login);
  const dataFromLms = {
    cmi: {
      suspend_data:
        "2j5c60708090a0b0DC1001512u010120111201212013120141201512G101",
      launch_data: "",
      comments: "",
      comments_from_lms: "",
      core: {
        student_id: userData.email,
        student_name: `${userData.nombre.split(" ")[0]}`,
        lesson_location: "Feel",
        lesson_status: "browsed",
        credit: "",
        entry: "ab-initio",
        lesson_mode: "normal",
        exit: "suspend",
        session_time: "00:00:00",
        score: {
          raw: "0",
          min: "0",
          max: "100",
        },
        total_time: "00:00:00",
      },
      objectives: {},
      student_data: {
        mastery_score: "",
        max_time_allowed: "",
        time_limit_action: "",
      },
      student_preference: {
        audio: "",
        language: "",
        speed: "",
        text: "",
      },
      interactions: {},
    },
  };

  useEffect(() => {
    if (url) {
      try {
        window.API.loadFromJSON(dataFromLms, "");
      } catch (error) {
        //console.log(error);
      }
    }
  }, []);

  return (
    <div>
      <iframe
        //onLoad={() => console.log("Loading Scorm ...")}
        className="bg-primaryPink"
        title="Feel Scorm Player"
        width={"100%"}
        height={600}
        src={url}
      ></iframe>
    </div>
  );
};

export default ScormFrame;
