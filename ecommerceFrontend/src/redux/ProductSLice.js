import { createSlice } from "@reduxjs/toolkit";
import { showToast } from "../utility/Toast";

const initialState = {
  product_data: [],
  cartItems: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProducts: (state, action) => {
      state.product_data = action.payload;
    },
    updateProducts: (state, action) => {
      state.product_data = action.payload;
    },
    addProductsToCart: (state, action) => {
      const { _id } = action.payload;
      const existingItem = state.cartItems?.filter((item) => item?._id === _id);
      if (existingItem?.length <= 0) {
        const total = action.payload.prod_price;
        state.cartItems = [
          ...state.cartItems,
          { ...action.payload, qty: 1, total: total },
        ];
        showToast("success", "item added to cart");
      } else {
        showToast("error", "Item already in your cart");
      }
    },
    updateProductsToCart: (state, action) => {
      const { _id } = action.payload;
      const UpdatedItems = state.cartItems?.filter((item) => item?._id !== _id);
      showToast("success", "One item removed from your cart");
      state.cartItems = UpdatedItems;
    },
    increaseQty: (state, action) => {
      const { _id } = action.payload;
      const index = state.cartItems?.findIndex((item) => item?._id === _id);
      const item = state?.cartItems[index];
      const quantity = ++item.qty;
      item.qty = quantity;
      item.total = item.prod_price * quantity;
    },
    decreaseQty: (state, action) => {
      const { _id } = action.payload;
      const index = state.cartItems?.findIndex((item) => item?._id === _id);
      const item = state?.cartItems[index];
      const quantity = --item.qty;
      item.qty = quantity;
      item.total = item.prod_price * quantity;
    },
  },
});

export const {
  addProducts,
  updateProducts,
  addProductsToCart,
  updateProductsToCart,
  increaseQty,
  decreaseQty,
} = productSlice.actions;
export const productsReducer = productSlice.reducer;
