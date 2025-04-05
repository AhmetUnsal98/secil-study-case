import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ColorState {
  colors: string[];
}
const initialState: ColorState = {
  colors: [],
};
export const colorsSlice = createSlice({
  name: "colors",
  initialState,

  reducers: {
    setColors: (state, action) => {
      state.colors = action.payload;
    },
  },
});
export const { setColors } = colorsSlice.actions;
export default colorsSlice.reducer;
