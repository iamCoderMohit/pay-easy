"use client";

import Spinner from "@/components/Spinner";
import Toast from "@/components/Toast";
import TxnComp from "@/components/TxnComp";
import { useInfo } from "@/hooks/useInfo";
import { useTxns } from "@/hooks/useTxns";
import { useWallet } from "@/hooks/useWallet";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { useSelector } from "react-redux";

function Page() {
  const { activateWallet, loading, error } = useWallet();
  const { getCredit, getDebit, txnloading, txnerror } = useTxns();
  const walletEnabled = useSelector((state: any) => state.wallet.walletEnabled);
  const walletBalance = useSelector((state: any) => state.wallet.walletBalance);
  const [toast, setToast] = useState(false);
  const credit = useSelector((state: any) => state.txn.credit);
  const debit = useSelector((state: any) => state.txn.debit);
  const bankEnabled = useSelector((state: any) => state.bank.bankEnabled);
  const {getWalletBal, infoLoading} = useInfo()

  const router = useRouter();

  async function handleActivate() {
    await activateWallet();
    await getWalletBal()
    setToast(true);
  }

  useEffect(() => {
    async function fetch() {
      await getCredit();
      await getDebit();
      setToast(true);
    }

    fetch();
  }, []);

  return (
    <div className="flex md:flex-row flex-col items-center gap-5">
      {toast ? (
        <Toast
          text={error || txnerror ? error || txnerror : "Success"}
          icon={error || txnerror ? <IoIosWarning /> : <FaCheck />}
          setToast={setToast}
        />
      ) : null}
      <div className="md:w-1/2 w-full md:h-[80vh] h-[50vh] rounded-2xl p-5 bg-gray-950/50 relative z-0">
        <h1 className="text-2xl font-bold text-white">
          {walletEnabled
            ? "Your wallet"
            : "Activate your wallet to start transactions"}
        </h1>
        {!walletEnabled && (
          <div
            className="bg-blue-600 px-5 rounded-md text-lg text-white font-semibold cursor-pointer py-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-2"
            onClick={handleActivate}
          >
            <p>Activate Wallet</p>
            {loading || infoLoading ? <Spinner /> : null}
          </div>
        )}

        {walletEnabled && (
          <div>
            <div className="flex gap-5 items-center mt-10">
              <h1 className="text-white text-lg">Wallet balance : </h1>
              <div className="text-white text-lg font-bold">
                ${walletBalance.balance}
              </div>
            </div>

            {!bankEnabled ? (
              <div>
                <h1 className="text-red-600">
                  you haven't activated your bank ac. in our platform yet, you
                  may face issues in future
                </h1>
                <div
                  className="bg-blue-600 px-5 rounded-md text-lg text-white font-semibold cursor-pointer py-3 absolute md:bottom-1/2 bottom-0 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-2"
                  onClick={() => router.push("/activatebank")}
                >
                  <p>Activate Bank</p>
                </div>
              </div>
            ) : null}
          </div>
        )}
      </div>
      <div className="md:w-1/2 w-full h-[80vh] rounded-2xl p-5 bg-gray-950/50 relative">
        <h1 className="text-2xl font-bold text-white">Recent transactions</h1>

        {credit.length === 0 && debit.length === 0 && (
          <div>
            <h1 className="text-white text-lg text-center mt-20">
              No transactions found
            </h1>
            <div className="bg-blue-600 px-5 rounded-md text-lg text-white font-semibold cursor-pointer py-3 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center gap-2">
              <p>Initiate One</p>
            </div>
          </div>
        )}
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
