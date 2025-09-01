import { Background } from "@/components/Background";
import Navbar from "@/components/Navbar";

export default function Page(){
  return <div className="">
    <Navbar />
    <Background />

    <div className="absolute z-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <h1 className="text-6xl text-center font-bold">Build, test, and simulate transactions</h1>
      <h1 className="text-gray-600 text-xl text-center mt-5">A payment app simulator — build, test, and experience transactions just like in real-world money apps</h1>
    </div>
  </div>
}