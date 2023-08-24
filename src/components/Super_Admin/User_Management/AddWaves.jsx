import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { showConfirmation } from "../../../redux/alertsSlice";
import {
	changeType,
	selectWave,
	wavesErrorForm,
	wavesFormChanges,
} from "../../../redux/POC/waveFormSlice";

const AddWaves = ({ onClose }) => {
	const dispatch = useDispatch();
	const { type, form, errorForm, waves } = useSelector(
		(state) => state.wavesForm
	);
	const { userData } = useSelector((state) => state.login);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (type !== "create" && !form.nameWave) {
			return dispatch(
				wavesErrorForm({
					...errorForm,
					wave: { value: true, desc: "Select a Wave" },
				})
			);
		}
		if ((!form.trainingType || !form.waveNumber) && type !== "delete") {
			if (!form.waveNumber) {
				return dispatch(
					wavesErrorForm({
						...errorForm,
						trainingType: { value: true, desc: "Empty Training Type Value" },
						waveNumber: { value: true, desc: "Empty Wave Number Value" },
					})
				);
			}
			return dispatch(
				wavesErrorForm({
					...errorForm,
					trainingType: { value: true, desc: "Empty Training Type Value" },
				})
			);
		}

		if (type === "create") {
			const body = {
				nameWave: `TP${userData.country}-${userData.nameCampaign}-${
					form.trainingType
				}-${form.waveNumber}-${userData.nameLob}${
					form.channel ? "-" + form.channel : ""
				}${form.language ? "-" + form.language : ""}${
					form.otherInfo ? "-" + form.otherInfo : ""
				}`,
				country: userData.country,
				trainingType: form.trainingType,
				waveNumber: form.waveNumber,
				channel: form.channel,
				lenguage: form.language,
				otherInfo: form.otherInfo,
			};
			dispatch(
				showConfirmation({
					data: body,
					title: "Create Wave",
					msj: "Are you sure you want to perform this process?",
					tag: "createWave",
				})
			);
		}
		if (type === "update") {
			const body = {
				idWave: form.idWave,
				nameWave: `TP${userData.country}-${userData.nameCampaign}-${
					form.trainingType
				}-${form.waveNumber}-${userData.nameLob}${
					form.channel ? "-" + form.channel : ""
				}${form.language ? "-" + form.language : ""}${
					form.otherInfo ? "-" + form.otherInfo : ""
				}`,
				trainingType: form.trainingType,
				waveNumber: form.waveNumber,
				channel: form.channel,
				lenguage: form.language,
				otherInfo: form.otherInfo,
				context: 1,
			};
			dispatch(
				showConfirmation({
					data: body,
					title: "Update Wave",
					msj: "Are you sure you want to perform this process?",
					tag: "updateWave",
				})
			);
		}
		if (type === "delete") {
			const body = {
				idWave: form.idWave,
				nameWave: `TP${userData.country}-${userData.nameCampaign}-${
					form.trainingType
				}-${form.waveNumber}-${userData.nameLob}${
					form.channel ? "-" + form.channel : ""
				}${form.language ? "-" + form.language : ""}${
					form.otherInfo ? "-" + form.otherInfo : ""
				}`,
				trainingType: form.trainingType,
				waveNumber: form.waveNumber,
				channel: form.channel,
				lenguage: form.language,
				otherInfo: form.otherInfo,
				context: 2,
			};
			dispatch(
				showConfirmation({
					data: body,
					title: "Update Wave",
					msj: "Are you sure you want to perform this process?",
					tag: "updateWave",
				})
			);
		}
	};
	return (
		<>
			<div className="bg-primaryDark w-96 p-4 rounded-md ">
				<div className=" text-center my-4">
					<h3 className="text-xl font-semibold text-primaryPink ">
						Manage Waves
					</h3>

					<div>
						<label
							htmlFor="entrance"
							className="inline-flex relative items-center cursor-pointer mt-4 "
						>
							<button
								className={
									type === "create"
										? "py-2 mr-3 px-6 text-white font-bold bg-gradient-to-t from-primaryPink to-primaryPurple rounded-md hover:scale-95 transition-all ease-in-out duration-150  hover:shadow hover:shadow-primaryPink" //</label>? "text-primaryPink bg-white p-1  mr-3 rounded-md "
										: "py-2 mr-3 px-6 text-white font-bold bg-primaryPink from-primaryPink to-primaryPurple rounded-md hover:scale-95 transition-all ease-in-out duration-150  hover:shadow hover:shadow-primaryPink" //"text-white bg-primaryPink p-1  mr-3 rounded-md hover:bg-white hover:text-primaryPink transition ease-in-out delay-75"
								}
								onClick={() => dispatch(changeType("create"))}
							>
								Create
							</button>
							<button
								className={
									type === "update"
										? "py-2 mr-3 px-6 text-white font-bold bg-gradient-to-t from-primaryPink to-primaryPurple rounded-md hover:scale-95 transition-all ease-in-out duration-150  hover:shadow hover:shadow-primaryPink" //</label>? "text-primaryPink bg-white p-1  mr-3 rounded-md "
										: "py-2 mr-3 px-6 text-white font-bold bg-primaryPink from-primaryPink to-primaryPurple rounded-md hover:scale-95 transition-all ease-in-out duration-150  hover:shadow hover:shadow-primaryPink" //"text-white bg-primaryPink p-1  mr-3 rounded-md hover:bg-white hover:text-primaryPink transition ease-in-out delay-75"
								}
								onClick={() => dispatch(changeType("update"))}
							>
								Update
							</button>
							<button
								className={
									type === "delete"
										? "py-2 mr-3 px-6 text-white font-bold bg-gradient-to-t from-primaryPink to-primaryPurple rounded-md hover:scale-95 transition-all ease-in-out duration-150  hover:shadow hover:shadow-primaryPink" //</label>? "text-primaryPink bg-white p-1  mr-3 rounded-md "
										: "py-2 mr-3 px-6 text-white font-bold bg-primaryPink from-primaryPink to-primaryPurple rounded-md hover:scale-95 transition-all ease-in-out duration-150  hover:shadow hover:shadow-primaryPink" //"text-white bg-primaryPink p-1  mr-3 rounded-md hover:bg-white hover:text-primaryPink transition ease-in-out delay-75"
								}
								onClick={() => dispatch(changeType("delete"))}
							>
								Delete
							</button>
						</label>
						{type !== "create" && (
							<div>
								<select
									id="wave"
									name="wave"
									placeholder="Select Wave"
									className={
										errorForm.wave.value
											? "mt-5 border-2 bg-primaryDark text-[#a9a9a9] text-md rounded-md  border-primaryPink  focus:ring-green focus:border-green block w-full p-1.5 lg:p-2.5"
											: "mt-5 border bg-primaryDark text-[#a9a9a9] text-md rounded-md focus:ring-green focus:border-green block w-full p-1.5 lg:p-2.5 appearance-none"
									}
									value={form.wave}
									onChange={(e) =>
										dispatch(selectWave(parseInt(e.target.value)))
									}
								>
									<option value="">Select Wave</option>
									{waves.map((wave) => (
										<option key={wave.namewave} value={wave.idwave}>
											{wave.namewave}
										</option>
									))}
								</select>
								{errorForm.wave.value && (
									<p className="mt-2 text-sm text-primaryPink">
										<span className="font-medium">{errorForm.wave.desc}</span>
									</p>
								)}
							</div>
						)}
					</div>
				</div>
				<h5 className="text-xl font-semibold text-primaryPink ">Wave name</h5>
				<div>
					<p className="text-white mb-3">
						{`TP${userData.country}-${userData.nameCampaign}-${
							form.trainingType
						}-${form.waveNumber}-${userData.nameLob}${
							form.channel ? "-" + form.channel : ""
						}${form.language ? "-" + form.language : ""}${
							form.otherInfo ? "-" + form.otherInfo : ""
						}`}
					</p>
				</div>
				{/* Upload File */}
				{/* TP[Country]-[Campaign]-[TrainingType]-[WaveNumber]-[LineofBusiness]-[channel]-[Language]-[OtherInfo] */}
				{type !== "delete" && (
					<div className=" bg-white rounded-md w-full p-4 h-60 overflow-y-scroll">
						<div>
							<label htmlFor="trainingType" className="block">
								Training Type
							</label>
							<input
								className={
									errorForm.trainingType.value
										? "bg-primaryDark p-1.5 rounded-md w-full text-primaryDark border-primaryPink border-2"
										: "bg-primaryDark p-1.5 rounded-md w-full text-white"
								}
								type="text"
								id="trainingType"
								name="trainingType"
								value={form.trainingType}
								placeholder="Training Type"
								onChange={(e) => {
									let value = e.target.value;
									e.target.value = value.replace(
										/[!"#$%&/()=<>*-/+;:?¿¡]/g,
										""
									);
									dispatch(
										wavesFormChanges({
											tag: "trainingType",
											value: e.target.value,
										})
									);
								}}
							/>
							{/* validar si ya existe en tabla el id */}
							{errorForm.trainingType.value && (
								<p className="mt-2 text-sm text-primaryPink">
									<span className="font-medium">
										{errorForm.trainingType.desc}
									</span>
								</p>
							)}
						</div>
						<div className="my-4">
							<label htmlFor="waveNumber" className="block">
								Wave Number
							</label>
							<input
								className={
									errorForm.waveNumber.value
										? "bg-primaryDark p-1.5 rounded-md w-full text-white border-primaryPink border-2"
										: "bg-primaryDark p-1.5 rounded-md w-full text-white"
								}
								type="text"
								id="waveNumber"
								name="waveNumber"
								value={form.waveNumber}
								placeholder="Wave Number"
								//disabled={file ? true : false}
								onChange={(e) => {
									let value = e.target.value;
									e.target.value = value.replace(
										/[!"#$%&/()=<>*-/+;:?¿¡]/g,
										""
									);
									dispatch(
										wavesFormChanges({
											tag: "waveNumber",
											value: e.target.value,
										})
									);
								}}
							/>
							{/* Campo requerido */}
							{errorForm.waveNumber.value && (
								<p className="mt-2 text-sm text-primaryPink">
									<span className="font-medium">
										{errorForm.waveNumber.desc}
									</span>
								</p>
							)}
						</div>
						<h5 className="text-xl font-semibold text-primaryDark">
							Optional Inputs
						</h5>
						<div className=" border-primaryDark border-2 p-2 rounded-lg">
							<div className="mb-4">
								<label htmlFor="channel" className="block">
									Channel
								</label>
								<input
									className={
										errorForm.channel.value
											? "bg-primaryDark p-1.5 rounded-md w-full text-white border-primaryPink border-2"
											: "bg-primaryDark p-1.5 rounded-md w-full text-white"
									}
									type="text"
									id="channel"
									name="channel"
									placeholder="Channel"
									value={form.channel}
									// disabled={file ? true : false}
									onChange={(e) => {
										let value = e.target.value;
										e.target.value = value.replace(
											/[!"#$%&/()=<>*-/+;:?¿¡]/g,
											""
										);
										dispatch(
											wavesFormChanges({
												tag: "channel",
												value: e.target.value,
											})
										);
									}}
								/>
								{/* Campo requerido */}
								{errorForm.channel.value && (
									<p className="mt-2 text-sm text-primaryPink">
										<span className="font-medium">
											{errorForm.channel.desc}
										</span>
									</p>
								)}
							</div>
							<div className="my-4">
								<label htmlFor="language" className="block">
									Language
								</label>
								<input
									className={
										errorForm.language.value
											? "bg-primaryDark p-1.5 rounded-md w-full text-white border-primaryPink border-2"
											: "bg-primaryDark p-1.5 rounded-md w-full text-white"
									}
									type="language"
									id="language"
									name="language"
									placeholder="Language"
									value={form.language}
									// disabled={file ? true : false}
									onChange={(e) => {
										let value = e.target.value;
										e.target.value = value.replace(
											/[!"#$%&/()=<>*-/+;:?¿¡]/g,
											""
										);
										dispatch(
											wavesFormChanges({
												tag: "language",
												value: e.target.value,
											})
										);
									}}
								/>
								{errorForm.language.value && (
									<p className="mt-2 text-sm text-primaryPink">
										<span className="font-medium">
											{errorForm.language.desc}
										</span>
									</p>
								)}
							</div>
							<div className="my-4">
								<label htmlFor="otherInfo" className="block">
									Other Info
								</label>
								<input
									className={
										errorForm.otherInfo.value
											? "bg-primaryDark p-1.5 rounded-md w-full text-white border-primaryPink border-2"
											: "bg-primaryDark p-1.5 rounded-md w-full text-white"
									}
									type="text"
									id="otherInfo"
									name="otherInfo"
									placeholder="Other Info"
									value={form.otherInfo}
									// disabled={file ? true : false}
									onChange={(e) => {
										let value = e.target.value;
										e.target.value = value.replace(
											/[!"#$%&/()=<>*-/+;:?¿¡]/g,
											""
										);
										dispatch(
											wavesFormChanges({
												tag: "otherInfo",
												value: e.target.value,
											})
										);
									}}
								/>
								{/* Campo requerido */}
								{errorForm.otherInfo.value && (
									<p className="mt-2 text-sm text-primaryPink">
										<span className="font-medium">
											{errorForm.otherInfo.desc}
										</span>
									</p>
								)}
							</div>
						</div>
					</div>
				)}
				<div className="text-right mt-4 mb-4 ">
					<button
						onClick={onClose}
						className="py-2 px-6 mr-8 text-primaryPink font-bold bg-white rounded-md hover:scale-95 transition-all ease-in-out duration-150 hover:shadow hover:shadow-primaryPink"
					>
						Close
					</button>
					{type === "update" && (
						<button
							className="py-2 px-6 text-white font-bold bg-gradient-to-t from-primaryPink to-primaryPurple rounded-md hover:scale-95 transition-all ease-in-out duration-150  hover:shadow hover:shadow-primaryPink"
							onClick={(e) => handleSubmit(e)}
						>
							Edit
						</button>
					)}

					{type === "create" && (
						<button
							className="py-2 px-6 text-white font-bold bg-gradient-to-t from-primaryPink to-primaryPurple rounded-md hover:scale-95 transition-all ease-in-out duration-150  hover:shadow hover:shadow-primaryPink"
							onClick={(e) => handleSubmit(e)}
						>
							Create
						</button>
					)}

					{type === "delete" && (
						<button
							className="py-2 px-6 text-white font-bold bg-gradient-to-t from-primaryPink to-primaryPurple rounded-md hover:scale-95 transition-all ease-in-out duration-150  hover:shadow hover:shadow-primaryPink"
							onClick={(e) => handleSubmit(e)}
						>
							Delete
						</button>
					)}
				</div>
			</div>
		</>
	);
};

export default AddWaves;
