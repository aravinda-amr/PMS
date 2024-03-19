import {useReordersContext} from '../hooks/useReorderContext'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ReorderDetials = ({reorder})=>{
     const {dispatch} = useReordersContext()
     const handleClick = async()=>{
        const response = await fetch('/api/reorder'+ reorder._id, { 
             method:'DELETE'
         })
         const json = await response.json() //converting the response to json so now all the information is in json
        
          dispatch({type: 'DELETE_WORKOUT', payload: json }) //dispatching the action to delete the workout
         
     }
    return (
        <div className="reorder-details">
            
<table>
  <tr>
    <th><strong>Supplier Email</strong></th>
    <td>{reorder.supplierEmail}</td>
  </tr>
  <tr>
    <th><strong>Drug ID</strong></th>
    <td>{reorder.drugID}</td>
  </tr>
  <tr>
    <th><strong>Reorder Level</strong></th>
    <td>{reorder.reorderLevel}
    <button onClick ={handleClick}> Delete</button>
    </td>
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