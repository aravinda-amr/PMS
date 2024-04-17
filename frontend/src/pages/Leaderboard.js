
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';

//components
import LeaderboardDetails from '../components/LeaderboardDetails';
import CircularProgress from '@mui/material/CircularProgress';

export const Leaderboard =() => {
    const [leader, setLeader] = useState(null) ;
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredItems, setFilteredItems] = useState([]); 
    const [loading, setLoading] = useState(true);


    
    useEffect(() => {
        const fetchLeaderboard = async()=>{
            const response = await fetch('/api/leaderboard') //fetching data from the backend and storing it in response
            const json = await response.json(); //converting the response to json
            if(response.ok){ //if the response is okay
                setLeader(json) //dispatching the action to the reducer 
                const timer = setTimeout(() => {
                    setLoading(false);
                }, 1000); // Delay of 1000 milliseconds (1 second)
            
                return () => clearTimeout(timer);
                //dispatching the action to the reducer
            }
        }
        fetchLeaderboard();
    }, []);

    

    useEffect(() => {
        const filtered = leader?.filter(
            (item) => item && item.month && item.month.toLowerCase().includes(searchTerm.toLowerCase())
        ) ?? [];
        setFilteredItems(filtered);
    }, [searchTerm, leader]);







    return(

        <div className="ml-64 reward">
            <div className="flex justify-between items-center bg-gray-100 rounded-lg p-4 mb-4"> 
            <h1 className="text-2xl font-semibold text-gray-800 ml-64">Staff Leaderboard</h1>
            <div className="flex items-center">
                    <TextField
                        label="Search months..."
                        variant="outlined"
                        size="small"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 text-gray-700 field"
                    />
                </div> 
        </div>  

        {loading ? (
                <div className="flex justify-center items-center">
                    <CircularProgress />
                </div>
            ) :

      
            filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                    // Ensure item is not undefined before rendering StaffRewardDetails
                    item && <LeaderboardDetails key={item._id} leaderboard={item} />
                ))
            ) : (
                <p>No months Found</p>
            )}
         
        </div>    
    );
};

export default Leaderboard;