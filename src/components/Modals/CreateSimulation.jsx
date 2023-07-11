import React, { useState, useEffect } from "react";
import { valSimulation } from "../../helpers/courseHelper";
import { upFileData } from "../../apis/requestTypes";
import { showToast } from "../../redux/alertsSlice";
import { useDispatch } from "react-redux";
import { RotateSpinner } from "react-spinners-kit";

const CreateSimulation = ({ typeAction, onClose, getData, aiSim }) => {
  const dispatch = useDispatch();
  const [file, setFile] = useState("");
  const [errors, setErrors] = useState([]);
  const [simulation, setSimulation] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (typeAction === "Edit") {
      setSimulation({
        context: 2,
        simId: aiSim.id,
        simName: aiSim.nameSimulation,
        simDesc: aiSim.descriptionSimulation,
        simUrl: aiSim.urlSimulation,
      });
    }
  }, []);

  //crea los detalles de la actividad
  const handleSimulation = (e) => {
    const { target } = e;
    let name = target.name;
    let value = target.value;
    setSimulation({ ...simulation, [name]: value });
  };

  const handleCreate = async () => {
    const validate = valSimulation(simulation);
    setErrors(validate.errorForm);
    if (validate.error) return;
    setLoading(true);

    let f = createFormada();
    const saveSimulation = await upFileData("su/postuploadanscorm", f);

    if (saveSimulation.status === 200) {
      getData();
      onClose();
      dispatch(
        showToast({
          type: "success",
          title: "The simulation",
          msj: `has been ${typeAction}`,
          show: true,
          duration: 4000,
        })
      );
      setLoading(false);
    }
    setLoading(false);
  };

  function createFormada() {
    let f = new FormData();
    let bb = new Blob([file]);
    let simName;
    if (typeAction === "Edit") {
      simName = simulation.simName;
    } else {
      simName = simulation.simName + " - " + Date.now().toString();
    }

    if (file) f.append("attachment", bb, file.name);
    f.append("context", `${simulation.context || 1}`);
    f.append("simUrl", `${simulation.simUrl || ""}`);
    f.append("simId", `${simulation.simId || 0}`);
    f.append("simName", `${simName}`);
    f.append("simDesc", `${simulation.simDesc}`);

    return f;
  }

  return (
    <div className="overflow-y-scroll relative h-screen sm:h-auto md:overflow-auto bg-primaryDark rounded-md px-8  pb-12 sm:pb-0 py-3">
      {loading && (
        <div className="w-5/6 h-5/6 absolute z-50 flex justify-center items-center">
          <RotateSpinner size={60} color="#FF0082" />
        </div>
      )}

      {/* Modal Title */}
      <div className="py-2 text-center ">
        <h3 className="text-primaryPink font-bold text-xl  w-full">
          {typeAction} Simulation
        </h3>
      </div>
      {/*Modal Body*/}
      <div className="w-80 lg:w-96 ">
        <label
          htmlFor="course"
          className="block mb-1 text-sm font-medium text-white mt-3"
        >
          Name Simulation
        </label>
        <input
          id="simulation"
          type="text"
          name="simName"
          value={simulation.simName || ""}
          onChange={(e) => handleSimulation(e)}
          className={`border text-md rounded-lg  block w-full p-1.5 lg:p-2.5
      
        `}
          placeholder="Name Simulation"
        />
        {errors.simName?.status && (
          <p className="text-primaryPink text-xs">{errors.simName?.msj}</p>
        )}

        <label
          htmlFor="description-course"
          className="block mb-1 text-sm font-medium text-white mt-3"
        >
          Description Simulation
        </label>
        <textarea
          rows={2}
          id="description-simulation"
          type="text"
          name="simDesc"
          disabled={simulation.simName ? false : true}
          value={simulation.simDesc || ""}
          onChange={(e) => handleSimulation(e)}
          placeholder="Description Simulation"
          className={`border text-md rounded-lg  block w-full p-1.5 lg:p-2.5
        `}
        />
        {errors.simDesc?.status && (
          <p className="text-primaryPink text-xs">{errors.simDesc?.msj}</p>
        )}
      </div>
      {/* carga de archivo tipo .zip */}
      <div className="relative w-full  mt-3">
        <label htmlFor="upfile">
          <div className=" bg-white p-1 lg:p-1.5 rounded-md flex justify-between items-center w-80 lg:w-96 ">
            <p className="text-primaryPink overflow-hidden text-ellipsis whitespace-nowrap">
              {file?.name || "Select File"}
            </p>
          </div>
        </label>
        <input
          id="upfile"
          type="file"
          disabled={!simulation.simDesc ? true : false}
          accept="application/zip,application/x-zip-compressed"
          className="w-2/3 hidden"
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>
      <div className="flex justify-between  mt-4 mb-16 lg:mb-4">
        <button
          onClick={onClose}
          className="py-2 px-6 mr-8 text-primaryPink font-bold bg-white rounded-md hover:scale-95 transition-all ease-in-out duration-150 hover:shadow hover:shadow-primaryPink"
        >
          Close
        </button>
        <button
          className="py-2 w-32  px-6 text-white font-bold bg-gradient-to-t from-primaryPink to-primaryPurple rounded-md hover:scale-95 transition-all ease-in-out duration-150  hover:shadow hover:shadow-primaryPink"
          disabled={
            file?.name || typeAction === "Edit" || !loading ? false : true
          }
          onClick={handleCreate}
        >
          {typeAction}
        </button>
      </div>
    </div>
  );
};

export default CreateSimulation;
