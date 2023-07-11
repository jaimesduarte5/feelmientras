import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	changeWavesUsersForm,
	formChanges,
} from "../../../redux/usersFormSlice";

const AddUserForm = () => {
	const dispatch = useDispatch();
	const { form, errorForm, waves } = useSelector((state) => state.usrForm);
	const { userData } = useSelector((state) => state.login);

	return (
		<>
			<div className=" bg-white rounded-md w-full p-4 h-60 overflow-y-scroll">
				<div>
					<label htmlFor="ccms" className="block">
						Id User
					</label>
					<input
						className={
							errorForm.ccms
								? "bg-primaryPink p-1.5 rounded-md w-full text-primaryDark border-primaryPink border-2"
								: "bg-primaryDark p-1.5 rounded-md w-full text-white"
						}
						type="text"
						id="ccms"
						name="ccms"
						value={form.ccms}
						placeholder="Id User"
						onChange={(e) =>
							isNaN(e.target.value)
								? null
								: dispatch(
										formChanges({
											tag: "ccms",
											value: e.target.value,
											rol: userData.role,
										})
								  )
						}
					/>
					{/* validar si ya existe en tabla el id */}
					{errorForm.ccms && (
						<p className="mt-2 text-sm text-primaryPink">
							<span className="font-medium">Oops!</span> Id already taken!
						</p>
					)}
				</div>
				<div className="my-4">
					<label htmlFor="name" className="block">
						Name
					</label>
					<input
						className={
							errorForm.name
								? "bg-primaryDark p-1.5 rounded-md w-full text-white border-primaryPink border-2"
								: "bg-primaryDark p-1.5 rounded-md w-full text-white"
						}
						type="text"
						id="name"
						name="name"
						value={form.name}
						placeholder="Name"
						//disabled={file ? true : false}
						onChange={(e) => {
							let value = e.target.value;
							e.target.value = value.replace(/[0-9!"#$%&/()=<>*-/+;:?¿¡]/g, "");
							dispatch(
								formChanges({
									tag: "name",
									value: e.target.value,
									rol: userData.role,
								})
							);
						}}
					/>
					{/* Campo requerido */}
					{errorForm.name && (
						<p className="mt-2 text-sm text-primaryPink">
							<span className="font-medium">Oops!</span> Name is required!
						</p>
					)}
				</div>
				<div className="my-4">
					<label htmlFor="lastname" className="block">
						Last Name
					</label>
					<input
						className={
							errorForm.lastname
								? "bg-primaryDark p-1.5 rounded-md w-full text-white border-primaryPink border-2"
								: "bg-primaryDark p-1.5 rounded-md w-full text-white"
						}
						type="text"
						id="lastname"
						name="lastname"
						placeholder="Last Name"
						value={form.lastname}
						// disabled={file ? true : false}
						onChange={(e) => {
							let value = e.target.value;
							e.target.value = value.replace(/[0-9!"#$%&/()=<>*-/+;:?¿¡]/g, "");
							dispatch(
								formChanges({
									tag: "lastname",
									value: e.target.value,
									rol: userData.role,
								})
							);
						}}
					/>
					{/* Campo requerido */}
					{errorForm.lastname && (
						<p className="mt-2 text-sm text-primaryPink">
							<span className="font-medium">Oops!</span> lastname is required!
						</p>
					)}
				</div>
				<div className="my-4">
					<label htmlFor="email" className="block">
						Email / NLSA
					</label>
					<input
						className={
							errorForm.email
								? "bg-primaryDark p-1.5 rounded-md w-full text-white border-primaryPink border-2"
								: "bg-primaryDark p-1.5 rounded-md w-full text-white"
						}
						type="email"
						id="email"
						name="email"
						placeholder="Email"
						value={form.email}
						// disabled={file ? true : false}
						onChange={(e) =>
							dispatch(
								formChanges({
									tag: "email",
									value: e.target.value.toLowerCase(),
									rol: userData.role,
								})
							)
						}
					/>
					{/* Validar Email teleperformance */}
					{errorForm.email && (
						<p className="mt-2 text-sm text-primaryPink">
							<span className="font-medium">Oops!</span> mail must be corporate!
						</p>
					)}
				</div>
				<div className="my-4">
					<label htmlFor="position" className="block">
						Position
					</label>
					<input
						className={
							errorForm.position
								? "bg-primaryDark p-1.5 rounded-md w-full text-white border-primaryPink border-2"
								: "bg-primaryDark p-1.5 rounded-md w-full text-white"
						}
						type="text"
						id="position"
						name="position"
						placeholder="Position"
						value={form.position}
						// disabled={file ? true : false}
						onChange={(e) => {
							let value = e.target.value;
							e.target.value = value.replace(/[!"#$%&/()=<>*-/+;:?¿¡]/g, "");
							dispatch(
								formChanges({
									tag: "position",
									value: e.target.value,
									rol: userData.role,
								})
							);
						}}
					/>
					{/* Campo requerido */}
					{errorForm.position && (
						<p className="mt-2 text-sm text-primaryPink">
							<span className="font-medium">Oops!</span> position is required!
						</p>
					)}
				</div>
				<div className="my-4">
					<label htmlFor="admission date" className="block">
						Hire Date
					</label>
					<input
						className={
							errorForm.inDate
								? "bg-primaryDark p-1.5 rounded-md w-full text-white border-primaryPink border-2"
								: "bg-primaryDark p-1.5 rounded-md w-full text-white"
						}
						type="date"
						id="admission date"
						name="admission date"
						value={form.inDate}
						// disabled={file ? true : false}
						onChange={(e) =>
							dispatch(
								formChanges({
									tag: "inDate",
									value: e.target.value,
									rol: userData.role,
								})
							)
						}
					/>
					{/* Campo requerido */}
					{errorForm.inDate && (
						<p className="mt-2 text-sm text-primaryPink">
							<span className="font-medium">Oops!</span> date is required!
						</p>
					)}
				</div>
				<div>
					<label htmlFor="country" className="block">
						Country
					</label>
					<select
						id="country"
						name="country"
						placeholder="Select Country"
						className={
							errorForm.country
								? "border-2 bg-primaryDark text-[#a9a9a9] text-md rounded-md  border-primaryPink  focus:ring-green focus:border-green block w-full p-1.5 lg:p-2.5"
								: "border bg-primaryDark text-[#a9a9a9] text-md rounded-md focus:ring-green focus:border-green block w-full p-1.5 lg:p-2.5"
						}
						value={form.country}
						onChange={(e) =>
							dispatch(
								formChanges({
									tag: "country",
									value: e.target.value,
									rol: userData.role,
								})
							)
						}
					>
						<option value="">Select Country</option>
						<option value="Colombia">Colombia</option>
						<option value="Peru">Peru</option>
						<option value="Nicaragua">Nicaragua</option>
						<option value="Guyana">Guyana</option>
						<option value="Trinidad y Tobago">Trinidad y Tobago</option>
					</select>
					{/* Campo requerido */}
					{errorForm.country && (
						<p className="mt-2 text-sm text-primaryPink">
							<span className="font-medium">Oops!</span> country is required!
						</p>
					)}
				</div>

				{userData.role.toLowerCase() !== "poc" ? (
					<div>
						<label
							htmlFor="role"
							className="block mb-1 text-sm font-medium  mt-3"
						>
							Role
						</label>
						<label
							htmlFor="large-toggle"
							className="inline-flex relative items-center cursor-pointer  "
						>
							<input
								type="checkbox"
								value={form.role}
								id="large-toggle"
								className="sr-only peer"
								name="role"
								onChange={(e) =>
									form.role === "Poc"
										? dispatch(
												formChanges({
													tag: "role",
													value: "Super Admin",
													rol: userData.role,
												})
										  )
										: dispatch(
												formChanges({
													tag: "role",
													value: "Poc",
													rol: userData.role,
												})
										  )
								}
							/>

							<div
								className={`w-[304px] lg:w-80 h-8 bg-primaryDark peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 
       rounded-md peer  
       peer-checked:after:border-primaryPink  after:absolute   
       after:bg-primaryPink  after:rounded-md after:h-full after:w-[152px]  after:lg:w-40  after:transition-all
       after:flex after:justify-center after:items-center after:font-bold after:text-white
       ${
					form.role === "Super Admin"
						? "after:content-['Admin'] after:translate-x-full"
						: "after:content-['Poc']"
				}         `}
							/>
						</label>
					</div>
				) : (
					<div className="my-4">
						<div>
							<label htmlFor="wave" className="block">
								Wave
							</label>
							<select
								id="wave"
								name="wave"
								placeholder="Select Wave"
								className={
									errorForm.wave.value
										? " border-2 bg-primaryDark text-[#a9a9a9] text-md rounded-md  border-primaryPink  focus:ring-green focus:border-green block w-full p-1.5 lg:p-2.5"
										: " border bg-primaryDark text-[#a9a9a9] text-md rounded-md focus:ring-green focus:border-green block w-full p-1.5 lg:p-2.5 appearance-none"
								}
								value={form?.wave?.idwave}
								onChange={(e) =>
									dispatch(changeWavesUsersForm(parseInt(e.target.value)))
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
					</div>
				)}
			</div>
		</>
	);
};

export default AddUserForm;
