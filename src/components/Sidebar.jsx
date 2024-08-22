import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Sidebar({ isOpen, toggleSidebar }) {
  const [showButton, setShowButton] = useState(!isOpen);

  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setShowButton(true), 500); // Delay showing the button by 500ms after sidebar closes
    } else {
      setShowButton(false); // Hide button immediately when sidebar opens
    }
  }, [isOpen]);

  return (
    <div className="relative z-50">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform transition-transform duration-500 ease-in-out z-50 m-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center px-4 h-16 text-2xl font-bold border-b border-gray-700">
          Menu
          {/* Close Button */}
          <button
            onClick={toggleSidebar}
            className="p-3 bg-gray-700 text-white rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
        <nav className="flex-1 p-4">
          <ul>
            <li className="mb-4">
              <Link href="/">Dashboard</Link>
            </li>
            <li className="mb-4">
              <Link href="/all-tickets">All Tickets</Link>
            </li>
            <li className="mb-4">
              <Link href="#">My Tickets</Link>
            </li>
            <li className="mb-4">
              <Link href="#">New Ticket</Link>
            </li>
            <li className="mb-4">
              <Link href="#">Statistics</Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Hamburger Menu Button - Appears when sidebar is closed */}
      {showButton && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 z-50 p-3 bg-gray-800 text-white rounded-md transform transition-transform duration-500 ease-in-out"
          style={{ top: '16px' }} // This matches the height of the Topbar
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      )}
    </div>
  );
}
