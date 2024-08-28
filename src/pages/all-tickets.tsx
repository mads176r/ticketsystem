import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

interface TicketData {
  id: string;
  title: string;
  description: string;
  RequesterID: string;
  OwnerID: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
  closedAt?: Date | null;
}

export default function AllTickets() {
  const [isOpen, setIsOpen] = useState(false);
  const [tickets, setTickets] = useState<TicketData[]>([]);

  useEffect(() => {
    async function fetchTickets() {
      try {
        const response = await fetch("/api/ticket/get-tickets", {
          method: "GET",
        });
        const data = await response.json();
        console.log("Fetched data:", data); // Debugging log
        if (Array.isArray(data.tickets)) {
          setTickets(data.tickets);
        } else {
          console.error("Data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchTickets();
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Filter tickets by status
  const openTickets = tickets.filter((ticket) => ticket.status === "Open");
  const inProgressTickets = tickets.filter(
    (ticket) => ticket.status === "In Progress"
  );
  const closedTickets = tickets.filter((ticket) => ticket.status === "Closed");

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
          <div className="flex gap-4">
            <div className="flex-1 flex flex-col bg-green-200 bg-opacity-50 p-4 rounded overflow-y-auto" style={{ minHeight: '50vh' }}>
              <h2 className="text-xl font-bold mb-4">Open Tickets</h2>
              {openTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="p-2 mb-2 bg-white shadow rounded"
                >
                  <h3 className="text-lg font-semibold">{ticket.title}</h3>
                  <p className="text-sm text-gray-600">{ticket.description}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Created at:{" "}
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex-1 flex flex-col bg-yellow-200 bg-opacity-50 p-4 rounded overflow-y-auto" style={{ minHeight: '50vh' }}>
              <h2 className="text-xl font-bold mb-4">In Progress Tickets</h2>
              {inProgressTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="p-2 mb-2 bg-white shadow rounded"
                >
                  <h3 className="text-lg font-semibold">{ticket.title}</h3>
                  <p className="text-sm text-gray-600">{ticket.description}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Created at:{" "}
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
            <div className="flex-1 flex flex-col bg-red-200 bg-opacity-50 p-4 rounded overflow-y-auto" style={{ minHeight: '50vh' }}>
              <h2 className="text-xl font-bold mb-4">Closed Tickets</h2>
              {closedTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="p-2 mb-2 bg-white shadow rounded"
                >
                  <h3 className="text-lg font-semibold">{ticket.title}</h3>
                  <p className="text-sm text-gray-600">{ticket.description}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Created at:{" "}
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
