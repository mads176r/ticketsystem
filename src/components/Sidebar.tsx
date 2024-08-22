export default function Sidebar() {
    return (
      <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 text-2xl font-bold border-b border-gray-700">Menu</div>
        <nav className="flex-1 p-4">
          <ul>
            <li className="mb-4">
              <a href="#" className="hover:text-gray-300">Dashboard</a>
            </li>
            <li className="mb-4">
              <a href="#" className="hover:text-gray-300">All Tickets</a>
            </li>
            <li className="mb-4">
              <a href="#" className="hover:text-gray-300">My Tickets</a>
            </li>
            <li className="mb-4">
              <a href="#" className="hover:text-gray-300">New Ticket</a>
            </li>
            <li className="mb-4">
              <a href="#" className="hover:text-gray-300">Statistics</a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
  