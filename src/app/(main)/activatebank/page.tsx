"use client";

import Spinner from "@/components/Spinner";
import Toast from "@/components/Toast";
import TxnComp from "@/components/TxnComp";
import { useBank } from "@/hooks/useBank";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { useSelector } from "react-redux";

function Page() {
  const bankEnabled = useSelector((state: any) => state.bank.bankEnabled);
  const bankBalance = useSelector((state: any) => state.bank.bankBalance);
  const { activateBank, bankloading, bankError } = useBank();
  const [toast, setToast] = useState(false);
  const credit = useSelector((state: any) => state.txn.credit);
  const debit = useSelector((state: any) => state.txn.debit);
  const router = useRouter()

  async function handleActivate() {
    await activateBank();
    setToast(true);
  }
  return (
    <div className="flex md:flex-row items-center flex-col gap-5">
      {toast ? (
        <Toast
          text={bankError ? bankError : "success"}
          icon={bankError ? <IoIosWarning /> : <FaCheck />}
          setToast={setToast}
        />
      ) : null}
      <div className="md:w-1/2 w-full md:h-[80vh] h-[40vh] rounded-2xl p-5 bg-gray-950/50 relative">
        <h1 className="text-white text-xl font-bold">
          {bankEnabled
            ? "Your bank ac."
            : "Activate your bank ac. now to get $5000"}
        </h1>
        {!bankEnabled && (
          <div
            className="bg-blue-600 px-5 rounded-md text-lg text-white font-semibold cursor-pointer py-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-2"
            onClick={handleActivate}
          >
            <p>Activate Bank</p>
            {bankloading ? <Spinner /> : null}
          </div>
        )}

        {bankEnabled && (
          <div>
            <div className="flex gap-5 items-center mt-10">
              <h1 className="text-white text-lg">Bank balance : </h1>
              <div className="text-white text-lg font-bold">
                ${bankBalance.balance}
              </div>
            </div>
          <div
            className="bg-blue-600 px-5 rounded-md text-lg text-white font-semibold cursor-pointer py-3 absolute md:top-1/2 top-3/4 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-2"
            onClick={() => router.push('/secure')}
          >
            <p>Transfer to wallet</p>
            {bankloading ? <Spinner /> : null}
          </div>

          </div>
        )}
      </div>
      <div className="md:w-1/2 w-full h-[80vh] rounded-2xl p-5 bg-gray-950/50 relative">
        <h1 className="text-2xl font-bold text-white">Recent transactions</h1>

        {credit.length === 0 && debit.length === 0 && <div>
          <h1 className="text-white text-lg text-center mt-20">No transactions found</h1>
          <div
                  className="bg-blue-600 px-5 rounded-md text-lg text-white font-semibold cursor-pointer py-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  flex items-center justify-center gap-2"
                >
                  <p>Initiate One</p>
                </div>
        </div> }

        <hr className="text-white" />
        <h1 className="text-white font-bold">Credits to wallet</h1>

        {credit && (
          <div className="flex gap-2 flex-col h-[40%] overflow-auto">
            {credit.map((txn: any, i: number) => (
              <TxnComp
                amount={txn.amount}
                status={txn.status}
                email={txn.user.email}
                number={txn.user.number}
                key={i}
              />
            ))}
          </div>
        )}
        <hr className="text-white" />
        <h1 className="text-white font-bold">Debits from wallet</h1>

        {debit && (
          <div className="flex gap-2 flex-col h-[40%] overflow-auto">
            {debit.map((txn: any, i: number) => (
              <TxnComp key={i} amount={txn.amount} email={txn.user.email} number={txn.user.number} status={txn.status}/>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
