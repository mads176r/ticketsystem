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
  const response = await fetch("/api/ticket/create-ticket", {
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

async function fetchSuggestions(query: string): Promise<UserData[]> {
  const response = await fetch(`/api/account/search?query=${query}`);
  const data = await response.json();
  return data.users;
}

function AutocompleteInput({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}) {
  const [suggestions, setSuggestions] = useState<UserData[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (value) {
      fetchSuggestions(value).then(setSuggestions);
      setIsOpen(true);
    } else {
      setSuggestions([]);
      setIsOpen(false);
    }
  }, [value]);

  const handleSelect = (suggestion: UserData) => {
    onChange(suggestion.id); // Set input value to user ID
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
      {isOpen && suggestions.length > 0 && (
        <ul className="absolute bg-white border rounded mt-1 w-full z-10 max-h-48 overflow-auto">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              onClick={() => handleSelect(suggestion)}
              className="p-2 cursor-pointer hover:bg-gray-100"
            >
              {suggestion.name} ({suggestion.id})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function NewTicke() {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requesterID, setRequesterID] = useState("");
  const [ownerID, setOwnerID] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const ticketData = {
      title,
      description,
      RequesterID: requesterID,
      OwnerID: ownerID,
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
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="title"
                >
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
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="description"
                >
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
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="requesterID"
                >
                  Requester
                </label>
                <AutocompleteInput
                  placeholder="Requester Name or ID"
                  value={requesterID}
                  onChange={setRequesterID}
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="ownerID"
                >
                  Owner
                </label>
                <AutocompleteInput
                  placeholder="Owner Name or ID"
                  value={ownerID}
                  onChange={setOwnerID}
                />
              </div>
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
                  Ticket Created At:{" "}
                  {format(new Date(createdAt), "yyyy-MM-dd HH:mm:ss")}
                </p>
              )}
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
