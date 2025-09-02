"use client"

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar(){
    const session = useSession()

    return <div className="z-10 py-5 absolute text-white flex justify-around w-full text-lg">
        <Link href={'/'} className="cursor-pointer">
            <img src="/images/logo.png" className="w-40 invert cursor-pointer" alt="" />
        </Link>
        <div className="flex gap-10">
            {session.data?.user ? <Link href={"/home"}>Home</Link>: null }
            <div>Products</div>
            <div>Solutions</div>
            <div>Github</div>
        </div>
        <div>
            {session.data?.user ? <button onClick={() => signOut()} className="cursor-pointer">Logout</button> : <Link href={"/signin"}>Signin</Link>}
        </div>
    </div>
}