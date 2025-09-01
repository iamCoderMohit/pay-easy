"use client"

import axios from 'axios'
import React, { useState } from 'react'

function Page() {
    const [number, setNumber] = useState("")
    const [pin, setPin] = useState("")
  return (
    <div>
        <input type="number" className='border border-white' placeholder='number'
        onChange={(e) => setNumber(e.target.value)}
        />
        <input type="number" className='border border-white' placeholder='pin' 
        onChange={(e) => setPin(e.target.value)}
        />
        <button className='bg-green-600 p-3'
        onClick={async () => {
            await axios.put(`http://localhost:3000/api/user`, {number, pin})
        }}
        >Submit</button>
    </div>
  )
}

export default Page