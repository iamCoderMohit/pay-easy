import { setBank } from "@/features/bankSlice"
import { setUserInfo } from "@/features/userSlice"
import { setWallet } from "@/features/walletSlice"
import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"

export function useInfo(){
    const [infoLoading, setInfoLoading] = useState(false)
    const [infoError, setInfoError] = useState<string | null>("")
    const dispatch = useDispatch()

    const getBankBal = async () => {
        try {
            setInfoLoading(true)
            setInfoError(null)
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
            setInfoError(null)
            const res = await axios.get('/api/me/walletbalance')
            dispatch(setWallet(res.data.walletBal))
        } catch (error) {
            setInfoError("error fetching wallet balance")
        } finally{
            setInfoLoading(false)
        }
    }

    const setUserDetails = async (number: string, pin: string) => {
        try {
            setInfoLoading(true)
            setInfoError(null)
            const res = await axios.put('/api/user', {number, pin})
            dispatch(setUserInfo({number: res.data.updatedUser.number, pin: res.data.updatedUser.pin}))
        } catch (error) {
            setInfoError("error editing details")
        } finally{
            setInfoLoading(false)
        }
    }

    return {
        getBankBal,
        getWalletBal,
        setUserDetails,
        infoLoading,
        infoError
    }
}