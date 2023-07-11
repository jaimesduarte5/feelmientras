import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { reqWithData } from "../../apis/requestTypes";
import { fullLoadingOff, showToast } from "../alertsSlice";
import { setWavesUsersForm } from "../usersFormSlice";
import { userMgeInitData } from "./userManagePocSlice";
//[TrainingType]-[WaveNumber]-[LineofBusiness]-[Channel]-[Language]-[OtherInfo]
const initialState = {
	waveModal: false,
	type: "create",
	waves: [],
	form: {
		trainingType: "",
		waveNumber: "",
		channel: "",
		language: "",
		otherInfo: "",
		idWave: 0,
		wave: "",
	},
	errorForm: {
		trainingType: { value: false, desc: "" },
		waveNumber: { value: false, desc: "" },
		channel: { value: false, desc: "" },
		language: { value: false, desc: "" },
		otherInfo: { value: false, desc: "" },
		wave: { value: false, desc: "" },
	},
};

export const waveFormSlice = createSlice({
	name: "wavesFormPoc",
	initialState,
	reducers: {
		showWaveModal: (state, action) => {
			return {
				...state,
				waveModal: action.payload,
			};
		},
		changeType: (state, action) => {
			return {
				...state,
				type: action.payload,
				form: initialState.form,
				errorForm: initialState.errorForm,
			};
		},
		wavesFormChanges: (state, action) => {
			return {
				...state,
				form: {
					...state.form,
					[action.payload.tag]: action.payload.value,
				},
				errorForm: {
					...state.errorForm,
					[action.payload.tag]: { value: false, desc: "" },
				},
			};
		},
		wavesErrorForm: (state, action) => {
			return { ...state, errorForm: action.payload };
		},
		resetWavesFrom: (state, action) => {
			return { ...initialState, waves: state.waves };
		},
		setWaves: (state, action) => {
			return { ...state, waves: action.payload };
		},
		selectWave: (state, action) => {
			if (!action.payload) {
				return { ...state, form: initialState.form };
			}
			const wave = state.waves.filter((w) => w.idwave === action.payload);
			return {
				...state,
				form: {
					nameWave: wave[0].namewave,
					trainingType: wave[0].trainingType,
					waveNumber: wave[0].waveNumber,
					channel: wave[0].channel ? wave[0].channel : "",
					language: wave[0].Language ? wave[0].Language : "",
					otherInfo: wave[0].otherInfo ? wave[0].otherInfo : "",
					idWave: action.payload,
					wave: wave[0].nameWave,
				},
			};
		},
	},
});

export const {
	showWaveModal,
	changeType,
	wavesFormChanges,
	wavesErrorForm,
	resetWavesFrom,
	setWaves,
	selectWave,
} = waveFormSlice.actions;

export default waveFormSlice.reducer;

////////////////////////////Thunk Section///////////////////////
//Funcion para consultar el waves
export const getWaves = createAsyncThunk(
	"data/poc/getWaves",
	async (params, ThunkAPI) => {
		const data = await reqWithData("getwaves", {
			context: 1,
			idLob: 0,
		});

		if (data.error) {
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
		ThunkAPI.dispatch(setWaves(data.data));
		ThunkAPI.dispatch(setWavesUsersForm(data.data));
		return ThunkAPI.dispatch(fullLoadingOff());
	}
);

export const createWave = createAsyncThunk(
	"data/poc/createWave",
	async (params, ThunkAPI) => {
		const data = await reqWithData("poc/postcreatewave", params);

		if (data.error) {
			ThunkAPI.dispatch(fullLoadingOff());
			return ThunkAPI.dispatch(
				showToast({
					type: "warning",
					title: "Error",
					msj: "We have a problem with create Waves",
					show: true,
					duration: 4000,
				})
			);
		}
		ThunkAPI.dispatch(getWaves());
		ThunkAPI.dispatch(resetWavesFrom());
		return ThunkAPI.dispatch(userMgeInitData());
	}
);

export const updateFormWave = createAsyncThunk(
	"data/poc/updateWave",
	async (params, ThunkAPI) => {
		const data = await reqWithData("poc/postupdatewave", params);

		if (data.error) {
			ThunkAPI.dispatch(fullLoadingOff());
			return ThunkAPI.dispatch(
				showToast({
					type: "warning",
					title: "Error",
					msj: "We have a problem with update Waves",
					show: true,
					duration: 4000,
				})
			);
		}
		ThunkAPI.dispatch(getWaves());
		ThunkAPI.dispatch(resetWavesFrom());
		return ThunkAPI.dispatch(userMgeInitData());
	}
);
