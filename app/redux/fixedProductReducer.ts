// redux/fixedProductsReducer.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../types/product";

interface FixedProduct extends Product {
  index?: number;
}

const fixedProductsSlice = createSlice({
  name: "fixedProducts",
  initialState: [] as FixedProduct[],
  reducers: {
    addFixedProduct: (state, action: PayloadAction<FixedProduct>) => {
      if (!state.some((product) => product.id === action.payload.id)) {
        state.push(action.payload);
      }
    },
    removeFixedProduct: (state, action: PayloadAction<string>) => {
      return state.filter((product) => product.id !== action.payload);
    },
    reorderFixedProducts: (
      state,
      action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
    ) => {
      const { dragIndex, hoverIndex } = action.payload;
      const draggedItem = state[dragIndex];
      state.splice(dragIndex, 1);
      state.splice(hoverIndex, 0, draggedItem);
    },
  },
});

export const { addFixedProduct, removeFixedProduct, reorderFixedProducts } =
  fixedProductsSlice.actions;
export default fixedProductsSlice.reducer;
