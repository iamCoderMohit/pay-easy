import { createSlice } from "@reduxjs/toolkit";

const bankSlice = createSlice({
    name: "bank",
    initialState: {
        bankEnabled: false,
        bankBalance: 0
    },
    reducers: {
        setBank: (state, action) => {
            state.bankEnabled = true
            state.bankBalance = action.payload
        }
    }
})

export const {setBank} = bankSlice.actions

export default bankSlice.reducer