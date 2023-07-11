import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { reqWithData } from "../../apis/requestTypes";
import { fullLoadingOff, showToast } from "../alertsSlice";
import { campaignCourses, lobLPs } from "./learningPlanSlice";

const initialState = {
	waves: [],
	tempWaves: [],
	dbWaves: [],
	courses: [],
	dbCourses: [],
	tempCourses: [],
	learningPlan: [],
	dbLearningPlan: [],
	tempLearningPlan: [],
	type: "courses",
	searchWave: "",
	searchCLP: "",
};

export const AssignmentSlice = createSlice({
	name: "Assignment",
	initialState,
	reducers: {
		assignmentData: (state, action) => {
			return {
				...state,
				waves: action.payload.waves,
				tempWaves: action.payload.waves,
				dbWaves: action.payload.waves,
				courses: action.payload.courses,
				tempCourses: action.payload.courses,
				dbCourses: action.payload.courses,
				learningPlan: action.payload.lps,
				tempLearningPlan: action.payload.lps,
				dbLearningPlan: action.payload.lps,
			};
		},
		selectWave: (state, action) => {
			///falta tener en cuenta el search
			const selWave = state.waves.map((wave) => {
				if (wave.idwave === action.payload.idWave) {
					return { ...wave, selected: true };
				} else {
					return { ...wave, selected: false };
				}
			});
			if (state.searchWave) {
				const filterWave = selWave.filter((el) =>
					el.namewave
						.toString()
						.toLowerCase()
						.includes(state.searchWave.toLowerCase())
				);
				return {
					...state,
					waves: selWave,
					tempWaves: filterWave,
					courses: action.payload.courses,
					tempCourses: action.payload.courses,
					learningPlan: action.payload.lps,
					tempLearningPlan: action.payload.lps,
				};
			} else {
				return {
					...state,
					waves: selWave,
					tempWaves: selWave,
					courses: action.payload.courses,
					dbCourses: action.payload.courses,
					tempCourses: action.payload.courses,
					learningPlan: action.payload.lps,
					dbLearningPlan: action.payload.lps,
					tempLearningPlan: action.payload.lps,
				};
			}
		},
		checkedCourse: (state, action) => {
			const checkFun = state.courses.map((course) => {
				if (course.idCourse === action.payload) {
					return { ...course, checked: !course.checked };
				} else {
					return course;
				}
			});
			if (state.searchCLP && state.type === "courses") {
				const filterCourse = checkFun.filter((el) =>
					el.nameCourse
						.toString()
						.toLowerCase()
						.includes(state.searchCLP.toLowerCase())
				);
				return { ...state, courses: checkFun, tempCourses: filterCourse };
			} else {
				return { ...state, courses: checkFun, tempCourses: checkFun };
			}
		},
		checkedLPs: (state, action) => {
			const checkFun = state.learningPlan.map((lp) => {
				if (lp.idLearningPlan === action.payload) {
					return { ...lp, checked: !lp.checked };
				} else {
					return lp;
				}
			});
			if (state.searchCLP && state.type === "learningPlan") {
				const filterLP = checkFun.filter((el) =>
					el.nameLearningPlan
						.toString()
						.toLowerCase()
						.includes(state.searchCLP.toLowerCase())
				);
				return { ...state, learningPlan: checkFun, tempLearningPlan: filterLP };
			} else {
				return { ...state, learningPlan: checkFun, tempLearningPlan: checkFun };
			}
		},
		changeTypeAssign: (state, action) => {
			return { ...state, type: action.payload, searchCLP: "" };
		},
		searchWaveAssign: (state, action) => {
			const filterWave = state.waves.filter((el) =>
				el.namewave
					.toString()
					.toLowerCase()
					.includes(action.payload.toLowerCase())
			);
			return {
				...state,
				tempWaves: filterWave,
				searchWave: action.payload,
			};
		},
		searchLPCAssign: (state, action) => {
			if (state.type === "courses") {
				const filterCourse = state.courses.filter((el) =>
					el.nameCourse
						.toString()
						.toLowerCase()
						.includes(action.payload.toLowerCase())
				);
				return {
					...state,
					tempCourses: filterCourse,
					searchCLP: action.payload,
				};
			} else {
				const filterLP = state.learningPlan.filter((el) =>
					el.nameLearningPlan
						.toString()
						.toLowerCase()
						.includes(action.payload.toLowerCase())
				);
				return {
					...state,
					tempLearningPlan: filterLP,
					searchCLP: action.payload,
				};
			}
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	assignmentData,
	selectWave,
	checkedCourse,
	checkedLPs,
	changeTypeAssign,
	searchWaveAssign,
	searchLPCAssign,
} = AssignmentSlice.actions;

//export const usrInfo = (state) => state.userData;
export default AssignmentSlice.reducer;

////////////////////////////Thunk Section///////////////////////
//Funcion para consultar el waves
export const assignInitialData = createAsyncThunk(
	"data/poc/getAssignInitData",
	async (params, ThunkAPI) => {
		const c = await ThunkAPI.dispatch(campaignCourses(params.idCampaign));
		if (c.payload.error) {
			return ThunkAPI.dispatch(
				showToast({
					type: "warning",
					title: "Error",
					msj: "Courses Request Error",
					show: true,
					duration: 4000,
				})
			);
		}
		const learningP = await ThunkAPI.dispatch(lobLPs(params));
		if (learningP.payload.error) {
			return ThunkAPI.dispatch(
				showToast({
					type: "warning",
					title: "Error",
					msj: "LPs Request Error",
					show: true,
					duration: 4000,
				})
			);
		}
		const w = await reqWithData("getwaves", {
			context: 1,
			idLob: 0,
		});
		if (w.error) {
			ThunkAPI.dispatch(fullLoadingOff());
			return ThunkAPI.dispatch(
				showToast({
					type: "warning",
					title: "Error",
					msj: "We have a problem with get Waves",
					show: true,
					duration: 4000,
				})
			);
		}
		const lpcxw = await reqWithData("poc/getwaveassignments", {
			idWave: w.data[0]?.idwave ? w.data[0]?.idwave : 0,
		});
		if (lpcxw.error) {
			ThunkAPI.dispatch(fullLoadingOff());
			return ThunkAPI.dispatch(
				showToast({
					type: "warning",
					title: "Error",
					msj: "We have a problem with get Waves",
					show: true,
					duration: 4000,
				})
			);
		}
		if (lpcxw.data.courses) {
			const courses = c.payload.map((course) => {
				const check = lpcxw.data.courses.filter(
					(el) => el.idCourse === course.idCourse
				);
				if (check.length > 0) {
					return { ...course, checked: true };
				} else {
					return { ...course, checked: false };
				}
			});

			const lps = learningP.payload.map((lp) => {
				const check = lpcxw.data.learningPlan.filter(
					(el) => el.idlp === lp.idLearningPlan
				);
				if (check.length > 0) {
					return { ...lp, checked: true };
				} else {
					return { ...lp, checked: false };
				}
			});

			const waves = w.data.map((wave, i) => {
				if (i === 0) {
					wave.selected = true;
					return wave;
				}
				wave.selected = false;
				return wave;
			});
			const res = { waves, courses, lps };
			ThunkAPI.dispatch(assignmentData(res));
			return ThunkAPI.dispatch(fullLoadingOff());
		} else {
			const waves = w.data.map((wave, i) => {
				if (i === 0) {
					wave.selected = true;
					return wave;
				}
				wave.selected = false;
				return wave;
			});
			const courses = c.payload.map((course) => {
				return { ...course, checked: false };
			});

			const lps = learningP.payload.map((lp) => {
				return { ...lp, checked: false };
			});
			const res = { courses, lps, waves };
			ThunkAPI.dispatch(assignmentData(res));
			return ThunkAPI.dispatch(fullLoadingOff());
		}
	}
);

export const changeWaveLPC = createAsyncThunk(
	"data/poc/getDataWaveLPC",
	async (params, ThunkAPI) => {
		const c = await ThunkAPI.dispatch(campaignCourses(params.idCampaign));
		if (c.payload.error) {
			return ThunkAPI.dispatch(
				showToast({
					type: "warning",
					title: "Error",
					msj: "Courses Request Error",
					show: true,
					duration: 4000,
				})
			);
		}
		const learningP = await ThunkAPI.dispatch(lobLPs(params));
		if (learningP.payload.error) {
			return ThunkAPI.dispatch(
				showToast({
					type: "warning",
					title: "Error",
					msj: "LPs Request Error",
					show: true,
					duration: 4000,
				})
			);
		}
		const lpcxw = await reqWithData("poc/getwaveassignments", {
			idWave: params.idWave,
		});
		if (lpcxw.error) {
			ThunkAPI.dispatch(fullLoadingOff());
			return ThunkAPI.dispatch(
				showToast({
					type: "warning",
					title: "Error",
					msj: "We have a problem with get lps and courses",
					show: true,
					duration: 4000,
				})
			);
		}
		if (lpcxw.data.courses) {
			const courses = c.payload.map((course) => {
				const check = lpcxw.data.courses.filter(
					(el) => el.idCourse === course.idCourse
				);
				if (check.length > 0) {
					return { ...course, checked: true };
				} else {
					return { ...course, checked: false };
				}
			});

			const lps = learningP.payload.map((lp) => {
				const check = lpcxw.data.learningPlan.filter(
					(el) => el.idlp === lp.idLearningPlan
				);
				if (check.length > 0) {
					return { ...lp, checked: true };
				} else {
					return { ...lp, checked: false };
				}
			});
			const res = { courses, lps, idWave: params.idWave };
			ThunkAPI.dispatch(selectWave(res));
			return ThunkAPI.dispatch(fullLoadingOff());
		} else {
			const courses = c.payload.map((course) => {
				return { ...course, checked: false };
			});

			const lps = learningP.payload.map((lp) => {
				return { ...lp, checked: false };
			});
			const res = { courses, lps, idWave: params.idWave };
			ThunkAPI.dispatch(selectWave(res));
			return ThunkAPI.dispatch(fullLoadingOff());
		}
	}
);

export const assignmentLPC = createAsyncThunk(
	"data/poc/assignmentLPC",
	async (params, ThunkAPI) => {
		const lpcxw = await reqWithData("poc/postinsertlpcWave", params.body);
		if (lpcxw.error) {
			ThunkAPI.dispatch(fullLoadingOff());
			return ThunkAPI.dispatch(
				showToast({
					type: "warning",
					title: "Error",
					msj: "We have a problem with get lps and courses",
					show: true,
					duration: 4000,
				})
			);
		}
		ThunkAPI.dispatch(assignInitialData(params.initData));
		return ThunkAPI.dispatch(fullLoadingOff());
	}
);
