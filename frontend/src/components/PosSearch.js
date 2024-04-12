import React, { useState, useEffect } from 'react';

const POSSearch = ({ handleAddToBill }) => {
    const [drugs, setDrugs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDrugs = async () => {
            try {
                const response = await fetch('/api/medicinenames/drugnames/withprice');
                if (!response.ok) {
                    throw new Error('Failed to fetch drugs');
                }
                const data = await response.json();
                setDrugs(data);
            } catch (error) {
                setError('Error fetching drugs. Please try again later.');
                console.error('Error fetching drugs:', error.message);
            }
        };
        fetchDrugs();
    }, []);

    const handleSearch = (drugName, price) => {
        handleAddToBill({ drugName, price });
    };

    const handleAdd = (selectedDrug) => {
        
        if (!selectedDrug) {
            setError('Please select a drug');
            return;
        }
        setError('');
        const drug = drugs.find(drug => drug.drugName === selectedDrug);
        if (drug) {
            handleSearch(drug.drugName, drug.price || 0);
        } else {
            setError('Selected drug not found');
        }
    };

    const filteredDrugs = drugs.filter(drug =>
        drug?.drugName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <h1>POS Search</h1>
            
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for medicine"
            />
            
            {error && <div style={{ color: 'red' }}>{error}</div>}

            {searchTerm && (
            <div>
                {filteredDrugs.map((drug, index) => (
                    <div key={index}>
                        <span>{drug.drugName}</span>
                        <span>Price: {drug.price}</span>
                        <button onClick={() => handleAdd(drug.drugName)}>Add</button>
                    </div>
                ))}
            </div>
            )}
        </div>
    );
};

export default POSSearch;
