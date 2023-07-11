import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { reqWithData } from "../../apis/requestTypes";
import { showToast } from "../alertsSlice";

const initialState = {
  isLoading: false,
  loadingCamp: false,
  loadingLob: false,
  loadingWave: false,
  campaigns: [],
  lobs: [],
  waves: [],
  campSelect: "All",
  lobSelect: "All",
  waveSelect: "All",
  courses: [],
  learningPlans: [],
};

export const courseViewerSlice = createSlice({
  name: "coursesViewer",
  initialState,
  reducers: {
    //Loading courses
    loadingData: (state, action) => {
      return {
        ...state,
        isLoading: action.payload,
      };
    },
    loadingFilters: (state, action) => {
      if (action.payload.filter === "campaign") {
        return {
          ...state,
          loadingCamp: action.payload.value,
        };
      }
      if (action.payload.filter === "lob") {
        return {
          ...state,
          loadingLob: action.payload.value,
        };
      }
      if (action.payload.filter === "wave") {
        return {
          ...state,
          loadingWave: action.payload.value,
        };
      }
    },
    firstCampaign: (state, action) => {
      const fCamp = action.payload.map((el) => {
        el.check = false;
        return { ...el };
      });
      return { ...state, campaigns: fCamp };
    },
    changeCampaign: (state, action) => {
      if (action.payload.campSelect === "All") {
        return {
          ...state,
          lobs: [],
          waves: [],
          campSelect: action.payload.campSelect,
          lobSelect: "All",
          waveSelect: "All",
          courses: [],
          learningPlans: [],
        };
      }
      const camp = state.campaigns.map((el) => {
        if (el.id === parseInt(action.payload.campSelect.split("-")[1])) {
          return { ...el, check: true };
        }
        return el;
      });
      const cLobs = action.payload.lobs.filter(
        (el) =>
          el.idCampaign === parseInt(action.payload.campSelect.split("-")[1])
      );
      return {
        ...state,
        campaigns: camp,
        lobs: cLobs,
        waves: [],
        campSelect: action.payload.campSelect,
        courses: [],
        learningPlans: [],
      };
    },
    changeLob: (state, action) => {
      if (action.payload.lobSelect === "All") {
        return {
          ...state,
          waves: [],
          lobSelect: action.payload.lobSelect,
          waveSelect: "All",
          courses: [],
          learningPlans: [],
        };
      }
      const slob = state.lobs.map((el) => {
        if (el.id === parseInt(action.payload.lobSelect.split("-")[1])) {
          return { ...el, check: true };
        }
        return el;
      });

      return {
        ...state,
        lobs: slob,
        waves: action.payload.waves,
        lobSelect: action.payload.lobSelect,
        courses: [],
        learningPlans: [],
      };
    },
    changeWave: (state, action) => {
      return { ...state, waveSelect: action.payload };
    },
    cursosLps: (state, action) => {
      return {
        ...state,
        learningPlans: action.payload.lps,
        courses: action.payload.courses,
      };
    },
    reset: (state, action) => {
      return { ...initialState, campSelect: state.campSelect };
    },
  },
});

export const {
  loadingData,
  loadingFilters,
  firstCampaign,
  changeCampaign,
  changeLob,
  changeWave,
  cursosLps,
  reset,
} = courseViewerSlice.actions;

export default courseViewerSlice.reducer;

