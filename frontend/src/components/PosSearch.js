import React, { useState, useEffect } from 'react';

const POSSearch = ({ handleAddToBill }) => {
    const [drugs, setDrugs] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const [selectedDrug, setSelectedDrug] = useState(null);

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

    const handleAdd = () => {
        if (!selectedDrug) {
            setError('Please select a drug');
            return;
        }
        setError('');
        const drug = drugs.find(drug => drug.drugName === selectedDrug);
        if (drug) {
            const totalQuantity = drug.totalQuantity || 0;
            const price = drug.price || 0;
            if (totalQuantity <= 0) {
                setError('Selected drug is out of stock');
            } else {
                handleSearch(drug.drugName, price);
            }
        } else {
            setError('Selected drug not found');
        }
    };

    const filteredDrugs = drugs.filter(drug =>
        drug?.drugName?.toLowerCase().startsWith(searchTerm.toLowerCase())
    );

    return (
        <div className="p-4">
            
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for medicine"
                className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal mb-4"
            />
            
            {error && <div className="text-red-500 mb-4">{error}</div>}

            {searchTerm && (
                <div>
                    {filteredDrugs.map((drug, index) => (
                        <div key={index} className="flex items-center justify-between py-2">
                            <div>
                                <p className="text-lg font-semibold text-black mb-1">
                                    {drug.drugName} | Price: {drug.price} | Available: {drug.totalQuantity || 0}
                                </p>
                            </div>
                            <button 
                                onClick={() => handleAddToBill({ drugName: drug.drugName, price: drug.price })} 
                                className="bg-login1 hover:bg-login2 text-black hover:text-white px-4 py-2 rounded-md font-jakarta font-bold"
                            >
                                Add
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default POSSearch;



