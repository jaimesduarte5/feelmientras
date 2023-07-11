import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { reqWithData } from "../../apis/requestTypes";
import { fullLoadingOff, showToast } from "../alertsSlice";

const initialState = {
	activeFeel: {
		status: false,
		type: "warning",
		title: "User Active in Feel!",
		msj: "the user is active in other lob!",
		show: true,
	},

	viewCard: "course",
	action: "",
	searchC: "",
	searchL: "",
	campaigns: [{ id: 0, name: "Loading Campaigns ..." }],
	campaignsTemps: [{ id: 0, name: "Loading Campaigns ..." }],
	lobs: [{ id: 0, name: "Loading LOBs ..." }],
	lobsTemps: [{ id: 0, name: "Loading LOBs ..." }],
	learningPlan: [],
	learningPlanCourses: [],
	courses: [],
	form: { name: "", lobs: [] },
	newTempLob: "",
	tempLobPoc: { name: "", idccms: "", namePoc: "", email: "" },
};

export const campContentSlice = createSlice({
	name: "campaigns",
	initialState,
	reducers: {
		initialData: (state, action) => {
			return {
				...initialState,
				campaigns: action.payload.campaigns,
				campaignsTemps: action.payload.campaigns,
				lobs: action.payload.lobs,
				lobsTemps: action.payload.lobs,
				learningPlan: [
					{ idLearninPlan: 0, nameLearninPlan: "Select a LOB ..." },
				],
				learningPlanCourses: [
					{ idCourse: 0, nameCourse: "Select a Learnig Plan ..." },
				],
				courses: [{ idCourse: 0, nameCourse: "Select a LOB ..." }],
			};
		},
		changeCampaign: (state, action) => {
			const active = state.campaigns.map((el) => {
				if (el.id === action.payload.id) {
					return { ...el, active: true };
				} else {
					return { ...el, active: false };
				}
			});
			return {
				...state,
				lobs: action.payload.data,
				lobsTemps: action.payload.data,
				campaigns: active,
				campaignsTemps: active,
				viewCard: "course",
				learningPlan: [
					{ idLearninPlan: 0, nameLearninPlan: "Select a LOB ..." },
				],
				learningPlanCourses: [
					{ idCourse: 0, nameCourse: "Select a Learnig Plan ..." },
				],
				courses: [{ idCourse: 0, nameCourse: "Select a LOB ..." }],
			};
		},
		changeLOB: (state, action) => {
			const active = state.lobs.map((el) => {
				if (el.id === action.payload.id) {
					return { ...el, active: true };
				} else {
					return { ...el, active: false };
				}
			});
			return {
				...state,
				learningPlan: action.payload.lp,
				//crear learningtemps y pasarle el payload
				courses: action.payload.courses,
				lobs: active,
				lobsTemps: active,
				viewCard: "course",
				learningPlanCourses: [
					{ idCourse: 0, nameCourse: "Select a Learnig Plan ..." },
				],
			};
		},
		changeLP: (state, action) => {
			const active = state.learningPlan.map((el) => {
				if (el.idLearningPlan === action.payload.id) {
					return { ...el, active: true };
				} else {
					return { ...el, active: false };
				}
			});
			return {
				...state,
				learningPlanCourses: action.payload.data,
				learningPlan: active,
			};
		},
		viewLP: (state, action) => {
			return { ...state, viewCard: action.payload };
		},
		typeForm: (state, action) => {
			if (action.payload.type === "open") {
				if (action.payload.action === "Create") {
					return {
						...state,
						form: { name: "", lobs: [] },
						newTempLob: "",
					};
				} else {
					//logica que llene el form con la info de la lob seleccionada

					return {
						...state,
						form: {
							idC: action.payload.camp.id,
							name: action.payload.camp.name,
							lobs: state.lobs,
						},
						newTempLob: "",
					};
				}
			} else {
				return {
					...state,
					form: { name: "", lobs: [] },
					newTempLob: "",
				};
			}
		},
		newCampaignName: (state, action) => {
			return {
				...state,
				form: { ...state.form, name: action.payload },
			};
		},
		newLobName: (state, action) => {
			return {
				...state,
				newTempLob: action.payload,
			};
		},
		newLobCard: (state, action) => {
			if (action.payload.act === "new") {
				return {
					...state,
					form: {
						...state.form,
						lobs: [
							...state.form.lobs,
							{
								id: 0,
								name: state.newTempLob,
								idccms: "",
								namePoc: "",
								email: "",
								idEmployee: 0,
							},
						],
					},
					newTempLob: "",
				};
			} else {
				const selectedLob = state.form.lobs.filter(
					(lob) => lob.name !== action.payload.name
				);
				return { ...state, form: { ...state.form, lobs: selectedLob } };
			}
		},
		lobSelected: (state, action) => {
			const selectedLob = state.form.lobs.filter(
				(lob) => lob.name === action.payload
			);
			return {
				...state,
				tempLobPoc: { ...selectedLob[0], pastName: action.payload },
			};
		},
		formNameLob: (state, action) => {
			return {
				...state,
				tempLobPoc: { ...state.tempLobPoc, name: action.payload },
			};
		},
		formPOCLob: (state, action) => {
			return {
				...state,
				tempLobPoc: { ...state.tempLobPoc, email: action.payload },
			};
		},
		assignPOC: (state, action) => {
			const fullLob = state.form.lobs.map((lob) => {
				if (lob.name === action.payload.pastName) {
					return {
						...lob,
						name: action.payload.name,
						idccms: action.payload.idccms,
						namePoc: action.payload.namePoc,
						email: action.payload.email,
						idEmployee: action.payload.idEmployee,
					};
				} else {
					return lob;
				}
			});
			return { ...state, form: { ...state.form, lobs: fullLob } };
		},
		searchPOC: (state, action) => {
			return {
				...state,
				tempLobPoc: {
					...state.tempLobPoc,
					namePoc: action.payload.UserName,
					email: action.payload.email,
					idEmployee: action.payload.IdEmployee,
					idccms: action.payload.IdEmployee,
					alert: false,
				},
			};
			/* state.tempLobPoc.namePoc = action.payload.data[0].FullName;
						state.tempLobPoc.email = action.payload.data[0].email; */
		},
		searchCamp: (state, action) => {
			if (action.payload === "") {
				return { ...state, searchC: "", campaignsTemps: state.campaigns };
			}
			const camps = state.campaigns.filter((cam) =>
				cam.name.toLowerCase().includes(action.payload.toLowerCase())
			);
			return { ...state, searchC: action.payload, campaignsTemps: camps };
		},
		searchLob: (state, action) => {
			if (action.payload === "") {
				return { ...state, searchL: "", lobsTemps: state.lobs };
			}
			const lobs = state.lobs.filter((lob) =>
				lob.name.toLowerCase().includes(action.payload.toLowerCase())
			);
			return { ...state, searchL: action.payload, lobsTemps: lobs };
		},
	},
});

