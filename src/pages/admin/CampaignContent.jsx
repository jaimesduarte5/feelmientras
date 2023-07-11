import React, { useEffect, useState } from "react";

import CreateEditCampaign from "../../components/Modals/CreateEditCampaign";
import Modal from "../../components/Modals/Modal";
import CampaignLob from "../../components/Super_Admin/Capaign_LOB_Content/Campaign";
import CourseAndLearning from "../../components/Super_Admin/Capaign_LOB_Content/CourseAndLearning";
import LearningPlan from "../../components/Super_Admin/Capaign_LOB_Content/LearningPlan";
import { useDispatch, useSelector } from "react-redux";
import {
  getDataCampCont,
  typeForm,
} from "../../redux/SuperAdmin/campContentSlice";
import { showConfirmation } from "../../redux/alertsSlice";

const CampaignContent = () => {
  const dispatch = useDispatch();
  const { campaigns, lobs, viewCard, campaignsTemps, lobsTemps } = useSelector(
    (state) => state.campaigns
  );
  const [showModal, setShowModal] = useState(false);
  const [action, setAction] = useState("");

  const handleOpen = (act) => {
    const camp = campaigns.filter((el) => el.active);
    setAction(act);
    setShowModal(true);
    dispatch(typeForm({ type: "open", action: act, camp: camp[0] }));
  };
  const handleClose = () => {
    setShowModal(false);
    setAction("");
    dispatch(typeForm({ type: "close", action: null }));
  };

  const handleDelete = async () => {
    const camp = campaigns.filter((el) => el.active);
    dispatch(
      showConfirmation({
        data: {
          context: 2,
          idCampaign: camp[0].id,
          nameCampaign: camp[0].name,
          lobsInfo: lobs,
        },
        title: "Action Validation",
        msj: "Are you sure you want to perform this process?",
        tag: "updateCampaign",
      })
    );
    handleClose();
  };

  useEffect(() => {
    dispatch(getDataCampCont());
  }, []);

  return (
    <>
      <div className="w-full bg-primaryDark bg-opacity-75 min-h-full rounded-lg p-4">
        {/* cabecera  */}
        <div>
          <h3 className="text-primaryPink font-medium text-2xl">
            Campaign, LOB´s and Content{" "}
          </h3>
          <div className="my-6">
            <button
              onClick={() => handleOpen("Create")}
              className="w-full sm:w-auto  mb-4 text-primaryPink font-medium bg-white rounded-md px-3 py-1 hover:bg-primaryPink hover:text-white transition ease-in-out delay-75  mr-4 md:mr-8"
            >
              New Campaign
            </button>
            <button
              onClick={() => handleOpen("Edit")}
              className="w-full sm:w-auto mb-4 text-primaryPink font-medium bg-white rounded-md px-3 py-1 hover:bg-primaryPink hover:text-white transition ease-in-out delay-75 mr-4 md:mr-8"
            >
              Edit Campaign
            </button>
            <button
              onClick={handleDelete}
              className="w-full sm:w-auto mb-4 text-primaryPink font-medium bg-white rounded-md px-3 py-1 hover:bg-primaryPink hover:text-white transition ease-in-out delay-75"
            >
              Delete Campaign
            </button>
          </div>
        </div>

        {/* Seccion de tablas  */}
        <div
          className={`grid gap-8 grid-cols-1 sm:grid-cols-2 
            ${viewCard === "learning" ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}
        >
          {/* CAMPAÑAS */}
          <CampaignLob nameComponent="Campaign" data={campaignsTemps} />
          {/* LOB */}
          <CampaignLob nameComponent="LOB´s" data={lobsTemps} />
          {/* LEARNING PLANS */}
          <LearningPlan />
          {/* CURSOS */}
          {viewCard === "learning" && <CourseAndLearning />}
        </div>
      </div>

      {/* MODAL  */}
      <Modal onClose={() => {}} visible={showModal}>
        <CreateEditCampaign action={action} handleClose={handleClose} />
      </Modal>
    </>
  );
};

export default CampaignContent;
