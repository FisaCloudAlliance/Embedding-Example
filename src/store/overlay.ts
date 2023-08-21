import { createSlice } from "@reduxjs/toolkit";
export interface IOverlay {
  /** サイト全体にwaiting overlayをかける */
  open: boolean;
}

export const initialState: IOverlay = {
  open: false,
};

const slice = createSlice({
    name: 'title',
    initialState: initialState,
    reducers: {
        waitSite(state, action) {
            state.open = action.payload
        }
    }
});
export const { waitSite } = slice.actions;
export const waitSiteReducer = slice.reducer;

