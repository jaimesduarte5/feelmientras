import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RotateSpinner } from "react-spinners-kit";
import AcordeonItem from "../../components/Acordeon/AcordeonItem";
import CourseAgentCard from "../../components/Agent/CourseAgentCard";
import { fechaYMD } from "../../helpers/dateHelper";
import { resetCourse } from "../../redux/POC/contentManagePocSlice";
import {
  clearEvent,
  getDataAssignment,
  postAgentTrackEvents,
} from "../../redux/User/coursesAgentSlice";
import bgNotCourses from "../../assets/img/courses/notCourses.png";

const MyActivities = () => {
  const dispatch = useDispatch();
  const { isLoading, learningPlans, courses } = useSelector(
    (state) => state.agentLearning
  );
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(getDataAssignment(1));
    dispatch(getDataAssignment(2));
    dispatch(clearEvent());
    dispatch(resetCourse());
  }, []);

  //Manejo de la visualizacion del acordeon
  const toggle = (index, plan) => {
    if (open === index) {
      return setOpen(null);
    }

    dispatch(
      postAgentTrackEvents({
        idActivity: plan.idLp,
        dateOpen: fechaYMD(),
        timeToActivity: "",
        typeConten: "",
        progress: plan.advanceLp,
        timeVideo: "",
        timeView: "",
        context: 1,
        views: plan.ViewsLp,
        idEvent: 5,
        evento: "Evento de visualizacion de Learning Plan",
      })
    );
    setOpen(index);
  };

  return (
    <div className="w-full bg-primaryDark bg-opacity-75 min-h-full rounded-lg p-4">
      {/* cabecera  */}
      <div>
        <h3 className="text-white font-medium text-2xl">My Learning Plans</h3>
      </div>

      {isLoading ? (
        <div className="w-full h-56 flex justify-center items-center">
          <RotateSpinner size={60} color="#FF0082" />
        </div>
      ) : (
        <>
          {/* Learning plan Section  */}
          {learningPlans.length > 0 ? (
            learningPlans.map((plan, index) => (
              <AcordeonItem
                key={index}
                open={index === open}
                toggle={() => toggle(index, plan)}
                plan={plan}
              />
            ))
          ) : (
            <div
              className="bg-no-repeat bg-contain  h-56 w-full bg-center flex justify-center items-center"
              style={{ backgroundImage: `url(${bgNotCourses})` }}
            >
              <p className="text-white p-2 md:font-bold">
                You don't have Learning Plans assigned yet!
              </p>
            </div>
          )}
          {/* Courses Section  */}
          <div>
            <h3 className="text-white my-4 font-medium text-2xl">My Courses</h3>
          </div>

          {courses && courses[0]?.idCourse === 0 ? (
            <div
              className="bg-no-repeat bg-contain  h-56 w-full bg-center flex justify-center items-center"
              style={{ backgroundImage: `url(${bgNotCourses})` }}
            >
              <p className="text-white p-2 md:font-bold">
                You don't have courses assigned yet!
              </p>
            </div>
          ) : (
            courses?.map((course) => (
              <CourseAgentCard course={course} key={course.idCourse} />
            ))
          )}
        </>
      )}
    </div>
  );
};

export default MyActivities;
