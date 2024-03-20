import { useEffect, useState } from 'react';
import OutOfStockDetials from '../components/OutOfStockDetails';
export const OutOfStock =() => {
    const [outofstock, setoutofstock] = useState(null) 
    
    useEffect(() => {
        const fetchOutOfStock = async()=>{
            const response = await fetch('/api/outofstock') //fetching data from the backend and storing it in response
            const json = await response.json(); //converting the response to json
            if(response.ok){ //if the response is okay
                setoutofstock(json) //dispatching the action to the reducer 
                //dispatching the action to the reducer
            }
        }
        fetchOutOfStock();
    }, [])
    return(
        <div className="expired">
           <div className="expired_form">
             {outofstock && outofstock.map ((outof) => (
                <OutOfStockDetials key={outof._id} outof={outof}/> 
             ))}
            </div>
         
        </div>    
    )
}

export default OutOfStock