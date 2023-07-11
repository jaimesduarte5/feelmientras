import React from "react";

const Progress = ({ value }) => {
	let width = value.toString().concat("%");
	return (
		<div className="w-full px-10 flex ">
			<p className="w-12 text-primaryPink font-bold text-xs ">{value}%</p>
			<div className="bg-[#B2B2B2] w-full rounded-md shadow-inner shadow-secondaryDark overflow-hidden ">
				<div
					className={`rounded-md h-full bg-primaryPink shadow shadow-primaryPurple`}
					style={{ width: width }}
				/>
			</div>
		</div>
	);
};

export default Progress;
