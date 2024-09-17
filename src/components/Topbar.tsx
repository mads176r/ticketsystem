import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";

interface TopbarProps {
  toggleSidebar: () => void;
}

interface User {
  id: string;
  name: string;
}

export default function Topbar({ toggleSidebar }: TopbarProps) {
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch("/api/account/get-account");
        const data = await response.json();

        if (data.user) {
          setUserName(data.user.name);
        } else {
          setUserName(null);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUserName(null);
      }
    }

    fetchUserData();
  }, []);

  return (
    <div className="w-full bg-gradient-to-r from-blue-600 to-blue-400 px-4 flex justify-between items-center shadow relative h-16 z-40">
      <button
        onClick={toggleSidebar}
        className="p-2 bg-blue-800 text-white rounded-md"
      >
        <FaBars className="h-5 w-5" />
      </button>

      <div className="absolute right-4 flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search"
          className="border rounded p-2 text-gray-700"
        />
        {userName ? (
          <div className="bg-blue-300 p-2 rounded-full text-white">
            <span>{userName}</span>
          </div>
        ) : (
          <button
            onClick={() => (window.location.href = "/login")}
            className="p-2 bg-blue-800 text-white rounded-md"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
}
