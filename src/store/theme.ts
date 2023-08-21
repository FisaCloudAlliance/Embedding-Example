import { createSlice } from "@reduxjs/toolkit";
export type PaletteMode = "light" | "dark";
export interface ITheme {
  mode: PaletteMode;
}
export const initialState: ITheme = {
  mode: "light",
};
const slice = createSlice({
  name: "theme",
  initialState: initialState,
  reducers: {
    updateTheme(state, action) {
      state.mode = action.payload;
    },
  },
});
export const { updateTheme } = slice.actions;
export const themeReducer = slice.reducer;
