"use client";

import WorkOnProgress from "@/components/OnConst";
import Spinner from "@/components/Spinner";
import Toast from "@/components/Toast";
import { useInfo } from "@/hooks/useInfo";
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { IoIosWarning } from "react-icons/io";
import { useSelector } from "react-redux";

function Page() {
  const isNumberSet = useSelector((state: any) => state.user.isNumberSet);
  const isPinSet = useSelector((state: any) => state.user.isPinSet);
  const number = useSelector((state: any) => state.user.number);
  const pin = useSelector((state: any) => state.user.pin);
  const [mobileNumber, setMobileNumber] = useState("");
  const [securePin, setSecurePin] = useState("");
  const { setUserDetails, infoLoading, infoError } = useInfo();
  const [toast, setToast] = useState(false);

  async function handleClick() {
    await setUserDetails(mobileNumber, securePin);
    setToast(true);
  }

  return (
    <div className="flex md:flex-row flex-col items-center gap-5">
      {toast ? (
        <Toast
          text={infoError ? infoError : "Success"}
          icon={infoError ? <IoIosWarning /> : <FaCheck />}
          setToast={setToast}
        />
      ) : null}
      <div className="md:w-1/2 w-full h-[80vh] rounded-2xl p-5 bg-gray-950/50 relative">
        <h1 className="text-white text-xl font-bold">Edit Details</h1>

        {isNumberSet && isPinSet && (
          <div className="text-white rounded-sm p-3 backdrop-blur-2xl mt-5">
            <h1 className="text-lg font-semibold mb-3">Current Details</h1>
            <h1 className="">Mobile Number : {number}</h1>
            <h1>PIN: {pin}</h1>
          </div>
        )}

        <div className="flex flex-col gap-3 mt-10">
          <input
            className="border border-white rounded-sm p-3 pl-3 text-white"
            type="number"
            placeholder="Mobile Number"
            onChange={(e) => setMobileNumber(e.target.value)}
          />
          <input
            className="border border-white rounded-sm p-3 pl-3 text-white"
            type="number"
            placeholder="Set Pin"
            onChange={(e) => setSecurePin(e.target.value)}
          />
          <div
            className="bg-blue-600 px-5 rounded-md text-lg text-white font-semibold cursor-pointer py-3 flex items-center justify-center gap-2"
            onClick={handleClick}
          >
            <p>Save Details</p>
            {infoLoading ? <Spinner /> : null}
          </div>
        </div>
      </div>
      <div className="md:w-1/2 w-full h-[80vh] rounded-2xl p-5 bg-gray-950/50 relative">
      <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 left-1/2">
        <WorkOnProgress />
        <h1 className="text-white font-bold">We're working on this page <br />Site is still under construction</h1>
      </div>
      </div>
    </div>
  );
}

export default Page;
