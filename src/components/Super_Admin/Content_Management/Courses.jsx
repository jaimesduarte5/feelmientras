import React from "react";
import Course from "./Course";

const Courses = ({ courses, handleOpen }) => {
  return (
    <div className="w-full overflow-y-scroll custom-scroll h-screen p-2 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-8">
        {courses?.map((course) => (
          <Course
            key={course.idCourse}
            course={course}
            handleOpen={handleOpen}
          />
        ))}
      </div>
    </div>
  );
};

export default Courses;
