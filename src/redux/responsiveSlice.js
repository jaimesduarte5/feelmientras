import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  videoFull: false,
  showMenu: false,
};

export const responsiveSlice = createSlice({
  name: "responsive",
  initialState,
  reducers: {
    toggleVideoFull: (state) => {
      state.videoFull = !state.videoFull;
    },
    toggleMenu: (state) => {
      state.showMenu = !state.showMenu;
    },
  },
});

export const { toggleVideoFull, toggleMenu } = responsiveSlice.actions;

export default responsiveSlice.reducer;
