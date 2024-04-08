import { useEffect, useState } from "react";
import { useUsers } from "../hooks/useUsers";
import UserDetails from "../components/UserDetails";
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const Loyalty = () => {
  const { user, dispatch } = useUsers();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [months, setMonths] = useState(6); // State for the number of months
  const [isFiltered, setIsFiltered] = useState(true); // Initially set to true to display filtered users
  const [isLoading, setIsLoading] = useState(true);

  // Fetch and filter users with total > 100 initially
  useEffect(() => {
    const fetchAndFilterUsers = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/user");
        if (!response.ok) throw new Error('Failed to fetch users');
        const users = await response.json();
        const filteredUsersWithTotal = await Promise.all(
          users.map(async (user) => {
            const totalResponse = await fetch(`/api/user/totalAmount/${user.contact}?months=${months}`);
            const totalData = await totalResponse.json();
            if (totalData.length > 0 && totalData[0].totalAmount > 100) {
              return { ...user, totalAmount: totalData[0].totalAmount };
            }
            return null;
          })
        );
        const filteredUsers = filteredUsersWithTotal.filter((user) => user !== null);
        dispatch({ type: "SET_USERS", payload: filteredUsers });
        setFilteredUsers(filteredUsers); // Set filtered users
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAndFilterUsers();
  }, [dispatch, months]); // Added months to dependency array

  // Add the input field for setting the number of months
  const handleMonthsChange = (event) => {
    setMonths(event.target.value);
  };


  const handleFetchClick = async () => {
    setIsLoading(true);
    if (isFiltered) {
      // Fetch all users
      const response = await fetch("/api/user");
      if (response.ok) {
        const json = await response.json();
        // Fetch total amount for each user
        const usersWithTotal = await Promise.all(
          json.map(async (user) => {
            const totalResponse = await fetch(`/api/user/totalAmount/${user.contact}?months=${months}`);
            const totalData = await totalResponse.json();
            // Include the total amount in the user object
            return { ...user, totalAmount: totalData.length > 0 ? totalData[0].totalAmount : 0 };
          })
        );
        dispatch({ type: "SET_USERS", payload: usersWithTotal });
        setFilteredUsers(usersWithTotal); // Set all users with total amounts
        setIsFiltered(false); // Set the toggle state to false after fetching all users
      }
    } else {
      // Fetch and filter users with total > 100
      const response = await fetch("/api/user");
      if (response.ok) {
        const json = await response.json();
        const filteredUsersWithTotal = await Promise.all(
          json.map(async (user) => {
            const totalResponse = await fetch(`/api/user/totalAmount/${user.contact}?months=${months}`);
            console.log(months);
            const totalData = await totalResponse.json();
            if (totalData.length > 0 && totalData[0].totalAmount > 100) {
              return { ...user, totalAmount: totalData[0].totalAmount };
            }
            return null;
          })
        );
        const filteredUsers = filteredUsersWithTotal.filter((user) => user !== null);
        dispatch({ type: "SET_USERS", payload: filteredUsers });
        setFilteredUsers(filteredUsers); // Set filtered users
        setIsFiltered(true); // Set the toggle state to true after filtering
      }
    }
    setIsLoading(false);
  };




  // Search functionality (unchanged)
  useEffect(() => {
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
            {isFiltered ? "User purchases over 100 within the last 6 months" : "User purchases within last 6 months"}
          </h4>
        </div>
        <div className="flex items-center">
          <div className="flex items-center">
            <TextField
              label="Search users..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 text-gray-700"
            />

          </div>

        </div>
      </div>
      <div className="p-4 ml-64">
        <Button
          variant="outlined"
          size="small"
          onClick={handleFetchClick}
          className="ml-4"
        >
          {isFiltered ? "All Users" : "Total > 100"}
        </Button>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen ml-64">
          <CircularProgress />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-64">
          {filteredUsers &&
            filteredUsers.map((user) => (
              <UserDetails key={user._id} user={user} months={6} />
            ))}
        </div>
      )}


    </div>
  );

};

export default Loyalty;