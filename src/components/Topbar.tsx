import { FaBars } from "react-icons/fa";

interface TopbarProps {
  toggleSidebar: () => void;
}

export default function Topbar({ toggleSidebar }: TopbarProps) {
  return (
    <div className="w-full bg-gradient-to-r from-blue-600 to-blue-400 px-4 flex justify-between items-center shadow relative h-16 z-40">
      <button
        onClick={toggleSidebar}
        className="p-2 bg-blue-800 text-white rounded-md"
      >
        <FaBars className="h-5 w-5" />
      </button>
      <h1 className="absolute left-1/2 transform -translate-x-1/2 text-3xl font-semibold text-white">
        Dashboard
      </h1>
      <div className="absolute right-4 flex items-center space-x-4">
        <input
          type="text"
          placeholder="Search"
          className="border rounded p-2 text-gray-700"
        />
        <div className="bg-blue-300 p-2 rounded-full text-white">
          <span>Profile</span>
        </div>
      </div>
    </div>
  );
}