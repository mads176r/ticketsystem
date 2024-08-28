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
        const response = await fetch('/api/ticket/get-tickets', {
          method: 'GET'
        });
        const data = await response.json();
        console.log('Fetched data:', data); // Debugging log
        if (Array.isArray(data.tickets)) {
          setTickets(data.tickets);
        } else {
          console.error('Data is not an array:', data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchTickets();
  }, []);

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
            {tickets.map((ticket) => (
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
                  Created at: {new Date(ticket.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
