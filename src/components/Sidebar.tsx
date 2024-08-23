import Link from "next/link";
import { useState, useEffect } from "react";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  return (
    <div className="relative z-50">
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white transform transition-transform duration-500 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center px-4 h-16 text-2xl font-bold border-b border-gray-700">
          Menu
        </div>
        <nav className="flex-1 p-4">
          <ul>
            <li className="mb-4">
              <Link href="/" legacyBehavior>
                <a className="block relative group">
                  <span className="block px-3 py-2 relative z-10 group-hover:text-gray-200 transition-colors duration-300">
                    Dashboard
                  </span>
                  <span className="absolute inset-0 w-full h-full bg-gray-700 scale-x-0 origin-left transition-transform duration-500 ease-in-out group-hover:scale-x-100 z-0"></span>
                </a>
              </Link>
            </li>
            <li className="mb-4">
              <Link href="/all-tickets" legacyBehavior>
                <a className="block relative group">
                  <span className="block px-3 py-2 relative z-10 group-hover:text-gray-200 transition-colors duration-300">
                    All Tickets
                  </span>
                  <span className="absolute inset-0 w-full h-full bg-gray-700 scale-x-0 origin-left transition-transform duration-500 ease-in-out group-hover:scale-x-100 z-0"></span>
                </a>
              </Link>
            </li>
            <li className="mb-4">
              <Link href="/my-tickets" legacyBehavior>
                <a className="block relative group">
                  <span className="block px-3 py-2 relative z-10 group-hover:text-gray-200 transition-colors duration-300">
                    My Tickets
                  </span>
                  <span className="absolute inset-0 w-full h-full bg-gray-700 scale-x-0 origin-left transition-transform duration-500 ease-in-out group-hover:scale-x-100 z-0"></span>
                </a>
              </Link>
            </li>
            <li className="mb-4">
              <Link href="/new-ticket" legacyBehavior>
                <a className="block relative group">
                  <span className="block px-3 py-2 relative z-10 group-hover:text-gray-200 transition-colors duration-300">
                    New Ticket
                  </span>
                  <span className="absolute inset-0 w-full h-full bg-gray-700 scale-x-0 origin-left transition-transform duration-500 ease-in-out group-hover:scale-x-100 z-0"></span>
                </a>
              </Link>
            </li>
            <li className="mb-4">
              <Link href="/statistics" legacyBehavior>
                <a className="block relative group">
                  <span className="block px-3 py-2 relative z-10 group-hover:text-gray-200 transition-colors duration-300">
                    Statistics
                  </span>
                  <span className="absolute inset-0 w-full h-full bg-gray-700 scale-x-0 origin-left transition-transform duration-500 ease-in-out group-hover:scale-x-100 z-0"></span>
                </a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
