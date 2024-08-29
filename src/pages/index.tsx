import { useRouter } from 'next/router';
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import DashboardChart from "@/components/DashboardChart";


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


export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter(); // Get the router object from Next.js
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

  // Function to handle click on the chart
  const handleChartClick = () => {
    router.push('/statistics'); // Redirect to the statistics page
  };

  const totalTickets = tickets.length;
  const openTickets = tickets.filter(ticket => ticket.status === "Open").length;
  const inProgressTickets = tickets.filter(ticket => ticket.status === "In Progress").length;
  const closedTickets = tickets.filter(ticket => ticket.status === "Closed").length;

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 flex flex-col transition-all duration-500 ease-in-out ${isOpen ? "pl-64" : "pl-0"}`}>
        <Topbar toggleSidebar={toggleSidebar} />
        <main className="p-6 flex-1 bg-gray-50">
          <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-4 bg-white shadow rounded">
              <h2 className="text-xl font-semibold mb-2">Total Tickets</h2>
              <p className="text-3xl font-bold text-gray-800">{totalTickets}</p>
            </div>
            <div className="p-4 bg-white shadow rounded">
              <h2 className="text-xl font-semibold mb-2">Open Tickets</h2>
              <p className="text-3xl font-bold text-green-600">{openTickets}</p>
            </div>
            <div className="p-4 bg-white shadow rounded">
              <h2 className="text-xl font-semibold mb-2">In Progress Tickets</h2>
              <p className="text-3xl font-bold text-yellow-600">{inProgressTickets}</p>
            </div>
            <div className="p-4 bg-white shadow rounded">
              <h2 className="text-xl font-semibold mb-2">Closed Tickets</h2>
              <p className="text-3xl font-bold text-red-600">{closedTickets}</p>
            </div>
            <div className="md:col-span-2 lg:col-span-3 p-4 bg-white shadow rounded" onClick={handleChartClick}>
              <DashboardChart />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
