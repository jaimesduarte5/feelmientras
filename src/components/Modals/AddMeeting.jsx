import React, { useState, useEffect } from "react";
import { BiCloudUpload } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { RotateSpinner } from "react-spinners-kit";
import { upFileData } from "../../apis/requestTypes";
import { valMeeting } from "../../helpers/meetingHelper";
import { showConfirmation } from "../../redux/alertsSlice";
import { upfileFB, upImageMeet } from "../../redux/firebase/courseManageSlice";
import { addMeeting, errorsMeetValidation } from "../../redux/POC/meetingSlice";

const errorsMeet = {
  meetName: { status: false, msj: "The name of the meeting is required" },
  meetDescription: {
    status: false,
    msj: "All meeting require a description",
  },
  dateMeet: { status: false, msj: "You need a to schedule the meeting" },
  hourIniMeet: { status: false, msj: "Start time missing" },
  hourEndMeet: { status: false, msj: "End time missing" },
  urlImgMeet: { status: false, msj: "The Image of the meeting is required" },
  urlMeet: { status: false, msj: "Add the url meeting" },
};

const defaultImage =
  "https://firebasestorage.googleapis.com/v0/b/firebase-296723.appspot.com/o/other%2Ffeel.png?alt=media&token=d2073e36-bbea-4ef8-b6a0-f8b210065126";
