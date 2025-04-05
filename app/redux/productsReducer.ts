import { createSlice } from "@reduxjs/toolkit";
import { Product } from "../types/product";

export interface ProductState {
  products: Product[];
  filteredProducts: Product[];
}

const initialState: ProductState = {
  products: [],
  filteredProducts: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setFilteredProducts: (state, action) => {
      state.filteredProducts = action.payload;
    },
  },
});
export const { setProducts, setFilteredProducts } = productsSlice.actions;
export default productsSlice.reducer;
