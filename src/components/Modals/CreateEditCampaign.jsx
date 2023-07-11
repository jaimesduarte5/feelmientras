import React, { useState } from "react";
import { BiAddToQueue } from "react-icons/bi";
import LobCardDesc from "./LobCardDesc";
import POCAssignement from "./POCAssignement";
import { useSelector, useDispatch } from "react-redux";
import {
	newCampaignName,
	newLobCard,
	newLobName,
} from "../../redux/SuperAdmin/campContentSlice";
import { showConfirmation, showToast } from "../../redux/alertsSlice";

const CreateEditCampaign = ({ action, handleClose }) => {
	const { form, newTempLob } = useSelector((state) => state.campaigns);
	const dispatch = useDispatch();
	const [edit, setEdit] = useState(false);

	const handleSubmit = async () => {
		if (action === "Create") {
			dispatch(
				showConfirmation({
					data: {
						nameCampaign: form.name,
						lobsInfo: form.lobs,
					},
					title: "Action Validation",
					msj: "Are you sure you want to perform this process?",
					tag: "createCampaign",
				})
			);
			handleClose();
		} else {
			dispatch(
				showConfirmation({
					data: {
						context: 1,
						idCampaign: form.idC,
						nameCampaign: form.name,
						lobsInfo: form.lobs,
					},
					title: "Action Validation",
					msj: "Are you sure you want to perform this process?",
					tag: "updateCampaign",
				})
			);
			handleClose();
		}
	};

	return (
		<>
			{/*content*/}
			<div className=" rounded-lg  flex flex-col w-full bg-primaryDark opacity-95 outline-none mb-20 md:mb-auto">
				{/*header*/}
				<div className="p-5 text-center ">
					<h3 className="text-primaryPink font-bold text-xl  w-full">
						{action} Campaign
					</h3>
				</div>
				{/*body*/}
				<div className="relative pt-0 md:pt-auto p-6 flex-auto w-96">
					{/* NOMBRE CAMPAÑA */}
					<div>
						<label
							htmlFor="first_name"
							className="block mb-1 text-sm font-medium text-white dark:text-gray-300"
						>
							Campaign Name
						</label>
						<input
							type="text"
							id="first_name"
							className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Campaign Name"
							value={form.name}
							onChange={(e) => dispatch(newCampaignName(e.target.value))}
							required
						/>
					</div>
					{/* NOMBRE LOB */}
					<div className="mt-2">
						<label className=" block mb-1 text-sm font-medium text-white dark:text-gray-300">
							Assignement LOB´s
						</label>
						<div className="relative">
							<input
								type="text"
								className="block p-3  w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
								placeholder="LOB Name"
								value={newTempLob}
								onChange={(e) => dispatch(newLobName(e.target.value))}
								required
							/>
							<button
								type="submit"
								className="text-primaryPink absolute right-2 bottom-1.5 bg-blue-700 hover:border hover:border-primaryPink focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
								onClick={
									form.lobs.length < 4
										? () => dispatch(newLobCard({ act: "new", name: "dfdf" }))
										: () =>
												dispatch(
													showToast({
														type: "warning",
														title: "many lobs!",
														msj: "you can only create 4 lobs!",
														show: true,
													})
												)
								}
								disabled={!newTempLob}
							>
								<BiAddToQueue size={20} />
							</button>
						</div>
					</div>
					{/* CAJA DE LOB´S  */}
					<div className="pt-1">
						<p className="text-white text-sm font-medium mb-1 ">LOB´s</p>
						<div
							className={`rounded-md  h-64  border border-white overflow-hidden  relative flex pr-4 transition ease-in-out delay-150 
                   ${edit ? "bg-primaryDark" : "bg-white"}`}
						>
							<div
								className={`min-w-full h-full bg-primaryDark p-2 relative transition ease-in-out duration-150 
                    ${edit ? " " : "-translate-x-full"}
                    `}
							>
								<POCAssignement setEdit={setEdit} />
							</div>
							<div
								className={`min-w-full sm:h-60 overflow-y-scroll custom-scroll m-2 relative transition ease-in-out duration-150 ${
									edit ? " translate-x-full " : " -translate-x-full "
								}`}
							>
								{form.lobs.map((lob, index) => (
									<>
										<LobCardDesc
											key={lob.name + "modalCard" + index}
											lobName={lob.name}
											action={action}
											setEdit={setEdit}
										/>
									</>
								))}
							</div>
						</div>
					</div>
				</div>
				{/*footer*/}
				<div className="flex items-center justify-end">
					<button
						className=" text-primaryPink bg-white to-primaryPurple active:bg-primaryPink font-bold uppercase text-sm px-6 py-3 rounded shadow hover:scale-95 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
						type="button"
						onClick={handleClose}
					>
						Close
					</button>
					<button
						className=" text-white bg-gradient-to-t hover:scale-95 from-primaryPink to-primaryPurple active:bg-primaryPink font-bold uppercase text-sm px-6 py-3 rounded shadow outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
						type="button"
						onClick={() =>
							form.lobs.filter((lob) => lob.email && lob.name && lob.namePoc)
								.length !== form.lobs.length
								? dispatch(
										showToast({
											type: "warning",
											title: "POC inputs empty!",
											msj: "Verify POC Inputs!",
											show: true,
										})
								  )
								: handleSubmit()
						}
						disabled={
							action === "Create"
								? !form.name || form.lobs.length === 0
								: !form.name || !form.idC || form.lobs.length === 0
						}
					>
						{action}
					</button>
				</div>
			</div>
		</>
	);
};

export default CreateEditCampaign;
