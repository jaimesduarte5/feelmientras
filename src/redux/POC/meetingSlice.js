import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { reqWithData } from "../../apis/requestTypes";
import { fullLoadingOff, showToast } from "../alertsSlice";
import { clearURL } from "../firebase/courseManageSlice";

const initialState = {
  isLoading: false,
  loadingDayMeet: false,
  newMeet: {
    meetName: "",
    meetDescription: "",
    dateMeet: "",
    hourIniMeet: "",
    hourEndMeet: "",
    urlImgMeet: "",
    urlMeet: "",
  },
  meetings: [],
  dailyMeetings: [],
  errors: {
    meetName: { status: false, msj: "The name of the meeting is required" },
    meetDescription: {
      status: false,
      msj: "All meeting require a description",
    },
    dateMeet: { status: false, msj: "You need a to schedule the meeting" },
    hourIniMeet: { status: false, msj: "Start time missing" },
    hourEndMeet: { status: false, msj: "End time missing" },
    urlImageMeet: {
      status: false,
      msj: "The Image of the meeting is required",
    },
    urlMeet: { status: false, msj: "Add the url meeting" },
  },
};

export const meetSlice = createSlice({
  name: "meetings",
  initialState,
  reducers: {
    //dispara el estado de loading
    loadingMeets: (state, action) => {
      return {
        ...state,
        isLoading: action.payload,
      };
    },
    loadingDayMeets: (state, action) => {
      return {
        ...state,
        loadingDayMeet: action.payload,
      };
    },
    //maneja el estado de los errores de creacion de cursos y actividades
    errorsMeetValidation: (state, action) => {
      return {
        ...state,
        errors: action.payload,
      };
    },
    // crea la reunion en un stado local
    addMeeting: (state, action) => {
      return {
        ...state,
        newMeet: {
          ...state.newMeet,
          [action.payload.name]: action.payload.value,
        },
      };
    },
    // limpia el state e inicializa el objeto newMeet
    clearMeetingState: (state) => {
      return {
        ...state,
        newMeet: initialState.newMeet,
      };
    },
    editMeet: (state, action) => {
      return {
        ...state,
        newMeet: action.payload,
      };
    },
    //asigna las meetings al stado
    showMeets: (state, action) => {
      return { ...state, meetings: action.payload };
    },
    //muestra las meet por fecha
    showMeetsPerDay: (state, action) => {
      return {
        ...state,
        dailyMeetings: action.payload,
      };
    },
  },
});

export const {
  loadingMeets,
  loadingDayMeets,
  errorsMeetValidation,
  addMeeting,
  clearMeetingState,
  editMeet,
  showMeets,
  showMeetsPerDay,
} = meetSlice.actions;

export default meetSlice.reducer;

///////////////////////Thunk Section//////////////////////////

//Funcion para consultar el listado de meets activas
export const getMeetings = createAsyncThunk(
  "data/poc/getMeetings",
  async (params, ThunkAPI) => {
    ThunkAPI.dispatch(loadingMeets(true));
    const data = await reqWithData("poc/getmeetings", {
      date: "2023-01-17",
      context: 1,
    });

    if (data.error) {
      ThunkAPI.dispatch(loadingMeets(false));
      return ThunkAPI.dispatch(
        showToast({
          type: "warning",
          title: "Error",
          msj: "We have a problem with the meetings, try again",
          show: true,
          duration: 4000,
        })
      );
    }

    ThunkAPI.dispatch(loadingMeets(false));
    return ThunkAPI.dispatch(showMeets(data.data));
  }
);

//Funcion para crear  una  meet nueva
export const createMeet = createAsyncThunk(
  "data/poc/createMeet",
  async (newMeet, ThunkAPI) => {
    const create = await reqWithData("poc/postcreatemeeting", newMeet);

    if (create.error) {
      ThunkAPI.dispatch(fullLoadingOff());
      return ThunkAPI.dispatch(
        showToast({
          type: "warning",
          title: "Error",
          msj: "We have a problem with the creation of this Meeting",
          show: true,
          duration: 4000,
        })
      );
    }

    if (create.status === 200) {
      ThunkAPI.dispatch(clearMeetingState());
      ThunkAPI.dispatch(clearURL());
      ThunkAPI.dispatch(
        showToast({
          type: "success",
          title: "Great!",
          msj: "The Meeting has been created successfully",
          show: true,
          duration: 4000,
        })
      );
    }

    ThunkAPI.dispatch(fullLoadingOff());
    ThunkAPI.dispatch(getMeetings());
  }
);

//Funcion para editar  una  meet
export const updateMeet = createAsyncThunk(
  "data/poc/updateMeet",
  async (meet, ThunkAPI) => {
    const delMeet = await reqWithData("poc/postupdatemeeting", {
      ...meet,
      context: 1,
    });
    if (delMeet.error) {
      ThunkAPI.dispatch(fullLoadingOff());
      return ThunkAPI.dispatch(
        showToast({
          type: "warning",
          title: "Error",
          msj: "We had a problem editing this meeting, please try again.",
          show: true,
          duration: 4000,
        })
      );
    }

    if (delMeet.status === 200) {
      ThunkAPI.dispatch(
        showToast({
          type: "success",
          title: "Great!",
          msj: "The Meeting has been idited successfully",
          show: true,
          duration: 4000,
        })
      );
    }
    ThunkAPI.dispatch(fullLoadingOff());
    ThunkAPI.dispatch(getMeetings());
  }
);
//Funcion para eliminar  una  meet
export const deleteMeet = createAsyncThunk(
  "data/poc/deleteMeet",
  async (meet, ThunkAPI) => {
    const delMeet = await reqWithData("poc/postupdatemeeting", {
      ...meet,
      context: 2,
    });
    if (delMeet.error) {
      ThunkAPI.dispatch(fullLoadingOff());
      return ThunkAPI.dispatch(
        showToast({
          type: "warning",
          title: "Error",
          msj: "We had a problem deleting this meeting, please try again.",
          show: true,
          duration: 4000,
        })
      );
    }

    if (delMeet.status === 200) {
      ThunkAPI.dispatch(
        showToast({
          type: "success",
          title: "Great!",
          msj: "The Meeting has been deleted successfully",
          show: true,
          duration: 4000,
        })
      );
    }
    ThunkAPI.dispatch(fullLoadingOff());
    ThunkAPI.dispatch(getMeetings());
  }
);

//Funcion para consultar el listado de meets por fecha
export const getDailyMeetings = createAsyncThunk(
  "data/poc/getDeilyMeetings",
  async (date, ThunkAPI) => {
    ThunkAPI.dispatch(loadingDayMeets(true));
    const data = await reqWithData("poc/getmeetings", {
      date,
      context: 2,
    });

    if (data.error) {
      ThunkAPI.dispatch(loadingDayMeets(false));
      return ThunkAPI.dispatch(
        showToast({
          type: "warning",
          title: "Error",
          msj: "We have a problem with the meetings, try again",
          show: true,
          duration: 4000,
        })
      );
    }

    ThunkAPI.dispatch(loadingDayMeets(false));
    return ThunkAPI.dispatch(showMeetsPerDay(data.data));
  }
);
