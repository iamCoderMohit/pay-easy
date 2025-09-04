"use client";

import { persistor } from "@/store/store";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { FaCross, FaHamburger } from "react-icons/fa";
import { ImCross } from "react-icons/im";

export default function Navbar() {
  const session = useSession();
  const [phone, setPhone] = useState(false);

  return (
    <div className="z-10 py-5 top-0 md:fixed text-white flex items-center justify-around md:w-full  text-lg">
      <Link href={"/"} className="cursor-pointer">
        <img
          src="/images/logo.png"
          className="w-40 invert cursor-pointer"
          alt=""
        />
      </Link>

      {/* logo here */}
      <div className="cursor-pointer  md:hidden" onClick={() => setPhone(true)}>
        <FaHamburger />
      </div>

      {phone && (
        <div className="md:hidden absolute w-full bg-gray-900 z-20 backdrop-blur-2xl rounded-md top-15 flex flex-col gap-5 items-center">
          <div>
            <div className="absolute top-4 right-5 cursor-pointer"
            onClick={() => setPhone(false)}
            ><ImCross /> </div>
            {session.data?.user ? (
              <button onClick={() => (signOut(), persistor.purge())} className="cursor-pointer">
                Logout
              </button>
            ) : (
              <Link href={"/signin"}>Signin</Link>
            )}  
          </div>
          <div className="flex gap-5 flex-col">
            {session.data?.user ? <Link href={"/home"}>Home</Link> : null}
            <div>Products</div>
            <div>Solutions</div>
            <div>
              <a href="https://github.com/iamCoderMohit/pay-easy">Github</a>
            </div>
          </div>
        </div>
      )}

      <div className="md:flex gap-10 hidden">
        <div className="md:flex gap-10">
          {session.data?.user ? <Link href={"/home"}>Home</Link> : null}
          <div>Products</div>
          <div>Solutions</div>
          <div>
            <a href="https://github.com/iamCoderMohit/pay-easy">Github</a>
          </div>
        </div>
        <div>
          {session.data?.user ? (
            <button onClick={() => signOut()} className="cursor-pointer">
              Logout
            </button>
          ) : (
            <Link href={"/signin"}>Signin</Link>
          )}
        </div>
      </div>
    </div>
  );
}
