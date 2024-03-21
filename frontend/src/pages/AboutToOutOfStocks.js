import { useEffect, useState } from 'react';
import AboutToOutOfStockDetials from '../components/AboutToOutOfStockDetials';
export const AboutToOutOfStock =() => {
    const [abouttooutofstock, setabouttooutofstock] = useState(null) 
    
    useEffect(() => {
        const fetchOutOfStock = async()=>{
            const response = await fetch('/api/abtoutofstock') //fetching data from the backend and storing it in response
            const json = await response.json(); //converting the response to json
            if(response.ok){ //if the response is okay
                setabouttooutofstock(json) //dispatching the action to the reducer 
                //dispatching the action to the reducer
            }
        }
        fetchOutOfStock();
    }, [])
    return(
        <div className="expired">
           <div className="expired_form">
             {abouttooutofstock && abouttooutofstock.map ((abtoutof) => (
                <AboutToOutOfStockDetials key={abtoutof._id} abtoutof={abtoutof}/> 
             ))}
            </div>
         
        </div>    
    )
}

export default AboutToOutOfStock