import { useEffect, useState, FormEvent } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { format } from "date-fns";

interface UserData {
  id: string;
  name: string;
}

async function createTicket(ticketData: {
  title: string;
  description: string;
  RequesterID: string;
  OwnerID: string;
}) {
  const response = await fetch("api/ticket/create-ticket", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ticketData),
  });

  const data = await response.json();
  console.log(data.message);
  return data;
}

export default function NewTicket() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requesterID, setRequesterID] = useState("");
  const [ownerID, setOwnerID] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [accounts, setAccounts] = useState<UserData[]>([]);
  const [filteredRequesterOptions, setFilteredRequesterOptions] = useState<UserData[]>([]);
  const [filteredOwnerOptions, setFilteredOwnerOptions] = useState<UserData[]>([]);

  useEffect(() => {
    async function fetchAccounts() {
      try {
        const response = await fetch("/api/account/get-accounts", {
          method: "GET",
        });
        const data = await response.json();

        if (Array.isArray(data.users)) {
          setAccounts(data.users);
        } else {
          console.error("Data.users is not an array:", data.users);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchAccounts();
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Filter options based on input
  const handleRequesterChange = (value: string) => {
    setRequesterID(value);
    setFilteredRequesterOptions(
      accounts.filter((account) =>
        account.name.toLowerCase().includes(value.toLowerCase()) ||
        account.id.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleOwnerChange = (value: string) => {
    setOwnerID(value);
    setFilteredOwnerOptions(
      accounts.filter((account) =>
        account.name.toLowerCase().includes(value.toLowerCase()) ||
        account.id.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const ticketData = {
      title,
      description,
      RequesterID: requesterID.split(" - ")[0],
      OwnerID: ownerID.split(" - ")[0],
    };

    try {
      const result = await createTicket(ticketData);
      if (result.finalTickets?.createdAt) {
        setCreatedAt(result.finalTickets.createdAt);
        console.log("Ticket created successfully!");
      } else {
        console.error("Failed to create ticket");
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
        <main className="flex justify-center items-start p-6 flex-1 bg-gray-100 pt-20">
          <div className="bg-white shadow-xl rounded-lg p-8 max-w-lg w-full">
            <h1 className="text-2xl font-bold mb-6 text-center text-blue-700">
              New Ticket
            </h1>
            <form onSubmit={handleSubmit}>
              {/* Title and Description fields */}
              <div className="mb-4">
                <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">
                  Title
                </label>
                <input
                  id="title"
                  type="text"
                  placeholder="Ticket Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700 text-sm font-bold mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  placeholder="Ticket Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                ></textarea>
              </div>

              {/* Requester ID field with dynamic dropdown */}
              <div className="mb-4 relative">
                <label htmlFor="requesterID" className="block text-gray-700 text-sm font-bold mb-2">
                  Requester
                </label>
                <input
                  id="requesterID"
                  type="text"
                  placeholder="Requester ID or Name"
                  value={requesterID}
                  onChange={(e) => handleRequesterChange(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {filteredRequesterOptions.length > 0 && (
                  <ul className="absolute z-10 bg-white border border-gray-300 mt-1 w-full max-h-40 overflow-auto shadow-lg">
                    {filteredRequesterOptions.map((account) => (
                      <li
                        key={account.id}
                        onClick={() => setRequesterID(`${account.id} - ${account.name}`)}
                        className="px-3 py-2 hover:bg-blue-500 hover:text-white cursor-pointer"
                      >
                        {account.id} - {account.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Owner ID field with dynamic dropdown */}
              <div className="mb-4 relative">
                <label htmlFor="ownerID" className="block text-gray-700 text-sm font-bold mb-2">
                  Owner
                </label>
                <input
                  id="ownerID"
                  type="text"
                  placeholder="Owner ID or Name"
                  value={ownerID}
                  onChange={(e) => handleOwnerChange(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {filteredOwnerOptions.length > 0 && (
                  <ul className="absolute z-10 bg-white border border-gray-300 mt-1 w-full max-h-40 overflow-auto shadow-lg">
                    {filteredOwnerOptions.map((account) => (
                      <li
                        key={account.id}
                        onClick={() => setOwnerID(`${account.id} - ${account.name}`)}
                        className="px-3 py-2 hover:bg-blue-500 hover:text-white cursor-pointer"
                      >
                        {account.id} - {account.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Submit button */}
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Create Ticket
                </button>
              </div>
              {createdAt && (
                <p className="text-center text-sm text-gray-500 mt-4">
                  Ticket Created At: {format(new Date(createdAt), "yyyy-MM-dd HH:mm:ss")}
                </p>
              )}
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
