

import { useEffect, useState } from 'react';
import PrescriptionDetials from '../components/AllPrescriptionDetails';
import TextField from '@mui/material/TextField';
export const Allprescri =() => {
    const [all, setall] = useState(null) 
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredItems, setFilteredItems] = useState([]); // State to hold filtered items

    useEffect(() => {
        const fetchpres = async()=>{
            const response = await fetch('/api/prescriptiongetall') //fetching data from the backend and storing it in response
            const json = await response.json(); //converting the response to json
            if(response.ok){ //if the response is okay
                setall(json) //dispatching the action to the reducer 
                //dispatching the action to the reducer
            }
        }
        fetchpres();
    }, [])

    useEffect(() => {
        // Filter items based on search term whenever searchTerm changes
        const filtered = all?.filter(
            (item) => item.note.toLowerCase().includes(searchTerm.toLowerCase())
        ) ?? []; // Ensure filtered is always an array
        setFilteredItems(filtered);
    }, [searchTerm, all]);


    return(
        <div className="ml-64">
               <div className="flex justify-between items-center bg-gray-100 rounded-lg p-4 mb-4"> 
            <h1 className="text-2xl font-semibold text-gray-800 ml-64">all pres</h1>
       
        <div className="flex items-center">
            <TextField
              label="Search users..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 text-gray-700 field"
            />
          </div> 
          </div>

                {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                        <PrescriptionDetials  key={item._id} prs={item}/> 
                    ))
                ) : (
                    <p>No Drug Found</p>
                )}

            </div>
 
    )
}

export default Allprescri