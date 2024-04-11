import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./userSlice";
import { productsReducer } from "./ProductSLice";
import { tokensReducers } from "./AuthTokens";

export const store = configureStore({
  reducer: {
    userData: userReducer,
    products: productsReducer,
    tokens: tokensReducers,
  },
});
