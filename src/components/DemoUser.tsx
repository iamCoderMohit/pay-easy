interface demoProps{
    name: string,
    number: string,
    balance: number
}

function DemoUser({name, number, balance}: demoProps) {
  return (
    <div className="w-full h-15 rounded-sm bg-gray-800 text-white font-bold flex justify-around items-center p-1 hover:bg-gray-900 transition-all">
        <h1 className="w-1/3">{name}</h1>
        <h1 className="w-1/3">{number}</h1>
        <h1 className="w-1/3">{balance ?  `$ ${balance}` : "Not Activated"}</h1>
    </div>
  )
}

export default DemoUser