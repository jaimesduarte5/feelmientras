import React, { useEffect, useState } from "react";
import { ImSearch } from "react-icons/im";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import LearningPlanCard from "../../components/POC/Assignement/LearningPlanCard";
import WaveCard from "../../components/POC/Assignement/WaveCard";
import CourseCarPoc from "../../components/POC/LearningPlans/CourseCardPoc";
import { valAssignChanges } from "../../helpers/assignmentHelper";
import {
  fullLoadingOn,
  showConfirmation,
  showToast,
} from "../../redux/alertsSlice";
import {
  assignInitialData,
  changeTypeAssign,
  searchLPCAssign,
  searchWaveAssign,
} from "../../redux/POC/assignmentSlice";

const POCCoursesManagement = () => {
  const dispatch = useDispatch();
  const {
    tempWaves,
    tempCourses,
    tempLearningPlan,
    type,
    searchWave,
    searchCLP,
    waves,
    courses,
    learningPlan,
    dbCourses,
    dbLearningPlan,
  } = useSelector((state) => state.assignment);
  const { userData } = useSelector((state) => state.login);
  const handleSubmit = (e) => {
    e.preventDefault();
    const idWave = waves.filter((wave) => wave.selected);
    const cInfo = courses.filter((course) => course.checked);
    const lpsInfo = learningPlan.filter((lp) => lp.checked);
    const cDB = dbCourses.filter((course) => course.checked);
    const lpsDB = dbLearningPlan.filter((lp) => lp.checked);
    const assignmentInfo = valAssignChanges(cInfo, lpsInfo, cDB, lpsDB);
    if (assignmentInfo.error) {
      dispatch(
        showToast({
          type: "warning",
          title: "Check the Assign",
          msj: assignmentInfo.error,
          show: true,
          duration: 4000,
        })
      );
    } else {
      const body = {
        initData: {
          idCampaign: userData.idCampaign,
          idLob: userData.idLob,
        },
        body: {
          idWave: idWave[0].idwave,
          assignmentInfo,
        },
      };
      dispatch(
        showConfirmation({
          data: body, //aqui va la datauser y el body
          title: "Assignment LPC",
          msj: "Are you sure you want to assign the LPCs?",
          tag: "assignLPCPoc",
        })
      );
    }
  };

  useEffect(() => {
    dispatch(fullLoadingOn());
    dispatch(
      assignInitialData({
        idCampaign: userData.idCampaign,
        idLob: userData.idLob,
      })
    );
  }, []);

  return (
    <div className="w-full min-h-full bg-primaryDark bg-opacity-75 rounded-lg p-4">
      {/* cabecera  */}
      <div>
        <h3 className="text-primaryPink font-medium text-2xl mb-4 ">
          Assignement, Edit Course and Learning Plans
        </h3>
      </div>
      {/* Contenido */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="w.full bg-primaryDark rounded-md p-4 bg-opacity-90">
          {/*Search Wave */}
          <div className="flex justify-end p-2">
            <form>
              <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">
                Search
              </label>
              <div className="relative">
                <input
                  className="block p-2 pl-4 w-full text-sm  rounded-lg border  focus:ring-primaryPink focus:border-primaryDark dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search Wave..."
                  value={searchWave}
                  onChange={(e) => dispatch(searchWaveAssign(e.target.value))}
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

          {/* Wave container */}
          <div className="m-2 overflow-y-scroll custom-scroll pr-2 h-96 2xl:h-128 ">
            {tempWaves.map((wave) => (
              <WaveCard key={wave.namewave} wave={wave} />
            ))}
          </div>
        </div>
        <div className="w.full bg-primaryDark rounded-md p-4 bg-opacity-90">
          {/* buttons and search */}
          <div className="flex justify-between flex-col md:flex-row p-2">
            <div className="flex">
              <button
                onClick={() => dispatch(changeTypeAssign("courses"))}
                className={`w-full md:w-28 md:mr-4  mb-4 md:mb-0   font-medium  rounded-md px-3 py-1 
                hover:bg-primaryPink hover:text-white transition ease-in-out duration-150
                ${
                  type === "courses"
                    ? "text-white bg-primaryPink"
                    : "text-primaryPink bg-white"
                }
                `}
              >
                Courses
              </button>
              <button
                onClick={() => dispatch(changeTypeAssign("learningPlan"))}
                className={`w-full md:w-40 md:mr-4  mb-4 md:mb-0   font-medium  rounded-md px-3 py-1 
                hover:bg-primaryPink hover:text-white transition ease-in-out duration-150
                ${
                  type === "learningPlan"
                    ? "text-white bg-primaryPink"
                    : "text-primaryPink bg-white"
                }
                `}
              >
                Learning Plan
              </button>
            </div>
            <div className="relative">
              <input
                className="block px-2 py-1.5 pl-4 w-full text-sm  rounded-lg border  focus:ring-primaryPink focus:border-primaryDark dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={
                  type === "courses" ? "Search Course..." : "Search LP..."
                }
                value={searchCLP}
                onChange={(e) => dispatch(searchLPCAssign(e.target.value))}
              />
              <button
                type="submit"
                disabled
                className=" absolute right-2.5 bottom-1 hover:bg-primaryDark hover:bg-opacity-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <ImSearch className="text-primaryPink" />
              </button>
            </div>
          </div>{" "}
          <div className="m-2 overflow-y-scroll custom-scroll pr-2 h-96 2xl:h-128 ">
            {type === "courses" ? (
              <>
                {tempCourses.map((course) => (
                  <CourseCarPoc
                    key={course.idCourse}
                    course={course}
                    check={true}
                  />
                ))}
              </>
            ) : (
              <>
                {tempLearningPlan.map((plan) => (
                  <LearningPlanCard key={plan.idLearningPlan} lp={plan} />
                ))}
              </>
            )}
          </div>
          <div className="text-right">
            <button
              onClick={(e) => handleSubmit(e)}
              className="mr-5 py-2 px-6 text-white font-bold bg-gradient-to-t from-primaryPink to-primaryPurple rounded-md hover:scale-95 transition-all ease-in-out duration-150  hover:shadow hover:shadow-primaryPink"
            >
              Assignement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default POCCoursesManagement;
