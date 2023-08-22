import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineHome } from "react-icons/hi";
import { TbBooks } from "react-icons/tb";

const rutas = [{ ruta: "/user/home" }, { ruta: "/user/my-activities" }];

export const Ruta = ({ pathname, ruta }) => {
  return (
    <Link to={ruta}>
      <span
        className={`text-white h-12 w-12 rounded-md hover:border  hover:text-primaryPink flex justify-center items-center mb-4
    ${pathname === ruta ? "border border-primaryPink text-primaryPink " : ""}`}
      >
        {ruta === "/user/home" && (
          <HiOutlineHome size={25} color={pathname === ruta ? "#FF0082" : ""} />
        )}
        {ruta === "/user/my-activities" && (
          <TbBooks size={25} color={pathname === ruta ? "#FF0082" : ""} />
        )}
      </span>
    </Link>
  );
};

const SideBarAgent = ({ pathname }) => {
  return (
    <nav className="flex flex-col justify-center items-center">
      {rutas.map((ruta) => (
        <Ruta pathname={pathname} ruta={ruta.ruta} key={ruta.ruta} />
      ))}
    </nav>
  );
};

export default SideBarAgent;
