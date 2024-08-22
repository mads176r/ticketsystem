import { useState, useEffect } from 'react';

export default function Topbar() {
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setShowWelcome(true);
      localStorage.setItem('hasVisited', 'true');
    }
  }, []);

  return (
    <div className="w-full bg-gray-100 px-4 flex justify-center items-center shadow relative h-16 z-40">
      <h1 className="text-3xl font-bold text-gray-700">
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
