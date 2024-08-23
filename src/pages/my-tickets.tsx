import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

const dummyTickets = [
  {
    id: 1,
    title: "Bug in Registration Form",
    description: "Fix the bug in the registration form validation.",
    status: "Open",
  },
  {
    id: 2,
    title: "Dashboard Layout Issue",
    description: "Resolve layout issues on the dashboard page.",
    status: "In Progress",
  },
  {
    id: 3,
    title: "Performance Improvement",
    description: "Optimize the performance of the analytics page.",
    status: "Closed",
  },
];

export default function MyTickets() {
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
          <h1 className="text-2xl font-bold mb-4">My Tickets</h1>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {dummyTickets.map((ticket) => (
              <div key={ticket.id} className="p-4 bg-white shadow rounded">
                <h2 className="text-xl font-semibold mb-2">{ticket.title}</h2>
                <p className="text-sm text-gray-600">{ticket.description}</p>
                <span
                  className={`inline-block mt-2 px-2 py-1 text-sm rounded-full ${
                    ticket.status === "Open"
                      ? "bg-green-100 text-green-800"
                      : ticket.status === "In Progress"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {ticket.status}
                </span>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
