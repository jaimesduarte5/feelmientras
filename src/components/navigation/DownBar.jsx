import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

import DownBarSA from "./DownBarSA";
import DownBarPOC from "./DownBarPOC";
import DownBarAgent from "./DownBarAgent";

const DownBar = () => {
  const location = useLocation();
  const { userData } = useSelector((state) => state.login);
  const { role } = userData;
  const { pathname } = location;

  return (
    <div className="navigation bg-white w-full h-16 fixed bottom-0 z-50 flex justify-center items-center rounded-md md:hidden">
      {role === "Super Admin" && <DownBarSA pathname={pathname} />}
      {role === "Poc" && <DownBarPOC pathname={pathname} />}
      {role === "Agent" && <DownBarAgent pathname={pathname} />}
    </div>
  );
};

export default DownBar;
