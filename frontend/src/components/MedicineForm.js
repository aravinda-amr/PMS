import React, { useState } from 'react';

  const MedicineForm = () => {

    const [drugName, setDrugName] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const newMedicine = {
            drugName,
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
        } catch (error) {
            setError(error.message);
        }
    };

    return (
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
    );
};


export default MedicineForm;
















  
