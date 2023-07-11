import React, { useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { FiEdit3, FiTrash2 } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { showConfirmation } from "../../../redux/alertsSlice";
import { setForm } from "../../../redux/usersFormSlice";
import FilterComponentPOC from "./FilterComponentPOC";

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

const DatagridUserManagementPOC = ({ handleOpen }) => {
  const dispatch = useDispatch();
  const { tempUsers } = useSelector((state) => state.usrManagePoc);
  //const [editParams, setEditParams] = useState([]);
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  //const [filterCampaign, setFilterCampaign] = useState("campaña");
  //const [filterLOB, setFilterLOB] = useState("lob");

  //asigna los cambios al estado para poderlos guardar

  //Seccion de Filtrado de por idccms
  const filteredItems = tempUsers.filter(
    (item) =>
      item.email &&
      item.email.toString().toLowerCase().includes(filterText.toLowerCase())
  );
  const subHeaderComponentMemo = React.useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponentPOC
        onFilter={(e) => setFilterText(e.target.value)}
        onClear={handleClear}
        filterText={filterText}
        handleOpen={handleOpen}
      />
    );
  }, [filterText, resetPaginationToggle]);

  //creacion de columnas y asignacion de valores
  const columns = [
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      width: "150px",
    },
    {
      name: "LOB",
      selector: (row) => row.lob,
      sortable: true,
      width: "150px",
    },
    {
      name: "Campaign",
      selector: (row) => row.campaign,
      sortable: true,
      width: "150px",
    },
    {
      name: "Wave",
      selector: (row) => row.wave,
      sortable: true,
    },
    {
      name: "",
      cell: (row) => (
        <>
          <button
            onClick={() => dispatch(setForm(row))}
            className={`text-primaryPink bg-white p-1  mr-2 rounded-md hover:bg-primaryPink hover:text-white transition ease-in-out delay-75`}
          >
            <FiEdit3 size={18} />
          </button>

          <button
            onClick={
              () =>
                dispatch(
                  showConfirmation({
                    data: row,
                    title: "Action Validation",
                    msj: "Are you sure you want to perform this process?",
                    tag: "delUserADM",
                  })
                )
              /* setConfirmation({ status: true, params: row, act: "delete" }) */
            }
            className="text-primaryPink bg-white p-1 rounded-md hover:bg-primaryPink hover:text-white transition ease-in-out delay-75"
          >
            <FiTrash2 size={18} />
          </button>
        </>
      ),
      button: true,
    },
  ];

  //asignacion de datos para las columnas
  const data = filteredItems?.map((dato) => ({
    id: dato.ident,
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
    wave: dato.Wave,
    idWave: dato.idWave,
  }));

  return (
    <div>
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
    </div>
  );
};

export default DatagridUserManagementPOC;
