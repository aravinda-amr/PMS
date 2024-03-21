import {useReordersContext} from '../hooks/useReorderContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ReorderDetials = ({reorder})=>{
     const {dispatch} = useReordersContext()
     const handleClick = async()=>{
        const response = await fetch('/api/reorder/'+ reorder._id, { 
             method:'DELETE'
         })
         const json = await response.json() //converting the response to json so now all the information is in json
        
          dispatch({type: 'DELETE_REORDER', payload: json }) //dispatching the action to delete the workout  
     }

      const handleUpdate = async()=>{
          const response = await fetch('/api/reorder/'+ reorder._id, { 
              method:'PUT'
          })
          const json = await response.json() //converting the response to json so now all the information is in json
          
            dispatch({type: 'UPDATE_REORDER', payload: json }) //dispatching the action to delete the workout  
      }

    return (
   <div className="workout-details">
            
<table>
  <tr>
    <th><strong>Supplier Email</strong></th>
    <td>{reorder.supplierEmail}</td>
  </tr>
  <tr>
    <th><strong>Batch Number</strong></th>
    <td>{reorder.batchNumber}</td>
  </tr>
  <tr>
    <th><strong>Reorder Level</strong></th>
    <td>{reorder.reorderLevel}
    <button onClick ={handleClick}> Delete</button>
    <button onClick={handleUpdate}>Update</button>
    </td>
  </tr>
  <tr>
  <th><strong>Quantity</strong></th>
    <td>{reorder.quantity}</td>
  </tr>
  <tr>
    <th><strong>Created At</strong></th>
    <td>{reorder.createdAt}
    <p>{formatDistanceToNow(new Date(reorder.createdAt), {addSuffix : true})}</p> </td>
  </tr>
</table>
   </div>
    )
}

export default ReorderDetials