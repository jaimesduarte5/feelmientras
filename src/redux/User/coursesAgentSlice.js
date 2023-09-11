import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { reqWithData } from "../../apis/requestTypes";
import { fullLoadingOff, showToast } from "../alertsSlice";
import { getCourse } from "../POC/contentManagePocSlice";

const initialState = {
  isLoading: false,
  loadingUpTracks: false,
  courses: [],
  learningPlans: [],
  trackEvents: {
    idActivity: 0,
    dateOpen: "",
    timeToActivity: "",
    typeConten: "",
    progress: 0,
    timeVideo: "",
    timeView: "",
    context: 0,
    views: 0,
    idEvent: 0,
  },
  tsat: {}
};

export const courseAgentSlice = createSlice({
  name: "coursesAgent",
  initialState,
  reducers: {
    //Loading courses
    loadingData: (state, action) => {
      return {
        ...state,
        isLoading: action.payload,
      };
    },

    //Loading carga de avence de actividades a la db
    loadingUpTracks: (state, action) => {
      return {
        ...state,
        loadingUpTracks: action.payload,
      };
    },

    //MAnejo del estado de los Learning PLan del agente
    getLP: (state, action) => {
      return {
        ...state,
        isLoading: false,
        learningPlans: action.payload.learningPlan,
      };
    },

    //MAnejo del estado de los  Cursos del agente
    getCoursesA: (state, action) => {
      return {
        ...state,
        isLoading: false,
        courses: action.payload.courses,
      };
    },

    addEvent: (state, action) => {
      return {
        ...state,
        trackEvents: action.payload,
      };
    },

    clearEvent: (state) => {
      return {
        ...state,
        trackEvents: initialState.trackEvents,
      };
    },

    //Trae el tsat
    getTsat: (state, action) => {
      return {
        ...state,
        isLoading: false,
        tsat: action.payload.Result,
      };
    },
  },
});

export const {
  loadingData,
  getLP,
  getCoursesA,
  addEvent,
  clearEvent,
  loadingUpTracks,
  getTsat,
} = courseAgentSlice.actions;

export default courseAgentSlice.reducer;

///////////////////////Thunk Section//////////////////////////
//Funcion para consultar el listado de Cursos y LP del agente
//Funcion para consultar el listado de Cursos
export const getDataAssignment = createAsyncThunk(
  "data/getAssignmentAgent",
  async (context, ThunkAPI) => {
    ThunkAPI.dispatch(loadingData(true));
    //consultar Learning Plans  Asignados
    const data = await reqWithData("a/getassignments", {
      context,
    });

    if (data.error) {
      ThunkAPI.dispatch(loadingData(false));
      ThunkAPI.dispatch(getCoursesA([]));
      return ThunkAPI.dispatch(
        showToast({
          type: "warning",
          title: "Error",
          msj: "We have a problem with the courses",
          show: true,
          duration: 4000,
        })
      );
    }

    if (context === 1) {
      let resp = { learningPlan: data.data.Result };
      ThunkAPI.dispatch(getLP(resp));
    } else {
      let resp = { courses: data.data.Result };
      ThunkAPI.dispatch(getCoursesA(resp));
    }

    return;
  }
);

//funcion para el manejo de eventos de seguimiento a un Learning Plan, Curso o Actividad
export const postAgentTrackEvents = createAsyncThunk(
  "data/postagenttrackevents",
  async (datatrack, ThunkAPI) => {
    //Envia los datos para ser almacenados
    // Context 1: Eventos relacionados con LP
    // Context 2: Eventos relacionados con cursos
    // Context 3: Eventos relacionados con actividades
    // idActivity: hace referencia al id del LearningPlan, Course o activity respectivamente

    const eventActivity = datatrack.eventActivity;
    ThunkAPI.dispatch(loadingUpTracks(true));
    const data = await reqWithData("a/posttrackevents", {
      ...datatrack,
      ...eventActivity,
    });

    if (data.error) {
      ThunkAPI.dispatch(loadingUpTracks(false));
    }
    let actualization = true;
    const { idCourse, idCampaign } = datatrack;
    ThunkAPI.dispatch(getCourse({ idCourse, idCampaign, actualization }));
    ThunkAPI.dispatch(loadingUpTracks(false));

    return;
  }
);

//funcion para insertar los resultados de los tsat.
export const postTsatAnswers = createAsyncThunk(
  "data/posttsatanswers",
  async (params, ThunkAPI) => {

    ThunkAPI.dispatch(loadingUpTracks(true));

    await reqWithData("a/posttsatanswers", {
      ...params,
    });

    ThunkAPI.dispatch(loadingUpTracks(false));

    return;
  }
);

//Funcion para obtener los tipos de Tsats
export const getTsatQuestions = createAsyncThunk(
  "data/getTsatQuestions",
  async (id, ThunkAPI) => {
    ThunkAPI.dispatch(loadingData(true));

    const tsats = await reqWithData("gettsatquestions", {
      idTsat: id
    });

    if (tsats.error) {
      ThunkAPI.dispatch(loadingData(false));

      return ThunkAPI.dispatch(
        showToast({
          type: "warning",
          title: "Error",
          msj: "We have a problem with tsats",
          show: true,
          duration: 4000,
        })
      );
    }

    let resp = tsats.data

    ThunkAPI.dispatch(loadingData(false));

    return ThunkAPI.dispatch(getTsat(resp));
  }
);