import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Loading: false,
  toast: {
    type: "success",
    title: "esta monduw",
    msj: "Todo bien Amiguito esta vuelta funciona del putas ",
    show: false,
    duration: 4000,
  },
  confirmation: {
    show: false,
    title: "Action Validation",
    msj: " Are you sure you want to perform this process?",
    data: [],
    tag: "",
  },
};

export const alertSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    fullLoadingOn: (state) => {
      return {
        ...state,
        loading: true,
      };
    },
    fullLoadingOff: (state, action) => {
      return { ...state, loading: false };
    },
    showToast: (state, action) => {
      return { ...state, toast: action.payload };
    },
    closeToast: (state, action) => {
      return { ...state, toast: initialState.toast };
    },
    showConfirmation: (state, action) => {
      return {
        ...state,
        confirmation: {
          ...state.confirmation,
          show: true,
          title: action.payload.title,
          msj: action.payload.msj,
          data: action.payload.data,
          tag: action.payload.tag,
        },
      };
    },
    clearConfirmation: (state) => {
      return {
        ...state,
        confirmation: initialState.confirmation,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  fullLoadingOn,
  fullLoadingOff,
  showToast,
  closeToast,
  showConfirmation,
  clearConfirmation,
} = alertSlice.actions;

export default alertSlice.reducer;
