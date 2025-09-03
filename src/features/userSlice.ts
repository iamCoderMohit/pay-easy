import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        isPinSet: false,
        isNumberSet: false,
        number: 0,
        pin: 0,
    },
    reducers: {
        setUserInfo: (state, action) => {
            state.isPinSet = true
            state.isNumberSet = true
            state.number = action.payload.number
            state.pin = action.payload.pin
        }
    }
})

export const {setUserInfo} = userSlice.actions

export default userSlice.reducer