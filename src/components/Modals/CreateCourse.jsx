import React, { useState } from "react";
import CreateCourseForm from "../Super_Admin/Content_Management/CreateCourseForm";
import CreateActivityForm from "../Super_Admin/Content_Management/CreateActivityForm";
import OrderActivity from "../Super_Admin/Content_Management/OrderActivity";
import { useDispatch, useSelector } from "react-redux";
import { showConfirmation } from "../../redux/alertsSlice";
import {
  cleanCourse,
  errorsValidation,
} from "../../redux/SuperAdmin/cousesManageSlice";
import { valCourse } from "../../helpers/courseHelper";

const CreateCourse = ({ onClose, typeAction }) => {
  const dispatch = useDispatch();
  const { newCourse } = useSelector((state) => state.courses);
  const [next, setNext] = useState(false);

  const handleNext = () => {
    const validate = valCourse(newCourse);
    if (validate.error) {
      dispatch(errorsValidation(validate.errorForm));
    }

    if (!validate.error) {
      dispatch(errorsValidation(validate.errorForm));
      setNext(true);
    }
  };

  //funcion para crear o editar un curso
  const actionCourse = () => {
    if (typeAction === "Create") {
      onClose();
      dispatch(
        showConfirmation({
          data: newCourse,
          title: "Action Validation",
          msj: "Are you sure you want to create this course?",
          tag: "createCourse",
        })
      );
    } else {
      //dispara la eliminacion de curso desde el redux
      onClose();
      dispatch(
        showConfirmation({
          data: newCourse,
          title: "Action Validation",
          msj: "Are you sure you want to edit this course?",
          tag: "editCourse",
        })
      );
    }
  };

  const handleClose = () => {
    if (typeAction === "Edit") {
      dispatch(cleanCourse());
    }
    onClose();
  };

  return (
    <div className="overflow-y-scroll h-screen sm:h-auto md:overflow-auto bg-primaryDark rounded-md px-8  pb-12 sm:pb-0 py-3">
      {/* Modal Title */}
      <div className="py-2 text-center ">
        <h3 className="text-primaryPink font-bold text-xl  w-full">
          {typeAction} Course
        </h3>
      </div>
      {/*Modal Body*/}
      <div className="grid gird-cols-1 sm:grid-cols-2">
        {/* Left Form  */}
        <CreateCourseForm />
        {/* Right Form  */}
        {next ? (
          <OrderActivity />
        ) : (
          <CreateActivityForm typeAction={typeAction} />
        )}
      </div>
      <div className="flex justify-between  mt-4 mb-16 lg:mb-4">
        <button
          onClick={handleClose}
          className="py-2 px-6 mr-8 text-primaryPink font-bold bg-white rounded-md hover:scale-95 transition-all ease-in-out duration-150 hover:shadow hover:shadow-primaryPink"
        >
          Close
        </button>
        <div>
          {next ? (
            <>
              <button
                className="py-2 w-32 px-6 mr-4 text-white font-bold bg-gradient-to-t from-primaryPink to-primaryPurple rounded-md hover:scale-95 transition-all ease-in-out duration-150  hover:shadow hover:shadow-primaryPink"
                onClick={() => setNext(false)}
              >
                Back
              </button>
              <button
                className="py-2 w-32  px-6 text-white font-bold bg-gradient-to-t from-primaryPink to-primaryPurple rounded-md hover:scale-95 transition-all ease-in-out duration-150  hover:shadow hover:shadow-primaryPink"
                onClick={actionCourse}
              >
                {typeAction}
              </button>
            </>
          ) : (
            <button
              className="py-2 px-6 w-32 text-white font-bold bg-gradient-to-t from-primaryPink to-primaryPurple rounded-md hover:scale-95 transition-all ease-in-out duration-150  hover:shadow hover:shadow-primaryPink"
              onClick={handleNext}
              // disabled={course.activities > 0 ? false : true}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
