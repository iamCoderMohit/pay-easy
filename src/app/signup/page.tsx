"use client"

import { Background } from "@/components/Background"
import Toast from "@/components/Toast"
import axios from "axios"
import Link from "next/link"
import { useState } from "react"

function page() {
    const BACKEND_URL = process.env.BACKEND_URL
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    console.log(BACKEND_URL)

    async function handleSignUp() {
        try {
            const res = await axios.post(`/api/auth/signup`, {email, name, password})
        } catch (error) {
            //add toast and make signup and login page working
        }
    }
  return (
    <div className="border border-gray-700">
        {/* <Toast /> */}
        <Background />
        <Link href={'/'}><img src='/images/logo.png' alt="" className="w-30 left-50 invert cursor-pointer absolute z-10" /></Link>
        <div className="text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/4 border border-gray-700 p-10 rounded-md backdrop-blur-sm flex flex-col">
        <h1 className="mb-5 font-semibold text-2xl">Create your PayEasy account</h1>
            <div className="flex flex-col">
                <label htmlFor="" className="text-sm font-semibold">Email</label>
                <input type="email" name="" id="" className="border border-white p-3 rounded-md" 
                onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="flex flex-col mt-3">
                <label htmlFor="" className="text-sm font-semibold">Full Name</label>
                <input type="text" name="" id="" className="border border-white p-3 rounded-md" 
                onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="flex flex-col mt-3">
                <label htmlFor="" className="text-sm font-semibold">Password</label>
                <input type="password" name="" id="" className="border border-white p-3 rounded-md"
                onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button className="bg-blue-600 rounded-md w-full mt-5 py-3 cursor-pointer"
            onClick={handleSignUp}
            >Sign up</button>

            <div className="w-full h-0.5 bg-white relative flex justify-center items-center mt-5">
                <h1 className="absolute text-center bg-black bg-opacity-0 px-3">OR</h1>
            </div>

            <div className="flex items-center gap-3 mt-8 mx-auto cursor-pointer">
                <img src="https://www.svgrepo.com/show/303108/google-icon-logo.svg" className="w-7" alt="" />
                <h1>Sign in with Google</h1>
            </div>

            <h1 className="text-center font-semibold mt-10 text-sm">Alreay have an account? <Link href={"/signin"}><span className="text-blue-600 cursor-pointer"
            >Sign in</span></Link></h1>
        </div>
    </div>
  )
}

export default page