import { createSlice } from "@reduxjs/toolkit";

const demoSlice = createSlice({
    name: "demo",
    initialState: {
        users: []
    },
    reducers: {
        setDemoUsers: (state, action) => {
            state.users = action.payload
        }
    }
})

export const {setDemoUsers} = demoSlice.actions

export default demoSlice.reducer