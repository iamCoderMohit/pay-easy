"use client"

import AddMoneyToBank from "@/components/AddMoneyToBank";
import AddMoneyToWallet from "@/components/AddMoneyToWallet";
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
  const session = useSession()
  return (
    <>
      <div>hello world</div>
      <button onClick={() => signOut()}>log out</button>
      <br />
      <button onClick={() => signIn()}>signin</button>
      <button className="bg-red-500 p-5"
      onClick={async () => {
        await axios.post(`http://localhost:3000/api/bank`)
      }}
      >Activate</button>
      <button className="bg-green-500 p-5 ml-10"
      onClick={async () => {
        await axios.post(`http://localhost:3000/api/wallet`)
      }}
      >Activate wallet</button>
      <div>{JSON.stringify(session)}</div>  

      <AddMoneyToWallet />
      <AddMoneyToBank />
    </>
  );
}
