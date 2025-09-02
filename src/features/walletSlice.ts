import { createSlice } from "@reduxjs/toolkit";

const walletSlice = createSlice({
    name: "wallet",
    initialState: {
        walletEnabled: false,
        walletBalance: 0
    },
    reducers: {
        setWallet: (state, action) => {
            state.walletEnabled = true,
            state.walletBalance = action.payload
        }
    }
})

export const {setWallet} = walletSlice.actions

export default walletSlice.reducer