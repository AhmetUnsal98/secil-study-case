import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface FilterState {
  colorCode: string;
  product_code: string;
}

const initialState: FilterState = {
  colorCode: "",
  product_code: "",
};

export const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<FilterState>) => {
      state.colorCode = action.payload.colorCode;

      state.product_code = action.payload.product_code;
    },
    clearColor: (state) => {
      state.colorCode = "";
    },
    clearProductCode: (state) => {
      state.product_code = "";
    },

    clearFilters: (state) => {
      state.colorCode = "";

      state.product_code = "";
    },
  },
});

export const { setFilters, clearFilters, clearColor, clearProductCode } =
  filtersSlice.actions;
export default filtersSlice.reducer;
