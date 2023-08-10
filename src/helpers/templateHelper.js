import { valEmail, valEmailFeel } from "./usersHelper";
import ExcelJS from "exceljs";

const defaultHeadersADM = [
	"Ident",
	"Name",
	"Lastname",
	"Email",
	"Position",
	"Country",
	"Role",
	"Hire Day",
	"Hire Month",
	"Hire Year",
	"id Wave"
];
const defaultHeadersPOC = [
	"Ident",
	"Name",
	"Lastname",
	"Email",
	"Position",
	"Country",
	"Role",
	"Hire Day",
	"Hire Month",
	"Hire Year",
	"Wave",
];
const defaultHeadersViewer = [
	"Name",
	"Lastname",
	"Email",
	"Password",
	"Country",
	"Campaign",
];

export const validateHeaders = (headers) => {
	if (headers.length === defaultHeadersADM.length) {
		const diferentsArrays = defaultHeadersADM.filter(
			(header, index) => header !== headers[index]
		);

		return diferentsArrays;
	}
	if (headers.length === defaultHeadersPOC.length) {
		const diferentsArrays = defaultHeadersPOC.filter(
			(header, index) => header !== headers[index]
		);

		return diferentsArrays;
	}
	if (headers.length === defaultHeadersViewer.length) {
		const diferentsArrays = defaultHeadersViewer.filter(
			(header, index) => header !== headers[index]
		);

		return diferentsArrays;
	}
};

export const validateFieldsViewer = (data, userData) => {
	const countries = [
		"Colombia",
		"Peru",
		"Guyana",
		"Nicaragua",
		"Trinidad y Tobago",
	];
	let obj = {};
	const rep = [];

	const val = data.filter((row, i) => {
		obj = {
			row: `row # ${i + 2}`,
			name: row[0],
			lastname: row[1],
			email: row[2],
			password: row[3],
			country: row[4],
			campaign: row[5],
		};
		if (row.length !== defaultHeadersViewer.length) {
			rep.push({ ...obj, row: `row # ${i + 2} with extra fields` });
			return true;
		}
		const error = row.filter((col, index) => {
			if (index === 0) {
				if (col === undefined || col === "") {
					obj = {
						...obj,
						name: `Empty value in the row # ${i + 2}, field Name`,
					};
					return true;
				}
				return false;
			} else if (index === 1) {
				if (col === undefined || col === "") {
					obj = {
						...obj,
						lastname: `Empty value in the row # ${i + 2}, field Lastname`,
					};
					return true;
				}
				return false;
			} else if (index === 2) {
				//email
				if (col === undefined || col === "" || valEmailFeel(col)) {
					obj = {
						...obj,
						email: `Empty value or wrong business email in the row # ${
							i + 1
						}, field Email`,
					};
					return true;
				}
				return false;
			} else if (index === 3) {
				if (col === undefined || col === "") {
					obj = {
						...obj,
						password: `Empty value in the row # ${i + 2}, field Password`,
					};
					return true;
				}
				return false;
			} else if (index === 4) {
				if (col === undefined || !countries.includes(col)) {
					obj = {
						...obj,
						country: `Empty value or wrong country in the row # ${
							i + 2
						}, field Country`,
					};
					return true;
				}
				return false;
			} else if (index === 5) {
				if (col === undefined || isNaN(col)) {
					obj = {
						...obj,
						campaign: `Empty value in the row # ${i + 2}, field Campaign`,
					};
					return true;
				}
				return false;
			} else {
				return true;
			}
		});
		if (error.length > 0) {
			rep.push(obj);
			return true;
		} else {
			return false;
		}
	});
	return { val, rep };
};
///validar fecha inferior a la actual, email, pais, role, crear array to send

