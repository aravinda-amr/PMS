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
                <button onClick={() => setShowPopup(true)}>Add Drug</button>
                {showPopup && (
                    <div className="popup">
                        <div className="popup-content">
                            <span className="close" onClick={() => setShowPopup(false)}><MdClose /></span>
                            
                        <form className="Drug-form" onSubmit={handleSubmit}>
                            <h2>Add Drug:-</h2>
                                <label>
                                    Drug Name:
                                <input
                                    type="text"
                                    value={drugName}
                                    onChange={(event) => setDrugName(event.target.value)}
                                />
                                </label>
                                    <button type="submit">Submit</button>
                                
                                {error && <p>{error}</p>}
                            </form>
                        </div>
                    </div>
                )}
            </div>
        );
    }



    export default MedicineForm;

