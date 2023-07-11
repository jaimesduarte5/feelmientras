import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ImSearch } from "react-icons/im";
import CalendarMeet from "../../components/eventos/CalendarMeet";
import AddMeeting from "../../components/Modals/AddMeeting";
import Modal from "../../components/Modals/Modal";
import MeetingCard from "../../components/POC/Meetings/MeetingCard";
import { clearMeetingState, getMeetings } from "../../redux/POC/meetingSlice";
import { RotateSpinner } from "react-spinners-kit";

const POCMeetings = () => {
  const dispatch = useDispatch();
  const { isLoading, loadingDayMeet, meetings, dailyMeetings } = useSelector(
    (state) => state.meetingsManage
  );

  const [showModal, setShowModal] = useState(false);
  const [filterText, setFilterText] = useState("");

  useEffect(() => {
    dispatch(getMeetings());
  }, []);

  const handleOpen = () => {
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
  };

  //Seccion de Filtrado de por idccms
  const filteredItems = meetings.filter((meet) =>
    meet.meetName.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="w-full min-h-full bg-primaryDark bg-opacity-75 rounded-lg p-4">
      {/* cabecera  */}
      <div>
        <h3 className="text-primaryPink font-medium text-2xl mb-4">Meetings</h3>
      </div>
      {/* Left content  */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div className="w-full bg-primaryDark rounded-md p-4 bg-opacity-90">
          {/* button and search */}
          <div className="flex flex-col md:flex-row justify-between p-2">
            <button
              onClick={() => {
                handleOpen();
                dispatch(clearMeetingState());
              }}
              className="w-full md:w-auto mb-4 md:mb-0  text-primaryPink font-medium bg-white rounded-md px-3 py-1 hover:bg-primaryPink hover:text-white transition ease-in-out duration-150 "
            >
              New Meeting
            </button>
            <form>
              <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">
                Search
              </label>
              <div className="relative">
                <input
                  className="block p-2 pl-4 w-full text-sm  rounded-lg border  focus:ring-primaryPink focus:border-primaryDark dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search..."
                  value={filterText}
                  onChange={({ target }) => setFilterText(target.value)}
                />
                <button
                  type="submit"
                  disabled
                  className=" absolute right-2.5 bottom-1 hover:bg-primaryDark hover:bg-opacity-50 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <ImSearch className="text-primaryPink" />
                </button>
              </div>
            </form>
          </div>
          <div className="m-2 overflow-y-scroll custom-scroll pr-2 h-96 2xl:h-128 ">
            {isLoading ? (
              <div className="w-full h-56 flex justify-center items-center">
                <RotateSpinner size={60} color="#FF0082" />
              </div>
            ) : meetings.length > 0 ? (
              filteredItems.map((meeting) => (
                <MeetingCard
                  meeting={meeting}
                  key={meeting.idMeet}
                  handleOpen={handleOpen}
                />
              ))
            ) : (
              <p className="bg-white py-5 px-2 rounded-lg text-primaryPink text-center ">
                You do not have meetings, create a meeting in the{" "}
                <span
                  className="font-bold hover:cursor-pointer hover:font-extrabold"
                  onClick={() => handleOpen()}
                >
                  New Meeting{" "}
                </span>
                button{" "}
              </p>
            )}
          </div>
        </div>
        <div className="w.full bg-primaryDark rounded-md p-4 bg-opacity-90">
          <div className="m-2 overflow-y-scroll custom-scroll pr-2 h-[27.5rem] 2xl:h-[47rem] ">
            <CalendarMeet />

            {/* meetings card  */}
            {loadingDayMeet ? (
              <div className="min-h-[3rem] md:min-h-[5rem] bg-white rounded-lg mt-2 px-4 flex justify-center items-center">
                <RotateSpinner size={30} color="#FF0082" />
              </div>
            ) : dailyMeetings.length > 0 ? (
              dailyMeetings.map((meet) => (
                <div
                  key={meet.idMeet}
                  className="min-h-[3rem] md:min-h-[5rem] bg-white rounded-lg mt-2 px-4 md:px-12 py-4 flex items-center justify-between"
                >
                  <p className="text-primaryPink  font-semibold text-sm">
                    {meet.meetName}
                  </p>
                  <p className="text-primaryPink  font-semibold text-xs w-28 ">
                    {meet.hourIniMeet} - {meet.hourEndMeet}
                  </p>
                </div>
              ))
            ) : (
              <p className="min-h-[3rem] md:min-h-[5rem] bg-white rounded-lg mt-2 px-4 md:px-12 py-4 flex items-center justify-between text-primaryPink">
                No Meetings today
              </p>
            )}
          </div>
        </div>
      </div>
      <Modal onClose={() => {}} visible={showModal}>
        <AddMeeting onClose={handleClose} />
      </Modal>
    </div>
  );
};

export default POCMeetings;
