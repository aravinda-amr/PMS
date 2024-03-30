import { useEffect, useState } from 'react';
import AboutExpireDetials from '../components/AboutExpireDetails';
export const Expired =() => {
    const [abtexpire, setabtexpire] = useState(null) 
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredItems, setFilteredItems] = useState([]); // State to hold filtered items

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

    useEffect(() => {
        // Filter items based on search term whenever searchTerm changes
        const filtered = abtexpire?.filter(
            (item) => item.drugName.toLowerCase().includes(searchTerm.toLowerCase())
        ) ?? []; // Ensure filtered is always an array
        setFilteredItems(filtered);
    }, [searchTerm, abtexpire]);


    return(
        <div className="ml-64">
            <input
                type="text"
                placeholder="Search drug names..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 text-gray-700"
            />
           <div className="expired_form">
                {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                        <AboutExpireDetials key={item._id} expire={item}/> 
                    ))
                ) : (
                    <p>No Drug Found</p>
                )}

            </div>
         
        </div>    
    )
}

export default Expired