import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { clearConfirmation, fullLoadingOn } from "../../redux/alertsSlice";
import { assignmentLPC } from "../../redux/POC/assignmentSlice";
import { createLPs, updateLPs } from "../../redux/POC/learningPlanSlice";
import { createWave, updateFormWave } from "../../redux/POC/waveFormSlice";
import {
  createMeet,
  deleteMeet,
  updateMeet,
} from "../../redux/POC/meetingSlice";
import {
  createCamp,
  updateCamp,
} from "../../redux/SuperAdmin/campContentSlice";

import {
  createCourses,
  deleteCourses,
  sendCourseEdit,
} from "../../redux/SuperAdmin/cousesManageSlice";

import { createUser, deleteUser, updateUser } from "../../redux/usersFormSlice";
import {
  createViewer,
  editViewer,
} from "../../redux/SuperAdmin/userManagementSlice";

const Alerts = () => {
  const dispatch = useDispatch();
  const { confirmation } = useSelector((state) => state.alerts);
  const handleNo = () => {
    dispatch(clearConfirmation());
  };
  const handleYes = () => {
    dispatcherTag(confirmation.tag);
    dispatch(clearConfirmation());
  };
  //"createUsers"
  const dispatcherTag = (tag) => {
    dispatch(fullLoadingOn());
    if (tag === "createUsers") {
      dispatch(createUser(confirmation.data));
    } else if (tag === "updateUser") {
      dispatch(updateUser(confirmation.data));
    } else if (tag === "delUserADM") {
      dispatch(deleteUser(confirmation.data));
    } else if (tag === "createCampaign") {
      dispatch(createCamp(confirmation.data));
    } else if (tag === "updateCampaign") {
      dispatch(updateCamp(confirmation.data));
    } else if (tag === "createCourse") {
      dispatch(createCourses(confirmation.data));
    } else if (tag === "sudeleteCourse") {
      dispatch(deleteCourses(confirmation.data));
    } else if (tag === "editCourse") {
      dispatch(sendCourseEdit(confirmation.data));
    } else if (tag === "createMeeting") {
      dispatch(createMeet(confirmation.data));
    } else if (tag === "deleteMeeting") {
      dispatch(deleteMeet(confirmation.data));
    } else if (tag === "editMeeting") {
      dispatch(updateMeet(confirmation.data));
    } else if (tag === "createLPPoc") {
      dispatch(createLPs(confirmation.data));
    } else if (tag === "updateLPPoc") {
      dispatch(updateLPs(confirmation.data));
    } else if (tag === "createWave") {
      dispatch(createWave(confirmation.data));
    } else if (tag === "updateWave") {
      dispatch(updateFormWave(confirmation.data));
    } else if (tag === "assignLPCPoc") {
      dispatch(assignmentLPC(confirmation.data));
    } else if (tag === "createViewer") {
      dispatch(createViewer(confirmation.data));
    } else if (tag === "editViewer") {
      dispatch(editViewer(confirmation.data));
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-secondaryDark bg-opacity-40 justify-center items-center z-50 flex`}
      id="wrapper"
    >
      <div className=" flex flex-col w-80 md:w-96 bg-primaryDark  rounded-md p-4 text-center">
        <p className="text-primaryPink text-xl font-semibold my-8">
          {confirmation.title}
        </p>
        <p className="text-white ">{confirmation.msj}</p>

        <div className="w-full flex justify-around my-8">
          <button
            className="text-primaryPink font-bold bg-white py-1 px-6 rounded-md hover:bg-primaryPink hover:text-white hover:scale-[1.02] transition-all ease-in-out duration-200 "
            onClick={handleYes}
          >
            YES
          </button>
          <button
            className="text-primaryPink font-bold bg-white py-1 px-6 rounded-md hover:bg-primaryPink hover:text-white hover:scale-[1.02] transition-all ease-in-out duration-200 "
            onClick={handleNo}
          >
            NO
          </button>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
