import React, { useState, useEffect } from "react";
import Modal from "../../components/Modals/Modal";
import Courses from "../../components/Super_Admin/Content_Management/Courses";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanCourse,
  getDataCourses,
} from "../../redux/SuperAdmin/cousesManageSlice";
import CreateCourse from "../../components/Modals/CreateCourse";

const POCContentManagement = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.login);
  const { courses, isLoading } = useSelector((state) => state.courses);
  const { idCampaign } = userData;
  const [filter, setFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);
  const [typeAction, setTypeAction] = useState("");

  useEffect(() => {
    dispatch(getDataCourses(idCampaign));
  }, []);

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
            Content Management POC
          </h3>
        </div>

        {/* seccion de filtros  */}
        <div className="my-6 flex  flex-col sm:flex-row   justify-between ">
          <div className="flex flex-col sm:flex-row ">
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
            className="  text-primaryPink font-medium text-sm mt-4 sm:mt-0  lg:mr-8  bg-white rounded-md px-2 md:px-3 py-2 hover:bg-primaryPink hover:text-white transition ease-in-out duration-150  "
          >
            New Course
          </button>
        </div>
        {/* BODY CONTAIN  */}
        <div className="my-6">
          {courses ? (
            <Courses courses={coursesList} handleOpen={handleOpen} />
          ) : (
            <p className="text-white"></p>
          )}
        </div>
      </div>
      {/* MODAL */}
      <Modal visible={showModal} onClose={() => {}}>
        <CreateCourse onClose={handleClose} typeAction={typeAction} />
      </Modal>
    </>
  );
};

export default POCContentManagement;
