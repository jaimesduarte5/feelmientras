import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { storage } from "../../firebase/firebase.config";
import {
  getDownloadURL,
  ref,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import { addCourse, newActivity } from "../SuperAdmin/cousesManageSlice";
import { showToast } from "../alertsSlice";

const initialState = {
  url: "",
  urlImage: "",
  progress: 0,
  isLoading: false,
  isLoadingI: false,
  loadingCourses: false,
};

export const courseManageFBSlice = createSlice({
  name: "filesFB",
  initialState,
  reducers: {
    //carga de imagenes de meetings
    upfileFB: (state, action) => {
      return {
        ...state,
        isLoading: action.payload.loading,
        url: action.payload.url,
      };
    },
    //carga de imagenes de los Cursos
    upImageFB: (state, action) => {
      return {
        ...state,
        isLoadingI: action.payload.loading,
        urlImage: action.payload.url,
      };
    },
    //lipiar el estado de la url
    clearURL: (state) => {
      return {
        ...state,
        url: "",
        progress: 0,
      };
    },
    upImage: (state, action) => {
      return {
        ...state,
        isLoading: action.payload.loading,
        url: action.payload.url,
      };
    },
    upProgress: (state, action) => {
      return {
        ...state,
        progress: action.payload,
      };
    },
  },
});

export const { upfileFB, upImageFB, upProgress, clearURL } =
  courseManageFBSlice.actions;

export default courseManageFBSlice.reducer;

/////////////////////////////THUNK SECTION////////////////////////////////
//Funcion para cargar archivos de actividades a firebase
export const upFiles = createAsyncThunk(
  "data/su/upfiles",
  async (params, ThunkAPI) => {
    ThunkAPI.dispatch(upfileFB({ loading: true }));
    const { file, selectFile, activity } = params;
    const storageRef = ref(
      storage,
      `/feel/${selectFile.type}/${activity.nameActivity + Date.now()}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        ThunkAPI.dispatch(upProgress(prog));
      },
      (err) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          ThunkAPI.dispatch(upfileFB({ loading: false, url }));
          ThunkAPI.dispatch(newActivity({ urlActivity: url }));
        });
      }
    );

    return;
  }
);

//funcion para Eliminar Actividades de FireBase

export const deleteActivityFB = createAsyncThunk(
  "data/su/delActivityFireBase",
  async (activity, ThunkAPI) => {
    const desertRef = ref(storage, activity);
    deleteObject(desertRef)
      .then(() => {})
      .catch((error) => {
        ThunkAPI.dispatch(
          showToast({
            type: "warning",
            title: error,
            msj: "The activity does not have a resource assigned or has been deleted!",
            show: true,
            diration: 2000,
          })
        );
      });
  }
);

//Funcion para cargar imagenes de un Meeting a firebase
export const upImageMeet = createAsyncThunk(
  "data/poc/upimage",
  async (params, ThunkAPI) => {
    ThunkAPI.dispatch(upfileFB({ loading: true }));
    const { file, activity } = params;
    const storageRef = ref(storage, `/feel/meets/${Date.now()}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        ThunkAPI.dispatch(upProgress(prog));
      },
      (err) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          ThunkAPI.dispatch(upfileFB({ loading: false, url }));
        });
      }
    );

    return;
  }
);
//Funcion para cargar imagenes de un Curso a firebase
export const upImageCourse = createAsyncThunk(
  "admin/upimagecourse",
  async (params, ThunkAPI) => {
    ThunkAPI.dispatch(upImageFB({ loading: true }));
    const { file, name, userName, f } = params;

    const storageRef = ref(storage, `/feel/course/${name + userName}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (err) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          ThunkAPI.dispatch(upImageFB({ loading: false, urlImage: url }));
          ThunkAPI.dispatch(addCourse({ name: "urlImgCourse", value: url }));
        });
      }
    );

    return;
  }
);
