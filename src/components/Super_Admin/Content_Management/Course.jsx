import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { showConfirmation } from "../../../redux/alertsSlice";

import { FiEdit3, FiTrash2, FiEye } from "react-icons/fi";
import bgCourse from "../../../assets/img/courses/p1.png";
import { editCourse } from "../../../redux/SuperAdmin/cousesManageSlice";

const Course = ({ course, handleOpen }) => {
  const { userData } = useSelector((state) => state.login);
  const { email, role } = userData;
  const { UsrCreation, idCampaign } = course;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //dispara la eliminacion de curso desde el redux
  const handleDelete = (course) => {
    dispatch(
      showConfirmation({
        data: course,
        title: "Action Validation",
        msj: "Are you sure you want to delete this course?",
        tag: "sudeleteCourse",
      })
    );
  };
  //abre el modal y asigna los datos para editarlos
  const handleEditCourse = () => {
    handleOpen("Edit");
    dispatch(editCourse(course));
  };

  return (
    <div
      className="hover:shadow-secondaryDark hover:shadow-lg hover:scale-105 rounded-md bg-cover bg-center h-60 flex flex-col justify-between transition-all ease-in-out"
      style={{
        backgroundImage: `url(${course.urlImgCourse || bgCourse})`,
      }}
    >
      <div className="flex justify-between overflow-hidden h-full ">
        {idCampaign === 1 ? (
          <div className="bg-[#00ff00] relative -rotate-45 top-0 min-h-10 max-h-16 -left-16 shadow-lg px-16 w-72 flex items-center">
            {" "}
            <p className="text-white text-xs font-bold">Vertical course</p>
          </div>
        ) : (
          <div></div>
        )}
        <div>
          <div
            className={`h-5 w-5  rounded-full m-3
          ${course.private ? "bg-primaryPink" : "bg-secondaryGreen"}`}
          />
        </div>
      </div>
      <div className="flex bg-primaryPink rounded-md justify-between p-2 items-center">
        <p className="text-white text-sm flex-1"> {course.nameCourse}</p>
        <div className="flex-1 text-right ">
          <button
            className="text-primaryPink mr-2 bg-white border-primaryPink border hover:border-white hover:bg-primaryPink hover:text-white focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-1 py-1 "
            onClick={() =>
              navigate(
                `/course-preview/${btoa(course.idCourse)}/${btoa(
                  course.idCampaign
                )}`
              )
            }
          >
            <FiEye size={18} />
          </button>
          {email === UsrCreation || role === "Super Admin" ? (
            <>
              <button
                className="text-primaryPink mr-2 bg-white border-primaryPink border hover:border-white hover:bg-primaryPink hover:text-white focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-1 py-1 "
                onClick={() => handleEditCourse()}
                disabled={
                  idCampaign === 1 && email !== UsrCreation ? true : false
                }
              >
                <FiEdit3 size={18} />
              </button>

              <button
                className="text-primaryPink bg-white border-primaryPink border hover:border-white hover:bg-primaryPink hover:text-white focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-1 py-1 "
                onClick={() => handleDelete(course)}
                disabled={
                  idCampaign === 1 && email !== UsrCreation ? true : false
                }
              >
                <FiTrash2 size={18} />
              </button>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
};

export default Course;
