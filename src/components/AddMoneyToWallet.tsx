"use client"

import axios from "axios"
import { useState } from "react"

function AddMoneyToWallet() {
    const [amount, setAmount] = useState(0)
  return (
    <div>
        <input type="number" placeholder="amount"
        onChange={(e) => setAmount(Number(e.target.value))}
        />
        <button
        className="bg-blue-500 p-5"
        onClick={async() => {
            await axios.post(`http://localhost:3000/api/banktowallet`, {amount})
        }}
        >Request to bank</button>
    </div>
  )
}

export default AddMoneyToWallet