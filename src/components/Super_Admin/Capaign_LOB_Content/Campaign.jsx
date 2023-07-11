import React from "react";
import Card from "../Card";
import { ImSearch } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import {
	searchCamp,
	searchLob,
} from "../../../redux/SuperAdmin/campContentSlice";

const CampaignLob = ({ nameComponent, data }) => {
	const { searchC, searchL } = useSelector((state) => state.campaigns);
	const dispatch = useDispatch();
	return (
		<div className="bg-primaryDark bg-opacity-75 rounded-lg p-2 ">
			{/* SERACH COMPONENT */}
			<div className="h-16 flex justify-between items-center">
				<h3 className="text-primaryPink font-medium text-lg">
					{nameComponent}
				</h3>
				<form>
					<label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">
						Search
					</label>
					<div className="relative">
						<input
							className="block p-2 pl-4 w-full text-sm  rounded-lg border  focus:ring-primaryPink focus:border-primaryDark dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
							placeholder="Search..."
							value={nameComponent === "Campaign" ? searchC : searchL}
							onChange={(e) => {
								nameComponent === "Campaign"
									? dispatch(searchCamp(e.target.value))
									: dispatch(searchLob(e.target.value));
							}}
						/>
						<button
							type="submit"
							disabled
							className=" absolute right-2.5 bottom-1 hover:bg-primaryDark hover:bg-opacity-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						>
							<ImSearch className="text-primaryPurple hover:text-primaryPink" />
						</button>
					</div>
				</form>
			</div>
			{/* COTENIDO DE TARJETAS */}
			<div className=" overflow-y-scroll custom-scroll pr-2 h-96 2xl:h-128 ">
				{data.map((el, index) => (
					<>
						<Card
							key={el.name + "card" + index}
							data={el}
							type={nameComponent}
						/>
					</>
				))}
			</div>
		</div>
	);
};

export default CampaignLob;
