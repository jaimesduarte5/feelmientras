import { BiEraser } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { showWaveModal } from "../../../redux/POC/waveFormSlice";

const FilterComponentPOC = ({ filterText, onFilter, onClear, handleOpen }) => {
	const dispatch = useDispatch();
	return (
		<div className="flex  w-full justify-between  items-center flex-col md:flex-row">
			<div className="w-full flex flex-col md:flex-row">
				<button
					onClick={() => handleOpen()}
					className="mb-4 md:mb-0  text-primaryPink font-medium bg-white rounded-md px-3 py-2 hover:bg-primaryPink hover:text-white transition ease-in-out duration-150 "
				>
					New Agent
				</button>
				<button
					onClick={() => {
						dispatch(showWaveModal(true));
						handleOpen();
					}}
					className="mb-4 md:mb-0 ml-3 text-primaryPink font-medium bg-white rounded-md px-3 py-2 hover:bg-primaryPink hover:text-white transition ease-in-out duration-150 "
				>
					Manage Waves
				</button>
			</div>
			<div className="flex w-full md:w-52">
				<input
					type="text"
					placeholder="Search CCMS"
					aria-label="Search Input"
					value={filterText}
					onChange={onFilter}
					className="rounded-l-md px-2 py-2 w-full "
				/>
				<button
					onClick={onClear}
					className=" bg-white -left-6 rounded-r-md w-8 top-1  text-primaryPink text-lg hover:text-xl text-center"
				>
					<BiEraser />
				</button>
			</div>
		</div>
	);
};

export default FilterComponentPOC;
