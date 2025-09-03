"use client";

import CustomButton from "@/components/CustomButton";
import { useSelector } from "react-redux";

function Page() {
  const bankBalance = useSelector((state: any) => state.bank.bankBalance);
  const walletBalance = useSelector(
    (state: any) => state.wallet.walletBalance.balance
  );
  return (
    <div className="flex md:flex-row flex-col items-center gap-5">
      <div className="md:w-1/2 w-full h-[80vh] rounded-2xl p-5 bg-gray-950/50 relative flex items-center flex-col justify-center gap-20">
        <div>
          <h1 className="text-white font-bold text-2xl">Wallet Balance</h1>
          <h1 className="text-green-600 font-bold text-xl">
            $ {walletBalance}
          </h1>
        </div>
        <div>
          <h1 className="text-white font-bold text-2xl">Bank Balance</h1>
          <h1 className="text-green-600 font-bold text-xl">
            $ {bankBalance.balance}
          </h1>
        </div>
      </div>
      <div className="md:w-1/2 w-full h-[80vh] rounded-2xl p-5 bg-gray-950/50 relative flex flex-col items-center justify-center gap-10">
        <CustomButton text="Send money to friend" path="/p2p" />
        <CustomButton text="Send money to wallet" path="/addmoney" />
        <CustomButton text="Send money to bank" path="/addmoney" />
      </div>
    </div>
  );
}

export default Page;
