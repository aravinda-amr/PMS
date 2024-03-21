import { useEffect, useState } from 'react';

import staffRewardDetail from '../components/Srewards.js'

export const StaffReward =() => {
    const [staff, setStaff] = useState(null) 
    
    useEffect(() => {
        const fetchReward = async()=>{
            const response = await fetch('/api/staffReward') //fetching data from the backend and storing it in response
            const json = await response.json(); //converting the response to json
            if(response.ok){ //if the response is okay
                setStaff(json) //dispatching the action to the reducer 
                //dispatching the action to the reducer
            }
        }
        fetchReward();
    }, [])
    return(
        <div className="reward">
           <div className="reward_form">
             {staff && staff.map ((staffreward) => (
             < staffRewardDetail key={staffreward._id} staffreward={staffreward}/> 
           
             ))}
            </div>
         
        </div>    
    )
}

export default StaffReward