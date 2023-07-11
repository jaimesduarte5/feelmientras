import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineHome, HiOutlineUserGroup } from "react-icons/hi";
import { AiOutlineDatabase, AiTwotoneExperiment } from "react-icons/ai";
import { TfiPieChart } from "react-icons/tfi";
import { HiOutlineBookOpen } from "react-icons/hi";
import { FaChalkboardTeacher } from "react-icons/fa";

const rutas = [
  { ruta: "/home" },
  { ruta: "/poc/userManagement" },
  { ruta: "/poc/learningPlan" },
  { ruta: "/poc/contentManagement" },
  { ruta: "/poc/coursesManagement" },
  { ruta: "/poc/meetings" },
  { ruta: "/poc/analytics" },
];

export const Ruta = ({ pathname, ruta }) => {
  return (
    <Link to={ruta}>
      <span
        className={`text-white h-12 w-12 rounded-md hover:border  hover:text-primaryPink flex justify-center items-center mb-4
    ${pathname === ruta ? "border border-primaryPink text-primaryPink " : ""}`}
      >
        {ruta === "/home" && (
          <HiOutlineHome size={25} color={pathname === ruta ? "#FF0082" : ""} />
        )}
        {ruta === "/poc/userManagement" && (
          <HiOutlineUserGroup
            size={25}
            color={pathname === ruta ? "#FF0082" : ""}
          />
        )}
        {ruta === "/poc/learningPlan" && (
          <AiOutlineDatabase
            size={25}
            color={pathname === ruta ? "#FF0082" : ""}
          />
        )}
        {ruta === "/poc/coursesManagement" && (
          <HiOutlineBookOpen
            size={25}
            color={pathname === ruta ? "#FF0082" : ""}
          />
        )}
        {ruta === "/poc/contentManagement" && (
          <AiTwotoneExperiment
            size={25}
            color={pathname === ruta ? "#FF0082" : ""}
          />
        )}
        {ruta === "/poc/meetings" && (
          <FaChalkboardTeacher
            size={25}
            color={pathname === ruta ? "#FF0082" : ""}
          />
        )}
        {ruta === "/poc/analytics" && (
          <TfiPieChart size={25} color={pathname === ruta ? "#FF0082" : ""} />
        )}
      </span>
    </Link>
  );
};

const SideBarPOC = ({ pathname }) => {
  return (
    <nav className="flex flex-col justify-center items-center">
      {rutas.map((ruta) => (
        <Ruta pathname={pathname} ruta={ruta.ruta} key={ruta.ruta} />
      ))}
    </nav>
  );
};

export default SideBarPOC;
