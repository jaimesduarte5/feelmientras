import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logoutAction } from "../redux/loginSlice";
import { useNavigate } from "react-router-dom";
import LogoFeel from "../assets/img/feelLogo.png";

const LogoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logoutAction());
  }, []);

  return (
    <div className="flex flex-col min-h-screen items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-primaryDark ">
      {/* Logo Feel */}
      <div className="w-50">
        <img src={LogoFeel} alt="Logo Feel" height={80} width={320} />
      </div>

      <div className="w-full max-w-xs">
        <div className="flex items-center justify-center mb-3 mt-3">
          <button
            className="bg-gradient-to-t from-primaryPink to-primaryPurple text-white font-bold py-3 px-8 rounded focus:outline-none focus:shadow-outline"
            onClick={() => navigate("/login")}
          >
            LOGIN
          </button>
        </div>
        <p className="text-center text-white text-xs">
          WSO2 Identity Server | &copy;2022 Inc. <br /> All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LogoutPage;
