import { ReactElement } from "react"

interface fetureProps{
    icon: ReactElement,
    desc: string
}

function FeatureCard({icon, desc}: fetureProps) {
  return (
    <div className="w-full h-20 bg-green-950/20 backdrop-blur-2xl relative p-3 z-20 rounded-2xl flex items-center gap-5 cursor-pointer">
        <div className="text-white">{icon}</div>
        <div className="text-white text-lg">{desc}</div>
    </div>
  )
}

export default FeatureCard