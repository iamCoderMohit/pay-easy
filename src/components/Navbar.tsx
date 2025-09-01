import Link from "next/link";

export default function Navbar(){
    return <div className="z-10 py-5 absolute text-white flex justify-around w-full text-lg">
        <div className="font-bold">
            <img src="/images/logo.png" className="w-40 invert cursor-pointer" alt="" />
        </div>
        <div className="flex gap-10">
            <div>Products</div>
            <div>Solutions</div>
            <div>Github</div>
        </div>
        <div>
            <Link href={"/signin"}>Signin</Link>
        </div>
    </div>
}