import FeatureCard from "./FeatureCard"
import { FaWallet, FaCode, FaDatabase, FaLock, FaPlayCircle } from "react-icons/fa";

function HomeComp() {

const features = [
  {
    icon: <FaWallet className="text-xl" />,
    desc: "Simulates real-world payment flows",
  },
  {
    icon: <FaDatabase className="text-xl" />,
    desc: "Stores and retrieves test data",
  },
  {
    icon: <FaCode className="text-xl" />,
    desc: "Developer-friendly with clean APIs",
  },
  {
    icon: <FaLock className="text-xl" />,
    desc: "Safe environment without real money",
  },
  {
    icon: <FaPlayCircle className="text-xl" />,
    desc: "Quick start with demo scenarios",
  },
];

  return (
    <div className="md:w-full  flex gap-10 flex-col md:flex-row md:flex md:gap-5 justify-center items-center md:mx-0 mx-15">
        <div className="md:w-1/2 md:h-[80vh] rounded-2xl p-5 bg-gray-950/50 backdrop-blur-2xl flex flex-col items-center justify-center gap-20">
            <h1 className="text-6xl font-bold text-white">Simulate fintech apps, learn the code</h1>
            <h1 className="text-gray-700 text-lg">Experiment, prototype, and learn payment flows on a fully integrated demo platform. Use this project to explore real-world payment logic, test transactions, and build your own fintech ideas.</h1>
        </div>
        <div className="md:w-1/2 md:h-[80vh] rounded-2xl bg-gray-950/50 p-5 flex flex-col items-center justify-center gap-5">
            {features.map((item, i) => (
                <FeatureCard key={i} icon={item.icon} desc={item.desc} />
            ))}
        </div>
    </div>
  )
}

export default HomeComp