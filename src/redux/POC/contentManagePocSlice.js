import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { reqWithData } from "../../apis/requestTypes";
import { showToast } from "../alertsSlice";

const initialState = {
  isLoading: false,
  course: [],
  activities: [],
};

export const contentpocSlice = createSlice({
  name: "contentpoc",
  initialState,
  reducers: {
    loading: (state, action) => {
      return {
        ...state,
        isLoading: action.payload,
      };
    },
    showCourse: (state, action) => {
      return {
        ...state,
        course: action.payload,
      };
    },
    resetCourse: (state) => {
      return {
        ...state,
        course: [],
        activities: [],
      };
    },
    getActivities: (state, action) => {
      return {
        ...state,
        activities: action.payload,
      };
    },
  },
});

export const { loading, showCourse, resetCourse, getActivities } =
  contentpocSlice.actions;

export default contentpocSlice.reducer;

////////////////////////////Thunk Section///////////////////////
//Funcion para consultar el listado de Cursos
export const getCourse = createAsyncThunk(
  "data/poc/getCourse",
  async ({ idCampaign, idCourse, actualization, context }, ThunkAPI) => {
    if (!actualization) {
      ThunkAPI.dispatch(loading(true));
    }

    const data = await reqWithData("su/getcourses", {
      idCampaign,
      idCourse,
      context: context || 2,
      accion: "Consultando su/getcourses",
    });

    if (data.error) {
      ThunkAPI.dispatch(loading(false));
      return ThunkAPI.dispatch(
        showToast({
          type: "warning",
          title: "Error",
          msj: "We have a problem with courses",
          show: true,
          duration: 4000,
        })
      );
    }

    ThunkAPI.dispatch(loading(false));

    ThunkAPI.dispatch(getActivities(data.data[0].activities));
    return ThunkAPI.dispatch(showCourse(data.data));
  }
);
