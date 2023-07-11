import React from "react";
import { useDispatch } from "react-redux";
import { checkedLPs } from "../../../redux/POC/assignmentSlice";

const LearningPlanCard = ({ lp }) => {
	const dispatch = useDispatch();

	return (
		<div className="flex h-20 rounded-md bg-primaryPurple items-center  mb-4 shadow-lg hover:bg-opacity-50 transition-all ease-in-out duration-300">
			<div className="flex items-center flex-1 text-white">
				<label htmlFor={lp.nameLearningPlan}>
					<p
						className={`h-7 w-7 rounded-md border mx-4 cursor-pointer ${
							lp.checked
								? "bg-primaryPink border-white"
								: "bg-white border-primaryPink"
						}`}
					/>
				</label>
				<input
					id={lp.nameLearningPlan}
					type="checkbox"
					className="hidden"
					value={lp.checked}
					onChange={() => dispatch(checkedLPs(lp.idLearningPlan))}
				/>
				<p>{lp.nameLearningPlan}</p>
			</div>
		</div>
	);
};

export default LearningPlanCard;
