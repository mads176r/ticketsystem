import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TopbarProps {
  toggleSidebar: () => void;
}

export default function Topbar({ toggleSidebar }: TopbarProps) {
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setShowWelcome(true);
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  return (
    <div className="w-full bg-gray-100 px-4 flex justify-between items-center shadow relative h-16 z-40">
      <button
        onClick={toggleSidebar}
        className="p-2 bg-gray-700 text-white rounded-md"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      <h1 className="absolute left-1/2 transform -translate-x-1/2 text-3xl font-bold text-gray-800">
        {showWelcome ? "Welcome, User!" : "Dashboard"}
      </h1>
      <div className="absolute right-4 flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search"
          className="border rounded p-2"
        />
        <div className="bg-gray-300 p-2 rounded-full">
          <span>Profile</span>
        </div>
      </div>
    </div>
  );
}
