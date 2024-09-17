import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { AreaChartComponent } from "@/components/Charts/AreaChart";
import { BarChartComponent } from "@/components/Charts/BarChart";
import { PieChartComponent } from "@/components/Charts/PieChart";

export default function Statistics() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div
        className={`flex-1 flex flex-col transition-all duration-500 ease-in-out ${
          isOpen ? "pl-64" : "pl-0"
        }`}
      >
        <Topbar toggleSidebar={toggleSidebar} />
        <main className="p-6 flex-1 bg-gray-50">
          <h1 className="text-2xl font-bold mb-4">Statistics</h1>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-4 bg-white shadow rounded">
              <h2 className="text-xl font-semibold mb-4">
                Ticket Trends - Created vs Closed
              </h2>
              <AreaChartComponent />
              <p className="text-sm mt-2 text-gray-500">
                Comparing created vs closed tickets over the last 6 months
              </p>
            </div>
            <div className="p-4 bg-white shadow rounded">
              <h2 className="text-xl font-semibold mb-4">
                Tickets by Department
              </h2>
              <BarChartComponent />
              <p className="text-sm mt-2 text-gray-500">
                Distribution of tickets across departments
              </p>
            </div>
            <div className="p-4 bg-white shadow rounded">
              <h2 className="text-xl font-semibold mb-4">Tickets by User</h2>
              <PieChartComponent />
              <p className="text-sm mt-2 text-gray-500">
                Distribution of tickets among users
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
