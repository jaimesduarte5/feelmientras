import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { funcVal } from "../../../helpers/usersHelper";
import { dataTemplate, formValidate } from "../../../redux/usersFormSlice";
import * as XLSX from "xlsx";
import AddUserForm from "./AddUserForm";
import AddUsersTemplate from "./AddUsersTemplate";
import {
  dataToSendAdmin,
  feedbackSheet,
  validateFields,
  validateHeaders,
} from "../../../helpers/templateHelper";
import {
  fullLoadingOff,
  fullLoadingOn,
  showConfirmation,
  showToast,
} from "../../../redux/alertsSlice";

const AddUsers = ({ onClose }) => {
  const dispatch = useDispatch();
  const { form, templateRows, editParams } = useSelector(
    (state) => state.usrForm
  );
  const { userData } = useSelector((state) => state.login);
  const [dragActive, setDragActive] = useState(false);
  const [entrance, setEntrance] = useState(true);

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
        const dts = dataToSendAdmin(data, userData);
        dispatch(dataTemplate(dts));
        dispatch(fullLoadingOff());
        setDragActive(true);
      } catch (error) {
        dispatch(fullLoadingOff());
        if (error.title === "Invalid Values") {
          //aqui va el feedback

          feedbackSheet(error.data.rep, userData);
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
            let validateField = validateFields(data, userData);

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

  const handleSubmit = async () => {
    if (editParams) {
      //tener en cuenta los datos de la peticion
      dispatch(
        showConfirmation({
          data: form,
          title: "Action Validation",
          msj: "Are you sure you want to perform this process?",
          tag: "updateUser",
        })
      );
    } else {
      if (entrance) {
        const val = funcVal(form);
        if (val.error) {
          dispatch(formValidate(val.errorForm));
        } else {
          let dts = [
            form.ccms,
            0,
            form.name,
            form.lastname,
            form.email,
            form.position,
            form.inDate,
            form.country,
            form.role,
            form.wave.idwave ? form.wave.idwave : 0,
            userData.idLob,
            userData.idCampaign,
            "",
          ];

          dispatch(
            showConfirmation({
              data: [dts],
              title: "Action Validation",
              msj: "Are you sure you want to perform this process?",
              tag: "createUsers",
            })
          );
        }
        //aqui
      } else {
        if (templateRows.length === 0) {
          dispatch(
            showToast({
              type: "warning",
              title: "Empty Input File",
              msj: "Try to load a file",
              show: true,
              duration: 4000,
            })
          );
        } else {
          dispatch(
            showConfirmation({
              data: templateRows,
              title: "Action Validation",
              msj: "Are you sure you want to perform this process?",
              tag: "createUsers",
            })
          );
        }
      }
    }
  };

  return (
    <>
      <div className="bg-primaryDark w-96 p-4 rounded-md ">
        <div className=" text-center my-4">
          <h3 className="text-xl font-semibold text-primaryPink ">
            {editParams ? "Edit User" : "Add New User"}
          </h3>

          <div>
            <label
              htmlFor="entrance"
              className="inline-flex relative items-center cursor-pointer mt-4 "
            >
              <input
                type="checkbox"
                value={entrance}
                disabled={editParams}
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
                           ? "after:content-['Form'] after:translate-x-full"
                           : "after:content-['Template']"
                       }         `}
              />
            </label>
          </div>
        </div>
        {/* Upload File */}
        {entrance ? (
          <AddUserForm />
        ) : (
          <AddUsersTemplate
            handleFile={handleFile}
            setDragActive={setDragActive}
            dragActive={dragActive}
          />
        )}

        <div className="text-right mt-4 mb-4 ">
          <button
            onClick={onClose}
            className="py-2 px-6 mr-8 text-primaryPink font-bold bg-white rounded-md hover:scale-95 transition-all ease-in-out duration-150 hover:shadow hover:shadow-primaryPink"
          >
            Close
          </button>
          {editParams ? (
            <button
              className="py-2 px-6 text-white font-bold bg-gradient-to-t from-primaryPink to-primaryPurple rounded-md hover:scale-95 transition-all ease-in-out duration-150  hover:shadow hover:shadow-primaryPink"
              onClick={handleSubmit}
            >
              Edit
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
    </>
  );
};

export default AddUsers;
