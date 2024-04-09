import React, { useState, useEffect } from 'react'; // Add useEffect
import {MdClose} from "react-icons/md";

const Batchmedicine = ({ onSuccess , onUpdateDrugs}) => {
    const [batchNumber, setBatchNumber] = useState('');  // Add state for batchNumber
    const [manufactureDate, setManufactureDate] = useState('');  // Add state for manufactureDate
    const [expireDate, setExpireDate] = useState('');  // Add state for expireDate
    const [quantity, setQuantity] = useState('');  // Add state for quantity
    const [price, setPrice] = useState('');
    const [selectedDrug, setSelectedDrug] = useState('');
    const [error, setError] = useState(null);
    const [drugs, setDrugs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showPopup, setShowPopup] = useState(false);
    

    useEffect(() => {
        const fetchDrugs = async () => {
            try {
                const response = await fetch('api/medicinenames/drugnames'); // Assuming correct API endpoint
                if (!response.ok) {
                    throw new Error('Failed to fetch drugs');
                }
                const data = await response.json();
                setDrugs(data);
            } catch (error) {
                console.error('Error fetching drugs:', error.message);
            }
        };

        fetchDrugs();
    }, [onUpdateDrugs]);

    // Add a new function to handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();

        const newBatch = {
            drugId: selectedDrug,
            batchNumber,
            manufactureDate,
            expireDate,
            quantity,
            price,

        };
    
        try {
            const response = await fetch(`/api/medicinenames/drugnames/${selectedDrug}/batches`, { // Assuming correct API endpoint
                method: 'POST',
                body: JSON.stringify(newBatch),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            // console.log('Response status:', response.status);
            // const responseData = await response.text();
            // console.log('Response data:', responseData);
    
            if (!response.ok) {
                throw new Error('Failed to add batch');
            }
    
            // Clear form fields and error state after successful submission
            setBatchNumber(''); // Clear batchNumber
            setManufactureDate('');
            setExpireDate('');
            setQuantity('');
            setPrice('');
            setError(null);

            // Show pop-up
            setShowPopup(false);

    // Call the onSuccess function passed from the parent component

            if (typeof onSuccess === 'function') {
                onSuccess();
            }

            if (typeof onUpdateDrugs === 'function') {
                onUpdateDrugs();
            }

            
    
            console.log('Batch added successfully');
            
        } catch (error) { // Catch any errors and update the error state
            setError(error.message);
            console.error('Error adding batch:', error);
        }
    };

    // Filter drugs based on the search term
    const filteredDrugs = drugs.filter(drug =>
        drug.drugName.drugName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
        <button className="btn bg-login1 hover:bg-login2 hover:text-white mr-2 px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all" onClick={() => setShowPopup(true)}>Add Batch</button>
        {showPopup && (
            <div className="fixed top-40 left-0 w-full h-full flex items-start justify-center bg-gray-800 bg-opacity-75">
                <div className="bg-white p-8 rounded-lg w-96 relative">
                   

        <form className="space-y-4" onSubmit={handleSubmit}>
        <span className="absolute top-0 right-0 p-2 cursor-pointer" onClick={() => setShowPopup(false)}><MdClose className="text-gray-500 hover:text-gray-700 text-lg"/></span>
            <h2 className="text-2xl font-bold mb-4">Add Batch Details:-</h2>
            <label className="block">
                Select Drug:
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for a drug..."
                    className="input"
                />
            <select value={selectedDrug} onChange={(e) => setSelectedDrug(e.target.value)}
             className="input">
                    <option value="">Select Drug</option>
                    {filteredDrugs.map((drug) => (
                        <option key={drug.drugName._id} value={drug.drugName._id}>{drug.drugName.drugName}</option>
                    ))}
                
                </select>

                
            </label>

        


            <label className="block">
                Batch Number:
                <input
                    type="text"
                    value={batchNumber}
                    onChange={(event) => setBatchNumber(event.target.value)}
                    className="input"
                />
            </label>
            <label className="block">
                Manufacture Date:
                <input
                    type="date"
                    value={manufactureDate}
                    onChange={(event) => setManufactureDate(event.target.value)}
                    className="input"
                />
            </label>
            <label className="block">
                Expire Date:
                <input
                    type="date"
                    value={expireDate}
                    onChange={(event) => setExpireDate(event.target.value)}
                    className="input"
                />
            </label>
            <label className="block">
                Quantity:
                <input
                    type="number"
                    value={quantity}
                    onChange={(event) => setQuantity(event.target.value)}
                    className="input"
                />
            </label>
            <label className="block">
                Price:
                <input
                    type="number"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    className="input"
                />
                </label>
                <button type="submit"className="btn bg-login1 hover:bg-login2 hover:text-white px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all">Add Batch</button>
                {error && <p className="text-red-500">{error}</p>}
            </form>

         </div>
      </div>
    )}
  </div>
    );
}


export default Batchmedicine ;
