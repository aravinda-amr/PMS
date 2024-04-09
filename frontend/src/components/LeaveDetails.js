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
      <p className="text-gray-700"><strong>Date From: </strong>{leave.dateFrom}</p>
      <p className="text-gray-700"><strong>DateTo : </strong>{leave.dateTo}</p>
      <p className="text-gray-700"><strong>Reasons: </strong>{leave.reason}</p>
      <p className="text-gray-500">{formatDistanceToNow(new Date(leave.createdAt),{addSuffix: true})}</p>
      <button className="btn bg-login1 hover:bg-login2 hover:text-white mr-2 px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all" onClick ={handleClick}>Delete</button>
      <button className="btn bg-signup1 hover:bg-signup2 hover:text-white mr-2 px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all" onClick ={handleUpdate}>Update</button>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h4>Update Leave Details</h4>
            <label>
              Reason:
              <input type="text" value={reason} onChange={(e) => setReason(e.target.value)} />
            </label>
            <label>
              Date To:
              <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
            </label>
            <button onClick={handleSubmitValues}>Submit</button>
            <button onClick={handleClosePopup}>Cancel</button>
          </div>
        </div>
      )}
    </div>
    
  )
}

export default LeaveDetails