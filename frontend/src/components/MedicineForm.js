    import React, { useState } from 'react';
    import {MdClose} from "react-icons/md";

    const MedicineForm = ({ onSuccess }) => {

        const [drugName, setDrugName] = useState('');
        const [error, setError] = useState(null); 
        const [showPopup, setShowPopup] = useState(false);

        const handleSubmit = async (event) => {
            event.preventDefault();

            const newMedicine = {
                drugName,
                totalquantity: 0 // Set a default value or retrieve it from somewhere else

            };

            try {
                const response = await fetch('/api/medicinenames/drugnames', {
                    method: 'POST',
                    body: JSON.stringify(newMedicine),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (!response.ok) {
                    const json = await response.json();
                    throw new Error(json.message);
                }

                setDrugName('');
                setError(null);
                console.log('Medicine drug added successfully!');

                // Call the onSuccess function passed from the parent component
                if (typeof onSuccess === 'function') {
                    onSuccess(drugName);
                }   
            
                console.log('Medicine drug added successfully!');
                
                // Close the form after successful submission
                    setShowPopup(false);


            } catch (error) {
                setError(error.message);
            }
        };

        return (
            <div>
                <button className="btn bg-login1 hover:bg-login2 hover:text-white mr-2 px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all" onClick={() => setShowPopup(true)}>Add Drug</button>
                {showPopup && (
                    <div className="fixed top-40 left-0 w-full h-full flex items-start justify-center bg-gray-800 bg-opacity-75">
                        <div className="bg-white p-8 rounded-lg w-96 relative">
                            <span className="absolute top-0 right-0 p-2 cursor-pointer" onClick={() => setShowPopup(false)}><MdClose className="text-gray-500 hover:text-gray-700 text-lg"/></span>
                            
                        <form className="space-y-4" onSubmit={handleSubmit}>
                            <h2 className="text-2xl font-bold mb-4">Add Drug:-</h2>
                                <label className="block">
                                    Drug Name:
                                <input
                                    type="text"
                                    value={drugName}
                                    onChange={(event) => setDrugName(event.target.value)}
                                />
                                </label>
                                    <button type="submit" className="btn bg-login1 hover:bg-login2 hover:text-white px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all">Add Drug </button>
                                
                                {error && <p className="text-red-500">{error}</p>}
                            </form>
                        </div>
                    </div>
                )}
            </div>
        );
    }



    export default MedicineForm;

