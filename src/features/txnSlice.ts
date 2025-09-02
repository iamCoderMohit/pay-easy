import { createSlice } from "@reduxjs/toolkit";

const txnSlice = createSlice({
    name: "txnslice",
    initialState: {
        credit: [],
        debit: []
    },
    reducers: {
        setCredit: (state, action) => {
            state.credit = action.payload
        },
        setDebit: (state, action) => {
            state.debit = action.payload
        }
    }
})

export const {setCredit, setDebit} = txnSlice.actions

export default txnSlice.reducer