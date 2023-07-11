import { Link } from "react-router-dom";
import { HiOutlineHome, HiOutlineUserGroup } from "react-icons/hi";
import { AiOutlineDatabase, AiTwotoneExperiment } from "react-icons/ai";
import { TfiPieChart } from "react-icons/tfi";
import { HiOutlineBookOpen } from "react-icons/hi";
import { FaChalkboardTeacher } from "react-icons/fa";

export const MenuItem = ({ pathname, url, name }) => {
  return (
    <li
      className={`group/list relative h-16 z-10 ${
        pathname === url ? "w-16" : "w-12 sm:w-16"
      } `}
    >
      <Link
        to={url}
        className="h-full relative flex justify-center items-center flex-col
        text-center font-semibold w-full "
      >
        <span
          className={`icon relative block  transition-all ease-in-out duration-150 group-hover/list:-translate-y-8
        group-hover/list:bg-primaryDark group-hover/list:p-3 group-hover/list:text-primaryPink group-hover/list:rounded-full group-hover/list:border-8 group-hover/list:border-secondaryDark
        ${
          pathname === url
            ? "-translate-y-8 bg-primaryDark p-3 text-primaryPink  rounded-full border-8 border-secondaryDark"
            : ""
        }`}
        >
          {url === "/home" && <HiOutlineHome size={23} />}
          {url === "/poc/userManagement" && <HiOutlineUserGroup size={23} />}
          {url === "/poc/learningPlan" && <AiOutlineDatabase size={23} />}
          {url === "/poc/coursesManagement" && <HiOutlineBookOpen size={23} />}
          {url === "/poc/contentManagement" && (
            <AiTwotoneExperiment size={23} />
          )}
          {url === "/poc/meetings" && <FaChalkboardTeacher size={23} />}
          {url === "/poc/analytics" && <TfiPieChart size={23} />}
        </span>
        <span
          className={`absolute text-xs tracking-wider transition-all duration-150 ease-in-out opacity-0 
    group-hover/list:opacity-100 group-hover/list:translate-y-2 
    ${pathname === url ? "opacity-100 translate-y-2" : ""}`}
        >
          {name}
        </span>
      </Link>
    </li>
  );
};

const DownBarPOC = ({ pathname }) => {
  return (
    <ul className="flex ">
      <MenuItem pathname={pathname} url={"/home"} name="Home" />
      <MenuItem pathname={pathname} url={"/poc/userManagement"} name="Users" />
      <MenuItem pathname={pathname} url={"/poc/learningPlan"} name="Plans" />
      <MenuItem
        pathname={pathname}
        url={"/poc/coursesManagement"}
        name="Courses"
      />
      <MenuItem
        pathname={pathname}
        url={"/poc/contentManagement"}
        name="Content"
      />
      <MenuItem pathname={pathname} url={"/poc/meetings"} name="Meets" />
      <MenuItem pathname={pathname} url={"/poc/analytics"} name="Analytics" />
    </ul>
  );
};

export default DownBarPOC;
