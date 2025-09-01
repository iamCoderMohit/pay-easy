"use client"

import axios from "axios"
import { useState } from "react"

function AddMoneyToBank() {
    const [amount, setAmount] = useState(0)
    const [pin, setPin] = useState("")
  return (
    <div>
        <input type="number" className="border border-white" placeholder="amount" 
        onChange={(e) => setAmount(Number(e.target.value))}
        />
        <input type="number" className="border border-white" placeholder="pin"
        onChange={(e) => setPin(e.target.value)}
        />
        <button className="bg-green-600 p-3"
        onClick={async() => {
            await axios.post(`http://localhost:3000/api/wallettobank`, {amount, pin})
        }}
        >Transfer to bank</button>
    </div>
  )
}

export default AddMoneyToBank