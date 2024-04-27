import { useLeavesContext } from "../hooks/useLeavesContext"
import { useState } from "react"

import  formatDistanceToNow  from 'date-fns/formatDistanceToNow'

const LeaveDetails = ({leave}) => { 

  const {dispatch} = useLeavesContext()
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
 const [reason, setReason] = useState(leave.reason || ''); // State to store the updated reason
 const [dateTo, setDateTo] = useState(leave.dateTo || '');

const handleClick = async () => {
  const response = await fetch('/api/leaves/' + leave._id,{
    method: 'DELETE'
  })
  const json = await response.json()

  if(response.ok) {
    dispatch({type: 'DELETE_WORKOUT', payload: json})
  }
}


const handleUpdate = () => {
  setShowPopup(true); // Show the popup when the Update button is clicked
};

const handleClosePopup = () => {
  setShowPopup(false); // Hide the popup
};

const handleSubmitValues = async () => {
  // Assuming you have an API endpoint to update the reason and dateTo
  const response = await fetch('/api/leaves/' + leave._id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ reason, dateTo }),
  });
  const json = await response.json();

  if (response.ok) {
    // Assuming you want to update the state in your context or component state
    // This is just an example, you might need to adjust it based on your actual state management
    dispatch({ type: 'UPDATE_WORKOUT', payload: json });
    setShowPopup(false); // Hide the popup after successful update
  }
};

return (
  <div className="overflow-x-auto" style={{ marginBottom: '20px', marginTop:'20px' }}>
    <h4 className="text-xl font-bold">{leave.name}</h4>
    <p className="text-gray-700"><strong>Date From: </strong>{new Date(leave.dateFrom).toLocaleDateString()}</p>
    <p className="text-gray-700"><strong>DateTo : </strong>{new Date(leave.dateTo).toLocaleDateString()}</p>
    <p className="text-gray-700"><strong>Reasons: </strong>{leave.reason}</p>
    <p className="text-gray-500">{formatDistanceToNow(new Date(leave.createdAt),{addSuffix: true})}</p>
    <button className="btn bg-login1 hover:bg-login2 hover:text-white mr-2 px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all" onClick ={handleClick}>Delete</button>
    <button className="btn bg-signup1 hover:bg-signup2 hover:text-white mr-2 px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all" onClick ={handleUpdate}>Update</button>
    {showPopup && (
    <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                        Update Leave Details
                    </h3>
                    <div className="mt-2">
                        <form onSubmit={handleSubmitValues}>
                            <label className="block text-sm font-medium text-gray-700">Reason:</label>
                            <input
                                type="text"
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-black dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                                placeholder="Reason"
                            />
                            <label className="block text-sm font-medium text-gray-700 mt-4">Date To:</label>
                            <input
                                type="date"
                                value={dateTo}
                                onChange={(e) => setDateTo(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 placeholder-gray-300 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300 dark:bg-gray-700 dark:text-black dark:placeholder-gray-500 dark:border-gray-600 dark:focus:ring-gray-900 dark:focus:border-gray-500"
                                placeholder="Date To"
                            />
                            <div className="mt-4 flex justify-end">
                                <button
                                    type="submit"
                                    className="btn bg-signup1 hover:bg-signup2 hover:text-white mr-2 px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all"
                                >
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    onClick={handleClosePopup}
                                    className="btn bg-login1 hover:bg-login2 hover:text-white mr-2 px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
)}

  </div>
);

}

export default LeaveDetails