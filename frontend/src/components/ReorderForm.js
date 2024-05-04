

import { useState } from "react";
import { useReordersContext } from '../hooks/useReorderContext';



const ReorderForm = () => {
    const { dispatch } = useReordersContext();
    const [supplierName, setSupplierName] = useState(''); 
    const [supplierEmail, setSupplierEmail] = useState('');
    const [drugName, setDrugName] = useState('');
    const [reorderLevel, setReorderLevel] = useState('');
    const [error, setError] = useState(null);
    const [showPopup, setShowPopup] = useState(false); // State to manage popup visibility
    const [showCheckmark, setShowCheckmark] = useState(false);


    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if reorder level is greater than zero
        if (reorderLevel <= 0) {
            setError("Reorder level must be greater than zero.");
            setShowCheckmark(false);
            return; // Exit the function if reorder level is invalid
        }

        const reorder = {supplierName, supplierEmail, drugName, reorderLevel };
        const response = await fetch('/api/reorder', {
            method: 'POST',
            body: JSON.stringify(reorder),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const json = await response.json();
        if (!response.ok) {
            setError(json.error);
            setShowCheckmark(false);
        } else {
            setSupplierName('');
            setSupplierEmail('');
            setDrugName('');
            setReorderLevel('');
            setError(null);
            console.log('new workout added', json);
            dispatch({ type: 'CREATE_REORDER', payload: json });
            setShowPopup(false); // Close the popup after successful submission
            setShowCheckmark(true);
        }
    };


   const togglePopup = () => {
    if (!showPopup) {
        // Clear form fields when opening the popup
        setSupplierName('');
        setSupplierEmail('');
        setDrugName('');
        setReorderLevel('');
    }
    setShowPopup(!showPopup);
};


    return (
        <>
            <button className="btn bg-login1 hover:bg-login2 hover:text-white mr-2  ml-2 px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all" onClick={togglePopup}>
                Add a New Reorder Level
            </button>
            {showPopup && (

                <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full border border-black">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                    Add a New Reorder Level
                                </h3>
                                <div className="mt-2">
                                    <form onSubmit={handleSubmit} className="reorder-form bg-dark-blue-2 p-4 rounded-lg shadow-md">
                                        {/* Form fields */}

                                        <label className="block text-sm font-medium text-gray-700" htmlFor="supplierEmail">Supplier's Name</label>
                                        <input type="text" id="supplierName" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" onChange={(e) => setSupplierName(e.target.value)} value={supplierName} required />

                                        <label className="block text-sm font-medium text-gray-700" htmlFor="supplierEmail">Supplier's Email</label>
                                        <input type="email" id="supplierEmail" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" onChange={(e) => setSupplierEmail(e.target.value)} value={supplierEmail} required />

                                        <label className="block text-sm font-medium text-gray-700 mt-4" htmlFor="drugName">Drug Name:</label>
                                        <input type="text" id="drugName" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" onChange={(e) => setDrugName(e.target.value)} value={drugName} required />

                                        <label className="block text-sm font-medium text-gray-700 mt-4" htmlFor="reorderLevel">Reorder Level</label>
                                        <input
                                            type="number"
                                            id="reorderLevel"
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                            onChange={(e) => {
                                                const value = e.target.value;
                                                // Check if the value is a positive number greater than zero
                                                if (value > 0) {
                                                    setReorderLevel(value);
                                                } else {
                                                    // Reset the input value to an empty string if it's not valid
                                                    setReorderLevel('');
                                                }
                                            }}
                                            value={reorderLevel}
                                            required
                                        />
                                        <br />
                                        <button type="submit" className="btn bg-login1 hover:bg-login2 hover:text-white mr-2 px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all">
                                            Add Reorder Level
                                        </button>
                                        <button type="button" onClick={togglePopup} className="btn bg-login1 hover:bg-login2 hover:text-white mr-2 px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all">
                                            Cancel
                                        </button>
                                        {error && <div className="mt-4 text-red-500">{error}</div>}
                                        {!error && showCheckmark && (
                                            <div className="flex justify-center items-center h-12">
                                                <span className="text-green-500 text-4xl animate-pulse">✔</span>
                                            </div>
                                        )}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </>
    );

};

export default ReorderForm;




