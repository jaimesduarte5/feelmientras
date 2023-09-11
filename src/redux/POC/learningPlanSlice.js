import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { reqWithData } from "../../apis/requestTypes";
import { fullLoadingOff, showToast } from "../alertsSlice";

const initialState = {
  showModal: false,
  editForm: false,
  changeOrder: false,
  dbLPs: [],
  tempDbLPs: [],
  lpSelected: [],
  dataCourses: [],
  dbDataCourses: [],
  form: {
    name: "",
    description: "",
    courses: [],
    idTsat: 0
  },
  errorForm: {
    name: {
      value: false,
      desc: ""
    },
    description: {
      value: false,
      desc: ""
    },
    courses: {
      value: false,
      desc: ""
    },
    idTsat: {
      value: false,
      desc: ""
    }
  },
  dbFormCourses: [],
  tempFormCourses: [],
  courseSearch: "",
  lpSearch: "",
  tsats: []
};

export const learningPlanSlice = createSlice({
  name: "learningPlan",
  initialState,
  reducers: {
    initialDataLP: (state, action) => {
      const c = action.payload.courses.map((el) => {
        el.checked = false;
        return el;
      });
      return {
        ...state,
        dbLPs: action.payload.leaningP,
        tempDbLPs: action.payload.leaningP,
        form: { ...initialState.form, courses: c },
        dbFormCourses: c,
        tempFormCourses: c,
        showModal: false,
        editForm: false,
        changeOrder: false,
      };
    },
    viewLPModal: (state, action) => {
      return {
        ...state,
        showModal: true,
      };
    },
    selectLP: (state, action) => {
      return {
        ...state,
        lpSelected: action.payload,
        dataCourses: action.payload.courses,
        dbDataCourses: action.payload.courses,
      };
    },
    formCoursesOrder: (state, action) => {
      return {
        ...state,
        form: { ...state.form, courses: action.payload },
        tempFormCourses: action.payload,
      };
    },
    coursesOrder: (state, action) => {
      return {
        ...state,
        dataCourses: action.payload,
        changeOrder: true
      };
    },
    cancelOrder: (state, action) => {
      return {
        ...state,
        dataCourses: state.dbDataCourses,
        changeOrder: false
      };
    },
    errorLPForm: (state, action) => {
      return {
        ...state,
        errorForm: action.payload
      };
    },
    formLPChanges: (state, action) => {
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
    checkedForm: (state, action) => {
      const courses = state.tempFormCourses.map((course) => {
        if (course.idCourse === action.payload) {
          course.checked = !course.checked;
          return course;
        } else {
          return course;
        }
      });
      state.tempFormCourses = courses;
      state.errorForm.courses = { value: false, desc: "" };
      if (state.courseSearch) {
        const filterCourse = state.tempFormCourses.filter(
          (el) =>
            el.nameCourse
              .toString()
              .toLowerCase()
              .includes(action.payload.toLowerCase()) || el.checked
        );
        state.form = { ...state.form, filterCourse };
      } else {
        state.form = { ...state.form, courses };
      }
    },
    resetLPForm: (state, action) => {
      return {
        ...state,
        showModal: false,
        editForm: false,
        form: { ...initialState.tempForm, courses: state.dbFormCourses },
        tempFormCourses: state.dbFormCourses,
        errorForm: initialState.errorForm,
      };
    },
    editLP: (state, action) => {
      return {
        ...state,
        showModal: true,
        form: action.payload,
        editForm: true,
        tempFormCourses: action.payload.courses,
      };
    },
    searchFormCourses: (state, action) => {
      const filterCourse = state.tempFormCourses.filter(
        (el) =>
          el.nameCourse
            .toString()
            .toLowerCase()
            .includes(action.payload.toLowerCase()) || el.checked
      );
      return {
        ...state,
        form: { ...state.form, courses: filterCourse },
        courseSearch: action.payload,
      };
    },
    searchLPs: (state, action) => {
      const filterLP = state.dbLPs.filter((el) =>
        el.nameLearningPlan
          .toString()
          .toLowerCase()
          .includes(action.payload.toLowerCase())
      );
      return {
        ...state,
        tempDbLPs: filterLP,
        lpSearch: action.payload,
      };
    },
    //Trae los tsats
    getTsats: (state, action) => {
      return {
        ...state,
        tsats: action.payload,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  initialDataLP,
  viewLPModal,
  resetLPForm,
  formLPChanges,
  selectLP,
  formCoursesOrder,
  coursesOrder,
  cancelOrder,
  checkedForm,
  editLP,
  searchFormCourses,
  searchLPs,
  errorLPForm,
  getTsats
} = learningPlanSlice.actions;

export default learningPlanSlice.reducer;

export const lpInitData = createAsyncThunk(
  "data/poc/lpDataInit",
  async (params, ThunkAPI) => {
    const c = await ThunkAPI.dispatch(campaignCourses(params.idCampaign));
    if (c.payload.error) {
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
    const lps = await ThunkAPI.dispatch(lobLPs(params));
    if (lps.payload.error) {
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
    const res = { courses: c.payload, leaningP: lps.payload };
    ThunkAPI.dispatch(initialDataLP(res));
    return ThunkAPI.dispatch(fullLoadingOff());
  }
);

//trae todos los cursos creados para esa campaña
export const campaignCourses = createAsyncThunk(
  "data/poc/campCourses",
  async (params, ThunkAPI) => {
    const courses = await reqWithData("su/getcourses", {
      idCampaign: params,
      idCourse: 0,
      context: 1,
    });

    if (courses.error) {
      ThunkAPI.dispatch(fullLoadingOff());
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
    return courses.data;
  }
);

export const lobLPs = createAsyncThunk(
  "data/poc/lobLPs",
  async (params, ThunkAPI) => {
    const learningP = await reqWithData("getlearningPlan", {
      idCampaign: params.idCampaign,
      idLob: params.idLob,
    });

    if (learningP.error) {
      ThunkAPI.dispatch(fullLoadingOff());
      return ThunkAPI.dispatch(
        showToast({
          type: "warning",
          title: "Error",
          msj: "We have a problem with learning Plan",
          show: true,
          duration: 4000,
        })
      );
    }

    return learningP.data;
  }
);
export const createLPs = createAsyncThunk(
  "data/poc/createLPs",
  async (params, ThunkAPI) => {
    const learningP = await reqWithData("poc/postcreatelp", params.data);
    if (learningP.error) {
      ThunkAPI.dispatch(fullLoadingOff());
      return ThunkAPI.dispatch(
        showToast({
          type: "warning",
          title: "Error",
          msj: "We have a problem with learning Plan",
          show: true,
          duration: 4000,
        })
      );
    }
    return ThunkAPI.dispatch(lpInitData(params.rfsh));
  }
);

export const updateLPs = createAsyncThunk(
  "data/poc/updateLPs",
  async (params, ThunkAPI) => {
    const learningP = await reqWithData("updatelp", params.data);
    if (learningP.error) {
      ThunkAPI.dispatch(fullLoadingOff());
      return ThunkAPI.dispatch(
        showToast({
          type: "warning",
          title: "Error",
          msj: "We have a problem with learning Plan",
          show: true,
          duration: 4000,
        })
      );
    }
    return ThunkAPI.dispatch(lpInitData(params.rfsh));
  }
);

//Funcion para obtener los tipos de Tsats
export const getTsatTypes = createAsyncThunk(
  "data/getTsatTypes",
  async (account, ThunkAPI) => {

    const tsats = await reqWithData("gettsattypes");

    if (tsats.error) {
      ThunkAPI.dispatch(fullLoadingOff());

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

    ThunkAPI.dispatch(fullLoadingOff());

    return ThunkAPI.dispatch(getTsats(resp));
  }
);