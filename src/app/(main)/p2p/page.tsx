"use client"

import DemoUser from "@/components/DemoUser";
import Spinner from "@/components/Spinner";
import Toast from "@/components/Toast";
import { useDemo } from "@/hooks/useDemo";
import { useInfo } from "@/hooks/useInfo";
import { useP2P } from "@/hooks/useP2p";
import { useEffect, useRef, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { useSelector } from "react-redux";

function Page() {
    const [amount, setAmount] = useState(0)
    const [number, setNumber] = useState("")
    const [pin, setPin] = useState("")
    const [toast, setToast] = useState(false)

    const {p2p, p2pLoading, p2pError} = useP2P()
    const {getWalletBal} = useInfo()
    const {getDemoUsers} = useDemo()

    const demoUsers = useSelector((state: any) => state.demo.users)

    const hasRun = useRef(false)

    useEffect(() => {
      if(hasRun.current) return;
      hasRun.current = true;

      async function fetch() {
        await getDemoUsers()
      }

      fetch()

    }, [hasRun])

    async function handleClick() {
      await p2p(number, amount, pin)
      setToast(true)
      hasRun.current = false
      await getWalletBal()
    }

  return (
    <div className="flex md:flex-row flex-col items-center gap-5">
      {toast ? <Toast text={p2pError ? p2pError : "Success"} icon={p2pError ? <IoIosWarning /> : <FaCheck />} setToast={setToast} /> : null}
      <div className="md:w-1/2 w-full h-[80vh] rounded-2xl p-5 bg-gray-950/50 relative">
        <h1 className="text-white text-xl font-bold">Peer to Peer transfers</h1>
        <div className="text-green-700 mt-5">
          <h1>Some pre requisites you should know before sending money</h1>
          <p>
            1. The user you are sending money to, should be present in our
            platform
          </p>
          <p>2. Their wallet should be activated</p>
        </div>

        <div className="flex flex-col gap-3 mt-10">
          <input
            className="border border-white rounded-sm p-3 pl-3 text-white"
            type="number"
            placeholder="Mobile Number"
            onChange={(e) => setNumber(e.target.value)}
          />
          <input
            className="border border-white rounded-sm p-3 pl-3 text-white"
            type="number"
            placeholder="Amount"
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
            <p>Confirm and Send</p>
            {p2pLoading ? <Spinner /> : null}
          </div>
        </div>
      </div>
      <div className="md:w-1/2 w-full h-[80vh] rounded-2xl p-5 bg-gray-950/50 relative">
        <h1 className="text-white text-xl font-bold">
          No friends? we understand; try sending money to demo users
        </h1>

        <div className="flex flex-col justify-center items-center gap-10 mt-5">
          {demoUsers.map((item: any) => (
            <DemoUser name={item.name} number={item.number} balance={item.wallet?.balance} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
