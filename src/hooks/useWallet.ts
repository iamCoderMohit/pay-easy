"use client"

import { setWallet } from "@/features/walletSlice"
import axios from "axios"
import { useState } from "react"
import {useDispatch} from "react-redux"

export function useWallet(){
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
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

    return {
        activateWallet,
        loading,
        error
    }
}