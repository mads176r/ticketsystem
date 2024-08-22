import Link from "next/link";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

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
          {/* Luk knappen her, hvis nødvendigt */}
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
              <Link href="/my-tickets">My Tickets</Link>
            </li>
            <li className="mb-4">
              <Link href="/new-ticket">New Ticket</Link>
            </li>
            <li className="mb-4">
              <Link href="/statistics">Statistics</Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
