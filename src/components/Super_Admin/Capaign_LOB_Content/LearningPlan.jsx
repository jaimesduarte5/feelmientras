import { useDispatch, useSelector } from "react-redux";
import { viewLP } from "../../../redux/SuperAdmin/campContentSlice";
import Card from "../Card";

const LearningPlan = () => {
	const { courses, learningPlan, viewCard } = useSelector(
		(state) => state.campaigns
	);
	const dispatch = useDispatch();
	return (
		<div className="bg-primaryDark bg-opacity-75 rounded-lg p-2 ">
			{/* BUTTONS */}
			<div className="h-16 flex justify-between items-center">
				<button
					onClick={() => dispatch(viewLP("learning"))}
					className={`${
						viewCard === "learning"
							? "bg-white text-primaryPink rounded-md px-3 py-1 font-medium"
							: " text-white font-medium bg-primaryDark rounded-md px-3 py-1 hover:bg-white hover:text-primaryPink transition ease-in-out delay-75 "
					}`}
				>
					Learning Plan
				</button>
				<button
					onClick={() => dispatch(viewLP("course"))}
					className={`${
						viewCard === "course"
							? "bg-white text-primaryPink rounded-md px-3 py-1 font-medium"
							: " text-white font-medium bg-primaryDark rounded-md px-3 py-1 hover:bg-white hover:text-primaryPink transition ease-in-out delay-75 "
					}`}
				>
					Courses
				</button>
			</div>
			{/* COTENIDO DE TARJETAS */}
			<div className="overflow-y-scroll  pr-2 h-96 2xl:h-128">
				{viewCard === "course"
					? courses.map((course, index) => (
							<>
								{/* pasar data y type */}
								<Card
									key={
										course.idCourse + index + "card Course" + course.nameCourse
									}
									data={{
										name: course.nameCourse,
										id: course.idCourse,
										active: course.active,
									}}
									type={"disabled"}
								/>
							</>
					  ))
					: learningPlan.map((lp, index) => (
							<>
								{/* pasar data y type */}
								<Card
									key={
										lp.nameLearninPlan + lp.idLearningPlan + "card LP" + index
									}
									data={{
										name: lp.nameLearninPlan,
										id: lp.idLearningPlan,
										active: lp.active,
									}}
									type={"learningPlan"}
								/>
							</>
					  ))}
			</div>
		</div>
	);
};

export default LearningPlan;
