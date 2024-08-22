import { useState } from 'react';
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 flex flex-col transition-all duration-500 ease-in-out ${isOpen ? 'pl-64' : 'pl-0'}`}>
        <Topbar />
        <main className="p-6 flex-1 bg-gray-50">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <div className="p-4 bg-white shadow rounded">
              <h2 className="text-xl font-semibold mb-2">Open Tickets</h2>
              <p className="text-sm text-gray-600">Number of open tickets: 5</p>
            </div>
            <div className="p-4 bg-white shadow rounded">
              <h2 className="text-xl font-semibold mb-2">In Progress</h2>
              <p className="text-sm text-gray-600">Tickets in progress: 3</p>
            </div>
            <div className="p-4 bg-white shadow rounded">
              <h2 className="text-xl font-semibold mb-2">Closed Tickets</h2>
              <p className="text-sm text-gray-600">Number of closed tickets: 10</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
