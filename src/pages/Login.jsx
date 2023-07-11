import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginAsViewer, loginSubmit } from "../redux/loginSlice";
import LogoFeel from "../assets/img/feelLogo.png";
import Loading from "../components/eventos/Loading";
import { MsalProvider } from "@azure/msal-react";
import { msalConfig, enMsalConfig, loginRequest } from "../apis/auth";
import Toast from "../components/eventos/Toast";
import Modal from "../components/Modals/Modal";
import { EventType, PublicClientApplication } from "@azure/msal-browser";
import LoginButton from "../components/Login/LoginButton";

const Login = () => {
	const dispatch = useDispatch();
	const usrInf = useSelector((state) => state.login);
	const { toast } = useSelector((state) => state.alerts);
	const [modal, setModal] = useState(false);
	const [form, setForm] = useState(false);
	const [name, setName] = useState("");
	const [password, setPassword] = useState("");

	useEffect(() => {
		msalInstance.handleRedirectPromise().then(async (response) => {
			if (response == null) return;
			const mfaToken = await msalInstance.acquireTokenSilent(loginRequest);
			dispatch(loginSubmit({ mstoken: mfaToken.accessToken, type: "TP" }));
		});
		enMsalInstance.handleRedirectPromise().then(async (response) => {
			if (response == null) return;
			const mfaToken = await enMsalInstance.acquireTokenSilent(loginRequest);
			dispatch(loginSubmit({ mstoken: mfaToken.accessToken, type: "EN" }));
		});
		// eslint-disable-next-line
	}, []);

	const msalInstance = new PublicClientApplication(msalConfig);
	msalInstance.addEventCallback((event) => {
		if (event.eventType === EventType.LOGIN_SUCCESS) {
			msalInstance.setActiveAccount(event.payload.account);
		}
	});

	const enMsalInstance = new PublicClientApplication(enMsalConfig);
	enMsalInstance.addEventCallback((event) => {
		if (event.eventType === EventType.LOGIN_SUCCESS) {
			enMsalInstance.setActiveAccount(event.payload.account);
		}
	});

	const handleReset = (all) => {
		if (all) {
			setModal(false);
		}
		setForm(false);
		setName("");
		setPassword("");
	};

	const loginViewer = () => {
		dispatch(loginAsViewer({ email: name, password }));
	};
	return (
		<div className="flex flex-col min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-primaryDark ">
			{/* Logo Feel */}
			<div className="w-50">
				<img src={LogoFeel} alt="Logo Feel" height={80} width={320} />
			</div>

			{/* Formulario de datos */}

			<div className="w-full max-w-xs">
				<div className="flex items-center justify-center mb-3 mt-3">
					{!modal && (
						<button
							className="bg-gradient-to-t from-primaryPink to-primaryPurple text-white font-bold py-3 px-8 rounded focus:outline-none focus:shadow-outline"
							onClick={() => setModal(true)}
						>
							LOGIN
						</button>
					)}
				</div>
				<p className="text-center text-white text-xs">
					WSO2 Identity Server | &copy;2022 Inc. <br /> All rights reserved.
				</p>
			</div>
			{modal && (
				<Modal
					visible={modal}
					onClose={() => {}}
					//onClose={() => handleReset(true)}
				>
					<div className="w-full max-w-xs">
						{!form && (
							<>
								<MsalProvider instance={msalInstance}>
									<LoginButton type={"LOGIN TP"} />
								</MsalProvider>
								<MsalProvider instance={enMsalInstance}>
									<LoginButton type={"LOGIN Enigma"} />
								</MsalProvider>
								<div className="flex items-center justify-center mb-3 mt-3">
									<button
										className="bg-gradient-to-t from-primaryPink to-primaryPurple text-white font-bold py-3 px-8 rounded focus:outline-none focus:shadow-outline w-48"
										onClick={() => setForm(true)}
									>
										LOGIN Viewer
									</button>
								</div>
							</>
						)}
						{form && (
							<div>
								<div className="flex items-center justify-center mb-3 mt-3">
									<input
										type="text"
										placeholder="User Feel"
										aria-label="User Feel"
										value={name}
										onChange={(e) => setName(e.target.value)}
										className="rounded-md px-2 py-2 w-full "
									/>
								</div>
								<div className="flex items-center justify-center mb-3 mt-3">
									<input
										type="password"
										placeholder="Password"
										aria-label="Password"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										className="rounded-md px-2 py-2 w-full "
									/>
								</div>
								<div className="flex items-center justify-center mb-3 mt-3">
									<button
										className="bg-gradient-to-t from-primaryPink to-primaryPurple text-white font-bold py-3 px-8 rounded focus:outline-none focus:shadow-outline mr-2"
										onClick={() => handleReset(false)}
									>
										Back
									</button>
									<button
										className="bg-gradient-to-t from-primaryPink to-primaryPurple text-white font-bold py-3 px-8 rounded focus:outline-none focus:shadow-outline"
										onClick={loginViewer}
									>
										LOGIN as Viewer
									</button>
								</div>
							</div>
						)}
					</div>
				</Modal>
			)}
			{usrInf.loading && <Loading />}
			{toast.show && <Toast />}
		</div>
	);
};

export default Login;
