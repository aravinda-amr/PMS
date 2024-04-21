import {useReordersContext} from '../hooks/useReorderContext'
import {useState} from 'react'
// date fns
// import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ReorderDetials = ({reorder})=>{
     const {dispatch} = useReordersContext()
     const [showPopup, setShowPopup] = useState(false);
     const [reorderLevel, setReorderLevel] = useState(reorder.reorderLevel);


     const handleClick = async()=>{
        const response = await fetch('/api/reorder/'+ reorder._id, { 
             method:'DELETE'
         })
         const json = await response.json() //converting the response to json so now all the information is in json
        
          dispatch({type: 'DELETE_REORDER', payload: json }) //dispatching the action to delete the workout  
     }

     const togglePopup = () => {
      setShowPopup(!showPopup);
     };

    const handleUpdate = () => {
    togglePopup(); // Toggle the popup visibility
     };

     const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch('/api/reorder/'+ reorder._id, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ reorderLevel }),
      });
      const json = await response.json();
      dispatch({ type: 'UPDATE_REORDER', payload: json });
      togglePopup(); // Close the popup after updating
  };

      // const handleUpdate = async()=>{
      //     const response = await fetch('/api/reorder/'+ reorder._id, { 
      //         method:'PUT'
      //     })
      //     const json = await response.json() //converting the response to json so now all the information is in json
          
      //       dispatch({type: 'UPDATE_REORDER', payload: json }) //dispatching the action to delete the workout  
      // }

    return (
      <div className="overflow-x-auto" style={{ marginBottom: '20px', marginTop:'20px' }}>
        <table className="coupon-table w-full  text-black border-collapse">
          <thead className="coupon-table-thead bg-dark-blue text-white">
            <tr className="coupon-table-tr">
              <th className="coupon-table-th border border-gray-300 px-4 py-2">Supplier Email</th>
              <th className="coupon-table-th border border-gray-300 px-4 py-2">Drug Name</th>
              <th className="coupon-table-th border border-gray-300 px-4 py-2">Quantity</th>
              <th className="coupon-table-th border border-gray-300 px-4 py-2">Reorder Level</th>
              <th className="coupon-table-th border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2"></th>
         
            </tr>
          </thead>
          <tbody>
        
              <tr>
                <td className="coupon-table-th border border-gray-300 px-4 py-2">{reorder.supplierEmail}</td>
                <td className="coupon-table-th border border-gray-300 px-4 py-2">{reorder.drugName}</td>
                <td className="coupon-table-th border border-gray-300 px-4 py-2">{reorder.totalquantity}</td>        
                <td className="coupon-table-th border border-gray-300 px-4 py-2">{reorder.reorderLevel}</td>
                <td className="coupon-table-th border border-gray-300 px-4 py-2" style={{ color: reorder.status ? 'red' : 'green' }}>{reorder.status ? 'Yes' : 'No'}</td>
                <td className="border border-gray-300 px-4 py-2">
                 <button className="btn bg-login1 hover:bg-login2 hover:text-white mr-2 px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all" onClick ={handleClick}>Delete</button>
                 <button className="btn bg-signup1 hover:bg-signup2 hover:text-white mr-2 px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all" onClick={handleUpdate}>Edit</button>
                 {showPopup && (
    <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        Update Reorder Level
                    </h3>
                    <div className="mt-2">
                        <form onSubmit={handleSubmit}>
                            <input
                                type="number"
                                value={reorderLevel}
                                onChange={(e) => setReorderLevel(e.target.value)}
                                className="w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-black dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                                placeholder="Reorder Level"
                            />
                            <div className="mt-4 flex justify-end">
                                <button type="submit" className="btn bg-signup1 hover:bg-signup2 hover:text-white mr-2 px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all">
                                    Update
                                </button>
                                <button type="button" onClick={togglePopup} className="btn bg-login1 hover:bg-login2 hover:text-white mr-2 px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all">
                                    Cancel
                                </button>
                                <button type="button" onClick={togglePopup} className="btn bg-login1 hover:bg-login2 hover:text-white mr-2 px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all">
                                    NEW
                                </button>
                            </div>
                        
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
        )}
               </td>
              </tr>
          </tbody>
        </table>
      </div>
   );

}

export default ReorderDetials