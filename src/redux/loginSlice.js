import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import usrInf, { decrypt, encrypt } from "../helpers/authHelper";
import { showToast } from "./alertsSlice";
import CryptoJS from "crypto-js";
import { BACKEND_URL } from "../apis/backendURL";

const url = `${BACKEND_URL}/api/login`;
const urlForm = `${BACKEND_URL}/api/authlogin`;

export const loginSubmit = createAsyncThunk(
  "login/loginSubmit",
  async (data, ThunkAPI) => {
    try {
      const res = await axios.post(url, data).catch(function (error) {
        if (error.response) {
          return error.response;
        }
      });
      if (res.status === 200) {
        try {
          const data = decrypt(res.data.replace(/['"]+/g, ""));
          if (
            data.role === "Poc" &&
            data.idLob === 1 &&
            data.idCampaign === 1
          ) {
            return ThunkAPI.dispatch(
              showToast({
                type: "warning",
                title: "You don´t have access",
                msj: "You are not assign to any Campaign",
                show: true,
              })
            );
          }
          return { data: res.data };
        } catch (error) {
          return ThunkAPI.dispatch(
            showToast({
              type: "warning",
              title: "You don´t have access",
              msj: "Problems with your creation",
              show: true,
            })
          );
        }
      }
      if (res.status === 401) {
        return ThunkAPI.dispatch(
          showToast({
            type: "warning",
            title: "You don´t have access",
            msj: "Check if you have been created",
            show: true,
          })
        );
      }
      return ThunkAPI.dispatch(
        showToast({
          type: "warning",
          title: "You don´t have access",
          msj: "Check if you have been created",
          show: true,
        })
      );
    } catch (error) {
      return Promise.resolve({ data: null, error: error });
    }
  }
);
export const loginAsViewer = createAsyncThunk(
  "login/loginViewerSubmit",
  async (data, ThunkAPI) => {
    try {
      const body = encrypt(JSON.stringify(data));
      let hash = CryptoJS.SHA512(body).toString();
      let headers = {
        refreshAuthorization: "UFVUTyBFTCBRVUUgTE8gREVTRU5DUllQVEU=&#&" + hash,
      };
      const res = await axios
        .post(urlForm, { data: body }, { headers })
        .catch(function (error) {
          if (error.response) {
            return error.response;
          }
        });
      if (res.status === 200) {
        try {
          const data = decrypt(res.data.replace(/['"]+/g, ""));
          if (data.role !== "Viewer" && data.idCampaign !== 1) {
            return ThunkAPI.dispatch(
              showToast({
                type: "warning",
                title: "You don´t have access",
                msj: "you dont assign in any Campaign",
                show: true,
              })
            );
          }
          return { data: res.data };
        } catch (error) {
          return ThunkAPI.dispatch(
            showToast({
              type: "warning",
              title: "You don´t have access",
              msj: "Problrem with your creation",
              show: true,
            })
          );
        }
      }
      if (res.status === 401) {
        return ThunkAPI.dispatch(
          showToast({
            type: "warning",
            title: "You don´t have access",
            msj: "Check if you have been created",
            show: true,
          })
        );
      }
      return ThunkAPI.dispatch(
        showToast({
          type: "warning",
          title: "You don´t have access",
          msj: "Check if you have been created",
          show: true,
        })
      );
    } catch (error) {
      return Promise.resolve({ data: null, error: error });
    }
  }
);

const initialState = () => {
  const data = usrInf();
  if (data !== "unauthorized") {
    return {
      loading: false,
      userData: data,
      url: "/admin/home",
      status: "authorized",
    };
  } else {
    return {
      loading: false,
      userData: null,
      url: "/",
      status: "unauthorized",
    };
  }
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    logoutAction: (state, action) => {
      sessionStorage.removeItem("userFeel");
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginSubmit.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loginSubmit.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.data) {
        try {
          document.cookie = "fuencionaDPV=probando_esta_vaina; path=/";
        } catch (error) {
          //console.log(error);
        }

        state.userData = decrypt(action.payload.data.replace(/['"]+/g, ""));
        state.url = "/home";
        state.status = "authorized";
        sessionStorage.setItem(
          "userFeel",
          action.payload.data.replace(/['"]+/g, "")
        );
      } else {
        state = {
          loading: false,
          userData: null,
          url: "/",
          status: "unauthorized",
        };
      }
    });
    builder.addCase(loginSubmit.rejected, (state, action) => {
      state.loading = false;
    });
    builder.addCase(loginAsViewer.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loginAsViewer.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.data) {
        try {
          document.cookie = "fuencionaDPV=probando_esta_vaina; path=/";
        } catch (error) {
          //console.log(error);
        }

        state.userData = decrypt(action.payload.data.replace(/['"]+/g, ""));
        state.url = "/home";
        state.status = "authorized";
        sessionStorage.setItem(
          "userFeel",
          action.payload.data.replace(/['"]+/g, "")
        );
      } else {
        state = {
          loading: false,
          userData: null,
          url: "/",
          status: "unauthorized",
        };
      }
    });
    builder.addCase(loginAsViewer.rejected, (state, action) => {
      state.loading = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const { readUserActive, logoutAction } = loginSlice.actions;

export default loginSlice.reducer;
