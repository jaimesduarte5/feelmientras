import React from "react";
import { CgImage } from "react-icons/cg";
import { MdOutlineLocalMovies, MdOutlineVideogameAsset } from "react-icons/md";
import { TbPackages } from "react-icons/tb";
import { VscFilePdf } from "react-icons/vsc";

const ActivitiesModule = ({ activities, activity, changeActivity }) => {
  return (
    <div className="h-80 2xl:h-[35rem] w-full overflow-y-scroll">
      {activities?.map((act, index) => (
        <button
          className={`m-1 w-[calc(100%-10px)]  text-white  flex  items-center  rounded-md p-2 bg-bg-primaryDark hover:bg-secondaryDark 
  ${act?.idActivity === activity?.idActivity ? "bg-secondaryDark " : ""}`}
          key={index}
          onClick={() => changeActivity(act, index)}
        >
          <div
            className={`flex flex-col items-center justify-around text-white `}
          >
            <p
              className={`
              px-2 py-0 text-[10px] rounded-md mb-1 bg-primaryPink`}
            >
              {index + 1}
            </p>
            {act.typeContent === 1 && <MdOutlineLocalMovies />}
            {act.typeContent === 2 && <CgImage />}
            {act.typeContent === 3 && <VscFilePdf />}
            {act.typeContent === 4 && <TbPackages />}
            {act.typeContent === 5 && <MdOutlineVideogameAsset />}
          </div>

          <div className={`text-left  flex-1 overflow-hidden text-white `}>
            <p className="ml-2 text-sm  ">{act.nameActivity}</p>
            <p className="ml-2 text-xs ">{act.descActivity}</p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default ActivitiesModule;
