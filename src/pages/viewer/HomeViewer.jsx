import { useSelector } from "react-redux";

import { reqWithoutData } from "../../apis/requestTypes";
import b1 from "../../assets/img/home/b1.png";
import b3 from "../../assets/img/home/b3.png";
import tpBook from "../../assets/img/home/tp_book.png";

import CarrousselMeets from "../../components/Carroussel/CarrousselMeets";
import CarrousselProgress from "../../components/Carroussel/CarrousselProgress";
import { decrypt, encrypt } from "../../helpers/authHelper";

const HomeViewer = () => {
	const { userData } = useSelector((state) => state.login);
	const { email, idccms, nombre, userName, nameCampaign, wave } = userData;

	const handleLaunchMW = async () => {
		const getToken = await reqWithoutData("/a/generatemctoken");
		if (getToken.status === 200) {
			const dataUser = {
				token: getToken.data,
				email,
				idccms,
				nombre,
				userName,
				nameCampaign,
				wave,
			};
			let encrypted = btoa(encrypt(JSON.stringify(dataUser)));

			window.open(`https://mwptc.azurewebsites.net?feel=${encrypted}`);
		}
	};

	return (
		<div className="m-4">
			<h3 className="text-white text-xl ">
				{" "}
				Hi{" "}
				<span className="font-bold">{userData.nombre.split(" ")[0] || ""}</span>
				, Good to see you!
			</h3>
			{/* NOTICE CARD */}
			<div>
				{/* BANNER CURSO */}
				<div
					className="flex flex-col justify-between w-full h-60 mt-4 rounded-md bg-cover bg-center p-4"
					style={{
						backgroundImage: `url(${b3})`,
					}}
				>
					<div className="">
						<p className="text-white"> Minecraft WEB Edition </p>
						<p className="text-white text-xl font-semibold mt-2">
							Play minecraft On the go!
						</p>
					</div>
					<button
						onClick={handleLaunchMW}
						//href="https://mwptc.azurewebsites.net/"
						//target="blank"
						className="rounded-md bg-primaryPink px-4 py-2 bg-opacity-75 w-56 text-white hover:bg-opacity-80 hover:scale-95 font-bold transition ease-in-out  duration-200 "
					>
						Launch the web launcher
					</button>
					{/* <a
            href="https://mwptc.azurewebsites.net/"
            target="blank"
            className="rounded-md bg-primaryPink px-4 py-2 bg-opacity-75 w-56 text-white hover:bg-opacity-80 hover:scale-95 font-bold transition ease-in-out  duration-200 "
          >
            Launch the web launcher
          </a> */}
				</div>
				{/* BANNER CURSO */}
				<div
					className="flex flex-col justify-between w-full h-60 mt-4 rounded-md bg-bottom p-4 bg-no-repeat"
					style={{
						backgroundImage: `url(${tpBook})`,
						backgroundSize: "cover",
					}}
				>
					<div className="">
						<p className="text-white">
							Various learning alternatives that help you expand knowledge
						</p>
						<p className="text-white text-xl font-semibold mt-2">TP Book</p>
					</div>
					<a
						href="https://www.tp-book.com"
						target="blank"
						className="rounded-md bg-primaryPink px-4 py-2 bg-opacity-75 w-56 text-white hover:bg-opacity-80 hover:scale-95 font-bold transition ease-in-out  duration-200 "
					>
						Go learn
					</a>
				</div>
				{/* progress  */}
				{/* <h3 className="text-white font-semibold my-4" id="meetings">
					My Progress
				</h3>
				<div className="my-4">
					<CarrousselProgress />
				</div> */}

				{/* BANNER CURSO */}
				<div
					className="flex flex-col justify-between w-full h-60 mt-4 rounded-md bg-cover bg-center p-4"
					style={{
						backgroundImage: `url(${b1})`,
					}}
				>
					<div className="">
						<p className="text-white text-xl font-semibold mt-2">
							2023 Teleperformance Global Anti-Corruption Training
						</p>
						<p className="text-white">Live classes in one place</p>
					</div>
					<button className="rounded-md bg-primaryPink px-4 py-2 bg-opacity-75 w-44 text-white hover:bg-opacity-80 hover:scale-95 font-bold transition ease-in-out  duration-200 ">
						Enroll now
					</button>
				</div>
				{/* CATEGORIES */}
				<h3 className="text-white font-semibold my-4" id="meetings">
					Meetings
				</h3>
				<div>{/* <CarrousselMeets /> */}</div>
			</div>
		</div>
	);
};

export default HomeViewer;
