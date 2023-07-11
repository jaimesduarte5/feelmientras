import React from "react";
import { Collapse } from "react-collapse";
import { SlArrowUp, SlArrowDown } from "react-icons/sl";
import CourseViewerCard from "./CourseViewerCard";

const AcordeonViewerItem = ({ open, toggle, plan }) => {
	const { nameLearningPlan, courses, idLp } = plan;

	return (
		<div className="pt-3">
			<div
				className="bg-white bg-opacity-[0.01] rounded-lg py-6 px-12 flex justify-between items-center cursor-pointer text-white"
				onClick={toggle}
			>
				<p className="font-bold ">{nameLearningPlan}</p>
				<div>{open ? <SlArrowUp size={30} /> : <SlArrowDown size={30} />}</div>
			</div>
			<Collapse isOpened={open}>
				{courses.map((course, index) => (
					<CourseViewerCard
						course={course}
						idLp={idLp}
						key={course.idCourse}
						indice={index}
					/>
				))}
			</Collapse>
		</div>
	);
};

export default AcordeonViewerItem;
