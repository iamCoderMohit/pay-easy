"use client"

import { setWallet } from "@/features/walletSlice"
import axios from "axios"
import { useState } from "react"
import {useDispatch} from "react-redux"

export function useWallet(){
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>("")
    const dispatch = useDispatch()

    const activateWallet = async () => {
        try {
            setLoading(true)
            const res = await axios.post('/api/wallet')
            dispatch(setWallet(res.data.wallet.balance))
        } catch (error) {
            setError("error activatiing wallet")
        } finally{
            setLoading(false)
        }
    }

    const walletToBank = async (amount: number, pin: string) => {
        try {
            setLoading(true)
            setError(null)
            const res = await axios.post('/api/wallettobank', {amount, pin})
        } catch (error) {
            setError("check inputs")
        } finally{
            setLoading(false)
        }
    }

    return {
        activateWallet,
        walletToBank,
        loading,
        error
    }
}