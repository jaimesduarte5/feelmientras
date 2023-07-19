import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { reqWithData } from "../../apis/requestTypes";
import { fullLoadingOff, showToast } from "../alertsSlice";
import { deleteActivityFB } from "../firebase/courseManageSlice";
import { campaignsData } from "./userManagementSlice";

const initialState = {
  isLoading: false,
  campaigns: [],
  courses: [],
  errors: {
    idCampaign: { status: false, msj: "You need to select a campaign" },
    nameCourse: { status: false, msj: "The name of the course is required" },
    nameCourseFound: {
      status: false,
      msj: "There is a course with the same name",
    },
    descCourse: { status: false, msj: "All courses required a description" },
    activities: {
      status: false,
      msj: "The course requires at least one activity",
    },
    nameActivity: {
      status: false,
      msj: "The name of the activity is requiered",
    },
    descActivity: {
      status: false,
      msj: "The activity requiered a description",
    },
    timeActivity: {
      status: false,
      msj: "The activity requiered a min time",
    },
    urlActivity: { status: false, msj: "Need to load a resource" },
  },
  newCourse: {
    descCourse: "",
    idCampaign: 0,
    nameCourse: "",
    private: false,
    activities: [],
  },
  activity: {
    descActivity: "",
    idActivity: 0,
    nameActivity: "",
    typeContent: 0,
    urlActivity: "",
    timeActivity: 0,
  },
  activities: [],
};

export const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    //Loading courses
    loadingCourses: (state, action) => {
      return {
        ...state,
        isLoading: action.payload,
      };
    },
    //trae los cursos de la base de datos
    getCourses: (state, action) => {
      return {
        ...state,
        campaigns: action.payload.campaigns,
        courses: action.payload.courses,
      };
    },
    //crea un curso de manera local
    addCourse: (state, action) => {
      return {
        ...state,
        newCourse: {
          ...state.newCourse,
          [action.payload.name]: action.payload.value,
        },
      };
    },
    //crear actividades temporales para agregar a un curso
    newActivity: (state, action) => {
      return {
        ...state,
        activity: {
          ...state.activity,
          idActivity: Date.now(),
          urlActivity: action.payload.urlActivity,
          [action.payload.name]: action.payload.value,
        },
      };
    },

    addActivity: (state) => {
      return {
        ...state,
        newCourse: {
          ...state.newCourse,
          activities: [...state.newCourse.activities, state.activity],
        },
        activity: initialState.activity,
      };
    },

    orderActivities: (state, action) => {
      return {
        ...state,
        newCourse: {
          ...state.newCourse,
          activities: action.payload,
        },
      };
    },
    //
    cleanCourse: (state) => {
      return {
        ...state,
        newCourse: initialState.newCourse,
      };
    },

    editCourse: (state, action) => {
      return {
        ...state,
        newCourse: action.payload,
      };
    },
    //maneja el estado de los errores de creacion de cursos y actividades
    errorsValidation: (state, action) => {
      return {
        ...state,
        errors: { ...state.errors, ...action.payload },
      };
    },
  },
});

export const {
  getCourses,
  loadingCourses,
  cleanCourse,
  addCourse,
  editCourse,
  newActivity,
  addActivity,
  orderActivities,
  errorsValidation,
} = courseSlice.actions;

export default courseSlice.reducer;

///////////////////////Thunk Section//////////////////////////

