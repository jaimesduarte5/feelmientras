import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../apis/auth";

const LoginButton = ({ type }) => {
	const { instance } = useMsal();
	const handlelog = () => {
		instance.loginRedirect(loginRequest).catch((e) => {});
	};
	return (
		<div className="flex items-center justify-center mb-3 mt-3">
			<button
				className="bg-gradient-to-t from-primaryPink to-primaryPurple text-white font-bold py-3 px-8 rounded focus:outline-none focus:shadow-outline w-48 mb-3"
				onClick={handlelog}
			>
				{type}
			</button>
		</div>
	);
};

export default LoginButton;
