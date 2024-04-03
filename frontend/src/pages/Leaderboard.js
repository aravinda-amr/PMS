import { useEffect, useState } from 'react';

//components
import LeaderboardDetails from '../components/LeaderboardDetails';

export const Leaderboard =() => {
    const [leader, setLeader] = useState(null) 
    
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
           <div className="leaderboard_form">
             {leader && leader.map ((leaderboard) => (
                <LeaderboardDetails key={leaderboard._id} leaderboard = {leaderboard}/>))}
            </div>
         
        </div>    
    )
}

export default Leaderboard