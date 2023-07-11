import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RotateSpinner } from "react-spinners-kit";
import {
  getCampaignsData,
  getLobsData,
  getAssignData,
  getWavesData,
  reset,
  changeWave,
} from "../../redux/Viewer/coursesViewerSlice";
import bgNotCourses from "../../assets/img/courses/notCourses.png";
import CourseViewerCard from "../../components/Viewer/CourseViewerCard";
import AcordeonViewerItem from "../../components/Viewer/AcordeonViewerItem";

const Activities = () => {
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.login);
  const {
    isLoading,
    learningPlans,
    courses,
    campaigns,
    lobs,
    waves,
    campSelect,
    lobSelect,
    waveSelect,
    loadingCamp,
    loadingLob,
    loadingWave,
  } = useSelector((state) => state.viewerLearning);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (userData?.role === "Viewer") {
      //dispatch(reset());
      if (lobSelect !== "All" && waveSelect !== "All") {
        // dispatch(getWavesData(lobSelect));
        dispatch(
          getAssignData({
            campaign: campSelect,
            lob: lobSelect,
            wave: waveSelect,
          })
        );
      } else {
        dispatch(
          getLobsData(`${userData?.nameCampaign}-${userData?.idCampaign}`)
        );
      }
    } else {
      dispatch(getCampaignsData(1));
    }
  }, []);

  //Manejo de la visualizacion del acordeon
  const toggle = (index, plan) => {
    if (open === index) {
      return setOpen(null);
    }
    setOpen(index);
  };

  return (
    <div className="w-full bg-primaryDark bg-opacity-75 min-h-full rounded-lg p-4">
      {/* cabecera  */}
      <div>
        <h3 className="text-white font-medium text-2xl">My Learning Plans</h3>
      </div>

      {isLoading ? (
        <div className="w-full h-56 flex justify-center items-center">
          <RotateSpinner size={60} color="#FF0082" />
        </div>
      ) : (
        <>
          <div className="flex mb-4 w-full justify-between  items-center flex-col md:flex-row mt-5">
            <div className="w-full flex flex-col md:flex-row">
              {userData?.role === "TP Viewer" && (
                <div className="relative">
                  <select
                    className="mr-4 bg-white shadow-md shadow-primaryPurple relative w-full md:w-52 p-2 rounded-md text-primaryPink font-semibold "
                    placeholder="Campaign"
                    value={campSelect}
                    onChange={(e) => dispatch(getLobsData(e.target.value))}
                  >
                    <option value={"All"} className="font-semibold">
                      Select Campaign
                    </option>

                    {campaigns.map((camp, index) => (
                      <option
                        key={camp?.id + camp?.name + index}
                        value={`${camp?.name}-${camp?.id}`}
                        className="font-semibold"
                      >
                        {`${camp?.name}-${camp?.id}`}
                      </option>
                    ))}
                  </select>
                  <div className="absolute top-0 right-5">
                    {loadingCamp && (
                      <div className="bg-white h-full w-full px-4 py-2 rounded-md">
                        <RotateSpinner size={20} color="#FF0082" />
                      </div>
                    )}
                  </div>
                </div>
              )}
              <div className="relative">
                <select
                  className="mr-4 bg-white shadow-md shadow-primaryPurple relative my-4 md:my-0 w-full md:w-52 p-2 rounded-md text-primaryPink font-semibold"
                  placeholder="LOB"
                  value={lobSelect}
                  disabled={campSelect === "All"}
                  onChange={(e) => dispatch(getWavesData(e.target.value))}
                >
                  <option value={"All"} className="font-semibold">
                    Select LOB
                  </option>

                  {lobs.map((lob, index) => (
                    <option
                      key={lob?.id + lob?.name + index}
                      value={`${lob?.name}-${lob?.id}`}
                      className="font-semibold"
                    >
                      {lob?.name}
                    </option>
                  ))}
                </select>
                <div className="absolute top-0 right-5">
                  {loadingLob && (
                    <div className="bg-white h-full w-full px-4 py-2 rounded-md">
                      <RotateSpinner size={20} color="#FF0082" />
                    </div>
                  )}
                </div>
              </div>
              <div className="relative">
                <select
                  className=" bg-white shadow-md shadow-primaryPurple relative my-4 md:my-0 w-full md:w-52 p-2 rounded-md text-primaryPink font-semibold"
                  placeholder="LOB"
                  value={waveSelect}
                  disabled={lobSelect === "All"}
                  onChange={(e) => {
                    // dispatch(changeWave(e.target.value));
                    dispatch(
                      getAssignData({
                        campaign: campSelect,
                        lob: lobSelect,
                        wave: e.target.value,
                      })
                    );
                  }}
                >
                  <option value={"All"} className="font-semibold">
                    Select Wave
                  </option>

                  {waves.map((wave, index) => (
                    <option
                      key={wave?.idwave + wave?.namewave + index}
                      //value={`${wave?.namewave}-${wave?.idwave}`}
                      value={wave?.idwave}
                      className="font-semibold"
                    >
                      {wave?.namewave}
                    </option>
                  ))}
                </select>
                <div className="absolute top-0 right-5">
                  {loadingWave && lobSelect !== "All" && (
                    <div className="bg-white h-full w-full px-4 py-2 rounded-md">
                      <RotateSpinner size={20} color="#FF0082" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/* Learning plan Section  */}
          {learningPlans.length > 0 ? (
            learningPlans.map((plan, index) => (
              <AcordeonViewerItem
                key={index}
                open={index === open}
                toggle={() => toggle(index, plan)}
                plan={plan}
              />
            ))
          ) : (
            <div
              className="bg-no-repeat bg-contain  h-56 w-full bg-center flex justify-center items-center"
              style={{ backgroundImage: `url(${bgNotCourses})` }}
            >
              <p className="text-white p-2 md:font-bold">
                You don't have Learning Plans assigned yet!
              </p>
            </div>
          )}
          {/* Courses Section  */}
          <div>
            <h3 className="text-white my-4 font-medium text-2xl">My Courses</h3>
          </div>

          {courses[0]?.idCourse === 0 ? (
            <div
              className="bg-no-repeat bg-contain  h-56 w-full bg-center flex justify-center items-center"
              style={{ backgroundImage: `url(${bgNotCourses})` }}
            >
              <p className="text-white p-2 md:font-bold">
                You don't have courses assigned yet!
              </p>
            </div>
          ) : (
            courses?.map((course) => (
              <CourseViewerCard course={course} key={course.idCourse} />
            ))
          )}
        </>
      )}
    </div>
  );
};

export default Activities;
