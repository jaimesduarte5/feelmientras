import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { reqWithData } from "../../apis/requestTypes";
import { fullLoadingOff, showToast } from "../alertsSlice";

const initialState = {
  headCount: [],
};

export const analyticsPocSlice = createSlice({
  name: "analiticsPoc",
  initialState,
  reducers: {
    initDataAnalyticsPoc: (state, action) => {
      return {
        ...state,
        headCount: action.payload,
      };
    },
    logoutAction: (state, action) => {
      return { ...state };
    },
  },
});

// Action creators are generated for each case reducer function
export const { initDataAnalyticsPoc, logoutAction } = analyticsPocSlice.actions;

//export const usrInfo = (state) => state.userData;
export default analyticsPocSlice.reducer;

export const getDataAnalytics = createAsyncThunk(
  "data/poc/getDataAnalytics",
  async (params, ThunkAPI) => {
    const data = await reqWithData("getanalytics", { context: 1 });
    const data2 = await reqWithData("getanalytics", { context: 2 });
    const data3 = await reqWithData("getanalytics", { context: 3 });
    if (data.error) {
      ThunkAPI.dispatch(fullLoadingOff());
      return ThunkAPI.dispatch(
        showToast({
          type: "warning",
          title: "Error",
          msj: "We have a problem with update Waves",
          show: true,
          duration: 4000,
        })
      );
    }
    const rank = data.data.sort((a, b) => b.progress - a.progress);
    const res = rank.map((el, i) => {
      return { ...el, progress: el.progress.toFixed(0), rank: i + 1 };
    });
    //ThunkAPI.dispatch(getWaves());
    //ThunkAPI.dispatch(resetWavesFrom());
    ThunkAPI.dispatch(initDataAnalyticsPoc(res));
    return ThunkAPI.dispatch(fullLoadingOff());
  }
);
