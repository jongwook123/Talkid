import { createSlice } from "@reduxjs/toolkit";

export const dateSlice = createSlice({
    name: "date",
    initialState: {
        date: "",
    },
    reducers: {
        loginUser: (state, action) => {
            state.token = action.payload.token;
            
            return state;
        },
        clearUser: (state) => {
            state.token = "";
            
            return state;
        },
    },
});

export const { loginUser, clearUser } = dateSlice.actions;
export default dateSlice.reducer;