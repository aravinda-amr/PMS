import React, {useEffect, useState} from 'react'
import {useReordersContext} from '../hooks/useReorderContext'

//components
import ReorderDetails from '../components/ReorderDetails'
import ReorderForm from '../components/ReorderForm'
const Reorder = () =>{
   const {reorders, dispatch} = useReordersContext() //getting the workouts and dispatch from the context
   const [searchTerm, setSearchTerm] = useState("");
   const [filteredItems, setFilteredItems] = useState([]); // State to hold filtered items
    useEffect(() => {
        const fetchReorder = async()=>{
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
    }, [searchTerm, reorders]);

    return(
        <div className="ml-64">
            <input
                type="text"
                placeholder="Search drug names..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 text-gray-700"
            />
           <div className="reorders_form">
             {/* {reorders && reorders.map((reorders)=>
                <ReorderDetails key={reorders._id} reorder={reorders} /> //passing the workout as a prop to the WorkoutDetails component
             )} */}

                {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                        <ReorderDetails key={item._id} reorder={item} /> 
                    ))
                ) : (
                    <p>No Drug Found</p>
                )}

            </div>
           <ReorderForm/>
        </div>    
    )
}
export default Reorder