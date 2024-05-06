import React, { useState } from "react";
import { useLeavesContext } from '../hooks/useLeavesContext';

const LeavesForm = () => {
    const { dispatch } = useLeavesContext();

    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [dateFrom, setdateFrom] = useState('');
    const [dateTo, setdateTo] = useState('');
    const [reason, setReason] = useState('');
    const [error, setError] = useState('');
    const [emptyFields, setEmptyFields] = useState([]);
    const [showPopup, setShowPopup] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const leave = { name, email,  dateFrom, dateTo, reason };

        const response = await fetch('/api/leaves', {
            method: 'POST',
            body: JSON.stringify(leave),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
        }

        if (response.ok) {
            setname('');
            setemail('');
            setdateFrom('');
            setdateTo('');
            setReason('');
            setError(null);
            setEmptyFields([]);
            console.log('new workout added', json);
            dispatch({ type: 'CREATE_WORKOUT', payload: json });
            setShowPopup(false); // Close the popup after successfully adding a leave
        }
    };

    const handleCancel = () => {
        setShowPopup(false); // Close the popup when Cancel button is clicked
    };

    return (
        <>
            <button
                className="btn bg-login1 hover:bg-login2 hover:text-white mr-2 px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all"
                onClick={() => setShowPopup(true)}
            >
                Add a Leave
            </button>
            {showPopup && (
                <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                    Request A Leave
                                </h3>

                                <label className="block text-sm font-medium text-gray-700 mt-4">Name:</label>
                                <input
                                    type="text"
                                    onChange={(e) => setname(e.target.value)}
                                    value={name}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-blue"
                                />

                                <label className="block text-sm font-medium text-gray-700 mt-4">Email:</label>
                                <input
                                    type="text"
                                    onChange={(e) => setemail(e.target.value)}
                                    value={email}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-blue"
                                />

                                <label className="block text-sm font-medium text-gray-700 mt-4">Date (from)</label>
                                <input
                                    type="date"
                                    min={new Date().toISOString().split('T')[0]}
                                    onChange={(e) => setdateFrom(e.target.value)}
                                    value={dateFrom}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-blue"
                                />

                                <label className="block text-sm font-medium text-gray-700 mt-4">Date (to)</label>
                                <input
                                    type="date"
                                    min={new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString().split('T')[0]}
                                    onChange={(e) => setdateTo(e.target.value)}
                                    value={dateTo}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-blue"
                                />


                                <label className="block text-sm font-medium text-gray-700 mt-4">Reason</label>
                                <input
                                    type="text"
                                    onChange={(e) => setReason(e.target.value)}
                                    value={reason}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-blue"
                                />

                                <button className="btn bg-login1 hover:bg-login2 hover:text-white mr-2 px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all" onClick={handleSubmit}>Submit</button>
                                <button className="btn bg-login1 hover:bg-login2 hover:text-white mr-2 px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all" onClick={handleCancel}>Cancel</button>
                                {error && <div className="mt-4 text-red-500">{error}</div>}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default LeavesForm;
