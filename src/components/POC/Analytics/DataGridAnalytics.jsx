import React, { useState } from "react";
import DataTable, { createTheme } from "react-data-table-component";
import { useSelector } from "react-redux";
import Progress from "./Progress";

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

const dataUser = [
	{
		ident: 1,
		rank: 1,
		ccms: 4472074,
		wave: "wave1",
		name: "Deiby Niño Garces",
		progress: 80,
	},
	{
		ident: 2,
		rank: 2,
		ccms: 4326952,
		wave: "wave2",
		name: "Daniel Moreno Puentes",
		progress: 70,
	},
];

const DataGridAnalytics = () => {
	const { headCount } = useSelector((state) => state.analyticsPoc);

	//creacion de columnas y asignacion de valores
	const columns = [
		{
			name: "Rank",
			selector: (row) => row.rank,
			width: "100px",
			sortable: true,
		},
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
			name: "Wave",
			selector: (row) => row.wave,
			sortable: true,
			width: "350px",
		},

		{
			name: "Progress",
			selector: (row) => row.progress,
			cell: (row) => <Progress value={row.progress} />,
			button: true,
			width: "400px",
			sortable: true,
		},
	];
	/* IdEmployee: 148
email: "apellido.6@teleperformance.com"
idCampaign: 11
idLob: 19
idWave: 4
ident: 0
nameCampaign: "Campaña nueva"
nameLob: "Lob Nuevo de campaña"
nameUser: "agente 2 apellido 2"
progress: 33.33333333333333
wave:"nameWave1" */
	//asignacion de datos para las columnas
	const data = headCount.map((dato) => ({
		id: dato.IdEmployee,
		idCampaign: dato.idCampaign,
		idLob: dato.idLob,
		idWave: dato.idWave,
		email: dato.email,
		rank: dato.rank,
		ccms: dato.ccms,
		name: dato.nameUser,
		wave: dato.wave,
		progress: dato.progress,
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
				subHeaderAlign="right"
				subHeaderWrap
				fixedHeaderScrollHeight="700px"
				theme="solarized"
				pagination
			/>
		</div>
	);
};

export default DataGridAnalytics;
