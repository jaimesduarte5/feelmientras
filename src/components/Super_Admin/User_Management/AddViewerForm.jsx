import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { addViewer } from "../../../redux/SuperAdmin/userManagementSlice";

const AddViewerForm = ({ handleSubmit, error }) => {
  const dispatch = useDispatch();
  const { viewer } = useSelector((state) => state.usrManage);
  const { campaigns } = useSelector((state) => state.usrManage);
  const [showPassword, setShowPassword] = useState(false);

  const handleAddViewer = (e) => {
    e.preventDefault();
    const { target } = e;
    dispatch(addViewer({ [target.name]: target.value }));
  };

  const {
    name,
    lastname,
    email,
    password,
    country,
    idCampaign,
    rol,
    action,
    tpToken,
  } = viewer;

  const handleSeePasword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className=" bg-white rounded-md w-full p-4 h-auto  ease-in-out transition-[max-height] duration-1000 "
    >
      <div>
        <label className="block text-left">Name</label>
        <input
          type="text"
          name="name"
          value={name || ""}
          onChange={(e) => handleAddViewer(e)}
          placeholder="Add User Name"
          className={`bg-primaryDark p-1.5 rounded-md w-full text-white border 
          ${error && !name ? "border-primaryPink" : "border-primaryDark"}
          `}
        />
      </div>
      <div>
        <label className="block text-left">Last Name</label>
        <input
          type="text"
          name="lastname"
          value={lastname || ""}
          onChange={(e) => handleAddViewer(e)}
          placeholder="Add Last Name"
          className={`bg-primaryDark p-1.5 rounded-md w-full text-white border 
          ${error && !lastname ? "border-primaryPink" : "border-primaryDark"}
          `}
        />
      </div>
      <div>
        <label className="block text-left">Email</label>
        <input
          type="email"
          name="email"
          required={true}
          value={email || ""}
          onChange={(e) => handleAddViewer(e)}
          placeholder="email@feel.teleperformance.com"
          className={`bg-primaryDark p-1.5 rounded-md w-full text-white border 
          ${error && !email ? "border-primaryPink" : "border-primaryDark"}
          `}
        />
      </div>
      {rol === "Viewer" && (
        <>
          {/* SET PASSWORD */}
          <div>
            <label className="block text-left">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password || ""}
                onChange={(e) => handleAddViewer(e)}
                placeholder={tpToken ? "************" : "Add password"}
                className={`bg-primaryDark p-1.5 rounded-md w-full text-white border 
          ${error && !password ? "border-primaryPink" : "border-primaryDark"}
          `}
              />
              <div className="absolute top-0 right-1 p-2 ">
                <button onClick={handleSeePasword} className="text-primaryPink">
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
              </div>
            </div>
          </div>
          {/* SELECT ACCOUNT */}
          <div>
            <label htmlFor="idCampaign" className="block text-left">
              Account
            </label>
            <select
              name="idCampaign"
              disabled={action ? true : false}
              value={idCampaign}
              onChange={(e) => handleAddViewer(e)}
              className={` bg-primaryDark text-[#a9a9a9] text-md rounded-md  block w-full p-1.5 lg:p-2.5
              border 
          ${error && !idCampaign ? "border-primaryPink" : "border-primaryDark"}
          `}
            >
              <option value="">Select Account</option>
              {campaigns.map(({ id, name }) => (
                <option value={id} key={id}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
      {/* SELECT COUNTRY */}
      <div>
        <label htmlFor="country" className="block text-left">
          Country
        </label>
        <select
          defaultValue="Select Country"
          id="country"
          disabled={action ? true : false}
          name="country"
          value={country}
          className={`border bg-primaryDark text-[#a9a9a9] text-md rounded-md  block w-full p-1.5 lg:p-2.5
          ${error && !country ? "border-primaryPink" : "border-primaryDark"}
          `}
          onChange={(e) => handleAddViewer(e)}
        >
          <option value="">Select Country</option>
          {["Colombia", "Peru", "Nicaragua", "Guyana", "Trinidad y Tobago"].map(
            (country) => (
              <option value={country} key={country}>
                {country}
              </option>
            )
          )}
        </select>
      </div>
    </form>
  );
};

export default AddViewerForm;
