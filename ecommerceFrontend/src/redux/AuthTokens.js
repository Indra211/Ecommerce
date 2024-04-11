import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  tokens: {},
};

const TokenSlice = createSlice({
  name: "tokens",
  initialState,
  reducers: {
    addTokens: (state, action) => {
      state.tokens = action.payload;
    },
  },
});

export const { addTokens } = TokenSlice.actions;
export const tokensReducers = TokenSlice.reducer;
