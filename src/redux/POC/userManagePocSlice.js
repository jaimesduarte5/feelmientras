import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fullLoadingOff, showToast } from "../alertsSlice";
import { usersData } from "../SuperAdmin/userManagementSlice";
import { resetForm } from "../usersFormSlice";

const initialState = {
	showModal: false,
	user: [
		{
			RowNum: "3",
			IdEmployee: 95,
			ident: 789,
			firstName: "Agente",
			lastName: "Segundo",
			name: "loading ...",
			rol: "Agent",
			email: "loading ...",
			hireDate: "2021-11-10T00:00:00.000Z",
			country: "Colombia",
			position: "Asesor",
			idCampaign: 7,
			campaign: "loading ...",
			idLob: 14,
			lob: "loading ...",
			wave: "loading ...",
		},
	],
	tempUsers: [
		{
			RowNum: "3",
			IdEmployee: 95,
			ident: 789,
			firstName: "Agente",
			lastName: "Segundo",
			name: "loading ...",
			rol: "Agent",
			email: "loading ...",
			hireDate: "2021-11-10T00:00:00.000Z",
			country: "Colombia",
			position: "Asesor",
			idCampaign: 7,
			campaign: "loading ...",
			idLob: 14,
			lob: "loading ...",
			wave: "loading ...",
		},
	],
};
export const userMangePocSlice = createSlice({
	name: "userManagePoc",
	initialState,
	reducers: {
		initialDataPoc: (state, action) => {
			return {
				...initialState,
				users: action.payload,
				tempUsers: action.payload,
			};
		},
	},
});

// Action creators are generated for each case reducer function
export const { initialDataPoc } = userMangePocSlice.actions;

export default userMangePocSlice.reducer;

export const userMgeInitData = createAsyncThunk(
	"data/users/poc",
	async (params, ThunkAPI) => {
		const users = await ThunkAPI.dispatch(usersData());
		if (users.error) {
			return ThunkAPI.dispatch(
				showToast({
					type: "warning",
					title: "error.title",
					msj: "Users Request Error",
					show: true,
					duration: 4000,
				})
			);
		}
		ThunkAPI.dispatch(initialDataPoc(users.payload.data));
		ThunkAPI.dispatch(resetForm());
		return ThunkAPI.dispatch(fullLoadingOff());
	}
);
