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
                    const response = await fetch(`/api/medicinenames/drugnames/${selectedDrug}/batches`, {
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
                    setBatchNumber('');
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
                    
                } catch (error) {
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
                <button onClick={() => setShowPopup(true)}>Add Batch</button>
                {showPopup && (
                    <div className="popup">
                        <div className="popup-content">
                            <span className="close" onClick={() => setShowPopup(false)}><MdClose/></span>

                <form className="batch-form" onSubmit={handleSubmit}>
                    <h2>Add Batch Details:-</h2>
                    <label>
                        Select Drug:
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search for a drug..."
                        />
                    <select value={selectedDrug} onChange={(e) => setSelectedDrug(e.target.value)}>
                            <option value="">Select Drug</option>
                            {filteredDrugs.map((drug) => (
                                <option key={drug.drugName._id} value={drug.drugName._id}>{drug.drugName.drugName}</option>
                            ))}
                        
                        </select>

                        
                    </label>

                


                    <label>
                        Batch Number:
                        <input
                            type="text"
                            value={batchNumber}
                            onChange={(event) => setBatchNumber(event.target.value)}
                        />
                    </label>
                    <label>
                        Manufacture Date:
                        <input
                            type="date"
                            value={manufactureDate}
                            onChange={(event) => setManufactureDate(event.target.value)}
                        />
                    </label>
                    <label>
                        Expire Date:
                        <input
                            type="date"
                            value={expireDate}
                            onChange={(event) => setExpireDate(event.target.value)}
                        />
                    </label>
                    <label>
                        Quantity:
                        <input
                            type="number"
                            value={quantity}
                            onChange={(event) => setQuantity(event.target.value)}
                        />
                    </label>
                    <label>
                        Price:
                        <input
                            type="number"
                            value={price}
                            onChange={(event) => setPrice(event.target.value)}
                        />
                    </label>
                    <button type="submit">Add Batch</button>
                    {error && <p>{error}</p>}
                </form>

                </div>
                </div>
            )}
            </div>
            );
        }


        export default Batchmedicine ;
