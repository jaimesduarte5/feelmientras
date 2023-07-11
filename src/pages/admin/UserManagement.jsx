import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import DatagridUserManagement from "../../components/Super_Admin/User_Management/DatagridUserManagement";
import {
  addViewer,
  getDataUsrMge,
  resetViewer,
} from "../../redux/SuperAdmin/userManagementSlice";
import Modal from "../../components/Modals/Modal";
import AddUsers from "../../components/Super_Admin/User_Management/AddUsers";
import { useSelector } from "react-redux";
import { resetForm, setForm, viewModal } from "../../redux/usersFormSlice";
import { fullLoadingOn } from "../../redux/alertsSlice";
import AddViewer from "../../components/Super_Admin/User_Management/AddViewer";

const UserManagement = () => {
  const dispatch = useDispatch();
  const { showModal } = useSelector((state) => state.usrForm);
  const [addUser, setAddUser] = useState("");

  //abrir modal
  const handleOpen = (typeUser) => {
    setAddUser(typeUser);
    dispatch(viewModal());
  };
  //cerrar  modal
  const handleClose = () => {
    dispatch(resetForm());
    dispatch(resetViewer());
    setAddUser("");
  };

  //funcion para editar usuarios
  const handleEdit = (user) => {
    if (user.role === "TP Viewer" || user.role === "Viewer") {
      handleOpen("viewer");
      dispatch(
        addViewer({
          ...user,
          rol: user.role,
          name: user.firstname,
          action: "Edit",
          hireDate: "2023-01-01",
          idccms: 0,
        })
      );
    } else {
      dispatch(setForm(user));
    }
  };

  useEffect(() => {
    //dispatch(fullLoadingOn());
    dispatch(getDataUsrMge());
    handleClose();
  }, []);

  return (
    <>
      <div className="w-full min-h-full bg-primaryDark bg-opacity-75 rounded-lg p-4">
        {/* cabecera  */}
        <div>
          <h3 className="text-primaryPink font-medium text-2xl">
            User Management
          </h3>
          <div className="w-full text-right  md:pr-4">
            <button
              onClick={() => handleOpen("admin")}
              className="mt-4 md:mb-0  w-full md:w-44 text-primaryPink font-medium bg-white rounded-md px-3 py-2 hover:bg-primaryPink hover:text-white transition ease-in-out duration-150 "
            >
              Add User
            </button>
            <button
              onClick={() => handleOpen("viewer")}
              className="mt-4 md:mb-0  md:ml-3 w-full md:w-44 text-primaryPink font-medium bg-white rounded-md px-3 py-2 hover:bg-primaryPink hover:text-white transition ease-in-out duration-150 "
            >
              Add Viewer
            </button>
          </div>
        </div>
        {/* DATAGRID  */}
        <div className="my-6">
          <DatagridUserManagement handleEdit={handleEdit} />
        </div>
      </div>
      <Modal onClose={() => {}} visible={showModal}>
        {addUser === "viewer" ? (
          <AddViewer onClose={handleClose} />
        ) : (
          <AddUsers onClose={handleClose} />
        )}
      </Modal>
    </>
  );
};

export default UserManagement;
