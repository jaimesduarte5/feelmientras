import React from "react";
import { useLocation } from "react-router-dom";
import SideBarSA from "./SideBarSA";
import SideBarPOC from "./SideBarPOC";
import { useSelector } from "react-redux";
import SideBarAgent from "./SideBarAgent";
import SideBarViewer from "./SideBarViewer";

const SideBar = () => {
	const location = useLocation();
	const { pathname } = location;
	const { userData } = useSelector((state) => state.login);
	const { role } = userData;

	return (
		<div className="bg-primaryDark h-20 md:h-full md:min-h-screen w-20 hidden md:block pt-20">
			{/* Navegacion para Super Admin */}
			{role === "Super Admin" && <SideBarSA pathname={pathname} />}
			{/* Navegacion para POC */}
			{role === "Poc" && <SideBarPOC pathname={pathname} />}
			{/* Navegacion para Agent */}
			{role === "Agent" && <SideBarAgent pathname={pathname} />}
			{/* Navegacion para Agent */}
			{(role === "Viewer" || role === "TP Viewer") && (
				<SideBarViewer pathname={pathname} />
			)}
		</div>
	);
};

export default SideBar;
