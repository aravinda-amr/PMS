import React, {useEffect} from 'react'
import {useReordersContext} from '../hooks/useReorderContext'


//components
import ReorderDetails from '../components/ReorderDetails'
import ReorderForm from '../components/ReorderForm'
const Reorder = () =>{
   const {reorders, dispatch} = useReordersContext() //getting the workouts and dispatch from the context
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
    return(
        <div className="reorder">
           <div className="reorders_form">
             {reorders && reorders.map ((reorder) => ( //if workouts is not null, map through the workouts
                <ReorderDetails key={reorder._id} reorder={reorder}/> //passing the workout as a prop to the WorkoutDetails component
             ))}
            </div>
           <ReorderForm/>
        </div>    
    )
}

export default Reorder