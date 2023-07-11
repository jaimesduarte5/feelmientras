import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { reqWithData } from "../apis/requestTypes";
import { fullLoadingOff, showToast } from "./alertsSlice";
import { userMgeInitData } from "./POC/userManagePocSlice";
import { getDataUsrMge } from "./SuperAdmin/userManagementSlice";

const initialState = {
  showModal: false,
  editParams: false,
  waves: [],
  form: {
    role: "Poc",
    ccms: "",
    email: "",
    name: "",
    lastname: "",
    country: "",
    position: "",
    inDate: "",
    wave: { namewave: "", idwave: 0 },
  },
  tempForm: {
    role: "Poc",
    ccms: "",
    email: "",
    name: "",
    lastname: "",
    country: "",
    position: "",
    inDate: "",
    wave: { namewave: "", idwave: 0 },
  },
  errorForm: {
    ccms: false,
    email: false,
    name: false,
    lastname: false,
    country: false,
    position: false,
    inDate: false,
    wave: { value: false, desc: "" },
  },
  templateRows: [],
};

export const userFormSlice = createSlice({
  name: "usersform",
  initialState,
  reducers: {
    setForm: (state, action) => {
      if (state.waves.length > 0) {
        const wave = state.waves.filter(
          (el) => el.idwave === action.payload.idWave
        );
        return {
          ...state,
          editParams: true,
          showModal: true,
          form: {
            role: action.payload.role,
            ccms: action.payload.id,
            email: action.payload.email,
            name: action.payload.firstname,
            lastname: action.payload.lastname,
            country: action.payload.country,
            position: action.payload.position,
            inDate: action.payload.hireDate,
            idLob: action.payload.idLob,
            idCampaign: action.payload.idCampaign,
            idEmployee: action.payload.idEmployee,
            wave: wave[0],
          },
        };
      }
      return {
        ...state,
        editParams: true,
        showModal: true,
        form: {
          role: action.payload.role,
          ccms: action.payload.id,
          email: action.payload.email,
          name: action.payload.firstname,
          lastname: action.payload.lastname,
          country: action.payload.country,
          position: action.payload.position,
          inDate: action.payload.hireDate,
          idLob: action.payload.idLob,
          idCampaign: action.payload.idCampaign,
          idEmployee: action.payload.idEmployee,
          wave: action.payload.wave,
        },
      };
    },
    setWavesUsersForm: (state, action) => {
      return { ...state, waves: action.payload };
    },
    changeWavesUsersForm: (state, action) => {
      const wave = state.waves.filter((el) => el.idwave === action.payload);
      return {
        ...state,
        form: {
          ...state.form,
          wave: wave[0],
        },
        errorForm: {
          ...state.errorForm,
          wave: false,
        },
      };
    },
    formChanges: (state, action) => {
      if (action.payload.rol === "Poc") {
        return {
          ...state,
          form: {
            ...state.form,
            [action.payload.tag]: action.payload.value,
            role: "Agent",
          },
          errorForm: {
            ...state.errorForm,
            [action.payload.tag]: false,
          },
        };
      } else {
        return {
          ...state,
          form: {
            ...state.form,
            [action.payload.tag]: action.payload.value,
            wave: "0",
            idLob: 0,
            idCampaign: 0,
          },
          errorForm: {
            ...state.errorForm,
            [action.payload.tag]: false,
          },
        };
      }
    },
    formValidate: (state, action) => {
      return { ...state, errorForm: action.payload };
    },
    resetForm: (state) => {
      return {
        ...state,
        editParams: false,
        showModal: false,
        form: { ...initialState.form },
        tempForm: { ...initialState.tempForm },
        errorForm: { ...initialState.errorForm },
      };
    },
    dataTemplate: (state, action) => {
      return { ...state, templateRows: action.payload };
    },
    viewModal: (state) => {
      return { ...state, showModal: true };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setForm,
  formChanges,
  formValidate,
  resetForm,
  dataTemplate,
  viewModal,
  setWavesUsersForm,
  changeWavesUsersForm,
} = userFormSlice.actions;

export default userFormSlice.reducer;

export const updateUser = createAsyncThunk(
  "data/updateUser",
  async (params, ThunkAPI) => {
    const updateUser = await reqWithData("updateuser", {
      user: {
        idccms: params.ccms,
        idEmployee: params.idEmployee,
        name: params.name,
        lastName: params.lastname,
        email: params.email,
        position: params.position,
        hireDate: params.inDate,
        country: params.country,
        role: params.role,
        wave: params.wave.idwave ? params.wave.idwave : 0,
        idLob: params.idLob,
        idCampaign: params.idCampaign,
        password: "",
      },
      context: 1,
    });
    if (updateUser.error) {
      ThunkAPI.dispatch(fullLoadingOff());
      return ThunkAPI.dispatch(
        showToast({
          type: "warning",
          title: "Error",
          msj: updateUser.error,
          show: true,
          duration: 4000,
        })
      );
    }
    if (params.role === "Agent") {
      await ThunkAPI.dispatch(userMgeInitData());
    } else {
      await ThunkAPI.dispatch(getDataUsrMge());
    }
    ThunkAPI.dispatch(
      showToast({
        type: "success",
        title: "User Updated",
        msj: "the user was update",
        show: true,
        duration: 4000,
      })
    );
    ThunkAPI.dispatch(resetForm());
    return ThunkAPI.dispatch(fullLoadingOff());
  }
);

export const createUser = createAsyncThunk(
  "data/createUser",
  async (params, ThunkAPI) => {
    const createUsers = await reqWithData("insertusers", {
      usersInfo: params,
    });
    if (createUsers.error) {
      ThunkAPI.dispatch(fullLoadingOff());
      return ThunkAPI.dispatch(
        showToast({
          type: "warning",
          title: "Error in the request",
          msj: createUsers.error,
          show: true,
          duration: 4000,
        })
      );
    }
    if (params[0][8] === "Agent") {
      await ThunkAPI.dispatch(userMgeInitData());
    } else {
      await ThunkAPI.dispatch(getDataUsrMge());
    }
    ThunkAPI.dispatch(
      showToast({
        type: "success",
        title: "User Created",
        msj: "the user was create",
        show: true,
        duration: 4000,
      })
    );
    ThunkAPI.dispatch(resetForm());
    return ThunkAPI.dispatch(fullLoadingOff());
  }
);

export const deleteUser = createAsyncThunk(
  "data/deleteUser",
  async (params, ThunkAPI) => {
    const body = {
      context: 2,
      user: {
        idccms: params.ccms ? params.ccms : 0,
        idEmployee: params.idEmployee ? params.idEmployee : 0,
        name: params.name ? params.name : "0",
        lastName: params.lastname ? params.lastname : "0",
        email: params.email ? params.email : "0",
        position: params.position ? params.position : "0",
        hireDate: params.inDate ? params.inDate : "0",
        country: params.country ? params.country : "0",
        role: params.role ? params.role : "0",
        wave: params.wave.idwave ? params.wave.idwave : "0",
        idLob: params.idLob ? params.idLob : 0,
        idCampaign: params.idCampaign ? params.idCampaign : 0,
        password: "",
      },
    };

    const delUser = await reqWithData("updateuser", body);
    if (delUser.error) {
      ThunkAPI.dispatch(fullLoadingOff());
      return ThunkAPI.dispatch(
        showToast({
          type: "warning",
          title: "Error in the request",
          msj: delUser.error,
          show: true,
          duration: 4000,
        })
      );
    }
    if (params.role === "Agent") {
      await ThunkAPI.dispatch(userMgeInitData());
    } else {
      await ThunkAPI.dispatch(getDataUsrMge());
    }
    ThunkAPI.dispatch(
      showToast({
        type: "success",
        title: "Delete!",
        msj: "The User is delete!",
        show: true,
      })
    );
    return ThunkAPI.dispatch(fullLoadingOff());
  }
);
