import { useEffect, useState } from 'react';
import AboutExpireDetials from '../components/AboutExpireDetails';
export const Expired =() => {
    const [abtexpire, setabtexpire] = useState(null) 
    
    useEffect(() => {
        const fetchAbtExpire = async()=>{
            const response = await fetch('/api/abtexpired') //fetching data from the backend and storing it in response
            const json = await response.json(); //converting the response to json
            if(response.ok){ //if the response is okay
                setabtexpire(json) //dispatching the action to the reducer 
                //dispatching the action to the reducer
            }
        }
        fetchAbtExpire();
    }, [])
    return(
        <div className="expired">
           <div className="expired_form">
             {abtexpire && abtexpire.map ((abexpire) => (
                <AboutExpireDetials key={abexpire._id} expire={abexpire}/> 
             ))}
            </div>
         
        </div>    
    )
}

export default Expired