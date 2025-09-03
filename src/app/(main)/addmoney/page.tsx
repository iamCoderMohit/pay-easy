"use client";

import Spinner from "@/components/Spinner";
import Toast from "@/components/Toast";
import { useInfo } from "@/hooks/useInfo";
import { useTxns } from "@/hooks/useTxns";
import { useWallet } from "@/hooks/useWallet";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";

function Page() {
  const router = useRouter();
  const [amount, setAmount] = useState(0)
  const [pin, setPin] = useState("")
  const {walletToBank, loading, error} = useWallet()
  const {getDebit, getCredit, txnloading, txnerror} = useTxns()
  const {getBankBal, getWalletBal, infoLoading, infoError} = useInfo()
  const [toast, setToast] = useState(false)

  async function handleClick(){
    await walletToBank(amount, pin)
    await getDebit()
    await getCredit()
    await getBankBal()
    await getWalletBal()
    setToast(true)
  }

  return (
    <div className="flex gap-5">
        {toast ? <Toast text={error || txnerror || infoError ? error || txnerror || infoError : "success"} icon={error || txnerror || infoError ? <IoIosWarning /> : <FaCheck />} setToast={setToast} /> : null}
      <div className="w-1/2 h-[80vh] rounded-2xl p-5 bg-gray-950/50 relative">
        <h1 className="text-white text-xl font-bold">Add money to wallet</h1>
        <div className="text-green-700 mt-5">
          <h1>currently there are three ways to add money to your wallet</h1>
          <p>1. Transfer from your bank account</p>
          <p>2. Ask a friend to do peer to peer transaction</p>
          <p>3. If site developer is your friend ask him </p>
        </div>
        <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-2 flex-col">
          <button
            onClick={() => router.push("/secure")}
            className="bg-blue-600 px-5 rounded-md text-lg text-white font-semibold cursor-pointer py-3 w-full"
          >
            Transfer from bank
          </button>
          <button className="bg-blue-600 w-full px-5 rounded-md text-lg text-white font-semibold cursor-pointer py-3">
            Ask a friend
          </button>
        </div>
      </div>
      <div className="w-1/2 h-[80vh] rounded-2xl p-5 bg-gray-950/50 relative">
        <h1 className="text-white text-xl font-bold">Add money to Bank</h1>
        <div className="text-green-700 mt-5">
          <h1>You can transfer money to your bank via YOUR wallet only</h1>
          <div className="flex flex-col gap-3 mt-10">
            <input
              className="border border-white rounded-sm p-3 pl-3 text-white"
              type="number"
              placeholder="Amount to be transferred"
              onChange={(e) => setAmount(Number(e.target.value))}
            />
            <input
              className="border border-white rounded-sm p-3 pl-3 text-white"
              type="number"
              placeholder="Pin"
              onChange={(e) => setPin(e.target.value)}
            />
            <div
              className="bg-blue-600 px-5 rounded-md text-lg text-white font-semibold cursor-pointer py-3 flex items-center justify-center gap-2"
              onClick={handleClick}
            >
              <p>Confirm and Transfer</p>
              {loading || txnloading || infoLoading ? <Spinner /> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
