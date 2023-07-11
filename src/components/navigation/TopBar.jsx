import React, { useState, useEffect } from "react";

import { IoMdNotificationsOutline } from "react-icons/io";
import { TbMessageCircle } from "react-icons/tb";
import { HiCog } from "react-icons/hi";
import { RiArrowDownSLine } from "react-icons/ri";
import MenuEmergente from "./MenuEmergente";
import logoFeel from "../../assets/img/feel_logo_light.png";
import logoTP from "../../assets/img/tpLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { getMeetings } from "../../redux/POC/meetingSlice";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { meetings } = useSelector((state) => state.meetingsManage);
  useEffect(() => {
    dispatch(getMeetings());
  }, []);
  const [showMenu, setShowMenu] = useState(false);
  const { userData } = useSelector((state) => state.login);

  return (
    <div className="h-20 bg-primaryDark w-full flex ">
      <div className="shapeimageTP">
        <div className="imageTP">
          <img src={logoTP} alt="Logo TP" height={30} width={30} />
        </div>
      </div>
      <div className="flex items-center justify-end sm:justify-between w-full sm:px-8  ">
        <div className="hidden sm:block">
          <img src={logoFeel} alt="Logo feel" height={30} width={120} />
        </div>
        <div className=" flex items-center w-80 justify-between px-2">
          <div className="relative">
            {showMenu && (
              <div
                className={`absolute transition ease-in-out duration-150 top-12 ${
                  showMenu ? "left-5 " : "left-60  "
                } `}
              >
                <MenuEmergente setShowMenu={setShowMenu} />
              </div>
            )}
          </div>
          <div>
            <button className="relative text-white border border-white rounded-full p-1 mr-2 hover:border-primaryPink hover:text-primaryPink hover:scale-105">
              <IoMdNotificationsOutline size={15} />

              {meetings.length > 0 && (
                <div
                  className="absolute inline-flex items-center justify-center w-4 h-4 text-[8px] font-bold text-white bg-primaryPink border-1
               border-white rounded-full -top-2 -right-2 dark:border-gray-900"
                  onClick={() => navigate("/user/home#meetings")}
                  href="#meetings"
                >
                  {meetings.length}
                </div>
              )}
            </button>

            <button className="text-white border border-white rounded-full p-1 mr-2 hover:border-primaryPink hover:text-primaryPink hover:scale-105">
              <TbMessageCircle size={15} />
            </button>
            <button className="text-white  border border-white rounded-full p-1 mr-2 hover:border-primaryPink hover:text-primaryPink hover:scale-105 ">
              <HiCog size={15} />
            </button>
          </div>
          <div
            onClick={() => setShowMenu(!showMenu)}
            className="text-white  hover:text-primaryPink border border-l-white border-r-0 border-t-0 border-b-0 pl-2 flex flex-1 cursor-pointer"
          >
            <div className="rounded-full bg-primaryPurple h-10 w-10"></div>
            <div className="flex pl-2 justify-between items-center flex-1">
              <div>
                <p className="text-sm">{userData.nombre || ""}</p>
                <p className="text-xs">{userData.role || ""}</p>
              </div>
              <RiArrowDownSLine size={22} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
