import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { changeWaveLPC } from "../../../redux/POC/assignmentSlice";

const WaveCard = ({ wave }) => {
	const dispatch = useDispatch();
	const { userData } = useSelector((state) => state.login);
	return (
		<div
			className={
				wave.selected
					? "h-16 min-h-min mb-3 bg-primaryPurple text-white rounded-md shadow-md flex justify-between items-center px-4 cursor-pointer hover:bg-opacity-50 transition-all ease-in-out duration-300 "
					: "h-16 min-h-min mb-3 bg-white rounded-md shadow-md flex justify-between items-center px-4 cursor-pointer hover:bg-opacity-50 transition-all ease-in-out duration-300 "
			}
			onClick={() =>
				dispatch(
					changeWaveLPC({
						idCampaign: userData.idCampaign,
						idLob: userData.idLob,
						idWave: wave.idwave,
					})
				)
			}
		>
			<div className="flex items-center flex-1 ">
				<p className="font-semibold text-sm">{wave.namewave}</p>
			</div>
		</div>
	);
};

export default WaveCard;
