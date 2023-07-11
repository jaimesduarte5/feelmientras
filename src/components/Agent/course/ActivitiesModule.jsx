import React from "react";
import { CgImage } from "react-icons/cg";
import { MdOutlineLocalMovies, MdOutlineVideogameAsset } from "react-icons/md";
import { TbPackages } from "react-icons/tb";
import { VscFilePdf } from "react-icons/vsc";
import { BsCheck2Circle } from "react-icons/bs";

import { RotateSpinner } from "react-spinners-kit";

const ActivitiesModule = ({
  activities,
  activity,
  changeActivity,
  loadingUpTracks,
}) => {
  return (
    <div className="h-80 2xl:h-[35rem] w-full overflow-y-scroll">
      {activities?.map((act, index) => (
        <button
          className={`m-1 w-[calc(100%-10px)]  text-white  flex  items-center  rounded-md p-2 bg-bg-primaryDark hover:bg-secondaryDark 
  ${act?.idActivity === activity?.idActivity ? "bg-secondaryDark " : ""}`}
          key={index}
          onClick={() => changeActivity(act, index)}
          disabled={
            index === 0 || act.progressLastActtivity === 100 || act.available
              ? false
              : true
          }
        >
          <div
            className={`flex flex-col items-center justify-around ${
              act.progressLastActtivity === 100 || index === 0
                ? "text-white "
                : "text-[#858181]"
            }`}
          >
            <p
              className={`
                          px-2 py-0 text-[10px] rounded-lg mb-1
                          ${
                            act.progressLastActtivity === 100 || index === 0
                              ? "bg-primaryPink "
                              : "bg-primaryPurple"
                          }
                          `}
            >
              {index + 1}
            </p>
            {act.typeContent === 1 && <MdOutlineLocalMovies />}
            {act.typeContent === 2 && <CgImage />}
            {act.typeContent === 3 && <VscFilePdf />}
            {act.typeContent === 4 && <TbPackages />}
            {act.typeContent === 5 && <MdOutlineVideogameAsset />}
          </div>

          <div
            className={`text-left  flex-1 overflow-hidden
      ${
        act.progressLastActtivity === 100 || index === 0
          ? "text-white "
          : "text-[#858181]"
      }   
      
      `}
          >
            <p className="ml-2 text-sm  ">{act.nameActivity}</p>
            <p className="ml-2 text-xs ">{act.descActivity}</p>
          </div>

          {act.progressActivity === 100 ? (
            <BsCheck2Circle className="text-primaryPink" />
          ) : (
            loadingUpTracks &&
            act?.idActivity === activity?.idActivity && (
              <RotateSpinner size={14} color="#FF0082" />
            )
          )}
        </button>
      ))}
    </div>
  );
};

export default ActivitiesModule;
