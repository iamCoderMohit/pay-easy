import { setBank } from "@/features/bankSlice"
import { setWallet } from "@/features/walletSlice"
import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"

export function useInfo(){
    const [infoLoading, setInfoLoading] = useState(false)
    const [infoError, setInfoError] = useState("")
    const dispatch = useDispatch()

    const getBankBal = async () => {
        try {
            setInfoLoading(true)
            const res = await axios.get('/api/me/bankbalance')
            dispatch(setBank(res.data.bankBal))
        } catch (error) {
            setInfoError("error fetching bank balance")
        } finally{
            setInfoLoading(false)
        }
    }

    const getWalletBal = async () => {
        try {
            setInfoLoading(true)
            const res = await axios.get('/api/me/walletbalance')
            dispatch(setWallet(res.data.walletBal))
        } catch (error) {
            setInfoError("error fetching wallet balance")
        } finally{
            setInfoLoading(false)
        }
    }

    return {
        getBankBal,
        getWalletBal,
        infoLoading,
        infoError
    }
}