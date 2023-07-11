import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineHome, HiOutlineUserGroup } from "react-icons/hi";
import { AiOutlineDatabase, AiTwotoneExperiment } from "react-icons/ai";
import { SiMicrobit } from "react-icons/si";

// Componente que renderiza las listas con los enlaces
export const MenuItem = ({ pathname, url, name }) => {
  return (
    <li className="group/list relative h-16 w-16 z-10 ">
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
          {url === "/admin/home" && <HiOutlineHome size={23} />}
          {url === "/admin/userManagement" && <HiOutlineUserGroup size={23} />}
          {url === "/admin/campaignContent" && <AiOutlineDatabase size={23} />}
          {url === "/admin/contentManagement" && (
            <AiTwotoneExperiment size={23} />
          )}
          {url === "/admin/externalContentManagement" && (
            <SiMicrobit size={23} />
          )}
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

// Componente que muestra el menu
const DownBarSA = ({ pathname }) => {
  return (
    <ul className="flex ">
      <MenuItem pathname={pathname} url={"/admin/home"} name="Home" />
      <MenuItem
        pathname={pathname}
        url={"/admin/userManagement"}
        name="Users"
      />
      <MenuItem
        pathname={pathname}
        url={"/admin/campaignContent"}
        name="Campaign"
      />
      <MenuItem
        pathname={pathname}
        url={"/admin/contentManagement"}
        name="Content"
      />
      <MenuItem
        pathname={pathname}
        url={"/admin/externalContentManagement"}
        name="External"
      />
    </ul>
  );
};

export default DownBarSA;
