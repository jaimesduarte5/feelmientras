import React from "react";
import { useDispatch } from "react-redux";
import { checkedCourse } from "../../../redux/POC/assignmentSlice";

const CourseCardPoc = ({ course, check }) => {
  const dispatch = useDispatch();
  return (
    <div
      className="flex h-20 rounded-md  items-center  mb-4 shadow-lg hover:bg-opacity-50 transition-all ease-in-out duration-300"
      style={{
        backgroundImage: `url(${course.urlImgCourse})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex items-center flex-1 ">
        {check && (
          <>
            <label htmlFor={course.idCourse}>
              <p
                className={`h-7 w-7 rounded-md border mx-4 cursor-pointer 
			${
        course.checked
          ? "bg-primaryPink border-white"
          : "bg-white border-primaryPink"
      }`}
              />
            </label>
            <input
              id={course.idCourse}
              type="checkbox"
              className="hidden"
              value={course.checked}
              onChange={() => dispatch(checkedCourse(course.idCourse))}
            />
          </>
        )}
        <p className=" ml-4 text-sm text-white">{course.nameCourse} </p>
      </div>

      <div className="mr-4 h-7 w-7 bg-white rounded-md flex justify-center items-center">
        <div
          className={`h-4 w-4 rounded-full 
         
          ${course.IsPrivate ? "bg-primaryPink" : "bg-green"}
         
        `}
        />
      </div>
    </div>
  );
};

export default CourseCardPoc;
