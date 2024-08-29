import { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";

interface TopbarProps {
  toggleSidebar: () => void;
}

interface CookieData {
  userID: string;
  name: string;
}

export default function Topbar({ toggleSidebar }: TopbarProps) {
  const [userName, setUserName] = useState<string | null>(null);

  // Function to get a specific cookie value by name
  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
  };

  const fetchUserNameFromCookie = () => {
    const cookie = getCookie("userData");
    console.log("Cookie found:", cookie); // Debug: Log raw cookie content
    if (cookie) {
      try {
        const parsedCookie: CookieData = JSON.parse(decodeURIComponent(cookie));
        console.log("Parsed Cookie:", parsedCookie); // Debug: Log parsed cookie content
        setUserName(parsedCookie.name);
      } catch (error) {
        console.error("Failed to parse cookie:", error);
      }
    } else {
      console.log("No cookie found"); // Debug: Log if cookie is not found
      setUserName(null);
    }
  };
  

  useEffect(() => {
    fetchUserNameFromCookie();

    // Optional: Fetch cookie when window regains focus
    const handleFocus = () => {
      fetchUserNameFromCookie();
    };
    window.addEventListener("focus", handleFocus);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("focus", handleFocus);
    };
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
            <span>{userName}</span> {/* Display the user's name from the cookie */}
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
