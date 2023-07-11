import React from "react";
import { FiEdit3, FiTrash } from "react-icons/fi";
import bgMeet from "../../../assets/img/courses/bg-c1.png";
import { useDispatch } from "react-redux";

import { showConfirmation } from "../../../redux/alertsSlice";
import { editMeet } from "../../../redux/POC/meetingSlice";

const MeetingCard = ({ meeting, handleOpen }) => {
  const dispatch = useDispatch();
  const { urlImgMeet, meetName, dateMeet, hourIniMeet, hourEndMeet } = meeting;

  const handleDelete = () => {
    dispatch(
      showConfirmation({
        data: meeting,
        title: "Action Validation",
        msj: "Are you sure you want delete this Meeting?",
        tag: "deleteMeeting",
      })
    );
  };

  const handleEdit = () => {
    handleOpen();
    dispatch(editMeet(meeting));
  };

  return (
    <div
      className="h-20 min-h-min mb-3 bg-white rounded-md shadow-md flex justify-between items-center px-4 cursor-pointer  hover:shadow-xl  transition-all ease-in-out duration-300 "
      style={{
        backgroundImage: `url(${urlImgMeet || bgMeet})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div>
        <p className="font-semibold text-sm text-white ">
          {meetName.toUpperCase()}
        </p>
        <p className="text-[10px] text-white ">{dateMeet.substr(0, 10)}</p>
        <p className="text-[10px] text-white">
          {hourIniMeet} to {hourEndMeet}
        </p>
      </div>

      <div>
        <button
          className="text-primaryPink mr-2 bg-white border-primaryPink border hover:border-white hover:bg-primaryPink hover:text-white focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-1 py-1 "
          onClick={handleEdit}
        >
          <FiEdit3 size={18} />
        </button>
        <button
          className="text-primaryPink mr-2 bg-white border-primaryPink border hover:border-white hover:bg-primaryPink hover:text-white focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-1 py-1 "
          onClick={handleDelete}
        >
          <FiTrash size={18} />
        </button>
      </div>
    </div>
  );
};

export default MeetingCard;
