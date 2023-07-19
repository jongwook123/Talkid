import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "user",
    initialState: {
        token: "",
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

export const { loginUser, clearUser } = userSlice.actions;
export default userSlice.reducer;