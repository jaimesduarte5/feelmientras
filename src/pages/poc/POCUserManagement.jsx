import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import CreateAgent from "../../components/Modals/CreateAgent";
import Modal from "../../components/Modals/Modal";
import DatagridUserManagementPOC from "../../components/POC/User_Management/DatagridUserManagementPOC";
import AddUsers from "../../components/Super_Admin/User_Management/AddUsers";
import AddWaves from "../../components/Super_Admin/User_Management/AddWaves";
import { fullLoadingOn } from "../../redux/alertsSlice";
import { userMgeInitData } from "../../redux/POC/userManagePocSlice";
import {
  getWaves,
  resetWavesFrom,
  showWaveModal,
} from "../../redux/POC/waveFormSlice";
import { resetForm, viewModal } from "../../redux/usersFormSlice";

const POCUserManagement = () => {
  const dispatch = useDispatch();
  const { showModal } = useSelector((state) => state.usrForm);
  const { waveModal } = useSelector((state) => state.wavesForm);

  const handleOpen = () => {
    dispatch(viewModal());
  };
  const handleClose = () => {
    dispatch(showWaveModal(false));
    dispatch(resetForm());
    dispatch(resetWavesFrom());
  };

  useEffect(() => {
    dispatch(fullLoadingOn());
    dispatch(userMgeInitData());
    dispatch(getWaves());
    handleClose();
  }, []);

  return (
    <div className="w-full min-h-full bg-primaryDark bg-opacity-75 rounded-lg p-4  ">
      {/* cabecera  */}
      <div>
        <h3 className="text-primaryPink font-medium text-2xl">
          User Management
        </h3>
      </div>
      {/* DATAGRID  */}
      <div className="my-6 w-full overflow-x-hidden">
        <DatagridUserManagementPOC handleOpen={handleOpen} />
      </div>
      {/* Modal Create Agent */}
      <Modal onClose={() => {}} visible={showModal}>
        {waveModal ? (
          <AddWaves onClose={handleClose} />
        ) : (
          <AddUsers onClose={handleClose} />
        )}
      </Modal>
    </div>
  );
};

export default POCUserManagement;
