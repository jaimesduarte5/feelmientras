import { useState } from "react";
import { FiEdit3 } from "react-icons/fi";
import { ImSearch } from "react-icons/im";
import { useSelector, useDispatch } from "react-redux";
import {
	assignPOC,
	formNameLob,
	formPOCLob,
	searchMD,
} from "../../redux/SuperAdmin/campContentSlice";

import { valEmail } from "../../helpers/usersHelper";
import { showToast } from "../../redux/alertsSlice";

const POCAssignement = ({ setEdit }) => {
	const { tempLobPoc } = useSelector((state) => state.campaigns);
	const dispatch = useDispatch();
	const [block, setBlock] = useState(true);
	const [entrance, setEntrance] = useState(false);

	const handleSubmit = () => {
		//validar que la info este completa
		if (tempLobPoc.email && tempLobPoc.name && tempLobPoc.namePoc) {
			setBlock(true);
			setEdit(false);
			return dispatch(assignPOC(tempLobPoc));
		}
		dispatch(
			showToast({
				type: "warning",
				title: "inputs Empty!",
				msj: "Verify LOB name and Trainer POC!",
				show: true,
			})
		);
	};

	const handleSearch = async (data) => {
		const v = valEmail(data.user);
		if (v) {
			setEntrance(true);
		} else {
			dispatch(searchMD(data));
		}
	};

	return (
		<div className=" bg-primaryDark h-full w-full">
			<div className="">
				<label class=" block mb-1 text-sm font-medium text-white dark:text-gray-300">
					LOB Name
				</label>
				<div className="relative">
					<input
						type="text"
						className="block p-2  w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
						placeholder="LOB"
						value={tempLobPoc.name}
						onChange={(e) => dispatch(formNameLob(e.target.value))}
						disabled={block}
						required
					/>
					<button
						type="submit"
						className="text-primaryPink absolute right-2 top-1 bg-blue-700 hover:border hover:border-primaryPink focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						onClick={() => setBlock(!block)}
					>
						<FiEdit3 size={20} />
					</button>
				</div>
			</div>
			<div className="">
				<label className=" block mb-1 text-sm font-medium text-white dark:text-gray-300">
					Assignement Trainer POC
				</label>

				<div className="relative">
					<input
						type="text"
						className="block p-2  w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mt-2"
						placeholder="Search Email"
						value={tempLobPoc.email}
						onChange={(e) => {
							setEntrance(false);
							dispatch(formPOCLob(e.target.value));
						}}
						required
					/>
					<button
						type="submit"
						className="text-primaryPink absolute right-2 top-1  hover:border hover:border-primaryPink focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-2 py-1 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						//disabled si no concuerda el Email
						//disabled={valEmail(tempLobPoc.email)}
						onClick={() =>
							handleSearch({
								user: tempLobPoc.email,
								context: 2,
							})
						}
					>
						<ImSearch />
					</button>

					{entrance && (
						<p className="mt-2 text-sm text-primaryPink">
							<span className="font-medium">Oops!</span> wrong business email
						</p>
					)}
				</div>
			</div>
			<div>
				<p className="text-white font-medium text-sm mt-2">Trainer POC</p>
				<p className="bg-white rounded-md p-2 h-8">{tempLobPoc.namePoc} </p>
			</div>
			<div className="mt-2">
				<button
					onClick={() => {
						handleSubmit();
					}}
					//disabled={true}
					disabled={
						tempLobPoc.namePoc === "Assigned as POC " ||
						tempLobPoc.namePoc === "0"
							? true
							: false
					}
					className="text-white rounded-md p-2 bg-gradient-to-t from-primaryPink to-primaryPurple"
				>
					Assignement
				</button>
			</div>
		</div>
	);
};

export default POCAssignement;
