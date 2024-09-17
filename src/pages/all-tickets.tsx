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
  const [selectedTicket, setSelectedTicket] = useState<TicketData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // To track if we are in edit mode
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    status: "",
    RequesterID: "",
    OwnerID: ""
  });

  useEffect(() => {
    async function fetchTickets() {
      try {
        const response = await fetch("/api/ticket/get-tickets", {
          method: "GET",
        });
        const data = await response.json();
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

  const openModal = (ticket: TicketData) => {
    setSelectedTicket(ticket);
    setEditForm({
      title: ticket.title,
      description: ticket.description,
      status: ticket.status,
      RequesterID: ticket.RequesterID,
      OwnerID: ticket.OwnerID
    });
    setIsModalOpen(true);
    setIsEditing(false); // Open in view mode by default
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTicket(null);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTicket) return;

    try {
      const response = await fetch("/api/ticket/edit-ticket", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: selectedTicket.id,
          title: editForm.title,
          description: editForm.description,
          status: editForm.status,
          RequesterID: editForm.RequesterID,
          OwnerID: editForm.OwnerID,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update ticket");
      }

      const updatedTicket = await response.json();
      setTickets((prevTickets) =>
        prevTickets.map((ticket) =>
          ticket.id === updatedTicket.finalTickets.id ? updatedTicket.finalTickets : ticket
        )
      );
      setIsEditing(false);
      closeModal();
    } catch (error) {
      console.error("Error updating ticket:", error);
    }
  };

  const openTickets = tickets.filter((ticket) => ticket.status === "Open");
  const inProgressTickets = tickets.filter((ticket) => ticket.status === "In Progress");
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
            <div
              className="flex-1 flex flex-col bg-green-200 bg-opacity-50 p-4 rounded overflow-y-auto"
              style={{ minHeight: "50vh" }}
            >
              <h2 className="text-xl font-bold mb-4">Open Tickets</h2>
              {openTickets.length > 0 ? (
                openTickets.map((ticket) => (
                  <div key={ticket.id} className="p-2 mb-2 bg-white shadow rounded">
                    <h3 className="text-lg font-semibold">{ticket.title}</h3>
                    <p className="text-sm text-gray-600">{ticket.description}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Created at: {new Date(ticket.createdAt).toLocaleDateString()}
                    </p>
                    <button
                      className="text-blue-500 mt-2"
                      onClick={() => openModal(ticket)}
                    >
                      View Details
                    </button>
                  </div>
                ))
              ) : (
                <p>No open tickets available.</p>
              )}
            </div>
            <div
              className="flex-1 flex flex-col bg-yellow-200 bg-opacity-50 p-4 rounded overflow-y-auto"
              style={{ minHeight: "50vh" }}
            >
              <h2 className="text-xl font-bold mb-4">In Progress Tickets</h2>
              {inProgressTickets.length > 0 ? (
                inProgressTickets.map((ticket) => (
                  <div key={ticket.id} className="p-2 mb-2 bg-white shadow rounded">
                    <h3 className="text-lg font-semibold">{ticket.title}</h3>
                    <p className="text-sm text-gray-600">{ticket.description}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Created at: {new Date(ticket.createdAt).toLocaleDateString()}
                    </p>
                    <button
                      className="text-blue-500 mt-2"
                      onClick={() => openModal(ticket)}
                    >
                      View Details
                    </button>
                  </div>
                ))
              ) : (
                <p>No tickets in progress.</p>
              )}
            </div>
            <div
              className="flex-1 flex flex-col bg-red-200 bg-opacity-50 p-4 rounded overflow-y-auto"
              style={{ minHeight: "50vh" }}
            >
              <h2 className="text-xl font-bold mb-4">Closed Tickets</h2>
              {closedTickets.length > 0 ? (
                closedTickets.map((ticket) => (
                  <div key={ticket.id} className="p-2 mb-2 bg-white shadow rounded">
                    <h3 className="text-lg font-semibold">{ticket.title}</h3>
                    <p className="text-sm text-gray-600">{ticket.description}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      Created at: {new Date(ticket.createdAt).toLocaleDateString()}
                    </p>
                    <button
                      className="text-blue-500 mt-2"
                      onClick={() => openModal(ticket)}
                    >
                      View Details
                    </button>
                  </div>
                ))
              ) : (
                <p>No closed tickets available.</p>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Modal for showing and editing ticket details */}
      {isModalOpen && selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
            {isEditing ? (
              <form onSubmit={handleSubmit}>
                <h2 className="text-xl font-bold mb-4">Edit Ticket</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={editForm.title}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    value={editForm.description}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <select
                    name="status"
                    value={editForm.status}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="Open">Open</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Requester ID
                  </label>
                  <input
                    type="text"
                    name="RequesterID"
                    value={editForm.RequesterID}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Owner ID
                  </label>
                  <input
                    type="text"
                    name="OwnerID"
                    value={editForm.OwnerID}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={handleEdit}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white rounded-md"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md"
                  >
                    Close
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <h2 className="text-xl font-bold mb-4">Ticket Details</h2>
                <p><strong>Title:</strong> {selectedTicket.title}</p>
                <p><strong>Description:</strong> {selectedTicket.description}</p>
                <p><strong>Status:</strong> {selectedTicket.status}</p>
                <p><strong>Requester ID:</strong> {selectedTicket.RequesterID}</p>
                <p><strong>Owner ID:</strong> {selectedTicket.OwnerID}</p>
                <div className="flex gap-4 mt-4">
                  <button
                    onClick={handleEdit}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-500 text-white rounded-md"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
