// To create a slice for the Redux store
import { createSlice } from "@reduxjs/toolkit";

// Define the initial state for the theme slice, setting the theme to light by default
const initialState = {
    theme: "light",
};

// create a slice for the theme management with initial state and reducer functions
const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        // Define 'toggleTheme' reducer to switch between 'light' and 'dark' theme modes
        toggleTheme: (state) => {
            state.theme = state.theme === "light" ? "dark" : "light";
        }
    }
});

// Export the 'toggleTheme' action to allow components to dispatch it
export const {toggleTheme} = themeSlice.actions;

// Export the reducer function to be added to the Redux store
export default themeSlice.reducer;