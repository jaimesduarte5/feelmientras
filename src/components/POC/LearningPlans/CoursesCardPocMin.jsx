import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { checkedForm } from "../../../redux/POC/learningPlanSlice";

const CoursesCardPocMin = ({ course }) => {
  const dispatch = useDispatch();

  const { idCourse, nameCourse, checked, urlImgCourse } = course;

  return (
    <div
      className="flex h-12 rounded-md items-center  mb-1 shadow-lg hover:bg-opacity-50 transition-all ease-in-out duration-300"
      style={{
        backgroundImage: `url(${urlImgCourse})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="flex items-center flex-1 text-white">
        <label
          htmlFor={idCourse}
          className={`h-5 w-5 rounded-md border mx-4 cursor-pointer ${
            checked
              ? "bg-primaryPink border-white"
              : "bg-white border-primaryPink"
          }`}
        >
          <p />
          <input
            id={idCourse}
            type="checkbox"
            className="h-5 w-5 opacity-0"
            value={checked}
            onChange={() => dispatch(checkedForm(idCourse))}
          />
        </label>
        <p className="text-sm text-ellipsis w-40 overflow-hidden">
          {nameCourse}
        </p>
      </div>
      <div className="mr-4 h-5 w-5 bg-white rounded-md flex justify-center items-center">
        <div
          className={`h-3 w-3 rounded-full 
           
            ${course.private ? "bg-primaryPink" : "bg-green"}
           
          `}
        />
      </div>
    </div>
  );
};

export default CoursesCardPocMin;
