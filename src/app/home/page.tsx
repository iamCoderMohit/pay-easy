import { HomeBg } from "@/components/HomeBg";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";

export default function page() {
  return (
    <div>
      <HomeBg showRadialGradient={true}>
        <div className="grid grid-cols-[5%_auto] grid-rows-[10%_auto] h-screen">
          {/* Navbar (top spanning both columns) */}
          <div className="col-span-2">
            <Navbar />
          </div>

          {/* Sidebar (left column) */}
          <div className="">
            //may be lessen the width of the sidbar and put all the main content in centre-ish ie gap from right and left
            <Sidebar />
          </div>

          {/* Main content */}
          <div className="p-4">hello world</div>
        </div>
      </HomeBg>
    </div>
  );
}
