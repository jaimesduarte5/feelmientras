import React, { useRef } from "react";
import { FiCopy, FiEdit3, FiEye, FiTrash2 } from "react-icons/fi";
import { upFileData } from "../../apis/requestTypes";
import { useDispatch } from "react-redux";
import { showToast } from "../../redux/alertsSlice";

const SimulationCard = ({ simulation, handleEdit, getData }) => {
  const dispatch = useDispatch();
  const urlRef = useRef(null);
  // Función para copiar el contenido del <p> al portapapeles
  const copyUrl = () => {
    const contenido = urlRef.current.textContent;
    navigator.clipboard
      .writeText(contenido)
      .then(() => {
        dispatch(
          showToast({
            type: "success",
            title: "The simulation",
            msj: "has been copied",
            show: true,
            duration: 4000,
          })
        );
      })
      .catch((error) => {
        dispatch(
          showToast({
            type: "error",
            title: "Try again!!",
            msj: "the url has not been copied",
            show: true,
            duration: 4000,
          })
        );
      });
  };

  const handleDelete = async (sim) => {
    let f = createFormada(sim);
    const delSimulation = await upFileData("su/postuploadanscorm", f);

    if (delSimulation.status === 200) {
      getData();
      dispatch(
        showToast({
          type: "success",
          title: "The simulation",
          msj: "has been deleted",
          show: true,
          duration: 4000,
        })
      );
    } else {
      dispatch(
        showToast({
          type: "error",
          title: "Try again!!",
          msj: "",
          show: true,
          duration: 4000,
        })
      );
    }
  };

  function createFormada(sim) {
    let f = new FormData();
    f.append("context", `3`);
    f.append("simUrl", `${sim.urlSimulation}`);
    f.append("simId", `${sim.id}`);
    f.append("simName", ``);
    f.append("simDesc", ``);

    return f;
  }

  return (
    <div className="mb-3 grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4 gap-2 bg-white p-2 rounded-lg text-primaryPink">
      <div className="border-b md:border-b-0 md:border-r">
        <p ref={urlRef}>{simulation.nameSimulation} </p>
      </div>
      <div className="border-b md:border-b-0 md:border-r">
        <p>{simulation.descriptionSimulation}</p>
      </div>
      <div className="border-b md:border-b-0 md:border-r">
        <p className="overflow-hidden text-ellipsis whitespace-nowrap">
          {simulation.urlSimulation}
        </p>
      </div>
      <div className="flex items-center justify-center">
        <button
          className="text-primaryPink mr-2 bg-white border-primaryPink border hover:border-white hover:bg-primaryPink hover:text-white focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-1 py-1 "
          onClick={copyUrl}
        >
          <FiCopy size={18} />
        </button>
        <button
          className="text-primaryPink mr-2 bg-white border-primaryPink border hover:border-white hover:bg-primaryPink hover:text-white focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-1 py-1 "
          onClick={() => window.open(`${simulation.urlSimulation}`)}
        >
          <FiEye size={18} />
        </button>

        <button
          className="text-primaryPink mr-2 bg-white border-primaryPink border hover:border-white hover:bg-primaryPink hover:text-white focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-1 py-1 "
          onClick={() => handleEdit(simulation)}
        >
          <FiEdit3 size={18} />
        </button>

        <button
          className="text-primaryPink bg-white border-primaryPink border hover:border-white hover:bg-primaryPink hover:text-white focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-1 py-1 "
          onClick={() => handleDelete(simulation)}
        >
          <FiTrash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default SimulationCard;
