"use client"

import { setCredit, setDebit } from "@/features/txnSlice"
import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"

export function useTxns(){
    const [txnloading, setLoading] = useState(false)
    const [txnerror, setError] = useState("")
    const dispatch = useDispatch()

    const getCredit = async () => {
        try {
            setLoading(true)
            const res = await axios.get('/api/gettxns/credit')
            dispatch(setCredit(res.data.credit))
        } catch (error) {
            setError("error fetching credit txns")
        } finally{
            setLoading(false)
        }
    }

    const getDebit = async () => {
        try {
            const res = await axios.get('/api/gettxns/debit')
            dispatch(setDebit(res.data.debit))
        } catch (error) {
            setError("error fetching debit txns")
        }
    }

    return {
        getCredit,
        getDebit,
        txnloading,
        txnerror
    }
}