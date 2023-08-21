import { createSlice } from '@reduxjs/toolkit'

export interface ITitle {
    title: string
}
const initialState: ITitle = {
    title: "",
}

const slice = createSlice({
    name: 'title',
    initialState: initialState,
    reducers: {
        updateTitle(state, action) {
            state.title = action.payload
        }
    }
});
export const { updateTitle } = slice.actions;
export const titleReducer = slice.reducer;

