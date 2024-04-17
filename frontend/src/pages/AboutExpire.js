import { useEffect, useState } from 'react';
import AboutExpireDetials from '../components/AboutExpireDetails';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

export const Expired =() => {
    const [abtexpire, setabtexpire] = useState(null) 
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredItems, setFilteredItems] = useState([]); // State to hold filtered items
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
        const fetchAbtExpire = async()=>{
            setIsLoading(true);
            const response = await fetch('/api/abtexpired') //fetching data from the backend and storing it in response
            const json = await response.json(); //converting the response to json
            if(response.ok){ //if the response is okay
                setabtexpire(json) //dispatching the action to the reducer 
                //dispatching the action to the reducer
            }
            setIsLoading(false);
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
               <div className="flex justify-between items-center bg-gray-100 rounded-lg p-4 mb-4"> 
            <h1 className="text-2xl font-semibold text-gray-800 ml-64">About To Expired Drugs</h1>
       
        <div className="flex items-center">
            <TextField
              label="Search Drugs..."
              variant="outlined"
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 text-gray-700 field"
            />
          </div> 
          </div>
          
       
          {isLoading ? (
                <div className="flex justify-center items-center h-40">
                    <CircularProgress />
                </div>
            ) : (
                filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                        <AboutExpireDetials key={item._id} expire={item} />
                    ))
                ) : (
                    <p>No Drug Found</p>
                )
            )}

            </div>
         
         
    )
}

export default Expired