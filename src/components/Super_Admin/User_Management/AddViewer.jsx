import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddViewerForm from "./AddViewerForm";
import { addViewer } from "../../../redux/SuperAdmin/userManagementSlice";
import {
  fullLoadingOff,
  fullLoadingOn,
  showConfirmation,
  showToast,
} from "../../../redux/alertsSlice";
import { validateFormViewer } from "../../../helpers/errorViewerHelper";
import { TbDownload, TbUpload } from "react-icons/tb";
import { BsImages } from "react-icons/bs";
import templateViewer from "../../../assets/templates/plantillaViewer.csv";
import {
  dataToSendViewer,
  feedbackSheetViewer,
  validateFieldsViewer,
  validateHeaders,
} from "../../../helpers/templateHelper";
import * as XLSX from "xlsx";

const AddViewer = ({ onClose }) => {
  const dispatch = useDispatch();
  const { viewer } = useSelector((state) => state.usrManage);
  const { rol, action } = viewer;
  const [error, setError] = useState(false);

  const [entrance, setEntrance] = useState(rol === "TP Viewer" ? true : false);
  useEffect(() => {
    let rol = entrance ? "TP Viewer" : "Viewer";
    dispatch(addViewer({ rol }));
  }, [entrance]);

  const handleSubmit = (e) => {
    //Validacion de los campos del formulario
    const validate = validateFormViewer(viewer); // consulta al helper
    setError(validate.error);
    if (validate.error) {
      dispatch(
        showToast({
          type: "warning",
          title: "Warning!",
          msj: validate.msg,
          show: true,
          duration: 4000,
        })
      );
      return;
    }

    // Solicita la confirmacion para la creacion del nuevo viewer
    if (action) {
      dispatch(
        showConfirmation({
          data: viewer,
          title: "Action Validation",
          msj: "Are you sure you want to perform this process?",
          tag: "editViewer",
        })
      );
    } else {
      dispatch(
        showConfirmation({
          data: viewer,
          title: "Action Validation",
          msj: "Are you sure you want to create this viewer?",
          tag: "createViewer",
        })
      );
    }

    onClose();
  };

  /////////////////////////inicio viewer masivo/////////////////////////////////////////
  const [dragActive, setDragActive] = useState(false);
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleFile = async (e) => {
    dispatch(fullLoadingOn());
    setDragActive(false);
    let fileCSV = e.target.files[0];
    if (
      fileCSV === undefined ||
      (fileCSV.type !== "text/csv" &&
        fileCSV.type !== "application/vnd.ms-excel")
    ) {
      dispatch(fullLoadingOff());
      dispatch(
        showToast({
          type: "warning",
          title: "Only files in .csv format",
          msj: "You are trying to upload the file in another format",
          show: true,
          duration: 4000,
        })
      );
      e.target.value = null;
    } else {
      try {
        const data = await loadFile(fileCSV);
        const dts = dataToSendViewer(data, data);
        ////////////////////////////////////////////////hacer dispatch a DB
        console.log(dts);
        //dispatch(dataTemplate(dts));
        dispatch(fullLoadingOff());
        setDragActive(true);
      } catch (error) {
        dispatch(fullLoadingOff());
        if (error.title === "Invalid Values") {
          //aqui va el feedback

          feedbackSheetViewer(error.data.rep);
          dispatch(fullLoadingOff());
          dispatch(
            showToast({
              type: "warning",
              title: error.title,
              msj: error.feedback,
              show: true,
              duration: 4000,
            })
          );
          e.target.value = null;
          return;
        }
        dispatch(fullLoadingOff());
        dispatch(
          showToast({
            type: "warning",
            title: error.title,
            msj: error.feedback,
            show: true,
            duration: 4000,
          })
        );
        e.target.value = null;
        return;
      }
    }
  };

  const loadFile = (fileCSV) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        //Parse data
        const ab = e.target.result;
        const wb = XLSX.readFile(ab, {
          type: "array",
          cellDates: true,
          cellText: false,
          cellNF: false,
        });
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        const data = XLSX.utils.sheet_to_json(ws, {
          header: 1,
          defval: "",
          blankrows: true,
          raw: true,
        });
        if (data.length > 1 && !data.error) {
          if (data.length < 401) {
            let differentsHeaders = validateHeaders(data[0]);
            if (differentsHeaders.length > 0) {
              reject({
                title: "Wrong Headers!",
                feedback: `${differentsHeaders} headers are wrong`,
              });
              return;
            }
            data.shift();
            let validateField = validateFieldsViewer(data);

            if (validateField.rep.length > 0) {
              reject({
                title: "Invalid Values",
                feedback: "Some Fields are wrong",
                data: validateField,
              });
              return;
            }
            resolve(data);
          } else {
            reject({
              title: "Max 400 records",
              feedback: "Try to load more than 400 records",
            });
          }
        }
      };
      reader.readAsArrayBuffer(fileCSV);
    });
  };

  const downloadFile = () => {
    var link = document.createElement("a");
    link.setAttribute("download", "templateViewer");

    link.href = templateViewer;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  /////////////////////////fin viewer masivo/////////////////////////////////////////

  return (
    <div className="bg-primaryDark w-96 p-4 rounded-md ">
      <div className=" text-center my-4">
        <h3 className="text-xl font-semibold text-primaryPink ">
          {/* {editParams ? "Edit User" : "Add New User"} */}{" "}
          {action || "Add new "} Viewer
        </h3>
        <div>
          <div>
            <label
              htmlFor="entrance"
              className="inline-flex relative items-center cursor-pointer mt-4 "
            >
              <input
                type="checkbox"
                value={entrance}
                disabled={action ? true : false}
                id="entrance"
                className="sr-only peer"
                name="entrance"
                onChange={() => setEntrance(!entrance)}
              />
              <div
                className={`w-[304px] lg:w-80 h-8 bg-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 
      								 rounded-md peer  
      								 peer-checked:after:border-primaryPink  after:absolute   
      								 after:bg-primaryPink  after:rounded-md after:h-full after:w-[152px]  after:lg:w-40  after:transition-all
      								 after:flex after:justify-center after:items-center after:font-bold after:text-white
      								 ${
                         entrance === true
                           ? "after:content-['TP-Viewer'] after:translate-x-full"
                           : "after:content-['Viewer']"
                       }         `}
              />
            </label>
          </div>
          {/* Add Vievwer from File .csv */}
          {/* <div className="flex items-center">
            <div className="w-full h-20 my-2  bg-white rounded-md relative inline-block">
              <input
                type="file"
                onChange={(e) => handleFile(e)}
                className="w-full bg-green h-full opacity-0 z-40 absolute cursor-not-allowed"
                onDragEnter={(e) => handleDrag(e)}
                onDragLeave={(e) => handleDrag(e)}
                disabled={true}
              />

              <div
                className={`bg-white h-20 w-full rounded-md p-3 absolute top-0
        `}
              >
                <div
                  className={`relative  h-full w-full rounded-md border-dashed border-primaryPink border-2 transition-all ease-in-out 
        ${dragActive ? "border-dotted bg-primaryDark" : ""}
        flex flex-col items-center justify-center
        `}
                >
                  <div>
                    <div className="relative w-full">
                      <div className="w-full flex justify-between items-center cursor-pointer ">
                        <p className="text-primaryPink mr-3 hover:font-semibold">
                          Browse File
                        </p>
                        <TbUpload size={15} className="text-primaryPink" />
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
          </div> */}

          <AddViewerForm handleSubmit={handleSubmit} error={error} />
        </div>
      </div>
      <div className="text-right mt-4 mb-4 ">
        {/* download template */}
        {/* <button
          onClick={downloadFile}
          className="py-2 px-6 mr-8 text-primaryPink font-bold bg-white rounded-md hover:scale-95 transition-all ease-in-out duration-150 hover:shadow hover:shadow-primaryPink"
        >
          Dt
        </button> */}
        <button
          onClick={onClose}
          className="py-2 px-6 mr-8 text-primaryPink font-bold bg-white rounded-md hover:scale-95 transition-all ease-in-out duration-150 hover:shadow hover:shadow-primaryPink"
        >
          Close
        </button>
        {action ? (
          <button
            className="py-2 px-6 text-white font-bold bg-gradient-to-t from-primaryPink to-primaryPurple rounded-md hover:scale-95 transition-all ease-in-out duration-150  hover:shadow hover:shadow-primaryPink"
            onClick={handleSubmit}
          >
            {action}
          </button>
        ) : (
          <button
            className="py-2 px-6 text-white font-bold bg-gradient-to-t from-primaryPink to-primaryPurple rounded-md hover:scale-95 transition-all ease-in-out duration-150  hover:shadow hover:shadow-primaryPink"
            onClick={handleSubmit}
          >
            Create
          </button>
        )}
      </div>
    </div>
  );
};

export default AddViewer;
