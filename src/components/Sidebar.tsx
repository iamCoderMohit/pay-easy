import { BiTransfer } from "react-icons/bi";
import { CiBank } from "react-icons/ci";
import { FaDollarSign, FaMoneyCheckAlt, FaWallet } from "react-icons/fa";
import { FaCircleUser } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";

function Sidebar() {
  return (
    <div className="w-[5%] bg-gray-950/30 h-[90%] rounded-md absolute hover:w-[20%] backdrop-blur-xl transition-all bottom-5 text-white flex items-center flex-col justify-around group">
      <div className="flex flex-col gap-5 w-full items-center">
        <div className="flex items-center transition-all duration-300 overflow-hidden w-full cursor-pointer justify-center">
          <div className="text-xl">
            <FaWallet />
          </div>
          <span className="max-w-0 opacity-0 group-hover:max-w-xs group-hover:ml-8 group-hover:opacity-100 -translate-x-5 transition-all whitespace-nowrap">
            Activate Wallet
          </span>
        </div>
        <div className="flex items-center transition-all duration-300 overflow-hidden w-full cursor-pointer justify-center">
          <div className="text-xl">
            <CiBank />
          </div>
          <span className="max-w-0 opacity-0 group-hover:max-w-xs group-hover:ml-8 group-hover:opacity-100 -translate-x-5 transition-all whitespace-nowrap">
            Activate Bank
          </span>
        </div>
        <div className="flex items-center transition-all duration-300 overflow-hidden w-full cursor-pointer justify-center">
          <div className="text-xl">
            <MdEdit />
          </div>
          <span className="max-w-0 opacity-0 group-hover:max-w-xs group-hover:ml-8 group-hover:opacity-100 -translate-x-5 transition-all whitespace-nowrap">
            Edit Details
          </span>
        </div>
        <div className="flex items-center transition-all duration-300 overflow-hidden w-full cursor-pointer justify-center">
          <div className="text-xl">
            <FaMoneyCheckAlt />
          </div>
          <span className="max-w-0 opacity-0 group-hover:max-w-xs group-hover:ml-8 group-hover:opacity-100 -translate-x-5 transition-all whitespace-nowrap">
            Add Money
          </span>
        </div>
        <div className="flex items-center transition-all duration-300 overflow-hidden w-full cursor-pointer justify-center">
          <div className="text-xl">
            <BiTransfer />
          </div>
          <span className="max-w-0 opacity-0 group-hover:max-w-xs group-hover:ml-8 group-hover:opacity-100 -translate-x-5 transition-all whitespace-nowrap">
            P2P Transfer
          </span>
        </div>
        <div className="flex items-center transition-all duration-300 overflow-hidden w-full cursor-pointer justify-center">
          <div className="text-xl">
            <FaDollarSign />
          </div>
          <span className="max-w-0 opacity-0 group-hover:max-w-xs group-hover:ml-8 group-hover:opacity-100 -translate-x-5 transition-all whitespace-nowrap">
            Check Balance
          </span>
        </div>

      </div>

        <div className="flex items-center transition-all duration-300 overflow-hidden w-full cursor-pointer justify-center">
          <div className="text-xl">
            <FaCircleUser />
          </div>
          <span className="max-w-0 opacity-0 group-hover:max-w-xs group-hover:ml-8 group-hover:opacity-100 -translate-x-5 transition-all whitespace-nowrap">
            Profile
          </span>
        </div>
    </div>
  );
}

export default Sidebar;

        // <CiBank />
        // <MdEdit />
        // <FaMoneyCheckAlt />
        // <BiTransfer />
        // <FaDollarSign />
