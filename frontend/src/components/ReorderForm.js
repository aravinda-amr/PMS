import { useState } from "react"
import {useReordersContext} from '../hooks/useReorderContext'


const ReorderForm = () => {
    const {dispatch} = useReordersContext()
    const [supplierEmail, setsupplierEmail] = useState('')      
    const [batchNumber, setbatchNumber] = useState('')
    const [reorderLevel, setreorderLevel] = useState('')
    const [error, seterror] = useState(null)
   // const [emptyFields, setemptyFields] = useState([])



     const handleSubmit = async(e) =>{
        e.preventDefault() //prevent the default behaviour of the form which means the page will not refresh when the form is submitted

         const reorder = {supplierEmail, batchNumber, reorderLevel }  //create a workout object with the state variables
         const response = await fetch ('/api/reorder',{ //send a post request to the server with the workout object   
            method: 'POST',
            body : JSON.stringify(reorder), //convert the workout object to a JSON string
             headers:{
                'Content-Type' : 'application/json' //specify the content type of the request
             }
        })
         const json =await response.json()//convert the response to a JSON object
         if(!response.ok){
            seterror(json.error) //if the response is not ok which means the response is a error status 400, set the error state variable to the error message 
            //setemptyFields(json.emptyFields)//if the response is not ok, set the emptyFields state variable to the emptyFields message
        }
        else{
            setsupplierEmail('') //reset the state variables to empty strings
            setbatchNumber('')//reset the state variables to empty 
            setreorderLevel('')//reset the state variables to empty strings
           // setemptyFields([])//reset the emptyFields state variable to an empty array
            seterror(null) //reset the error state variable to null
            console.log('new workout added', json)
           dispatch({type: 'CREATE_REORDER', payload: json}) //dispatch the action to the reducer (add the new workout to the workouts array in the state variable
        }
    }

    return (
        <form className="bg-dark-blue-2  p-4 rounded-lg shadow-md" onSubmit={handleSubmit}>
            <h3 className="text-white">Add a New Reorder Level</h3>
            <label className="label-form block text-sm font-medium text-white">Supplier's Email</label>
            <input type="email" className=" focus:border-blue-button focus:ring focus:ring-blue-button focus:ring-opacity-50 text-blue" onChange={(e) => setsupplierEmail(e.target.value)} value={supplierEmail} required/> 
            
            <label className="label-form block text-sm font-medium text-white">Batch Number:</label>
            <input type="text" className=" focus:border-blue-button focus:ring focus:ring-blue-button focus:ring-opacity-50 text-blue" onChange={(e) => setbatchNumber(e.target.value)} value={batchNumber}  required/> 

            <label className="label-form block text-sm font-medium text-white">Reorder Level</label>
            <input type="number"className=" focus:border-blue-button focus:ring focus:ring-blue-button focus:ring-opacity-50 text-blue" onChange={(e) => setreorderLevel(e.target.value)} value={reorderLevel} required/>  


            <button className="btn bg-login1 hover:bg-login2 hover:text-white mr-2 px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all">Add Reorder Level</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}
 
export default ReorderForm

