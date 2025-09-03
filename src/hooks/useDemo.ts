import { setDemoUsers } from "@/features/demoSlice";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";

export function useDemo(){
    const [demoLoading, setDemoLoading] = useState(false)
    const [demoError, setDemoError] = useState<string | null>(null)
    const dispatch = useDispatch()

    const getDemoUsers = async () => {
        try {
            setDemoLoading(true)
            const res = await axios.get('/api/getDemo')
            dispatch(setDemoUsers(res.data.users))
        } catch (error) {
            setDemoError("error fetching demo users")
        } finally {
            setDemoLoading(false)
        }
    }
    return {
        getDemoUsers,
        demoLoading,
        demoError
    }
}