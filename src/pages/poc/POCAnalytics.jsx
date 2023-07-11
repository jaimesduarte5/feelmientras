import React from "react";
import { useEffect } from "react";
import { FiBarChart2, FiDownload } from "react-icons/fi";
import { useDispatch } from "react-redux";
import DataGridAnalytics from "../../components/POC/Analytics/DataGridAnalytics";
import { fullLoadingOn } from "../../redux/alertsSlice";
import { getDataAnalytics } from "../../redux/POC/analyticsPocSlice";

const POCAnalytics = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fullLoadingOn());
    dispatch(getDataAnalytics());
  }, []);

  return (
    <div className="w-full min-h-full bg-primaryDark bg-opacity-75 rounded-lg p-4">
      {/* cabecera  */}
      <div>
        <h3 className="text-primaryPink font-medium text-2xl mb-4">
          Analytics
        </h3>
      </div>
      {/* seccion de filtros  */}
      <div className="my-6 flex  flex-col sm:flex-row    ">
        <div className="mt-4 md:mt-0 flex justify-between">
          <button
            className={`  md:ml-4  text-primaryPink bg-white rounded-md px-3 py-2 
                hover:bg-primaryPink hover:text-white transition ease-in-out duration-150 shadow-md shadow-primaryPurple
                `}
          >
            <FiBarChart2 size={22} />
          </button>
          <button
            className={`  ml-4 text-primaryPink bg-white rounded-md px-3 py-2 
                hover:bg-primaryPink hover:text-white transition ease-in-out duration-150 shadow-md shadow-primaryPurple
                `}
          >
            <FiDownload size={22} />
          </button>
        </div>
      </div>
      {/* Contenido */}
      <div>
        <DataGridAnalytics />
      </div>
    </div>
  );
};

export default POCAnalytics;
