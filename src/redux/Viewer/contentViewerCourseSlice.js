import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { reqWithData } from "../../apis/requestTypes";
import { showToast } from "../alertsSlice";

const initialState = {
  isLoading: false,
  course: [],
  activities: [],
};

export const contentViewerCourseSlice = createSlice({
  name: "contentViewer",
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
    completeActivityTemp: (state, action) => {
      state.activities.map((activity) => {});

      // return {
      //   ...state,
      //   activities: {
      //     ...state.activities,
      //     //   modificado: "Modificado............",
      //     // activities[0]: {
      //     //   ...activity[action.payload.index],
      //     //   progressActivity: 100,
      //     // },
      //     // activity[action.index+1]: {
      //     //   ...course.activity[action.payload.index+1],
      //     //   progressLastActivity: 100
      //     // },
      //   },
      // };
    },
  },
});

export const {
  loading,
  showCourse,
  resetCourse,
  completeActivityTemp,
  getActivities,
} = contentViewerCourseSlice.actions;

export default contentViewerCourseSlice.reducer;

////////////////////////////Thunk Section///////////////////////
//Funcion para consultar el listado de Cursos para visualizar el viewer
export const getViewerCourse = createAsyncThunk(
  "data/viewer/getCourse",
  async ({ idCampaign, idCourse, actualization }, ThunkAPI) => {
    if (!actualization) {
      ThunkAPI.dispatch(loading(true));
    }

    const data = await reqWithData("su/getcourses", {
      idCampaign,
      idCourse,
      context: 2,
      accion: "Consultando su/getcourses-para el viewer",
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
