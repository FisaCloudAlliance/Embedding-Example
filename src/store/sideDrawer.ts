import { createSlice } from "@reduxjs/toolkit";

export interface ISideDrawer {
  open: boolean;
}
const initialState: ISideDrawer = {
  open: true,
};

const slice = createSlice({
  name: "sideDrawer",
  initialState: initialState,
  reducers: {
    updateSideDrawer(state, action) {
      state.open = action.payload;
    },
  },
});

export const { updateSideDrawer } = slice.actions;
export const sideDrawerReducer = slice.reducer;
