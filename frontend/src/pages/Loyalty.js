import { useEffect, useState } from "react";
import { useUsers } from "../hooks/useUsers";
import UserDetails from "../components/UserDetails";

const Loyalty = () => {
    const { user, dispatch } = useUsers();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredUsers, setFilteredUsers] = useState([]); // Initialize with an empty array

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch("/api/user");
            if (response.ok) {
                const json = await response.json();
                dispatch({ type: "SET_USERS", payload: json });
                setFilteredUsers(json); // Update filteredUsers with fetched users
            }
        }

        fetchUsers();
    }, [dispatch]);

    useEffect(() => {
        // Filter users based on search term whenever searchTerm changes
        const filtered = user?.filter(user =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.contact.includes(searchTerm)
        );
        setFilteredUsers(filtered);
      }, [searchTerm, user]);
      

      return (
        <div className="ml-64">
            <div className="bg-blue-500 text-blue p-6">
                <h1 className="text-blue p-2">Loyalty Program</h1>
                <div>
                    <h4 className="bg-blue-500 text-blue p-2">Total amount of users' purchases within last 6 months</h4>
                    <div className="search-bar text-blue p-2">
                        <input 
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="text-blue border border-gray-300 p-2 w-full md:w-auto" // Change text color inside search bar
                        />
                    </div>
                    <div className="workouts flex flex-col gap-4 p-2"> {/* Add gap between UserDetails items */}
                        {filteredUsers && filteredUsers.map((user) => (
                            <UserDetails key={user._id} user={user} />
                        ))}
                    </div>
                    
                </div>
            </div>
        </div>
    );
    
}

export default Loyalty;
