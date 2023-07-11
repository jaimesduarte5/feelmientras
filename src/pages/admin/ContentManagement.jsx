import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../../components/Modals/Modal";
import bgNotCourses from "../../assets/img/courses/notCourses.png";
import { RotateSpinner } from "react-spinners-kit";
import CreateCourse from "../../components/Modals/CreateCourse";
import Courses from "../../components/Super_Admin/Content_Management/Courses";
import {
  cleanCourse,
  getDataCourses,
} from "../../redux/SuperAdmin/cousesManageSlice";

const ContentManagement = () => {
  const dispatch = useDispatch();
  const { courses, campaigns, isLoading } = useSelector(
    (state) => state.courses
  );
  const [showModal, setShowModal] = useState(false);
  const [typeAction, setTypeAction] = useState("");
  const [filter, setFilter] = useState("All");
  const [account, setAccount] = useState(0);

  useEffect(() => {
    dispatch(getDataCourses(account));
  }, [account]);

  //filtro de cursos por privacidad
  const coursesList = React.useMemo(() => {
    if (filter === "All") return courses;

    const filtrado = courses.filter(
      (course) => course.private.toString() === filter.toString()
    );
    return filtrado;
  }, [filter, courses]);

  // Funcion para mostrar el modal
  const handleOpen = (type) => {
    if (type !== typeAction) {
      dispatch(cleanCourse());
    }
    setTypeAction(type);
    setShowModal(true);
  };

  // Funcion para ocultar el modal
  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="w-full min-h-full bg-primaryDark bg-opacity-75 rounded-lg p-4">
        {/* cabecera  */}
        <div>
          <h3 className="text-primaryPink font-medium text-2xl">
            Content Management
          </h3>
        </div>

        {/* seccion de filtros  */}
        <div className="my-6 flex  flex-col sm:flex-row   justify-between ">
          <div className="flex flex-col sm:flex-row ">
            <select
              className=" bg-white shadow-md h-10 shadow-primaryPurple relative sm:my-0 w-full md:w-52 p-2 rounded-md text-primaryPink font-semibold"
              placeholder="Campaign"
              value={account || courses[0]?.idCampaign}
              onChange={(e) => setAccount(e.target.value)}
            >
              <option value={1}>Cross Course</option>
              {campaigns?.map((campaign) => (
                <option value={campaign.id} key={campaign.id}>
                  {campaign.name}
                </option>
              ))}
            </select>

            <select
              className=" bg-white mt-4 h-10 sm:mt-0 sm:ml-2 shadow-md shadow-primaryPurple relative  md:my-0 w-full md:w-52 p-2 rounded-md text-primaryPink font-semibold"
              placeholder="Privacity"
              value={filter}
              onChange={({ target }) => setFilter(target.value)}
            >
              <option value={"All"}>All</option>
              <option value={false}>Public</option>
              <option value={true}>Private</option>
            </select>
          </div>
          {/* Boton de creacion nuevo curso  */}
          <button
            onClick={() => handleOpen("Create")}
            className="text-primaryPink font-medium text-sm mt-4 sm:mt-0  lg:mr-8  bg-white rounded-md px-2 md:px-3 py-2 hover:bg-primaryPink hover:text-white transition ease-in-out duration-150  "
          >
            New Course
          </button>
        </div>
        {/* BODY CONTAIN  */}
        {isLoading ? (
          <div className="w-full h-56 flex justify-center items-center">
            <RotateSpinner size={60} color="#FF0082" />
          </div>
        ) : (
          <div className="my-6">
            {courses.length > 0 ? (
              <Courses courses={coursesList} handleOpen={handleOpen} />
            ) : (
              <div
                className="bg-no-repeat bg-contain  h-56 w-full bg-center flex justify-center items-center"
                style={{ backgroundImage: `url(${bgNotCourses})` }}
              >
                <p className="text-white p-2 md:font-bold">
                  This campaign does not have courses yet, create one to be able
                  to show content.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      {/* MODAL */}
      <Modal visible={showModal} onClose={() => {}}>
        <CreateCourse onClose={handleClose} typeAction={typeAction} />
      </Modal>
    </>
  );
};

export default ContentManagement;
