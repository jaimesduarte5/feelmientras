import React from "react";
import { useSelector } from "react-redux";
import Card from "../Card";

const CourseAndLearning = () => {
	const { learningPlanCourses } = useSelector((state) => state.campaigns);
	return (
		<div className="bg-primaryDark bg-opacity-75 rounded-lg p-2 ">
			{/* BUTTONS */}
			<div className="h-16 flex justify-center items-center">
				<h3 className="text-primaryPink font-medium text-lg">
					Courses in Learning Planes
				</h3>
			</div>
			{/* COTENIDO DE TARJETAS */}
			<div className="overflow-y-scroll  pr-2 h-96 2xl:h-128">
				{/* pasar data y type */}
				{learningPlanCourses.map((course, index) => (
					<Card
						key={course.nameCourse + course.idCourse + index + "card"}
						data={{
							name: course.nameCourse,
							id: course.idCourse,
							active: course.active,
						}}
						type={"disabled"}
					/>
				))}
			</div>
		</div>
	);
};

export default CourseAndLearning;
