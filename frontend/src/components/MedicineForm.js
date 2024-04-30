    import React, { useState } from 'react';
    import {MdClose} from "react-icons/md";
    import CircularProgress from '@mui/material/CircularProgress';

    const MedicineForm = ({ onSuccess }) => {

        const [drugName, setDrugName] = useState('');
        const [error, setError] = useState(null); 
        const [showPopup, setShowPopup] = useState(false);
        const [loading, setLoading] = useState(false); 

        const handleSubmit = async (event) => {
            event.preventDefault();
            setLoading(true); // Set loading state to true while submitting the form

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
            }finally {
                setLoading(false); // Set loading state to false after form submission
            }
        };

        return (
            <div>
                <button className="btn bg-login1 hover:bg-login2 hover:text-white mr-2 px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all" onClick={() => setShowPopup(true)}>Add Drug</button>
                {showPopup && (
                    <div className="fixed top-40 left-0 w-full h-full flex items-start justify-center bg-gray-800 bg-opacity-75">
                        <div className="bg-white p-8 rounded-lg rounded-xl border-4 border-black"style={{ width: '20vw', height: '30vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
                        <span className="absolute top-0 right-0 p-2 cursor-pointer" onClick={() => setShowPopup(false)}><MdClose className="text-gray-500 hover:text-gray-700 text-lg" style={{ fontSize: '24px' }}/></span>
                            
                        <form className="space-y-4 flex-grow" onSubmit={handleSubmit} style={{ overflow: 'auto', textAlign: 'center' }}>
                            <h2 className="text-2xl font-bold mb-4">Add Drug:-</h2>
                                <label className="flex flex-col text-left">
                                    Drug Name:
                                <input
                                    type="text"
                                    value={drugName}
                                    onChange={(event) => setDrugName(event.target.value)}
                                    className="appearance-none border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                    style={{ fontSize: '18px' }}
                                />
                                </label>
                                {loading ? (
                                <div className="flex justify-center">
                                    <CircularProgress />
                                </div>
                            ) : (
                                <div>
                                    <button type="submit" className="btn bg-login1 hover:bg-login2 hover:text-white px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all" style={{ fontSize: '19px', marginBottom: '5px' }}>Add Drug</button>
                                    {error && <p className="text-red-500">{error}</p>}
                                </div>
                            )}
                       
                                
                            </form>
                        </div>
                    </div>
                )}
            </div>
        );
    }



    export default MedicineForm;

