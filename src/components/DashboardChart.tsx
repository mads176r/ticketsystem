import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface TicketData {
  id: string;
  title: string;
  description: string;
  RequesterID: string;
  OwnerID: string;
  status: string;
  createdAt: string; // Changed to string for JSON compatibility
  updatedAt: string; // Changed to string for JSON compatibility
  closedAt?: string | null; // Changed to string for JSON compatibility
}

export default function DashboardChart() {
  const [tickets, setTickets] = useState<TicketData[]>([]);
  const [chartData, setChartData] = useState<any[]>([]); // State to hold chart data

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

  useEffect(() => {
    // Process the tickets to create chart data
    const processChartData = () => {
      const monthlyData: { [key: string]: { open: number; closed: number; inProgress: number } } = {};

      tickets.forEach((ticket) => {
        const month = new Date(ticket.createdAt).toLocaleString("default", { month: "short" });
        if (!monthlyData[month]) {
          monthlyData[month] = { open: 0, closed: 0, inProgress: 0 };
        }

        if (ticket.status === "open") {
          monthlyData[month].open += 1;
        } else if (ticket.status === "closed") {
          monthlyData[month].closed += 1;
        } else if (ticket.status === "in progress") {
          monthlyData[month].inProgress += 1;
        }
      });

      const formattedData = Object.keys(monthlyData).map((month) => ({
        name: month,
        ...monthlyData[month],
      }));

      setChartData(formattedData);
    };

    processChartData();
  }, [tickets]);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" stroke="#4B5563" />
        <YAxis stroke="#4B5563" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="open" stroke="#3B82F6" />
        <Line type="monotone" dataKey="inProgress" stroke="#FBBF24" />
        <Line type="monotone" dataKey="closed" stroke="#EF4444" />
      </LineChart>
    </ResponsiveContainer>
  );
}
