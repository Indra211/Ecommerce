import { createSlice } from "@reduxjs/toolkit";

const initalstate = {
  userdata: {},
};

const userDataSlice = createSlice({
  name: "userdata",
  initialState: initalstate,
  reducers: {
    addUserData: (state, action) => {
      state.userdata = action.payload;
    },
    updateUserData: (state, action) => {
      state.userdata = action.payload;
    },
  },
});

export const { addUserData, updateUserData } = userDataSlice.actions;
export const userReducer = userDataSlice.reducer;
