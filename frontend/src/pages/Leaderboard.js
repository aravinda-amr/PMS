
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';



//components
import LeaderboardDetails from '../components/LeaderboardDetails';

export const Leaderboard =() => {
    const [leader, setLeader] = useState(null) ;


    
    useEffect(() => {
        const fetchLeaderboard = async()=>{
            const response = await fetch('/api/leaderboard') //fetching data from the backend and storing it in response
            const json = await response.json(); //converting the response to json
            if(response.ok){ //if the response is okay
                setLeader(json) //dispatching the action to the reducer 
                //dispatching the action to the reducer
            }
        }
        fetchLeaderboard();
    }, [])


    return(

        <div className="ml-64 reward">
            <div className="flex justify-between items-center bg-gray-100 rounded-lg p-4 mb-4"> 
            <h1 className="text-2xl font-semibold text-gray-800 ml-64">Staff Leaderboard</h1>
        </div>  


        <div className="leaderboard_form">
            {leader && leader.map ((leaderboard) => (
            <LeaderboardDetails key={leaderboard._id} leaderboard = {leaderboard}/>))}
        </div>
         
        </div>    
    )
}

export default Leaderboard;