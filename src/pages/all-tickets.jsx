import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { format } from "date-fns";

const dummyTickets = [
  {
    id: 1,
    title: "Issue with Sign-Up",
    description: "Resolve the sign-up form validation.",
    status: "Open",
    createdAt: new Date(), // Creation date
  },
  {
    id: 2,
    title: "UI Bug on Dashboard",
    description: "Fix the misalignment in the dashboard.",
    status: "In Progress",
    createdAt: new Date(), // Creation date
  },
  {
    id: 3,
    title: "Enhance Loading Speed",
    description: "Improve the loading speed of the home page.",
    status: "Closed",
    createdAt: new Date(), // Creation date
  },
];

export default function AllTickets() {
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
          <h1 className="text-2xl font-bold mb-4">All Tickets</h1>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {dummyTickets.map((ticket) => (
              <div key={ticket.id} className="p-4 bg-white shadow rounded relative">
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
                <p className="text-xs text-gray-400 mt-1 absolute bottom-2 right-2">
                  Created at: {format(new Date(ticket.createdAt), "PPpp")}
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