export const validateFields = (data, userData) => {
	const roleOptions = ["Super Admin", "Poc"];
	const countries = [
		"Colombia",
		"Peru",
		"Guyana",
		"Nicaragua",
		"Trinidad y Tobago",
	];
	let obj = {};
	const rep = [];
	if (userData.role === "Poc") {
		const val = data.filter((row, i) => {
			obj = {
				row: `row # ${i + 2}`,
				ident: row[0],
				name: row[1],
				lastname: row[2],
				email: row[3],
				position: row[4],
				country: row[5],
				role: row[6],
				hireD: row[7],
				hireM: row[8],
				hireY: row[9],
				wave: row[10],
			};
			if (row.length !== defaultHeadersPOC.length) {
				rep.push({ ...obj, row: `row # ${i + 2} with extra fields` });
				return true;
			}
			const error = row.filter((col, index) => {
				if (index === 0) {
					if (col === undefined || isNaN(col)) {
						obj = {
							...obj,
							ident: `Empty value in the row # ${i + 2}, field Ident`,
						};
						return true;
					}
					return false;
				} else if (index === 1) {
					if (col === undefined || col === "") {
						obj = {
							...obj,
							name: `Empty value in the row # ${i + 2}, field Name`,
						};
						return true;
					}
					return false;
				} else if (index === 2) {
					if (col === undefined || col === "") {
						obj = {
							...obj,
							lastname: `Empty value in the row # ${i + 2}, field Lastname`,
						};
						return true;
					}
					return false;
				} else if (index === 3) {
					//email
					if (col === undefined || col === "" || valEmail(col)) {
						obj = {
							...obj,
							email: `Empty value or wrong business email in the row # ${
								i + 1
							}, field Email`,
						};
						return true;
					}
					return false;
				} else if (index === 4) {
					if (col === undefined || col === "") {
						obj = {
							...obj,
							position: `Empty value in the row # ${i + 2}, field Position`,
						};
						return true;
					}
					return false;
				} else if (index === 5) {
					if (col === undefined || !countries.includes(col)) {
						obj = {
							...obj,
							country: `Empty value or wrong country in the row # ${
								i + 2
							}, field Country`,
						};
						return true;
					}
					return false;
				} else if (index === 6) {
					if (col === undefined || !["Agent"].includes(col)) {
						obj = {
							...obj,
							role: `Empty value or wrong role in the row # ${
								i + 2
							}, filed Role`,
						};
						return true;
					}
					return false;
				} else if (index === 7) {
					if (col === undefined || isNaN(col) || col < 1 || col > 31) {
						obj = {
							...obj,

							hireD: `Empty value or is not a day value in the row # ${
								i + 2
							}, field Hire Day`,
						};
						return true;
					}
					return false;
				} else if (index === 8) {
					if (col === undefined || isNaN(col) || col < 1 || col > 12) {
						obj = {
							...obj,
							hireM: `Empty value or is not a month value in the row # ${
								i + 2
							}, field Hire Month`,
						};
						return true;
					}
					return false;
				} else if (index === 9) {
					if (
						col === undefined ||
						col === "" ||
						isNaN(col) ||
						col > new Date().getFullYear()
					) {
						obj = {
							...obj,
							hireY: `Empty value or is not a year value in the row # ${
								i + 2
							}, field Hire Year`,
						};
						return true;
					}
					return false;
				} else if (index === 10) {
					if (col === undefined || col === "") {
						obj = {
							...obj,
							wave: `Empty value in the row # ${i + 2}, field Wave`,
						};
						return true;
					}
					return false;
				} else {
					return true;
				}
			});
			if (error.length > 0) {
				rep.push(obj);
				return true;
			} else {
				return false;
			}
		});
		return { val, rep };
	} else {
		const val = data.filter((row, i) => {
			obj = {
				row: `row # ${i + 2}`,
				ident: row[0],
				name: row[1],
				lastname: row[2],
				email: row[3],
				position: row[4],
				country: row[5],
				role: row[6],
				hireD: row[7],
				hireM: row[8],
				hireY: row[9],
				idWave: row[10]
			};
			if (row.length !== defaultHeadersADM.length) {
				rep.push({ ...obj, row: `row # ${i + 2} with extra fields` });
				return true;
			}
			const error = row.filter((col, index) => {
				if (index === 0) {
					if (col === undefined || isNaN(col)) {
						obj = {
							...obj,
							ident: `Empty value in the row # ${i + 2}, field Ident`,
						};
						return true;
					}
					return false;
				} else if (index === 1) {
					if (col === undefined || col === "") {
						obj = {
							...obj,
							name: `Empty value in the row # ${i + 2}, field Name`,
						};
						return true;
					}
					return false;
				} else if (index === 2) {
					if (col === undefined || col === "") {
						obj = {
							...obj,
							lastname: `Empty value in the row # ${i + 2}, field Lastname`,
						};
						return true;
					}
					return false;
				} else if (index === 3) {
					//email
					if (col === undefined || col === "" || valEmail(col)) {
						obj = {
							...obj,
							email: `Empty value or wrong business email in the row # ${
								i + 1
							}, field Email`,
						};
						return true;
					}
					return false;
				} else if (index === 4) {
					if (col === undefined || col === "") {
						obj = {
							...obj,
							position: `Empty value in the row # ${i + 2}, field Position`,
						};
						return true;
					}
					return false;
				} else if (index === 5) {
					if (col === undefined || !countries.includes(col)) {
						obj = {
							...obj,
							country: `Empty value or wrong country in the row # ${
								i + 2
							}, field Country`,
						};
						return true;
					}
					return false;
				} else if (index === 6) {
					if (col === undefined || !roleOptions.includes(col)) {
						obj = {
							...obj,
							role: `Empty value or wrong role in the row # ${
								i + 2
							}, filed Role`,
						};
						return true;
					}
					return false;
				} else if (index === 7) {
					if (col === undefined || isNaN(col) || col < 1 || col > 31) {
						obj = {
							...obj,

							hireD: `Empty value or is not a day value in the row # ${
								i + 2
							}, field Hire Day`,
						};
						return true;
					}
					return false;
				} else if (index === 8) {
					if (col === undefined || isNaN(col) || col < 1 || col > 12) {
						obj = {
							...obj,
							hireM: `Empty value or is not a month value in the row # ${
								i + 2
							}, field Hire Month`,
						};
						return true;
					}
					return false;
				} else if (index === 9) {
					if (
						col === undefined ||
						col === "" ||
						isNaN(col) ||
						col > new Date().getFullYear()
					) {
						obj = {
							...obj,
							hireY: `Empty value or is not a year value in the row # ${
								i + 2
							}, field Hire Year`,
						};
						return true;
					}
					return false;
				} else if (index === 10) {
					if (col === undefined || col === "") {
						obj = {
							...obj,
							idWave: `Empty value in the row # ${i + 2}, field Wave`,
						};
						return true;
					}
					return false;
				}	else {
					return true;
				}
			});
			if (error.length > 0) {
				rep.push(obj);
				return true;
			} else {
				return false;
			}
		});
		return { val, rep };
	}
};

