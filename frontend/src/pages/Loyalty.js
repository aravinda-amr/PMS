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
          user.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredUsers(filtered);
      }, [searchTerm, user]);
      

    return (
        <div className="home">
            <div>
                <h1>Loyalty</h1>
                <div>
                    <h4>Total amount of purchases users within last 6 months</h4>
                    <div className="search-bar">
                        <input 
                            type="text"
                            placeholder="Search users..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="workouts">
                        {filteredUsers && filteredUsers.map((user) => ( // Add conditional check
                            <UserDetails key={user._id} user={user} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Loyalty;
