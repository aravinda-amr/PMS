import {useReordersContext} from '../hooks/useReorderContext'

// date fns
// import formatDistanceToNow from 'date-fns/formatDistanceToNow'

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
      <div className="overflow-x-auto" style={{ marginBottom: '20px', marginTop:'20px' }}>
        <table className="coupon-table w-full  text-black border-collapse">
          <thead className="coupon-table-thead bg-dark-blue text-white">
            <tr className="coupon-table-tr">
              <th className="coupon-table-th border border-gray-300 px-4 py-2">Supplier Email</th>
              <th className="coupon-table-th border border-gray-300 px-4 py-2">Drug Name</th>
              <th className="coupon-table-th border border-gray-300 px-4 py-2">Quantity</th>
              <th className="coupon-table-th border border-gray-300 px-4 py-2">Reorder Level</th>
              <th className="border border-gray-300 px-4 py-2"></th>
             
            </tr>
          </thead>
          <tbody>
        
              <tr>
                <td className="coupon-table-th border border-gray-300 px-4 py-2">{reorder.supplierEmail}</td>
                <td className="coupon-table-th border border-gray-300 px-4 py-2">{reorder.drugName}</td>
                <td className="coupon-table-th border border-gray-300 px-4 py-2">{reorder.totalquantity}</td>        
                <td className="coupon-table-th border border-gray-300 px-4 py-2">{reorder.reorderLevel}</td>
                <td className="border border-gray-300 px-4 py-2">
                 <button className="btn bg-login1 hover:bg-login2 hover:text-white mr-2 px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all" onClick ={handleClick}>Delete</button>
                 <button className="btn bg-signup1 hover:bg-signup2 hover:text-white mr-2 px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all" onClick={handleUpdate}>Edit</button>
               </td>
              </tr>
            
          </tbody>
        </table>
      </div>
   );

}

export default ReorderDetials