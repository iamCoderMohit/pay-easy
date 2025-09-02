"use client"

import Spinner from "@/components/Spinner";
import Toast from "@/components/Toast";
import { useBank } from "@/hooks/useBank";
import { useInfo } from "@/hooks/useInfo";
import { error } from "console";
import React, { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";

function page() {
    const {bankToWallet, bankloading, bankError} = useBank()
    const [amount, setAmount] = useState(0)
    const [toast, setToast] = useState(false)
    const {getBankBal, getWalletBal, infoLoading, infoError} = useInfo()

    async function handleClick() {
        await bankToWallet(amount)
        await getBankBal()
        await getWalletBal()
    }
  return (
    <div>
        {toast ? <Toast text={bankError || infoError ? bankError || infoError : "success" } icon={bankError || infoError ? <IoIosWarning /> : <FaCheck /> } setToast={setToast} /> : null}
      <h1 className="text-2xl text-center font-bold mt-5">
        This is page is made simple intentionally; so that it gives vibe of a
        typical bank verfication page
      </h1>
      <div className="absolute -translate-x-1/2 left-1/2 mt-20 flex">
        <input
          type="number"
          placeholder="Enter Amount"
          className="border rounded-sm pl-4 py-2"
          onChange={(e) => setAmount(Number(e.target.value))}
        />
          <div
            className="bg-blue-600 px-5 rounded-md text-lg text-white font-semibold cursor-pointer py-3  flex items-center justify-center gap-2"
            onClick={handleClick}
          >
            <span>Confirm</span>
            {bankloading || infoLoading ? <Spinner /> : null}
          </div>
      </div>

      <h1 className="absolute -translate-x-1/2 left-1/2 mt-40 text-red-600 text-center">By confirming make sure you are aware of the fact that currently there is no easy way of depositing money to your <span className="text-blue-600 cursor-pointer">PayEasy</span> account. (unless developer of site is you friend) </h1>
    </div>
  );
}

export default page;
