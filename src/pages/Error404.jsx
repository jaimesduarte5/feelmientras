import React from "react";
import { useNavigate } from "react-router-dom";

export const Error404 = () => {
	const navigate = useNavigate();
	return (
		<div>
			<div>Error404: la pagina no existe</div>;
			<div>
				<button onClick={() => navigate("/admin/Home")}>Volver al home</button>
			</div>
		</div>
	);
};
