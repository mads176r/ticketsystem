export default function Topbar() {
    return (
      <div className="w-full bg-gray-100 p-4 flex justify-between items-center shadow">
        <h1 className="text-xl">Welcome, User!</h1>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="border rounded p-2 mr-4"
          />
          <div className="bg-gray-300 p-2 rounded-full">
            {/* Placeholder for profile image or icon */}
            <span>Profile</span>
          </div>
        </div>
      </div>
    );
  }
  