import React, { useState, useRef, useEffect } from "react";
import { RotateSpinner } from "react-spinners-kit";
import Modal from "../../components/Modals/Modal";
import CreateSimulation from "../../components/Modals/CreateSimulation";
import SimulationCard from "../../components/Super_Admin/SimulationCard";
import { reqWithData } from "../../apis/requestTypes";
import { useDispatch, useSelector } from "react-redux";

const ExternalContentManage = () => {
  //const dispatch = useDispatch();
  //const { aiSimulation } = useSelector((state) => state.simulationsAi);
  const [loading, setloading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [typeAction, setTypeAction] = useState("Create");
  const [aiScorm, setAiScorm] = useState([]);
  const [aiSim, setAiSim] = useState([]);

  // Funcion para mostrar el modal
  const handleOpen = (type) => {
    setTypeAction("Create");
    setShowModal(true);
  };

  // Funcion para ocultar el modal
  const handleClose = () => {
    setShowModal(false);
  };
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setloading(true);
    const getExternalData = await reqWithData("su/getanscorms", {
      context: 1,
      simId: 0,
    });

    if (getExternalData.status === 200) {
      setAiScorm(getExternalData.data);
    }
    setloading(false);
  };

  const handleEdit = (sim) => {
    setAiSim(sim);
    handleOpen();
    setTypeAction("Edit");
  };

  return (
    <>
      <div className="w-full min-h-full bg-primaryDark bg-opacity-75 rounded-lg p-4">
        {/* cabecera  */}
        <div>
          <h3 className="text-primaryPink font-medium text-2xl">
            External Content Management
          </h3>
        </div>
        {/* seccion de Buttons  */}
        <div className="my-6 flex  flex-col sm:flex-row   justify-between ">
          <button
            onClick={() => handleOpen("Create")}
            className="text-primaryPink font-medium text-sm mt-4 sm:mt-0  lg:mr-8  bg-white rounded-md px-2 md:px-3 py-2 hover:bg-primaryPink hover:text-white transition ease-in-out duration-150  "
          >
            New Simulation
          </button>
        </div>
        {/* BODY CONTAIN  */}
        {loading ? (
          <div className="w-full h-56 flex justify-center items-center">
            <RotateSpinner size={60} color="#FF0082" />
          </div>
        ) : (
          <div className="my-6 h-screen overflow-y-scroll">
            {aiScorm.reverse().map((scorm) => (
              <SimulationCard
                key={scorm.id}
                simulation={scorm}
                handleEdit={handleEdit}
                getData={getData}
              />
            ))}
          </div>
        )}
      </div>
      {/* MODAL */}
      <Modal visible={showModal} onClose={() => {}}>
        <CreateSimulation
          onClose={handleClose}
          typeAction={typeAction}
          getData={getData}
          aiSim={aiSim}
        />
      </Modal>
    </>
  );
};

export default ExternalContentManage;
