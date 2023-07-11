import React from "react";
import { ImSearch } from "react-icons/im";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { showConfirmation } from "../../../redux/alertsSlice";
import {
	errorLPForm,
	formLPChanges,
	searchFormCourses,
} from "../../../redux/POC/learningPlanSlice";
import CreateLPDnD from "./CreateLPDnD";

const CreateLearningPlan = ({ onClose, courses }) => {
	const dispatch = useDispatch();
	const { form, editForm, errorForm, courseSearch } = useSelector(
		(state) => state.learningP
	);
	const { userData } = useSelector((state) => state.login);

	const handleSubmit = () => {
		const validate = formValidate(form);
		if (validate.error) {
			dispatch(errorLPForm(validate.errorForm));
		} else {
			const c = form.courses.filter((el) => el.checked);
			const courses = c.map((el, index) => {
				return [el.idCourse, index + 1];
			});
			const body = {
				data: {
					nameLP: form.name,
					descLP: form.description,
					idCampaign: userData.idCampaign,
					idLob: userData.idLob,
					coursesInfo: courses,
				},
				rfsh: { idCampaign: userData.idCampaign, idLob: userData.idLob },
			};
			//dispatch(fullLoadingOn());
			//dispatch(createLPs(body));
			dispatch(
				showConfirmation({
					data: body,
					title: "Action Validation",
					msj: "Are you sure you want to perform this process?",
					tag: "createLPPoc",
				})
			);
		}
	};

	const handleEdit = () => {
		const validate = formValidate(form);
		if (validate.error) {
			dispatch(errorLPForm(validate.errorForm));
		} else {
			const c = form.courses.filter((el) => el.checked);
			const coursesInfo = c.map((el, index) => {
				return [el.idCourse, index + 1];
			});
			const body = {
				data: {
					nameLP: form.name,
					descLP: form.description,
					idCampaign: userData.idCampaign,
					idLob: userData.idLob,
					idLP: form.idLP,
					context: 1,
					coursesInfo,
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
			//dispatch(updateLPs(body));
		}
	};

	const formValidate = (data) => {
		let errorForm = {
			name: { value: false, desc: "" },
			description: { value: false, desc: "" },
			courses: { value: false, desc: "" },
		};
		let error = false;
		const val = data.courses.filter((el) => el.checked);
		if (!data.name) {
			error = true;
			errorForm = {
				...errorForm,
				name: { value: true, desc: "Empty name value" },
			};
		}
		if (!data.description) {
			error = true;
			errorForm = {
				...errorForm,
				description: { value: true, desc: "Empty description value" },
			};
		}
		if (val.length === 0) {
			error = true;
			errorForm = {
				...errorForm,
				courses: { value: true, desc: "not selected any course" },
			};
		}
		return { errorForm, error };
	};

	return (
		<div className="h-auto  bg-primaryDark rounded-md px-8   py-3">
			{/* Modal Title */}
			<div className="py-2 text-center ">
				<h3 className="text-primaryPink font-bold text-xl  w-full">
					New Learning Plan
				</h3>
			</div>
			{/*Modal Body*/}
			<div className="">
				{/* Formulario */}
				{/* Name LP */}
				<div className="flex flex-col">
					<label
						htmlFor="learning-plan"
						className="block mb-1 text-sm font-medium text-white mt-3"
					>
						Learning Plan
					</label>
					<input
						id="learning-plan"
						type="text"
						name="nameLearningPlan"
						value={form.name}
						onChange={(e) =>
							dispatch(
								formLPChanges({
									tag: "name",
									value: e.target.value,
								})
							)
						}
						className={
							errorForm.name.value
								? "text-md rounded-lg focus:ring-green focus:border-green block w-full p-1.5 lg:p-2.5 text-primaryDark border-primaryPink border-2"
								: "border  text-md rounded-lg focus:ring-green focus:border-green block w-full p-1.5 lg:p-2.5"
						}
						placeholder="Name Learning Plan"
					/>
					{errorForm.name.value && (
						<p className="mt-2 text-sm text-primaryPink">
							<span className="font-medium">{errorForm.name.desc}</span>
						</p>
					)}
				</div>
				{/* Description LP */}
				<div className="flex flex-col">
					<label
						htmlFor="desc-learning-plan"
						className="block mb-1 text-sm font-medium text-white mt-3"
					>
						Description Learning Plan
					</label>
					<textarea
						id="desc-learning-plan"
						type="text"
						rows={3}
						name="descLearningPlan"
						value={form.description}
						onChange={(e) =>
							dispatch(
								formLPChanges({
									tag: "description",
									value: e.target.value,
								})
							)
						}
						className={
							errorForm.description.value
								? "text-md rounded-lg focus:ring-green focus:border-green block w-full p-1.5 lg:p-2.5 text-primaryDark border-primaryPink border-2"
								: "border  text-md rounded-lg focus:ring-green focus:border-green block w-full p-1.5 lg:p-2.5"
						}
						placeholder="Description Learning Plan"
					/>
					{errorForm.description.value && (
						<p className="mt-2 text-sm text-primaryPink">
							<span className="font-medium">{errorForm.description.desc}</span>
						</p>
					)}
				</div>
				{/* Search */}
				<div className="flex justify-between items-center mt-3">
					<p className="block mb-1 text-sm font-medium text-white mt-3">
						Courses
					</p>
					<div className="relative">
						<input
							className="block px-2 py-1.5 pl-4 w-full text-sm  rounded-lg border  focus:ring-primaryPink focus:border-primaryDark dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Search..."
							value={courseSearch}
							onChange={(e) =>
								dispatch(
									searchFormCourses(e.target.value.toString().toLowerCase())
								)
							}
						/>
						<button
							type="submit"
							disabled
							className=" absolute right-2.5 bottom-1 hover:bg-primaryDark hover:bg-opacity-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>
							<ImSearch className="text-primaryPink" />
						</button>
					</div>
				</div>
				{/* Courses list DND*/}
				<div
					className={
						errorForm.courses.value
							? "bg-white rounded-md h-44 mt-3 py-1 text-primaryDark border-primaryPink border-2"
							: "bg-white rounded-md h-44 mt-3 py-1"
					}
				>
					<CreateLPDnD typeAction="order" />
					{errorForm.courses.value && (
						<p className="mt-2 text-sm text-primaryPink">
							<span className="font-medium">{errorForm.courses.desc}</span>
						</p>
					)}
				</div>
			</div>
			{/*Modal Footer*/}
			<div className="flex justify-between  mt-4 mb-16 lg:mb-4">
				<button
					onClick={onClose}
					className="py-2 w-32 px-6 mr-8 mt-3 text-primaryPink font-bold bg-white rounded-md hover:scale-95 transition-all ease-in-out duration-150 hover:shadow hover:shadow-primaryPink"
				>
					Close
				</button>
				{editForm ? (
					<button
						className="py-2 w-32 px-6 mt-3 text-white font-bold bg-gradient-to-t from-primaryPink to-primaryPurple rounded-md hover:scale-95 transition-all ease-in-out duration-150  hover:shadow hover:shadow-primaryPink"
						onClick={handleEdit}
					>
						Edit
					</button>
				) : (
					<button
						className="py-2 w-32 px-6 mt-3 text-white font-bold bg-gradient-to-t from-primaryPink to-primaryPurple rounded-md hover:scale-95 transition-all ease-in-out duration-150  hover:shadow hover:shadow-primaryPink"
						onClick={handleSubmit}
					>
						Create
					</button>
				)}
			</div>
		</div>
	);
};

export default CreateLearningPlan;