export const {
	initialData,
	changeCampaign,
	changeLOB,
	changeLP,
	viewLP,
	newCampaignName,
	newLobName,
	newLobCard,
	typeForm,
	assignPOC,
	lobSelected,
	formNameLob,
	formPOCLob,
	searchPOC,
	searchCamp,
	searchLob,
} = campContentSlice.actions;

export default campContentSlice.reducer;

export const campaignsData = createAsyncThunk(
	"data/campaigns/campCont",
	async () => {
		const dataCampaign = await reqWithData("su/getcampaigncontent", {
			context: 1,
		});

		return dataCampaign;
	}
);

export const lobsData = createAsyncThunk(
	"data/lobs/campCont",
	async (params) => {
		const dataLobs = await reqWithData("su/getcampaigncontent", {
			context: 2,
			idCampaign: params,
		});

		return dataLobs;
	}
);

export const getDataCampCont = createAsyncThunk(
	"data/getData/campCont",
	async (params, ThunkAPI) => {
		const campaigns = await ThunkAPI.dispatch(campaignsData());
		if (campaigns.error) {
			return ThunkAPI.dispatch(
				showToast({
					type: "warning",
					title: "error.title",
					msj: "Campaign Request Error",
					show: true,
					duration: 4000,
				})
			);
		}

		const lobs = await ThunkAPI.dispatch(
			lobsData(campaigns.payload.data[0].Campaign[0].id)
		);
		if (lobs.error) {
			return ThunkAPI.dispatch(
				showToast({
					type: "warning",
					title: "error.title",
					msj: "lobs Request Error",
					show: true,
					duration: 4000,
				})
			);
		}
		const data1 = campaigns.payload.data[0].Campaign.map((el, index) => {
			if (index === 0) {
				return { ...el, active: true };
			} else {
				return { ...el, active: false };
			}
		});
		const data2 = lobs.payload.data[0].Lobs.map((el, index) => {
			return { ...el, active: false };
		});

		return ThunkAPI.dispatch(
			initialData({
				campaigns: data1,
				lobs: data2,
			})
		);
	}
);

export const searchMD = createAsyncThunk(
	"data/searchMD",
	async (params, ThunkAPI) => {
		const search = await reqWithData("getagentesinfomd", params);
		if (search.error) {
			ThunkAPI.dispatch(fullLoadingOff());
			return ThunkAPI.dispatch(
				showToast({
					type: "warning",
					title: "Error in the request",
					msj: search.error,
					show: true,
					duration: 4000,
				})
			);
		}
		if (search.data[0].UserName === "Assigned as POC ") {
			return ThunkAPI.dispatch(
				showToast({
					type: "warning",
					title: "POC doesn't exist or ir in another LOB!",
					msj: "Verify email Trainer POC!",
					show: true,
				})
			);
		}

		return ThunkAPI.dispatch(searchPOC(search.data[0]));
	}
);

export const createCamp = createAsyncThunk(
	"data/createCamp",
	async (params, ThunkAPI) => {
		const create = await reqWithData("su/createcampaign", params);
		if (create.error) {
			ThunkAPI.dispatch(fullLoadingOff());
			return ThunkAPI.dispatch(
				showToast({
					type: "warning",
					title: "Error in the request",
					msj: create.error,
					show: true,
					duration: 4000,
				})
			);
		}
		await ThunkAPI.dispatch(getDataCampCont());
		ThunkAPI.dispatch(
			showToast({
				type: "success",
				title: "Create!",
				msj: "The Campaign is create!",
				show: true,
			})
		);
		return ThunkAPI.dispatch(fullLoadingOff());
	}
);

export const updateCamp = createAsyncThunk(
	"data/updateCamp",
	async (params, ThunkAPI) => {
		const edit = await reqWithData("su/updatecampaign", params);
		if (edit.error) {
			ThunkAPI.dispatch(fullLoadingOff());
			return ThunkAPI.dispatch(
				showToast({
					type: "warning",
					title: "Error in the request",
					msj: edit.error,
					show: true,
					duration: 4000,
				})
			);
		}
		await ThunkAPI.dispatch(getDataCampCont());
		ThunkAPI.dispatch(
			showToast({
				type: "success",
				title: params.context === 1 ? "Update!" : "Delete!",
				msj:
					params.context === 1
						? "The Campaign is update!"
						: "The Campaign is delete!",
				show: true,
			})
		);
		return ThunkAPI.dispatch(fullLoadingOff());
	}
);
