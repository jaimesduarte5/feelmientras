import React from "react";
import { useNavigate } from "react-router-dom";
import provImage from "../../assets/img/courses/p1.png";
import ProgressCourses from "../eventos/ProgressCourses";
import { encryptURL } from "../../helpers/encryptHelper";

const CourseAgentCard = ({
  description = "Esta es la descripcion del curso",
  course,
  idLp,
  indice,
}) => {
  const navigate = useNavigate();
  const { nameCourse, advanceAgent, urlImgCourse, progressLastCourse } = course;

  return (
    <button
      className="p-2 md:p-5 bg-primaryDark rounded-lg mt-4 w-full hover:shadow-lg. "
      disabled={indice === 0 || progressLastCourse === 100 ? false : true}
      onClick={() =>
        navigate(
          `/user/course/${encryptURL(course.idCourse.toString())}/ ${encryptURL(
            idLp?.toString()
          )}`
        )
      }
    >
      <div className="flex flex-col md:flex-row items-center justify-center md:h-36 md:justify-between">
        <div className="w-auto md:w-96 order-2 md:order-1">
          <img
            src={urlImgCourse || provImage}
            alt={nameCourse}
            className={`h-36 w-40 object-cover object-center  rounded-lg 
            ${
              indice === 0 || progressLastCourse === 100
                ? ""
                : "brightness-[30%] "
            }
             `}
          />
        </div>
        <div className="ml-4 my-2 order-1 md:order-2 block w-full">
          <p className="text-white font-semibold ">{nameCourse}</p>
          <p className="text-white text-xs">{description}</p>
        </div>
        <div className="order-3">
          <ProgressCourses progress={advanceAgent} />
        </div>
      </div>
    </button>
  );
};

export default CourseAgentCard;
