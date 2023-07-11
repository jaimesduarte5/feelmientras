import React from "react";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import {
  lobSelected,
  newLobCard,
} from "../../redux/SuperAdmin/campContentSlice";

const LobCardDesc = ({ lobName, action, setEdit }) => {
  const dispatch = useDispatch();
  const handleEdit = (name) => {
    setEdit(true);
  };

  return (
    <div className="flex justify-between items-center bg-primaryDark px-5 py-2 rounded-md mr-1 mb-2">
      <div>
        <p className="text-white font-light text-xs">{lobName}</p>
      </div>
      <div className="flex justify-between items-center ">
        <button
          onClick={() => {
            handleEdit();
            dispatch(lobSelected(lobName));
          }}
          className="text-primaryPink bg-white p-1  mr-2 rounded-md hover:bg-primaryPink hover:text-white transition ease-in-out delay-75"
        >
          <FiEdit3 size={18} />
        </button>

        <button
          className="text-primaryPink bg-white p-1 rounded-md hover:bg-primaryPink hover:text-white transition ease-in-out delay-75"
          onClick={() => dispatch(newLobCard({ act: "delete", name: lobName }))}
        >
          <FiTrash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default LobCardDesc;
