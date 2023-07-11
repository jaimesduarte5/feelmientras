import React, { useState } from "react";
import { ImSearch } from "react-icons/im";
import CourseCarPoc from "../../components/POC/LearningPlans/CourseCardPoc";
import LPCard from "../../components/POC/LearningPlans/LPCard";
import Modal from "../../components/Modals/Modal";
import { courses } from "../../temp/courses";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import CoursesDnD from "../../components/POC/LearningPlans/CoursesDnD";
import CreateLearningPlan from "../../components/POC/LearningPlans/CreateLearningPlan";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  cancelOrder,
  lpInitData,
  resetLPForm,
  searchLPs,
  updateLPs,
  viewLPModal,
} from "../../redux/POC/learningPlanSlice";
import { useEffect } from "react";
import { fullLoadingOn } from "../../redux/alertsSlice";

const POCLearningPlan = () => {
  const dispatch = useDispatch();
  const {
    tempDbLPs,
    showModal,
    dataCourses,
    lpSelected,
    changeOrder,
    lpSearch,
  } = useSelector((state) => state.learningP);
  const { userData } = useSelector((state) => state.login);

  // Funcion para mostrar el modal
  const handleOpen = (type, dataCourse) => {
    dispatch(viewLPModal());
  };
  // Funcion para ocultar el modal
  const handleClose = () => {
    dispatch(resetLPForm());
  };

  const handleSubmit = () => {
    const courses = dataCourses.map((el, index) => {
      return [el.idCourse, index + 1];
    });
    const body = {
      data: {
        nameLP: lpSelected.nameLearningPlan,
        descLP: lpSelected.descriptionLearningPlan,
        idCampaign: userData.idCampaign,
        idLob: userData.idLob,
        idLP: lpSelected.idLearningPlan,
        context: 1,
        coursesInfo: courses,
      },
      rfsh: { idCampaign: userData.idCampaign, idLob: userData.idLob },
    };
    dispatch(fullLoadingOn());
    dispatch(updateLPs(body));
  };
  useEffect(() => {
    dispatch(fullLoadingOn());
    dispatch(
      lpInitData({ idCampaign: userData.idCampaign, idLob: userData.idLob })
    );
  }, []);

  return (
    <div className="w-full min-h-full bg-primaryDark bg-opacity-75 rounded-lg p-4">
      {/* cabecera  */}
      <div>
        <h3 className="text-primaryPink font-medium text-2xl mb-4 ">
          Learning Plan
        </h3>
      </div>
      {/* Contenido */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="w.full bg-primaryDark rounded-md p-4 bg-opacity-90">
          {/* button and search */}
          <div className="flex flex-col md:flex-row justify-between p-2">
            <button
              onClick={() => handleOpen()}
              className="w-full md:w-auto mb-4 md:mb-0  text-primaryPink font-medium bg-white rounded-md px-3 py-1 hover:bg-primaryPink hover:text-white transition ease-in-out duration-150 "
            >
              New Learning Plan
            </button>
            <form>
              <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">
                Search
              </label>
              <div className="relative">
                <input
                  className="block p-2 pl-4 w-full text-sm  rounded-lg border  focus:ring-primaryPink focus:border-primaryDark dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search..."
                  value={lpSearch}
                  onChange={(e) =>
                    dispatch(searchLPs(e.target.value.toString().toLowerCase()))
                  }
                />
                <button
                  type="submit"
                  disabled
                  className=" absolute right-2.5 bottom-1 hover:bg-primaryDark hover:bg-opacity-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <ImSearch className="text-primaryPink" />
                </button>
              </div>
            </form>
          </div>
          {/* Learning Plan Container */}

          <div className="m-2 overflow-y-scroll custom-scroll pr-2 h-96 2xl:h-128 ">
            {tempDbLPs.map((plan) => (
              <LPCard key={plan.idLearningPlan} lp={plan} />
            ))}
          </div>
        </div>
        <div className="w.full bg-primaryDark rounded-md p-4 bg-opacity-90">
          <CoursesDnD />
          <div className="text-right">
            {changeOrder ? (
              <>
                <button
                  onClick={() => dispatch(cancelOrder())}
                  className="mr-5 py-2 px-6 text-white font-bold bg-gradient-to-t from-primaryPink to-primaryPurple rounded-md hover:scale-95 transition-all ease-in-out duration-150  hover:shadow hover:shadow-primaryPink"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  className="mr-5 py-2 px-6 text-white font-bold bg-gradient-to-t from-primaryPink to-primaryPurple rounded-md hover:scale-95 transition-all ease-in-out duration-150  hover:shadow hover:shadow-primaryPink"
                >
                  Re-order
                </button>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      {/* MODAL */}
      <Modal visible={showModal} onClose={() => {}}>
        <CreateLearningPlan onClose={handleClose} courses={courses} />
      </Modal>
    </div>
  );
};

export default POCLearningPlan;
