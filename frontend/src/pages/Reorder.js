import React, {useEffect, useState} from 'react'
import {useReordersContext} from '../hooks/useReorderContext'
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';

//components
import ReorderDetails from '../components/ReorderDetails'
import ReorderForm from '../components/ReorderForm'
const Reorder = () =>{
   const {reorders, dispatch} = useReordersContext() //getting the workouts and dispatch from the context
   const [searchTerm, setSearchTerm] = useState("");
   const [filteredItems, setFilteredItems] = useState([]); // State to hold filtered items
   const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchReorder = async()=>{
            setIsLoading(true);
            const response = await fetch('/api/reorder') //fetching data from the backend and storing it in response
            const json = await response.json(); //converting the response to json
            if(response.ok){ //if the response is okay
                dispatch({type: 'SET_REORDER', payload: json}) //dispatching the action to the reducer
            }
        }
        fetchReorder();
    }, [dispatch])
  
    useEffect(() => {
        // Filter items based on search term whenever searchTerm changes
        const filtered = reorders?.filter(
            (item) => item.drugName.toLowerCase().includes(searchTerm.toLowerCase())
        ) ?? []; // Ensure filtered is always an array
        setFilteredItems(filtered);
       
            setIsLoading(false);
        
    }, [searchTerm, reorders]);

    return(
        <div className="ml-64">
             <div className="flex justify-between items-center bg-gray-100 rounded-lg p-4 mb-4"> 
            <h1 className="text-2xl font-semibold text-gray-800 ml-64">Reorder Drugs</h1>
       
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
           
             {/* {reorders && reorders.map((reorders)=>
                <ReorderDetails key={reorders._id} reorder={reorders} /> //passing the workout as a prop to the WorkoutDetails component
             )} */}
             {isLoading ? (
        <div className="flex justify-center items-center h-screen ml-64">
          <CircularProgress />
        </div> 
        ) : (
            <div>
                <ReorderForm />
                {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                        <ReorderDetails key={item._id} reorder={item} /> 
                    ))
              
                ) : (
                    <p>No Drug Found</p>
                )}
                    </div>  
            )}
          
         
        </div>    
    )
    //erer
}
export default Reorder