export const dataToSendAdmin = (data, userData) => {
	if (userData.role === "Poc") {
		const dts = data.map((el) => {
			let date = `${el[8]}-${el[7]}-${el[9]}`;
			el.splice(5, 0, date);
			el.splice(8, 3);
			el.splice(1, 0, 0);
			el.splice(10, 2, userData.idLob, userData.idCampaign);
			return el;
		});
		return dts;
	} else {
		const dts = data.map((el) => {
			let date = `${el[8]}-${el[7]}-${el[9]}`;
			el.splice(5, 0, date);
			el.splice(1, 0, 0);
			el.splice(9, 3, "0", 0, 0);
			return el;
		});
		return dts;
	}
};
/* 
[
            0,
            0,
            "Nombre 2",
            "Apellido 2",
            "correo2@feel.teleperformance.com",
            "",
            "2023-01-01",
            "Colombia",
            "Viewer",
            0,
            1,
            "5",
            "1234567890"
        ] */

/*
 0: "nombre 1"
1:"apellido 1"
2: "email1@feel.teleperformance.com"
3: "pswd1"
4: "Colombia"
5: 5 */
export const dataToSendViewer = (data, data2) => {
	const dts = data.map((el, i) => {
		return [
			0,
			0,
			el[0],
			el[1],
			el[2],
			"",
			"2023-01-01",
			el[4],
			"Viewer",
			0,
			0,
			el[5],
			el[3],
		];
	});
	return dts;
};

