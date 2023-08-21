import { createSlice } from "@reduxjs/toolkit";
import { createRef, RefObject } from "react";
import { LoadingBarRef } from "react-top-loading-bar";
export interface IProgress {
  ref: RefObject<LoadingBarRef>;
}
export const initialState: IProgress = {
  ref: createRef(),
};
const slice = createSlice({
  name: "theme",
  initialState: initialState,
  reducers: {
    updateProgress(state, action) {
      state.ref.current = action.payload;
    },
  },
});
export const { updateProgress } = slice.actions;
export const progressReducer = slice.reducer;
