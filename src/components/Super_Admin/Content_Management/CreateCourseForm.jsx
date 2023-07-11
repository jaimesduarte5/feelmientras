import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addCourse,
  errorsValidation,
  getDataCourses,
} from "../../../redux/SuperAdmin/cousesManageSlice";
import { CgImage } from "react-icons/cg";
import { RotateSpinner } from "react-spinners-kit";
import { upFileData } from "../../../apis/requestTypes";
import { upImageFB } from "../../../redux/firebase/courseManageSlice";

const CreateCourseForm = () => {
  const dispatch = useDispatch();
  const { newCourse, campaigns, errors, courses } = useSelector(
    (state) => state.courses
  );
  const { userData } = useSelector((state) => state.login);

  const { role, idCampaign } = userData;
  const { isLoadingI } = useSelector((state) => state.fileManageFB);
  const [file, setFile] = useState(null);

  useEffect(() => {
    if (role === "Poc") {
      dispatch(addCourse({ name: "idCampaign", value: parseInt(idCampaign) }));
    }
  }, []);

  const handleAccount = (e) => {
    dispatch(getDataCourses(e.target.value));
    dispatch(
      addCourse({ name: "idCampaign", value: parseInt(e.target.value) })
    );
  };

  const handleCourse = (e) => {
    const { target } = e;

    if (target.name === "nameCourse") {
      const found = courses.some(
        (course) =>
          course.nameCourse.toLowerCase().trim() ===
          target.value.toLowerCase().trim()
      );
      if (found) {
        let errorForm = {
          nameCourseFound: {
            status: true,
            msj: "There is a course with the same name",
          },
        };

        dispatch(errorsValidation(errorForm));
      } else {
        let errorForm = {
          nameCourseFound: {
            status: false,
            msj: "",
          },
        };
        dispatch(errorsValidation(errorForm));
      }
    }
    let name = target.name;
    let value = target.value;

    dispatch(addCourse({ name, value }));
  };

  //Dispara la carga del archivo de una actividad a Firebase
  //how to upload file to node js whith axios and cryptojs?
  const upFiles = async () => {
    dispatch(upImageFB({ loading: true }));
    let f = new FormData();
    let bb = new Blob([file]);

    f.append("attachment", bb, file.name);
    f.append("idActivityType", "6");

    const upFile = await upFileData("su/postuploadfilefb", f);

    if (upFile.status === 200) {
      dispatch(addCourse({ name: "urlImgCourse", value: upFile.data }));
      setFile("");
    }
    dispatch(upImageFB({ loading: false }));
    // let name = newCourse.nameCourse;
  };

  return (
    <div className="w-80 lg:w-96 p-2 lg:p-8">
      <label
        htmlFor="campaign"
        className="block mb-1 text-sm font-medium text-white"
      >
        Campaign
      </label>
      <select
        id="campaign"
        name="idCampaign"
        disabled={role === "Poc" ? true : false}
        placeholder="Select Campaign"
        className={`border text-md rounded-lg  block w-full p-1.5 lg:p-2.5
        ${errors.idCampaign.status ? "border-primaryPink" : ""}
        `}
        value={newCourse.idCampaign || idCampaign || ""}
        onChange={(e) => {
          handleAccount(e);
        }}
      >
        <option>Select Campaign</option>
        <option value={1}>Cross Course</option>
        {campaigns?.map((campaign) => (
          <option value={campaign.id} key={campaign.id}>
            {campaign.name}
          </option>
        ))}
      </select>
      {errors.idCampaign.status && (
        <p className="text-primaryPink text-xs">{errors.idCampaign.msj}</p>
      )}
      <label
        htmlFor="course"
        className="block mb-1 text-sm font-medium text-white mt-3"
      >
        Course
      </label>
      <input
        id="course"
        type="text"
        name="nameCourse"
        value={newCourse.nameCourse}
        disabled={newCourse.idCampaign || role === "Poc" ? false : true}
        onChange={(e) => handleCourse(e)}
        className={`border text-md rounded-lg  block w-full p-1.5 lg:p-2.5
        ${
          errors.nameCourse.status || errors.nameCourseFound.status
            ? "border-primaryPink"
            : ""
        }
        `}
        placeholder="Name Course"
      />
      {errors.nameCourse.status && (
        <p className="text-primaryPink text-xs">{errors.nameCourse.msj}</p>
      )}
      {errors.nameCourseFound.status && (
        <p className="text-primaryPink text-xs">{errors.nameCourseFound.msj}</p>
      )}
      <label
        htmlFor="description-course"
        className="block mb-1 text-sm font-medium text-white mt-3"
      >
        Course Description
      </label>
      <input
        id="description-course"
        type="text"
        name="descCourse"
        disabled={newCourse.nameCourse ? false : true}
        value={newCourse.descCourse}
        onChange={(e) => handleCourse(e)}
        placeholder="Description Course"
        className={`border text-md rounded-lg  block w-full p-1.5 lg:p-2.5
        ${errors.descCourse.status ? "border-primaryPink" : ""}
        `}
      />
      {errors.descCourse.status && (
        <p className="text-primaryPink text-xs">{errors.descCourse.msj}</p>
      )}
      <label
        htmlFor="privacity"
        className="block mb-1 text-sm font-medium text-white mt-3"
      >
        Privacy
      </label>
      <label
        htmlFor="large-toggle"
        className="inline-flex relative items-center cursor-pointer  "
      >
        <input
          type="checkbox"
          value={newCourse.private}
          id="large-toggle"
          className="sr-only peer"
          name="private"
          onChange={() => {
            dispatch(addCourse({ name: "private", value: !newCourse.private }));
          }}
        />
        <div
          className={`w-[304px] lg:w-80 h-8 bg-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 
       rounded-md peer  
       peer-checked:after:border-primaryPink  after:absolute   
       after:bg-primaryPink  after:rounded-md after:h-full after:w-[152px]  after:lg:w-40  after:transition-all
       after:flex after:justify-center after:items-center after:font-bold after:text-white
       ${
         newCourse.private
           ? "after:content-['YES'] after:translate-x-full"
           : "after:content-['NO']"
       }         `}
        />
      </label>
      <label className="block mb-1 text-sm font-medium text-white mt-3">
        Image Course
      </label>
      <div className="relative">
        <label htmlFor="upfileImageCourse">
          <div className="w-full bg-white p-1 lg:p-1.5 rounded-md flex justify-between items-center ">
            <p className=" whitespace-nowrap text-ellipsis overflow-hidden ">
              {(newCourse.urlImgCourse && "Image Uploaded!!") ||
                file?.name ||
                "Upload Image Course"}
            </p>
          </div>
        </label>
        <input
          id="upfileImageCourse"
          type="file"
          disabled={
            !newCourse.nameCourse || errors.nameCourseFound.status
              ? true
              : false
          }
          accept="image/png,image/jpeg,image/svg+xml"
          className="w-2/3 hidden"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <div className="absolute top-0 right-0">
          {isLoadingI ? (
            <div className="bg-primaryPink h-full w-full px-4 py-2 rounded-md">
              <RotateSpinner size={20} color="#FFf" />
            </div>
          ) : (
            file && (
              <button
                onClick={upFiles}
                type="submit"
                disabled={file ? false : true}
                className="bg-primaryPink text-white hover:text-primaryPink border  border-primaryPink hover:bg-white  rounded-md    font-medium  text-lg px-4 py-2 "
              >
                <CgImage />
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateCourseForm;
