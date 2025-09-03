import { HomeBg } from "@/components/HomeBg";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function mainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
    return <div>
      <HomeBg showRadialGradient={true}>
        <div className="grid grid-cols-[5%_auto] grid-rows-[10%_auto]  min-h-screen">
          <div className="col-span-2">
            <Navbar />
          </div>

          <div className="">
            <Sidebar />
          </div>

          <div className="md:p-4 mx-0 md:mx-40 md:pr-0">
            {children}
          </div>
        </div>
      </HomeBg>
    </div>
}