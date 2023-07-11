import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { CgImage } from "react-icons/cg";
import { FiEye, FiTrash2 } from "react-icons/fi";
import { deleteActivity } from "../../../redux/SuperAdmin/cousesManageSlice";
import { MdOutlineLocalMovies, MdOutlineVideogameAsset } from "react-icons/md";
import { TbPackages } from "react-icons/tb";
import { VscFilePdf } from "react-icons/vsc";
import { FaPager } from "react-icons/fa";

const ActivityCard = ({ activity, typeAction }) => {
  const { newCourse } = useSelector((state) => state.courses);
  const dispatch = useDispatch();
  const { nameActivity, descActivity, typeContent, urlActivity } = activity;

  const handleDelete = () => {
    dispatch(deleteActivity({ activity, newCourse, typeAction }));
  };

  return (
    <div className="w-full bg-primaryDark rounded-md mb-2 flex  p-2 ">
      <div className="text-left flex-1">
        <p className="text-primaryPink text-lg ">{nameActivity}</p>
        <p className="text-white text-xs my-1">{descActivity}</p>
        <p className="text-white text-xs">
          {typeContent === 1 && <MdOutlineLocalMovies size={20} />}
          {typeContent === 2 && <CgImage size={17} />}
          {typeContent === 3 && <VscFilePdf size={20} />}
          {typeContent === 4 && <TbPackages size={20} />}
          {typeContent === 5 && <MdOutlineVideogameAsset size={17} />}
          {typeContent === 6 && <FaPager size={17} />}
        </p>
      </div>
      <div className="flex items-center">
        <div className="w-20 text-right flex items-center">
          <div className="text-primaryPink mr-2 w-7 bg-white border-primaryPink border hover:border-white hover:bg-primaryPink hover:text-white focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-1 py-1 ">
            <a href={urlActivity} target="blank">
              <FiEye size={18} />
            </a>
          </div>
          <button
            className="text-primaryPink bg-white border-primaryPink border hover:border-white hover:bg-primaryPink hover:text-white focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-1 py-1 
            "
            data-bs-toggle="tooltip"
            data-bs-html="true"
            title="This action is irreversible!"
            onClick={() => handleDelete()}
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActivityCard;
