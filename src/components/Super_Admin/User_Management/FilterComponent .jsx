import { BiEraser } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  campaignFilter,
  lobFilter,
} from "../../../redux/SuperAdmin/userManagementSlice";

const FilterComponent = ({ filterText, onFilter, onClear }) => {
  const dispatch = useDispatch();
  const { campaigns, lobs, campaignSelected, lobSelected, filterLob } =
    useSelector((state) => state.usrManage);

  return (
    <div className="flex mb-4 w-full justify-between  items-center flex-col md:flex-row">
      <div className="w-full flex flex-col md:flex-row">
        <select
          className="mr-4 bg-white shadow-md shadow-primaryPurple relative w-full md:w-52 p-2 rounded-md text-primaryPink font-semibold "
          placeholder="Campaign"
          value={campaignSelected}
          onChange={(e) => dispatch(campaignFilter(e.target.value))}
        >
          <option value={"All"} className="font-semibold">
            All
          </option>
          {campaigns.map((campaign, index) => (
            <option
              key={campaign.name + index}
              value={`${campaign.name}-${campaign.id}`}
              className="font-semibold"
            >
              {campaign.name}
            </option>
          ))}
        </select>

        <select
          className=" bg-white shadow-md shadow-primaryPurple relative my-4 md:my-0 w-full md:w-52 p-2 rounded-md text-primaryPink font-semibold"
          placeholder="LOB"
          value={lobSelected}
          disabled={campaignSelected === "All"}
          onChange={(e) => dispatch(lobFilter(e.target.value))}
        >
          <option value={"All"} className="font-semibold">
            All
          </option>
          {filterLob.map((lob, index) => (
            <option
              key={lob.name + index}
              value={`${lob.name}-${lob.id}`}
              className="font-semibold"
            >
              {lob.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex w-full md:w-52">
        <input
          type="text"
          placeholder="Search User"
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

export default FilterComponent;
