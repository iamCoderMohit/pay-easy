interface txnProps{
  amount: number,
  status: string,
  number: string | null,
  email: string
}

function TxnComp({amount, status, number, email}: txnProps) {
  return (
    <div className="h-15 flex-shrink-0 hover:bg-gray-800 transition-all bg-gray-900 rounded-sm text-white flex items-center justify-around">
      <h1>{status}</h1>
      <h1>{email ? email : number}</h1>
      <h1>${amount}</h1>
    </div>
  )
}

export default TxnComp