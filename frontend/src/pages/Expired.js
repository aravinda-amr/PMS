import { useEffect, useState } from 'react';
import ExpiredDetials from '../components/ExpiredDetails';
export const Expired =() => {
    const [expired, setExpired] = useState(null) 
    
    useEffect(() => {
        const fetchExpired = async()=>{
            const response = await fetch('/api/expired') //fetching data from the backend and storing it in response
            const json = await response.json(); //converting the response to json
            if(response.ok){ //if the response is okay
                setExpired(json) //dispatching the action to the reducer 
                //dispatching the action to the reducer
            }
        }
        fetchExpired();
    }, [])
    return(
        <div className="expired">
           <div className="expired_form">
             {expired && expired.map ((expire) => (
                <ExpiredDetials key={expire._id} expire={expire}/> 
             ))}
            </div>
         
        </div>    
    )
}

export default Expired