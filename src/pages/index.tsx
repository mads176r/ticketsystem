import Topbar from "@/components/Topbar";
import Sidebar from "@/components/Sidebar";
const dummyTicketData = [
  { id: 1, title: 'Bug in Login Page', description: 'Fix the login bug on the login page.', status: 'Open' },
  { id: 2, title: 'Add Dark Mode', description: 'Implement dark mode feature.', status: 'In Progress' },
  { id: 3, title: 'Improve Performance', description: 'Optimize the performance for dashboard.', status: 'Closed' },
];

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Topbar />
        <main className="p-6 flex-1 bg-gray-50">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {dummyTicketData.map((ticket) => (
              <div key={ticket.id} className="p-4 bg-white shadow rounded">
                <h2 className="text-xl font-semibold mb-2">{ticket.title}</h2>
                <p className="text-sm text-gray-600">{ticket.description}</p>
                <span className={`inline-block mt-2 px-2 py-1 text-sm rounded-full ${
                  ticket.status === 'Open' ? 'bg-green-100 text-green-800' :
                  ticket.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {ticket.status}
                </span>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
