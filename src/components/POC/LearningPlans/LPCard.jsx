import React from "react";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { showConfirmation } from "../../../redux/alertsSlice";
import {
	editLP,
	selectLP,
	viewLPModal,
} from "../../../redux/POC/learningPlanSlice";

const LPCard = ({ lp }) => {
	const dispatch = useDispatch();
	const { dbFormCourses } = useSelector((state) => state.learningP);
	const { userData } = useSelector((state) => state.login);
	const handleEdit = async () => {
		const hash = {};
		const lps = lp.courses.map((el) => {
			return { ...el, checked: true };
		});
		const data = lps.concat(dbFormCourses);
		let courses = data.filter(function (current) {
			let exists = !hash[current.idCourse];
			hash[current.idCourse] = true;
			return exists;
		});
		/* const courses = dbFormCourses.map((course) => {
			const ck = lp.courses.filter((el) => course.idCourse === el.idCourse);
			if (ck.length > 0) {
				return { ...course, checked: true };
			} else {
				return course;
			}
		}); */
		const form = {
			name: lp.nameLearningPlan,
			description: lp.descriptionLearningPlan,
			courses,
			idLP: lp.idLearningPlan,
		};
		dispatch(editLP(form));
	};

	const handleDelete = () => {
		const body = {
			data: {
				nameLP: lp.nameLearningPlan,
				descLP: lp.descriptionLearningPlan,
				idCampaign: userData.idCampaign,
				idLob: userData.idLob,
				idLP: lp.idLearningPlan,
				coursesInfo: [[0, 0]],
				context: 2,
			},
			rfsh: { idCampaign: userData.idCampaign, idLob: userData.idLob },
		};
		dispatch(
			showConfirmation({
				data: body,
				title: "Action Validation",
				msj: "Are you sure you want to perform this process?",
				tag: "updateLPPoc",
			})
		);
	};
	return (
		<div
			className="h-16 min-h-min mb-3 bg-white rounded-md shadow-md flex justify-between items-center px-4 cursor-pointer hover:bg-opacity-50 transition-all ease-in-out duration-300 "
			onClick={() => dispatch(selectLP(lp))}
		>
			<p className="font-semibold text-sm">{lp.nameLearningPlan}</p>
			<div>
				<button
					className="text-primaryPink mr-1 bg-white border-primaryPink border hover:border-white hover:bg-primaryPink hover:text-white focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-1 py-1 "
					onClick={handleEdit}
				>
					<FiEdit3 size={18} />
				</button>
				<button
					onClick={
						handleDelete
						/* setConfirmation({ status: true, params: row, act: "delete" }) */
					}
					className="text-primaryPink bg-white p-1 rounded-md hover:bg-primaryPink hover:text-white transition ease-in-out "
				>
					<FiTrash2 size={18} />
				</button>
			</div>
		</div>
	);
};

export default LPCard;
