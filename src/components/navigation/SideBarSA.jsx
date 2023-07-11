import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineHome, HiOutlineUserGroup } from "react-icons/hi";
import { AiOutlineDatabase, AiTwotoneExperiment } from "react-icons/ai";
import { SiMicrobit } from "react-icons/si";

const rutas = [
  { ruta: "/admin/home" },
  { ruta: "/admin/userManagement" },
  { ruta: "/admin/campaignContent" },
  { ruta: "/admin/contentManagement" },
  { ruta: "/admin/externalContentManagement" },
];

export const Ruta = ({ pathname, ruta }) => {
  return (
    <Link to={ruta}>
      <span
        className={`text-white h-12 w-12 rounded-md hover:border  hover:text-primaryPink flex justify-center items-center mb-4
    ${pathname === ruta ? "border border-primaryPink text-primaryPink " : ""}`}
      >
        {ruta === "/admin/home" && (
          <HiOutlineHome size={25} color={pathname === ruta ? "#FF0082" : ""} />
        )}
        {ruta === "/admin/userManagement" && (
          <HiOutlineUserGroup
            size={25}
            color={pathname === ruta ? "#FF0082" : ""}
          />
        )}
        {ruta === "/admin/campaignContent" && (
          <AiOutlineDatabase
            size={25}
            color={pathname === ruta ? "#FF0082" : ""}
          />
        )}
        {ruta === "/admin/contentManagement" && (
          <AiTwotoneExperiment
            size={25}
            color={pathname === ruta ? "#FF0082" : ""}
          />
        )}
        {ruta === "/admin/externalContentManagement" && (
          <SiMicrobit size={25} color={pathname === ruta ? "#FF0082" : ""} />
        )}
      </span>
    </Link>
  );
};

const SideBarSA = ({ pathname }) => {
  return (
    <nav className="flex flex-col justify-center items-center">
      {rutas.map((ruta) => (
        <Ruta pathname={pathname} ruta={ruta.ruta} key={ruta.ruta} />
      ))}
    </nav>
  );
};

export default SideBarSA;
