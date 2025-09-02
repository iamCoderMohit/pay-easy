"use client"

import { setBank } from "@/features/bankSlice"
import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"

export function useBank(){
    const [bankloading, setLoading] = useState(false)
    const [bankError, setBankError] = useState("")
    const dispatch = useDispatch()

    const activateBank = async () => {
        try {
            setLoading(true)
            const res = await axios.post('/api/bank')
            dispatch(setBank(res.data.bankAc.balance))
        } catch (error) {
            setBankError("error activating bank ac.")
        } finally{
            setLoading(false)
        }
    }

    const bankToWallet = async (amount: number) => {
        try {
            setLoading(true)
            const res = await axios.post('/api/banktowallet', {amount})
        } catch (error) {
            setBankError("error transferring money")
        } finally{
            setLoading(false)
        }
    }

    return {
        activateBank,
        bankToWallet,
        bankloading,
        bankError
    }
}