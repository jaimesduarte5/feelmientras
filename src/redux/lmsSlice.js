import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  scorm12: {},
  scorm2004: {},
};

export const lmsSlice = createSlice({
  name: "lms",
  initialState,
  reducers: {
    logoutAction: (state, action) => {
      return { ...state };
    },
  },
});

// Action creators are generated for each case reducer function
export const { logoutAction } = lmsSlice.actions;

export default lmsSlice.reducer;