//Funcion para consultar el listado de Cursos
export const getDataCourses = createAsyncThunk(
  "data/getCourses",
  async (account, ThunkAPI) => {
    //culsultar campañas
    const campaigns = await ThunkAPI.dispatch(campaignsData());

    if (campaigns.error) {
      return ThunkAPI.dispatch(
        showToast({
          type: "warning",
          title: "Error",
          msj: "We have a problem with campaigns",
          show: true,
          duration: 4000,
        })
      );
    }
    ThunkAPI.dispatch(loadingCourses(true));

    const data = await reqWithData("su/getcourses", {
      idCampaign: account || campaigns.payload.data[0].Campaign[0].id,
      idCourse: 0,
      context: 1,
    });

    if (data.error) {
      ThunkAPI.dispatch(loadingCourses(false));

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

    let resp = {
      campaigns: campaigns.payload.data[0].Campaign,
      courses: data.data,
    };
    ThunkAPI.dispatch(loadingCourses(false));

    return ThunkAPI.dispatch(getCourses(resp));
  }
);

//Funcion para crear Cursos en la base de datos
export const createCourses = createAsyncThunk(
  "data/createCourses",
  async (course, ThunkAPI) => {
    const create = await reqWithData("su/postcreatecourse", course);

    if (create.error) {
      ThunkAPI.dispatch(fullLoadingOff());
      return ThunkAPI.dispatch(
        showToast({
          type: "warning",
          title: "Error",
          msj: "We have a problem with the creation of this course",
          show: true,
          duration: 4000,
        })
      );
    }

    if (create.status === 200) {
      ThunkAPI.dispatch(
        showToast({
          type: "success",
          title: "Great!",
          msj: "The course has been created successfully",
          show: true,
          duration: 4000,
        })
      );
    }
    ThunkAPI.dispatch(fullLoadingOff());
    ThunkAPI.dispatch(getDataCourses(course.idCampaign));
    ThunkAPI.dispatch(cleanCourse());
    return;
  }
);
//Funcion para eliminar Cursos de la base de datos
export const deleteCourses = createAsyncThunk(
  "data/su/deleteCourses",
  async (course, ThunkAPI) => {
    //culsultar campañas
    const { activities } = course;

    // Ciclo para eliminar los recursos de las actividades del curso de FB
    // activities.map(({ urlActivity }) => {
    //   ThunkAPI.dispatch(deleteActivityFB(urlActivity));
    // });

    const del = await reqWithData("su/updateCourse", {
      context: 2,
      ...course,
    });
    if (del.error) {
      ThunkAPI.dispatch(fullLoadingOff());
      return ThunkAPI.dispatch(
        showToast({
          type: "warning",
          title: "Error",
          msj: "We have a problem with the deletion of the course",
          show: true,
          duration: 4000,
        })
      );
    }

    if (del.status === 200) {
      ThunkAPI.dispatch(
        showToast({
          type: "success",
          title: "Great!",
          msj: "The course has been removed successfully",
          show: true,
          duration: 4000,
        })
      );
    }
    ThunkAPI.dispatch(getDataCourses(course.idCampaign));
    ThunkAPI.dispatch(fullLoadingOff());
    return;
  }
);

//funcion para editar cursos en la base de datos

export const sendCourseEdit = createAsyncThunk(
  "data/su/editCourses",
  async (course, ThunkAPI) => {
    const edit = await reqWithData("su/updateCourse", {
      context: 1,
      ...course,
    });

    if (edit.error) {
      ThunkAPI.dispatch(fullLoadingOff());
      return ThunkAPI.dispatch(
        showToast({
          type: "warning",
          title: "Error",
          msj: "We have a problem with the edition of this course",
          show: true,
          duration: 4000,
        })
      );
    }
    if (edit.status === 200) {
      ThunkAPI.dispatch(fullLoadingOff());
      ThunkAPI.dispatch(getDataCourses(course.idCampaign));
      ThunkAPI.dispatch(cleanCourse());
      ThunkAPI.dispatch(
        showToast({
          type: "success",
          title: "Great!",
          msj: "The course has been edited successfully",
          show: true,
          duration: 4000,
        })
      );
    }
    return;
  }
);

//funcion para eliminar Actividades

export const deleteActivity = createAsyncThunk(
  "data/su/delActivity",
  async ({ activity, newCourse, typeAction }, ThunkAPI) => {
    const { idActivity, urlActivity, nameActivity } = activity;
    if (typeAction === "Edit") {
      //eliminar actividad de FB
      //const delFireBase = ThunkAPI.dispatch(deleteActivityFB(urlActivity));

      //eliminar actividad de DB
      const deldb = await ThunkAPI.dispatch(
        deleteActivityDB({ idActivity, course: newCourse })
      );
    } else {
      //eliminar actividad de FB
      //const delFireBase = ThunkAPI.dispatch(deleteActivityFB(urlActivity));
    }
    //crea el nuevo array de actividades sin la actividad eliminada
    const newActivities = newCourse.activities.filter(
      (actividad) => actividad.nameActivity !== nameActivity
    );

    ThunkAPI.dispatch(orderActivities(newActivities));
  }
);

//Funcion para elimar Actividades de la base de datos
export const deleteActivityDB = createAsyncThunk(
  "data/su/delActivityDB",
  async ({ idActivity, course }, ThunkAPI) => {
    const del = await reqWithData("su/updateCourse", {
      context: 3,
      idActivity,
      ...course,
    });
    if (del.error) {
      ThunkAPI.dispatch(fullLoadingOff());
      return ThunkAPI.dispatch(
        showToast({
          type: "warning",
          title: "Error",
          msj: "We have a problem with deleting this activity in the database.",
          show: true,
          duration: 4000,
        })
      );
    }
    if (del.status === 200) {
      ThunkAPI.dispatch(fullLoadingOff());
      ThunkAPI.dispatch(
        showToast({
          type: "success",
          title: "Great!",
          msj: "The activity has been deleted successfully",
          show: true,
          duration: 4000,
        })
      );
    }
    return;
  }
);