export const feedbackSheetViewer = async (data) => {
	const fbReportSheet = (workbook) => {
		const worksheet = workbook.getWorksheet("Wrong Rows");
		worksheet.columns = [
			{ header: "ROW", key: "row" },
			{ header: "Name", key: "name" },
			{ header: "Lastname", key: "lastname" },
			{ header: "Email", key: "email" },
			{ header: "Password", key: "password" },
			{ header: "Country", key: "country" },
			{ header: "Campaign", key: "campaign" },
		];
		worksheet.addRows(data);
	};
	const workbook = new ExcelJS.Workbook();
	workbook.addWorksheet("Wrong Rows");
	fbReportSheet(workbook);
	let fecha = new Date().toLocaleDateString();
	const uint8Array = await workbook.xlsx.writeBuffer();
	const blob = new Blob([uint8Array], { type: "application/octet-binary" });
	const url = window.URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = `Report_Wrong_Rows_Viewer_${fecha}.xlsx`;
	a.click();
	a.remove();
};

export const feedbackSheet = async (data, userData) => {
	if (userData.role === "Poc") {
		const fbReportSheet = (workbook) => {
			const worksheet = workbook.getWorksheet("Wrong Rows");
			worksheet.columns = [
				{ header: "ROW", key: "row" },
				{ header: "Ident", key: "ident" },
				{ header: "Name", key: "name" },
				{ header: "Lastname", key: "lastname" },
				{ header: "Email", key: "email" },
				{ header: "Position", key: "position" },
				{ header: "Country", key: "country" },
				{ header: "Role", key: "role" },
				{ header: "Hire Day", key: "hireD" },
				{ header: "Hire Month", key: "hireM" },
				{ header: "Hire Year", key: "hireY" },
				{ header: "Wave", key: "wave" },
			];
			worksheet.addRows(data);
		};
		const workbook = new ExcelJS.Workbook();
		workbook.addWorksheet("Wrong Rows");
		fbReportSheet(workbook);
		let fecha = new Date().toLocaleDateString();
		const uint8Array = await workbook.xlsx.writeBuffer();
		const blob = new Blob([uint8Array], { type: "application/octet-binary" });
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `Report_Wrong_Rows_${fecha}.xlsx`;
		a.click();
		a.remove();
	} else {
		const fbReportSheet = (workbook) => {
			const worksheet = workbook.getWorksheet("Wrong Rows");
			worksheet.columns = [
				{ header: "ROW", key: "row" },
				{ header: "Ident", key: "ident" },
				{ header: "Name", key: "name" },
				{ header: "Lastname", key: "lastname" },
				{ header: "Email", key: "email" },
				{ header: "Position", key: "position" },
				{ header: "Country", key: "country" },
				{ header: "Role", key: "role" },
				{ header: "Hire Day", key: "hireD" },
				{ header: "Hire Month", key: "hireM" },
				{ header: "Hire Year", key: "hireY" },
				{ header: "id Wave", key: "idWave" }
			];
			worksheet.addRows(data);
		};
		const workbook = new ExcelJS.Workbook();
		workbook.addWorksheet("Wrong Rows");
		fbReportSheet(workbook);
		let fecha = new Date().toLocaleDateString();
		const uint8Array = await workbook.xlsx.writeBuffer();
		const blob = new Blob([uint8Array], { type: "application/octet-binary" });
		const url = window.URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `Report_Wrong_Rows_${fecha}.xlsx`;
		a.click();
		a.remove();
	}
};
