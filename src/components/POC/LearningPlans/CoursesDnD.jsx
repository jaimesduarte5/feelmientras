import React from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fullLoadingOn } from "../../../redux/alertsSlice";
import { coursesOrder } from "../../../redux/POC/learningPlanSlice";
import CourseCarPoc from "./CourseCardPoc";
import CoursesCardPocMin from "./CoursesCardPocMin";

const reorder = (list, startIndex, endIndex) => {
	const result = [...list];
	const [removed] = result.splice(startIndex, 1);
	result.splice(endIndex, 0, removed);
	return result;
};

const CoursesDnD = () => {
	const dispatch = useDispatch();
	const { dataCourses, changeOrder } = useSelector((state) => state.learningP);
	return (
		<>
			{!changeOrder && dataCourses.length > 0 && (
				<p className="text-white font-bold">
					Try moving the cards around to arrange the order of the courses.{" "}
				</p>
			)}
			<DragDropContext
				onDragEnd={(result) => {
					const { destination, source } = result;
					if (!destination) {
						return;
					}
					if (
						source.index === destination.index &&
						source.droppableId === destination.droppableId
					) {
						return;
					}
					const dataOrder = reorder(
						dataCourses,
						source.index,
						destination.index
					);

					dispatch(coursesOrder(dataOrder));
				}}
			>
				<Droppable droppableId="courses">
					{(provided) => (
						<div
							{...provided.droppableProps}
							ref={provided.innerRef}
							className="m-2 overflow-y-scroll custom-scroll pr-2 h-96 2xl:h-128 "
						>
							{dataCourses.map((course, index) => (
								<Draggable
									key={course?.idCourse}
									draggableId={course.idCourse.toString()}
									index={index}
								>
									{(provided) => (
										<div
											{...provided.draggableProps}
											{...provided.dragHandleProps}
											ref={provided.innerRef}
										>
											<CourseCarPoc course={course} />
										</div>
									)}
								</Draggable>
							))}
							{provided.placeholder}
						</div>
					)}
				</Droppable>
			</DragDropContext>
		</>
	);
};

export default CoursesDnD;
