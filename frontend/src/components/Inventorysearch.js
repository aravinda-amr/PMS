import React, { useState, useEffect,useMemo  } from 'react';

const InventorySearch = ({onSuccess , medicinenames = []}) => {
    // const [drugs, setDrugs] = useState([]);
    const [selectedDrug, setSelectedDrug] = useState('');
    const [firstBatch, setFirstBatch] = useState(null);
    const [selectedDrugName, setSelectedDrugName] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    
  

    useEffect(() => {
        const fetchDrugs = async () => {
            try {
                const response = await fetch('/api/medicinenames/drugnames');
                if (!response.ok) {
                    throw new Error('Failed to fetch drugs');
                }
                // const data = await response.json();
                // setDrugs(data);
            } catch (error) {
                console.error('Error fetching drugs:', error.message);
            }
        };
        fetchDrugs();
    }, []);

    const handleSearch = async (event) => {
        event.preventDefault();
        if (!selectedDrug) {
            console.error('Please select a drug');
            return;
        }

        try {
            const response = await fetch(`/api/medicinenames/drugnames/${selectedDrug}/batches`); // Added `/` before `api`
            if (!response.ok) {
                throw new Error('Failed to fetch batch details');
            }
            const data = await response.json();
            setFirstBatch(data.firstBatch);
            setSelectedDrugName(data.drugName.drugName);

            // Call the onSuccess function passed from the parent component
            if (typeof onSuccess === 'function') {
                onSuccess();
            }

            console.log('Batch details fetched successfully:', data);
            
        } catch (error) {
            console.error('Error fetching batch details:', error.message);
        }
    };

    const handleDrugChange = (event) => {
        setSelectedDrug(event.target.value);
    };
    
    const filteredDrugs = useMemo(() => {
        return medicinenames.filter(drug =>
            drug.drugName.drugName.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [medicinenames, searchTerm]);

    return (
        <div>
            <h1>Search Inventory</h1>
            <form onSubmit={handleSearch}>
                <label htmlFor="drug">Select a drug:</label>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for a drug..."
                />
                <select value={selectedDrug} onChange={handleDrugChange}>
                    <option value="">Select Drug</option>
                    {filteredDrugs.map((drug) => (
                        <option key={drug.drugName._id} value={drug.drugName._id}>{drug.drugName.drugName}</option>
                    ))}
                </select>
                <button type="submit">Search</button>
            </form>

            {firstBatch && (
                <div>
                    <h2>Medicine Details:-</h2>
                    <p>Drug Name: {selectedDrugName}</p>
                    <p>Price: {firstBatch.price}</p>
                </div>
            )}
            
        </div>
    );
};

export default InventorySearch;
