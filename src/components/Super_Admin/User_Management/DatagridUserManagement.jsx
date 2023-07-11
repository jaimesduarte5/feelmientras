import React, { useState } from "react";
import { useEffect } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import FilterComponent from "./FilterComponent ";
import { showConfirmation } from "../../../redux/alertsSlice";
import { RotateSpinner } from "react-spinners-kit";

createTheme(
  "solarized",
  {
    text: {
      primary: "#000",
    },
    background: {
      default: "transparent",
    },
    context: {
      background: "#cb4b16",
      text: "#FFFFFF",
    },
    divider: {
      default: "#073642",
    },
    action: {
      button: "rgba(0,0,0,.54)",
      hover: "rgba(0,0,0,.08)",
      disabled: "rgba(0,0,0,.12)",
    },
  },
  "dark"
);

const customStyles = {
  rows: {
    style: {
      minHeight: "40px", // override the row height
      background: "#fff",
      marginBottom: "0.5rem",
      borderRadius: "5px",
      boxShadow: "1px 0px 5px #780096",
    },
  },
  head: {
    style: {
      background: "#fff",
      marginBottom: "0.5rem",
      borderRadius: "5px",
      boxShadow: "1px 0px 5px #780096",
    },
  },
  headCells: {
    style: {
      paddingLeft: "8px", // override the cell padding for head cells
      paddingRight: "8px",
      color: "#FF0082",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px", // override the cell padding for data cells
      paddingRight: "8px",
    },
  },
};

const DatagridUserManagement = ({ handleEdit }) => {
  const dispatch = useDispatch();
  const { tempUsers } = useSelector((state) => state.usrManage);
  const [show, setShow] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  //Seccion de Filtrado de por idccms
  const filteredItems = tempUsers.filter((item) => item.email);
  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  //creacion de columnas y asignacion de valores
  const columns = [
    {
      name: "E-mail",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "LOB",
      selector: (row) => row.lob,
      sortable: true,
    },
    {
      name: "Campaign",
      selector: (row) => row.campaign,
      sortable: true,
    },
    {
      name: "Rol",
      selector: (row) => row.role,
      sortable: true,
    },
    {
      name: "",
      cell: (row) => (
        <>
          {row.role !== "Agent" && (
            <>
              {" "}
              <button
                onClick={() => handleEdit(row)}
                className={`text-primaryPink bg-white p-1  mr-2 rounded-md hover:bg-primaryPink hover:text-white transition ease-in-out delay-75
								`}
              >
                <FiEdit3 size={18} />
              </button>
              <button
                onClick={() =>
                  dispatch(
                    showConfirmation({
                      data: row,
                      title: "Action Validation",
                      msj: "Are you sure you want to perform this process?",
                      tag: "delUserADM",
                    })
                  )
                }
                className="text-primaryPink bg-white p-1 rounded-md hover:bg-primaryPink hover:text-white transition ease-in-out delay-75"
              >
                <FiTrash2 size={18} />
              </button>
            </>
          )}
        </>
      ),
      button: true,
    },
  ];

  //asignacion de datos para las columnas

  const data = filteredItems?.map((dato) => ({
    id: dato.idEmployee,
    name: dato.name,
    lob: dato.lob,
    campaign: dato.campaign,
    role: dato.rol,
    idCampaign: dato?.idCampaign,
    idLob: dato?.idLob,
    key: dato.email,
    email: dato.email,
    country: dato.country,
    firstname: dato.firstName,
    lastname: dato.lastName,
    hireDate: dato.hireDate.split("T")[0],
    position: dato.position,
    idEmployee: dato.idEmployee,
    wave: 0,
    tpToken: dato.tpToken,
  }));

  const { campaign } = tempUsers[0] ? tempUsers[0] : { campaign: "No Data" };
  return (
    <div>
      {campaign === "Loading ..." ? (
        <div className="w-full h-56 flex justify-center items-center">
          <RotateSpinner size={60} color="#FF0082" />
        </div>
      ) : (
        show && (
          <DataTable
            columns={columns}
            data={data}
            customStyles={customStyles}
            responsive
            direction="auto"
            fixedHeader
            subHeader
            subHeaderComponent={subHeaderComponentMemo}
            subHeaderAlign="right"
            subHeaderWrap
            fixedHeaderScrollHeight="700px"
            theme="solarized"
            pagination
          />
        )
      )}
    </div>
  );
};

export default DatagridUserManagement;
