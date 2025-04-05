// app/store.ts
import { configureStore } from "@reduxjs/toolkit";
import colorsReducer from "./colorsReducer";
import filtersSlice from "./filtersReducer";
import productsSlice from "./productsReducer";
import fixedProductsSlice from "./fixedProductReducer";

export const store = configureStore({
  reducer: {
    colors: colorsReducer,
    filters: filtersSlice,
    products: productsSlice,
    fixedProducts: fixedProductsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
