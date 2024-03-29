import { useEffect, useState } from "react";
import { useUsers } from "../hooks/useUsers";
import UserDetails from "../components/UserDetails";

const Loyalty = () => {
  const { user, dispatch } = useUsers();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]); // Initialize with an empty array
  const [months, setMonths] = useState(6); // Initialize with 6 months


  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/user");
      if (response.ok) {
        const json = await response.json();
        dispatch({ type: "SET_USERS", payload: json });
        setFilteredUsers(json); // Update filteredUsers with fetched users
      }
    };

    fetchUsers();
  }, [dispatch]);

  useEffect(() => {
    // Filter users based on search term whenever searchTerm changes
    const filtered = user?.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.contact.includes(searchTerm)
    );
    setFilteredUsers(filtered);
  }, [searchTerm, user]);

  return (
    <div className="container mx-auto px-4 py-8 ml-auto">
      <div className="flex justify-between items-center bg-gray-100 rounded-lg p-4 mb-4">
        <h1 className="text-2xl font-semibold text-gray-800 ml-64">Loyalty Program</h1>
        <div className="flex items-center">
          <h4 className="text-lg font-medium text-gray-600 mr-2">
            Total amount of users' purchases within last 6 months
          </h4>
          <input
            type="number"
            required
            value={months}
            onChange={(e) => setMonths(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-button focus:ring focus:ring-blue-button focus:ring-opacity-50 text-dark-blue p-2"
          />
          {/* Add total amount component here */}
        </div>
        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 text-gray-700"
          />
          <div className="absolute right-3 top-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-64">
        {filteredUsers &&
          filteredUsers.map((user) => (
            <UserDetails key={user._id} user={user} months={6} />
          ))}
      </div>
    </div>
  );
};

export default Loyalty;
