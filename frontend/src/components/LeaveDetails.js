import React, { useState } from "react";
import { useLeavesContext } from "../hooks/useLeavesContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const LeaveDetails = ({ leave }) => {
  const { dispatch } = useLeavesContext();
  const [showPopup, setShowPopup] = useState(false);
  const [reason, setReason] = useState(leave.reason || '');
  const [dateTo, setDateTo] = useState(leave.dateTo || '');

  const handleClick = async () => {
    const response = await fetch('/api/leaves/' + leave._id, {
      method: 'DELETE'
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json });
      window.location.reload(); // Refresh the page after deletion
    }
  };

  const handleUpdate = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const handleSubmitValues = async () => {
    const response = await fetch('/api/leaves/' + leave._id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ reason, dateTo }),
    });
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'UPDATE_WORKOUT', payload: json });
      setShowPopup(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-4 mb-4 flex flex-col font-jakarta">
      <div className="bg-dark-blue-2 flex justify-between items-center px-6 py-6 rounded-lg">
        <div className="flex items-center space-x-4">
          <div className="flex flex-col space-y-2">
            <h4 className="text-3xl font-semibold text-white">{leave.name}</h4>

            <p className="text-white"><strong>Email: </strong> {leave.email}</p>
            <p className="text-white"><strong>Date From: </strong>{new Date(leave.dateFrom).toLocaleDateString()}</p>
            <p className="text-white"><strong>Date To : </strong>{new Date(leave.dateTo).toLocaleDateString()}</p>
            <p className="text-white"><strong>Reasons: </strong>{leave.reason}</p>
            <p className="text-white">{formatDistanceToNow(new Date(leave.createdAt), { addSuffix: true })}</p>
          </div>

        </div>
        <div className="flex space-x-4">
          <button
            className="ring-2 ring-white bg-login1 hover:bg-login2 text-black hover:text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
            onClick={handleClick}
          >
            Delete
          </button>
          <button
            className="ring-2 ring-white bg-signup1 hover:bg-signup2 text-black hover:text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out"
            onClick={handleUpdate}
          >
            Update
          </button>
        </div>
      </div>
      {showPopup && (
        <div className="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
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
};

export default LeaveDetails;