///////////////////////Thunk Section//////////////////////////
//funcion para consultar todas las campañas
export const getCampaignsData = createAsyncThunk(
  "data/postgetFiltersCampaigns",
  async (data, ThunkAPI) => {
    //ThunkAPI.dispatch(reset());
    ThunkAPI.dispatch(loadingData(true));
    const dataCampaign = await reqWithData("su/getcampaigncontent", {
      context: 1,
    });

    if (dataCampaign.error) {
      ThunkAPI.dispatch(loadingData(false));
      //ThunkAPI.dispatch(getCoursesA([]));
      return ThunkAPI.dispatch(
        showToast({
          type: "warning",
          title: "Error",
          msj: "We have a problem with the campaigns",
          show: true,
          duration: 4000,
        })
      );
    }
    ThunkAPI.dispatch(firstCampaign(dataCampaign.data[0].Campaign));

    return ThunkAPI.dispatch(loadingData(false));
  }
);
//funcion para consultar las lobs
export const getLobsData = createAsyncThunk(
  "data/postgetFiltersLobs",
  async (campSelect, ThunkAPI) => {
    ThunkAPI.dispatch(loadingFilters({ filter: "wave", value: false }));
    ThunkAPI.dispatch(loadingFilters({ filter: "campaign", value: true }));
    const dataLobs = await reqWithData("su/getcampaigncontent", {
      context: 5,
    });

    if (dataLobs.error) {
      ThunkAPI.dispatch(loadingFilters({ filter: "campaign", value: false }));
      return ThunkAPI.dispatch(
        showToast({
          type: "warning",
          title: "Error",
          msj: "We have a problem with the Lobs",
          show: true,
          duration: 4000,
        })
      );
    }

    ThunkAPI.dispatch(
      changeCampaign({ campSelect, lobs: dataLobs.data[0].Lobs })
    );
    return ThunkAPI.dispatch(
      loadingFilters({ filter: "campaign", value: false })
    );
  }
);
//funciom para consultar las waves de una lob especifica
export const getWavesData = createAsyncThunk(
  "data/postgetFiltersWaves",
  async (lobSelect, ThunkAPI) => {
    if (lobSelect === "All") {
      return ThunkAPI.dispatch(changeLob({ lobSelect, waves: [] }));
    }
    ThunkAPI.dispatch(loadingFilters({ filter: "wave", value: false }));
    ThunkAPI.dispatch(loadingFilters({ filter: "lob", value: true }));
    const dataWaves = await reqWithData("getwaves", {
      context: 2,
      idLob: parseInt(lobSelect.split("-")[1]),
    });

    if (dataWaves.error) {
      ThunkAPI.dispatch(loadingFilters({ filter: "lob", value: false }));
      return ThunkAPI.dispatch(
        showToast({
          type: "warning",
          title: "Error",
          msj: "We have a problem with the waves",
          show: true,
          duration: 4000,
        })
      );
    }
    ThunkAPI.dispatch(changeLob({ lobSelect, waves: dataWaves.data }));

    return ThunkAPI.dispatch(loadingFilters({ filter: "lob", value: false }));
  }
);

//funcion para consultar los LPs y Ccursos asignados
export const getAssignData = createAsyncThunk(
  "data/postgetAssignData",
  async (filterData, ThunkAPI) => {
    ThunkAPI.dispatch(changeWave(filterData.wave));
    ThunkAPI.dispatch(loadingFilters({ filter: "wave", value: true }));
    const dataLps = await reqWithData("tpv/getcampaigncontent", {
      context: 1,
      idCampaign: parseInt(filterData.campaign.split("-")[1]),
      idLob: parseInt(filterData.lob.split("-")[1]),
      idWave: parseInt(filterData.wave),
    });

    if (dataLps.error) {
      ThunkAPI.dispatch(loadingFilters({ filter: "wave", value: false }));
      return ThunkAPI.dispatch(
        showToast({
          type: "warning",
          title: "Error",
          msj: "We have a problem with the LPs",
          show: true,
          duration: 4000,
        })
      );
    }
    const dataCourse = await reqWithData("tpv/getcampaigncontent", {
      context: 2,
      idCampaign: parseInt(filterData.campaign.split("-")[1]),
      idLob: parseInt(filterData.lob.split("-")[1]),
      idWave: parseInt(filterData.wave),
    });
    if (dataCourse.error) {
      ThunkAPI.dispatch(loadingFilters({ filter: "wave", value: false }));
      return ThunkAPI.dispatch(
        showToast({
          type: "warning",
          title: "Error",
          msj: "We have a problem with Courses",
          show: true,
          duration: 4000,
        })
      );
    }
    ThunkAPI.dispatch(
      cursosLps({
        lps: dataLps.data.Result,
        courses: dataCourse.data.Result,
      })
    );

    return ThunkAPI.dispatch(loadingFilters({ filter: "wave", value: false }));
  }
);
