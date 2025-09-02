import axios from "axios"
import { useState } from "react"

export const useAuth = () => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const signUp = async (email: string, name: string, password: string) => {
        try {
            setLoading(true)
            const res = await axios.post(`/api/auth/signup`, {email, name, password})
        } catch (error) {
            console.error(error)
            setError("error signing up!! check details")
        } finally{
            setLoading(false)
        }
    }

    return {
        signUp,
        loading,
        error
    }
}