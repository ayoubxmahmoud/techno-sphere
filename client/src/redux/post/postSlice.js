import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentPost: null,
    error: null,
    loading: false
}

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        createPostStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        createPostSuccess: (state, action) => {
            state.currentPost = action.payload;
            state.loading = false;
            state.error = null;
        },
        createPostFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }, 
    }
})

export const {  createPostFailure, createPostStart, createPostSuccess } = postSlice.actions;
export default postSlice.reducer;