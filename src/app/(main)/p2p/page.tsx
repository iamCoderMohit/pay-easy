"use client"

import { useState } from "react";

function Page() {
    const [amount, setAmount] = useState(0)
    const [number, setNumber] = useState("")
    const [pin, setPin] = useState("")

  return (
    <div className="flex gap-5">
      <div className="w-1/2 h-[80vh] rounded-2xl p-5 bg-gray-950/50 relative">
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
            // onClick={handleClick}
          >
            <p>Confirm and Send</p>
            {/* {infoLoading ? <Spinner /> : null} */}
          </div>
        </div>
      </div>
      <div className="w-1/2 h-[80vh] rounded-2xl p-5 bg-gray-950/50 relative">
        <h1 className="text-white text-xl font-bold">
          No friends? we understand; try sending money to demo users
        </h1>
      </div>
    </div>
  );
}

export default Page;
