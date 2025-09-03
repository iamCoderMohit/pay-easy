"use client"

import { Background } from "@/components/Background"
import Toast from "@/components/Toast"
import { signIn } from "next-auth/react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { IoMdCheckmark, IoMdWarning } from "react-icons/io"

function page() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [toast, setToast] = useState(false)
    const searchParams = useSearchParams()
    const router = useRouter()

    const handleSubmit = async () => {
        const res = await signIn("credentials", {
            redirect: false,
            email,
            password,
        })
        setToast(true)

        if(res?.error){
            setError("wrong details")
        } else{
            router.push('/home')
        }
    }
  return (
    <div className="border border-gray-700 ">
        <Background />
        {toast ? <Toast text={error ? error : "success"} icon={error ? <IoMdWarning /> : <IoMdCheckmark /> }setToast={setToast} /> : null}
        <Link href={'/'}><img src='/images/logo.png' alt="" className="w-30 left-50 invert cursor-pointer absolute z-10" /></Link>
        <div className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 md:w-1/4 border border-gray-700 p-10 rounded-md backdrop-blur-sm flex flex-col">
        <h1 className="mb-5 font-semibold text-2xl">Sign in to your account</h1>
            <div className="flex flex-col">
                <label htmlFor="" className="text-lg">Email</label>
                <input type="email" name="" id="" className="border border-white p-3 rounded-md" 
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="flex flex-col mt-3">
                <label htmlFor="" className="text-lg">Password</label>
                <input type="password" name="" id="" className="border border-white p-3 rounded-md" 
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button className="bg-blue-600 rounded-md w-full mt-5 py-3 cursor-pointer"
            onClick={handleSubmit}
            >Sign in</button>

            <div className="w-full h-0.5 bg-white relative flex justify-center items-center mt-5">
                <h1 className="absolute text-center bg-black bg-opacity-0 px-3">OR</h1>
            </div>

            <div className="flex items-center gap-3 mt-8 mx-auto cursor-pointer"
            onClick={() => signIn("google", {callbackUrl: '/home'})}
            >
                <img src="https://www.svgrepo.com/show/303108/google-icon-logo.svg" className="w-7" alt="" />
                <h1>Sign in with Google</h1>
            </div>

            <h1 className="text-center font-semibold mt-10 text-sm">New to PayEasy? <Link href={"/signup"}><span className="text-blue-600 cursor-pointer">Create Account</span></Link></h1>
        </div>
    </div>
  )
}

export default page