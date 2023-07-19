import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BiCloudUpload } from "react-icons/bi";
import { GoDiffAdded } from "react-icons/go";
import ActivityCard from "./ActivityCard";
import { TimePicker } from "./TimePicker";
import {
  newActivity,
  addActivity,
  errorsValidation,
} from "../../../redux/SuperAdmin/cousesManageSlice";
import { valActivity } from "../../../helpers/courseHelper";
import { upFileData } from "../../../apis/requestTypes";
import { upfileFB } from "../../../redux/firebase/courseManageSlice";
import { RotateSpinner } from "react-spinners-kit";

const optionFile = [
  { accept: "", type: "Type File", id: 0 },
  { accept: "video/mp4", type: "Video", id: 1 },
  { accept: "image/png,image/jpeg,image/svg+xml", type: "Image", id: 2 },
  {
    accept: "application/pdf",
    type: "Infographic",
    id: 3,
  },
  {
    accept: "application/zip,application/x-zip-compressed",
    type: "Simulation",
    id: 4,
  },
  {
    accept: "application/zip,application/x-zip-compressed",
    type: "Arcade",
    id: 5,
  },
  {
    accept: "url",
    type: "URL Emulator",
    id: 6,
  },
];

const CreateActivityForm = ({ typeAction }) => {
  const dispatch = useDispatch();
  const { newCourse, errors, activity } = useSelector((state) => state.courses);

  const { progress, isLoading } = useSelector((state) => state.fileManageFB);
  const [selectFile, setSelectFile] = useState(optionFile[0]);
  const [file, setFile] = useState("");

  //crea los detalles de la actividad
  const handleActivity = (e) => {
    const { target } = e;
    let name = target.name;
    let value = target.value;
    dispatch(newActivity({ name, value }));
  };

  //setea el tipo de archivos aceptados en el input file
  const handleTypeFile = (cont) => {
    const contenido = optionFile.filter(
      (fileid) => fileid.id === parseInt(cont)
    );
    setSelectFile(contenido[0]);
  };

  //Dispara la carga del archivo de una actividad a Firebase
  const updateFiles = async () => {
    dispatch(upfileFB({ loading: true }));
    let f = new FormData();
    let bb = new Blob([file]);

    f.append("attachment", bb, file.name);
    f.append("idActivityType", `${activity.typeContent}`);

    const upFile = await upFileData("su/postuploadfilefb", f);

    if (upFile.status === 200) {
      dispatch(newActivity({ urlActivity: upFile.data }));
      setFile("");
    }
    dispatch(upfileFB({ loading: false, url: upFile.data }));
  };

  const createActivity = () => {
    const validate = valActivity(activity);

    dispatch(errorsValidation(validate.errorForm));
    if (!validate.error) {
      dispatch(errorsValidation(validate.errorForm));
      dispatch(addActivity());
    }
  };

  return (
    <div className="w-80 lg:w-96 bg-white rounded-xl pr-1">
      <div className="p-2 lg:p-5 mt-3 overflow-y-scroll custom-scroll h-72 md:h-80 lg:h-96 ">
        <label
          htmlFor="name-activity"
          className="block mb-1 text-sm font-medium text-primaryDark "
        >
          Activity
        </label>
        <input
          id="name-activity"
          type="text"
          placeholder="Name Activity"
          className="bg-primaryDark text-md  text-white rounded-lg focus:ring-green focus:border-green block w-full p-1.5 lg:p-2.5"
          name="nameActivity"
          value={activity.nameActivity || ""}
          onChange={(e) => handleActivity(e)}
          disabled={!newCourse.nameCourse ? true : false}
        />
        {errors.nameActivity.status && (
          <p className="text-primaryPink text-xs">{errors.nameActivity.msj}</p>
        )}

        <label
          htmlFor="desc-activity"
          className="block mb-1 text-sm font-medium text-primaryDark mt-3"
        >
          Description Activity
        </label>
        <input
          id="desc-activity"
          type="text"
          placeholder="Description Activity"
          className="bg-primaryDark text-md  text-white rounded-lg focus:ring-green focus:border-green block w-full p-1.5 lg:p-2.5"
          name="descActivity"
          value={activity.descActivity || ""}
          onChange={(e) => handleActivity(e)}
        />
        {errors.descActivity.status && (
          <p className="text-primaryPink text-xs">{errors.descActivity.msj}</p>
        )}

        <label
          htmlFor="desc-activity"
          className="block mb-1 text-sm font-medium text-primaryDark mt-3"
        >
          Minimum Activity Time (MM:SS)
        </label>
        <TimePicker
          activity={activity}
          handleActivity={handleActivity}
        />
        {errors.timeActivity.status && (
          <p className="text-primaryPink text-xs">{errors.timeActivity.msj}</p>
        )}

        {isLoading ? (
          <div className="w-full rounded-md mt-1 h-16  flex flex-col justify-center">
            <div className="flex justify-between m-1">
              <p className="text-xs">Uploading file ... </p>
              <RotateSpinner size={20} color="#FF0082" />
            </div>
            {/* Barra de carga  */}
            <div className="w-full ">
              <div
                className="h-4 bg-gradient-to-l from-primaryPurple to-primaryPink rounded-md  text-center"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        ) : (
          <div>
            {/* Carga de Archivos a Firebase */}
            <p className="block mb-1 text-sm font-medium text-primaryDark mt-3">
              Up Content
            </p>
            <div className="flex">
              <select
                name="typeContent"
                value={activity.typeContent || ""}
                disabled={
                  !activity.nameActivity || !activity.descActivity
                    ? true
                    : false
                }
                onChange={({ target }) => {
                  handleTypeFile(target.value);
                  dispatch(
                    newActivity({
                      name: "typeContent",
                      value: parseInt(target.value),
                    })
                  );
                }}
                id="type-content"
                className="border bg-primaryDark text-white text-md rounded-lg focus:ring-green focus:border-green block w-1/3 p-1.5 lg:p-2"
              >
                {optionFile?.map((recurso) => (
                  <option
                    className="text-primaryPink"
                    value={recurso?.id}
                    key={recurso?.id}
                  >
                    {recurso?.type}
                  </option>
                ))}
              </select>

              {selectFile.id !== 6 ? (
                <div className="relative">
                  <label htmlFor="upfile">
                    <div className="w-52 bg-primaryDark p-1.5 lg:p-2 rounded-md flex justify-between items-center ">
                      <p className="text-white whitespace-nowrap text-ellipsis overflow-hidden ">
                        {activity.urlActivity ? "Uploaded" : "Upload File"}
                      </p>
                      <button
                        onClick={updateFiles}
                        type="submit"
                        disabled={
                          selectFile.accept.includes(file?.type) ? false : true
                        }
                        className=" hover:border hover:border-primaryPink rounded-md    font-medium  text-lg px-4 py-2 "
                      >
                        <BiCloudUpload className="text-primaryPink" />
                      </button>
                    </div>
                  </label>
                  <input
                    id="upfile"
                    type="file"
                    disabled={selectFile.id === 0 ? true : false}
                    accept={selectFile.accept}
                    className="w-2/3 hidden"
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
              ) : (
                <div className="relative">
                  <input
                    id="upfile"
                    type="url"
                    name="urlActivity"
                    className="w-52 text-white bg-primaryDark p-1.5 lg:p-2 rounded-md flex justify-between items-center "
                    placeholder="https://..."
                    onChange={(e) => {
                      handleActivity(e);
                    }}
                    // disabled={selectFile.id === 0 ? true : false}
                    // accept={selectFile.accept}
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {errors.urlActivity.status && (
          <p className="text-primaryPink text-xs">{errors.urlActivity.msj}</p>
        )}
        {/* Seccion de Actividades  */}
        <div className="text-center py-4">
          <button
            className="text-primaryPink"
            onClick={createActivity}
            //disabled={activity.urlActivity ? false : true}
          >
            <GoDiffAdded size={25} />
          </button>

          {newCourse.activities?.map((activity) => (
            <ActivityCard
              activity={activity}
              key={activity.idActivity}
              typeAction={typeAction}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateActivityForm;