const AddMeeting = ({ onClose }) => {
  const dispatch = useDispatch();
  const { url, progress, isLoading } = useSelector(
    (state) => state.fileManageFB
  );
  const { newMeet } = useSelector((state) => state.meetingsManage);
  const [errors, setErrors] = useState(errorsMeet);
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);

  // Verifica que si ya existe una url de una imagen cargada
  useEffect(() => {
    if (!newMeet.idMeet) {
      dispatch(addMeeting({ name: "urlImgMeet", value: defaultImage }));
    }

    if (url) {
      dispatch(addMeeting({ name: "urlImgMeet", value: url }));
    }
  }, [url]);

  // Asigna los valores del formulario al estado de newMeet
  const handleMeet = (e) => {
    dispatch(addMeeting({ name: e.target.name, value: e.target.value }));
  };

  //Dispara la carga del archivo de una actividad a Firebase
  const updateFiles = async () => {
   
    dispatch(upfileFB({ loading: true }));
    let f = new FormData();
    let bb = new Blob([file]);

    f.append("attachment", bb, file.name);
    f.append("idActivityType", "7");

    const upFile = await upFileData("su/postuploadfilefb", f);

    if (upFile.status === 200) {
      dispatch(upfileFB({ loading: false, url: upFile.data }));
    }

   
  };
  //asigna el archivo cargado al stado file
  const hanldeFile = (e) => {
    setFile(e.target.files[0]);
  };

  //funcion para la validacion del formulario y disparo del dispatch de confirmacion para creer el meeting
  const handleCreate = () => {
    const validate = valMeeting(newMeet);
    if (validate.error) {
      setErrors(validate.errorForm);
    }

    if (!validate.error) {
      dispatch(errorsMeetValidation(validate.errorForm));
      onClose();
      if (newMeet.idMeet) {
        dispatch(
          showConfirmation({
            data: newMeet,
            title: "Action Validation",
            msj: "Are you sure you want to edit this Meeting?",
            tag: "editMeeting",
          })
        );
      } else {
        dispatch(
          showConfirmation({
            data: newMeet,
            title: "Action Validation",
            msj: "Are you sure you want to agend this Meeting?",
            tag: "createMeeting",
          })
        );
      }
    }
  };

  return (
    <div className="bg-primaryDark w-96 p-4 rounded-md">
      <div className=" text-center my-2">
        <h3 className="text-xl font-semibold text-primaryPink ">
          {newMeet.idMeet ? "Edit Meet" : "New Meeting"}
        </h3>
      </div>
      <div className="px-1 h-[29rem] overflow-y-scroll">
        <div>
          <label htmlFor="meetName" className="block text-white font-semibold">
            Meeting
          </label>
          <input
            className={`border  text-md rounded-lg  block w-full p-1.5  text-primaryPink
        ${
          errors.meetName.status ? "border-primaryPink" : "  border-primaryDark"
        }
        `}
            type="text"
            id="meetName"
            name="meetName"
            placeholder="Name Meeting"
            value={newMeet.meetName}
            onChange={(e) => handleMeet(e)}
          />
          {errors.meetName.status && (
            <p className="text-primaryPink text-xs">{errors.meetName.msj}</p>
          )}
        </div>
        <div>
          <label htmlFor="meetDesc" className="block text-white font-semibold">
            Description
          </label>
          <textarea
            className={` bg-white p-1.5 rounded-md w-full text-primaryPink
        ${errors.meetDescription.status ? "border  border-primaryPink" : ""}
        `}
            type="text"
            id="meetDesc"
            name="meetDescription"
            rows={2}
            placeholder="Description Meeting"
            value={newMeet.meetDescription}
            onChange={(e) => handleMeet(e)}
          />
          {errors.meetDescription.status && (
            <p className="text-primaryPink text-xs">
              {errors.meetDescription.msj}
            </p>
          )}
        </div>
        <div className="relative">
          <label htmlFor="hour" className="block text-white font-semibold">
            Meeting Image
          </label>
          <label htmlFor="upfile">
            <div
              className={`border w-full bg-white p-[2px]  rounded-md flex justify-between items-center relative 
            ${
              errors.urlImgMeet.status
                ? "border-primaryPink "
                : "border-primaryDark"
            }
            `}
            >
              {file || url || newMeet.urlImgMeet ? (
                !isLoading ? (
                  <img
                    src={
                      file
                        ? URL.createObjectURL(file)
                        : url || newMeet.urlImgMeet
                    }
                    className="object-cover h-20 w-full"
                  />
                ) : (
                  <div className="bg-primaryPink h-20 w-full px-4 py-2 rounded-md flex justify-center items-center">
                    <RotateSpinner size={30} color="#FFf" />
                  </div>
                )
              ) : (
                <p className="text-[#969999] whitespace-nowrap pl-1 py-1 text-ellipsis overflow-hidden ">
                  Add Image
                </p>
              )}
              {file &&
                (progress > 0 ? (
                  <p className="absolute py-2 px-1 right-2 border-primaryPink border-2 rounded-md  text-xs text-white text-shadow-lg font-bold mr-2 w-12 ">
                    {progress} %
                  </p>
                ) : (
                  <button
                    onClick={updateFiles}
                    type="submit"
                    className="absolute right-2  border border-primaryPink hover:text-primaryPink hover:bg-white bg-primaryPink text-white rounded-md  px-3 py-1 "
                  >
                    <BiCloudUpload size={22} />
                  </button>
                ))}
            </div>
            {errors.urlImgMeet.status && (
              <p className="text-primaryPink text-xs">
                {errors.urlImgMeet.msj}
              </p>
            )}
          </label>
          <input
            id="upfile"
            type="file"
            accept="image/png,image/jpeg,image/svg+xml"
            className="w-2/3 hidden"
            disabled={newMeet.idMeet ? true : false}
            onChange={(e) => hanldeFile(e)}
          />
        </div>

        <div>
          <label htmlFor="dates" className="block text-white font-semibold">
            Dates
          </label>
          <div className="flex">
            <input
              className={`border text-md rounded-lg  block w-full p-1.5  text-primaryPink
        ${errors.dateMeet.status ? "border-primaryPink" : "border-primaryDark"}
        `}
              type="date"
              id="dateIni"
              name="dateMeet"
              value={newMeet.dateMeet.substring(0, 10)}
              onChange={(e) => handleMeet(e)}
            />
          </div>
          {errors.dateMeet.status && (
            <p className="text-primaryPink text-xs">{errors.dateMeet.msj}</p>
          )}
        </div>
        <div>
          <label htmlFor="hour" className="block text-white font-semibold">
            Hour
          </label>
          <div className="flex">
            <input
              className={`border text-md rounded-lg  block w-3/5 p-1.5  text-primaryPink
        ${
          errors.hourIniMeet.status
            ? "border-primaryPink"
            : "border-primaryDark"
        }
        `}
              type="time"
              id="hourIni"
              name="hourIniMeet"
              value={newMeet.hourIniMeet}
              onChange={(e) => handleMeet(e)}
            />
            <input
          
              className={`border text-md rounded-lg  block w-3/5 p-1.5 ml-1  text-primaryPink
        ${
          errors.hourEndMeet.status
            ? "border-primaryPink"
            : "border-primaryDark"
        }
        `}
              type="time"
              id="hourEnd"
              name="hourEndMeet"
              value={newMeet.hourEndMeet}
              onChange={(e) => handleMeet(e)}
            />
          </div>
          <div className="flex justify-between">
            {errors.hourIniMeet.status && (
              <p className="text-primaryPink text-xs">
                {errors.hourIniMeet.msj}
              </p>
            )}
            {errors.hourEndMeet.status && (
              <p className="text-primaryPink text-xs">
                {errors.hourEndMeet.msj}
              </p>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="urlMeet" className="block text-white font-semibold">
            Channel
          </label>
          <input
            className={`border text-md rounded-lg  block w-full p-1.5  text-primaryPink
        ${errors.urlMeet.status ? "border-primaryPink" : "border-primaryDark"}
        `}
            type="url"
            id="urlMeet"
            name="urlMeet"
            pattern="https://.*"
            placeholder="https://www.meetingaddress.com"
            value={newMeet.urlMeet}
            onChange={(e) => handleMeet(e)}
          />
          {errors.urlMeet.status && (
            <p className="text-primaryPink text-xs">{errors.urlMeet.msj}</p>
          )}
        </div>
      </div>
      <div className="text-right mt-4 mb-16 md:mb-0">
        <button
          onClick={onClose}
          className="py-2 px-6 mr-8 text-primaryPink font-bold bg-white rounded-md hover:scale-95 transition-all ease-in-out duration-150 hover:shadow hover:shadow-primaryPink"
        >
          Close
        </button>
        <button
          className="py-2 px-6 text-white font-bold bg-gradient-to-t from-primaryPink to-primaryPurple rounded-md hover:scale-95 transition-all ease-in-out duration-150  hover:shadow hover:shadow-primaryPink"
          onClick={handleCreate}
        >
          {newMeet.idMeet ? "Edit" : "Create"}
        </button>
      </div>
    </div>
  );
};

export default AddMeeting;
