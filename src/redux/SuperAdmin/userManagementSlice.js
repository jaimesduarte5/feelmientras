import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { reqWithData } from "../../apis/requestTypes";
import { fullLoadingOff, showToast } from "../alertsSlice";

const initialState = {
  campaignSelected: "All",
  lobSelected: "All",
  campaigns: [{ id: 1, name: "Loading .." }],
  lobs: [{ id: 1, name: "Loading ..." }],
  filterLob: [{ id: 1, name: "Loading ..." }],
  users: [
    {
      id: 1,
      name: "Loading ....",
      rol: "Loading ...",
      campaign: "Loading ...",
      lob: "lob1",
      idccms: "Loading ...",
    },
  ],
  tempUsers: [
    {
      id: 1,
      name: "Loading ...",
      rol: "Loading ...",
      campaign: "Loading ...",
      lob: "lob1",
      idccms: "Loading ...",
    },
  ],
  viewer: {
    name: "",
    lastname: "",
    email: "",
    password: "",
    country: "",
    idCampaign: "",
    rol: "",
  },
};

export const usrManageSlice = createSlice({
  name: "usrManage",
  initialState,
  reducers: {
    initialData: (state, action) => {
      //aqui se settean las variables
      return {
        ...initialState,
        campaigns: action.payload.campaigns,
        lobs: action.payload.lobs,
        users: action.payload.users,
        tempUsers: action.payload.users,
      };
    },
    campaignFilter: (state, action) => {
      //con filtro de lob
      if (state.lobSelected !== "All") {
        if (action.payload === "All") {
          return {
            ...state,
            lobSelected: "All",
            campaignSelected: action.payload,
            tempUsers: state.users,
          };
        }
        //settear filterLob
        const filterList = state.lobs.filter(
          (lob) => lob.idCampaign === parseInt(action.payload.split("-")[1])
        );
        const temp = state.users.filter(
          (user) => user.idCampaign === parseInt(action.payload.split("-")[1])
        );
        return {
          ...state,
          lobSelected: "All",
          filterLob: filterList,
          campaignSelected: action.payload,
          tempUsers: temp,
        };
      }

      //volviendo a estado original filtro lob = All
      if (action.payload === "All") {
        return {
          ...state,
          lobSelected: "All",
          campaignSelected: action.payload,
          tempUsers: state.users,
        };
      }

      //filtro si tanto el filtro campaign como lob estan en All falta settear lobs
      const filterList = state.lobs.filter(
        (lob) => lob.idCampaign === parseInt(action.payload.split("-")[1])
      );
      const temp = state.users.filter(
        (user) => user.idCampaign === parseInt(action.payload.split("-")[1])
      );

      return {
        ...state,
        filterLob: filterList,
        campaignSelected: action.payload,
        tempUsers: temp,
      };
    },
    lobFilter: (state, action) => {
      //con filtro de campaña
      if (state.campaignSelected !== "All") {
        if (action.payload === "All") {
          const temp = state.users.filter(
            (user) =>
              user.idCampaign === parseInt(state.campaignSelected.split("-")[1])
          );
          return {
            ...state,
            lobSelected: action.payload,
            tempUsers: temp,
          };
        }
        const temp = state.users.filter(
          (user) =>
            user.idLob === parseInt(action.payload.split("-")[1]) &&
            user.idCampaign === parseInt(state.campaignSelected.split("-")[1])
        );
        return {
          ...state,
          lobSelected: action.payload,
          tempUsers: temp,
        };
      }

      //volviendo a estado original filtro camapaña = All
      if (action.payload === "All") {
        return {
          ...state,
          lobSelected: action.payload,
          tempUsers: state.users,
        };
      }
    },
    addViewer: (state, action) => {
      return {
        ...state,
        viewer: {
          ...state.viewer,
          ...action.payload,
        },
      };
    },
    resetViewer: (state) => {
      return {
        ...state,
        viewer: {},
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  initialData,
  campaignFilter,
  lobFilter,
  addViewer,
  resetViewer,
} = usrManageSlice.actions;

export default usrManageSlice.reducer;

//trae users
export const usersData = createAsyncThunk("data/users", async () => {
  const dataUsers = await reqWithData("su/getusers", {
    start: 1,
    end: 1000,
  });

  return dataUsers;
});

//Funcion para consultar el listado de campañas
export const campaignsData = createAsyncThunk(
  "data/campaigns/usrMge",
  async () => {
    const dataCampaign = await reqWithData("su/getcampaigncontent", {
      context: 1,
    });

    return dataCampaign;
  }
);

//Funcion para consultar el listado lobs
export const lobsData = createAsyncThunk("data/lobs/usrMge", async () => {
  const dataLobs = await reqWithData("su/getcampaigncontent", {
    context: 5,
  });

  return dataLobs;
});

//
export const getDataUsrMge = createAsyncThunk(
  "data/getData/usrMge",
  async (params, ThunkAPI) => {
    const users = await ThunkAPI.dispatch(usersData());
    if (users.error) {
      return ThunkAPI.dispatch(
        showToast({
          type: "warning",
          title: "Error",
          msj: "Users Request Error",
          show: true,
          duration: 4000,
        })
      );
    }
    const campaigns = await ThunkAPI.dispatch(campaignsData());
    if (campaigns.error) {
      return ThunkAPI.dispatch(
        showToast({
          type: "warning",
          title: "Error",
          msj: "Campaign Request Error",
          show: true,
          duration: 4000,
        })
      );
    }
    const lobs = await ThunkAPI.dispatch(lobsData());
    if (lobs.error) {
      return ThunkAPI.dispatch(
        showToast({
          type: "warning",
          title: "Error",
          msj: "lobs Request Error",
          show: true,
          duration: 4000,
        })
      );
    }
    let res = {
      users: users.payload.data,
      campaigns: campaigns.payload.data[0].Campaign,
      lobs: lobs.payload.data[0].Lobs,
    };
    ThunkAPI.dispatch(initialData(res));
    return ThunkAPI.dispatch(fullLoadingOff());
  }
);

//Funcion para la creacion de viewer
export const createViewer = createAsyncThunk(
  "admin/createViewer",
  async (viewer, ThunkAPI) => {
    let usersInfo = [
      [
        0, // ident
        0, // idEmployee
        viewer.name,
        viewer.lastname,
        viewer.email,
        "", // cargo
        "2023-01-01", // hire date
        viewer.country,
        viewer.rol,
        0, // wave
        1, // idLob
        viewer.rol === "Viewer" ? viewer.idCampaign : 1,
        viewer.rol === "Viewer" ? viewer.password : "",
      ],
    ];

    // creacion del viewer en la db
    const addViewer = await reqWithData("insertusers", {
      usersInfo,
    });

    // verificacion de estado 200

    ThunkAPI.dispatch(fullLoadingOff());

    if (addViewer.status === 200) {
      ThunkAPI.dispatch(resetViewer());
      await ThunkAPI.dispatch(getDataUsrMge());
      return ThunkAPI.dispatch(
        showToast({
          type: "success",
          title: "Great!",
          msj: "The Viewer has been created successfully",
          show: true,
          duration: 4000,
        })
      );
    } else if (addViewer.status === 409) {
      return ThunkAPI.dispatch(
        showToast({
          type: "warning",
          title: "Ups!",
          msj: "This user all ready exist!",
          show: true,
          duration: 4000,
        })
      );
    } else {
      return ThunkAPI.dispatch(
        showToast({
          type: "warning",
          title: "Ups!",
          msj: "An error has been generated in the creation of the Viewer",
          show: true,
          duration: 4000,
        })
      );
    }
  }
);

//Funcion para la edicion  de viewer
export const editViewer = createAsyncThunk(
  "admin/editViewer",
  async (viewer, ThunkAPI) => {
    const user = {
      idccms: 0,
      idEmployee: viewer.idEmployee,
      name: viewer.name,
      lastName: viewer.lastname,
      email: viewer.email,
      position: "",
      hireDate: "2021-01-01",
      country: viewer.country,
      role: viewer.rol,
      wave: viewer.wave,
      idLob: viewer.idLob,
      idCampaign: viewer.idCampaign,
      password: viewer.password || viewer.tpToken,
    };

    // creacion del viewer en la db
    const updateViewer = await reqWithData("updateuser", {
      context: 1,
      user,
    });

    // verificacion de estado 200

    ThunkAPI.dispatch(fullLoadingOff());

    if (updateViewer.status === 200) {
      ThunkAPI.dispatch(resetViewer());
      await ThunkAPI.dispatch(getDataUsrMge());
      return ThunkAPI.dispatch(
        showToast({
          type: "success",
          title: "Great!",
          msj: "The Viewer has been edited successfully",
          show: true,
          duration: 4000,
        })
      );
    } else {
      return ThunkAPI.dispatch(
        showToast({
          type: "warning",
          title: "Ups!",
          msj: "An error has been generated in the edition of the Viewer",
          show: true,
          duration: 4000,
        })
      );
    }
  }
);
