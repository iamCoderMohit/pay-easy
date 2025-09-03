import axios from "axios"
import { useState } from "react"

export function useP2P(){
    const [p2pLoading, setP2pLoading] = useState(false)
    const [p2pError, setP2pError] = useState<string | null>("")
    const p2p = async (number: string, amount: number, pin: string) => {
        try {
            setP2pLoading(true)
            setP2pError(null)
            const res = await axios.post('/api/peertopeer', {number, amount, pin})
        } catch (error) {
            setP2pError("error transferring money")
        } finally {
            setP2pLoading(false)
        }
    }
    return {
        p2p,
        p2pLoading,
        p2pError
    }
}