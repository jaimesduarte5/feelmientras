import React from "react";
import { BsImages } from "react-icons/bs";
import { TbDownload, TbUpload } from "react-icons/tb";
import { useSelector } from "react-redux";
import templateSU from "../../../assets/templates/plantillaAdmin.csv";
import templatePOC from "../../../assets/templates/plantillaPoc.csv";

const AddUsersTemplate = ({ handleFile, setDragActive, dragActive }) => {
  const { userData } = useSelector((state) => state.login);
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const downloadFile = () => {
    var link = document.createElement("a");
    link.setAttribute(
      "download",
      userData.role === "Poc" ? "templatePOC" : "templateSU"
    );

    link.href = userData.role === "Poc" ? templatePOC : templateSU;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <>
      <div className="flex items-center">
        <button
          onClick={() => downloadFile()}
          className="bg-white p-2 rounded-md text-primaryPink hover:text-white hover:bg-primaryPink transition-all ease-in-out duration-150"
        >
          <TbDownload />
        </button>
        <p className="text-white ml-4">Download Template</p>
      </div>

      <div className="w-full h-40 my-4  bg-white rounded-md relative inline-block">
        <input
          type="file"
          onChange={(e) => handleFile(e)}
          className="w-full bg-green h-full opacity-0 z-40 absolute cursor-pointer"
          onDragEnter={(e) => handleDrag(e)}
          onDragLeave={(e) => handleDrag(e)}
        />

        <div
          className={`bg-white h-40 w-full rounded-md p-3 absolute top-0
        `}
        >
          <div
            className={`relative  h-full w-full rounded-md border-dashed border-primaryPink border-2 transition-all ease-in-out 
        ${dragActive ? "border-dotted bg-primaryDark" : ""}
        flex flex-col items-center justify-center
        `}
          >
            <TbUpload size={30} className="text-primaryPink" />
            <p
              className={`text-sm
            ${dragActive ? "text-white" : ""}
            `}
            >
              Drag & Drop or{" "}
            </p>
            <div>
              <div className="relative w-full">
                <div className="w-full flex justify-between items-center cursor-pointer ">
                  <p className="text-primaryPink mr-3 hover:font-semibold">
                    Browse File
                  </p>
                  <BsImages className="text-primaryPink" />
                </div>
              </div>
            </div>
            <p
              className={`text-sm
            ${dragActive ? "text-white" : ""}
            `}
            >
              to add new Users from .csv template
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUsersTemplate;
