import React, { useState, useEffect } from 'react'; // Add useEffect
import {MdClose} from "react-icons/md";
import CircularProgress from '@mui/material/CircularProgress';

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
    const [loading, setLoading] = useState(false); 
   
    

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
        setLoading(true);

        
    // const selectedDrugObject = drugs.find(drug => drug.drugName._id === selectedDrug);
    // const drugNameFirstTwoLetters = selectedDrugObject.drugName.drugName.substring(0, 2);
    // const newBatchNumber = `${drugNameFirstTwoLetters}-${batchNumber}`;

    // Convert manufactureDate and expireDate to Date objects
    const manufactureDateObj = new Date(manufactureDate);
    const expireDateObj = new Date(expireDate);

    // Get the current date
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    // Check if the expireDate is not earlier than the manufactureDate
    if (expireDateObj < manufactureDateObj) {
        setError('Expiration date must not be earlier than manufacture date.');
        setLoading(false);
        return;
    }

    // Check if the expireDate is not the current date
    if (expireDateObj <= currentDate) {
        setError('Expiration date must not be the current date or earlier.');
        setLoading(false);
        return;
    }

    if (manufactureDateObj > currentDate) {
        setError("Manufacture date cannot be later than today's date.");
        setLoading(false);
        return;
    }

    if (quantity <= 0) {
        setError("Quantity must be greater than 0.");
        setLoading(false);
        return;
    }

    if (price <= 0) {
        setError("Price must be greater than 0.");
        setLoading(false);
        return;
    }

    // Check if price is entered with 2 decimal places
    const priceWithTwoDecimals = parseFloat(price).toFixed(2);
    if (isNaN(priceWithTwoDecimals) || priceWithTwoDecimals !== price) {
        setError("Price should be entered with 2 decimal places.");
        setLoading(false);
        return;
    }


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

            if (typeof onSuccess === 'function') { // Check if the prop is a function
                onSuccess(); // Call the function
            }

            if (typeof onUpdateDrugs === 'function') { // Check if the prop is a function
                onUpdateDrugs();  // Call the function
            }

            
    
            console.log('Batch added successfully');
            
        } catch (error) { // Catch any errors and update the error state
            setError(error.message);
            console.error('Error adding batch:', error);
            alert('Please enter details correctly ,check batch number to add a new batch.');
        }finally {
            setLoading(false); // Stop loading
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
                <div className="bg-white p-8 rounded-xl w-96 relative border-4 border-black" style={{ width: '40vw', height: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
                   

        <form className="space-y-4 flex-grow" onSubmit={handleSubmit} style={{ overflow: 'auto', textAlign: 'center' }}>
        <span className="absolute top-0 right-0 p-2 cursor-pointer" onClick={() => setShowPopup(false)}><MdClose className="text-gray-500 hover:text-gray-700 text-lg" style={{ fontSize: '24px' }}/></span>
            <h2 className="text-2xl font-bold mb-4">Add Batch Details:-</h2>
            <div className="flex flex-col space-y-2">
            <label className="flex flex-col text-left">
                Select Drug:
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search for a drug..."
                    className="appearance-none border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    style={{ fontSize: '18px' }}
                />
            <select value={selectedDrug} onChange={(e) => setSelectedDrug(e.target.value)}
             className="input">
                    <option value="">Select Drug</option>
                    {filteredDrugs.map((drug) => (
                        <option key={drug.drugName._id} value={drug.drugName._id}>{drug.drugName.drugName}</option>
                    ))}
                
                </select>

                
            </label>

        


            <label className="flex flex-col text-left">
                Batch Number:
                <input
                    type="text"
                    value={batchNumber}
                    onChange={(event) => setBatchNumber(event.target.value)}
                    className="appearance-none border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    style={{ fontSize: '18px' }}
                />
            </label>
            <label className="flex flex-col text-left">
                Manufacture Date:
                <input
                    type="date"
                    value={manufactureDate}
                    onChange={(event) => setManufactureDate(event.target.value)}
                    required
                    max={new Date().toISOString().split('T')[0]} // Set max attribute to today's date
                    className="appearance-none border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    style={{ fontSize: '18px' }}
                />
            </label>
            <label className="flex flex-col text-left">
                Expire Date:
                <input
                    type="date"
                    value={expireDate}
                    onChange={(event) => setExpireDate(event.target.value)}
                    className="appearance-none border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    style={{ fontSize: '18px' }}
                    min={(new Date(Date.now() + 24 * 60 * 60 * 1000)).toISOString().split('T')[0]}// Set min attribute to tomorrow's date
                />
            </label>
            <label className="flex flex-col text-left">
                Quantity:
                <input
                    type="number"
                    value={quantity}
                    onChange={(event) => setQuantity(event.target.value)}
                    min="1"
                    className="appearance-none border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    style={{ fontSize: '18px' }}
                />
            </label>
            <label className="flex flex-col text-left">
                Price:
                <input
                    type="number"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    className="appearance-none border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    style={{ fontSize: '18px' }}
                />
                </label>
            </div>
            {loading ? (
                                <div className="flex justify-center">
                                    <CircularProgress />
                                </div>
                            ) : (
                                <div>
                                    <button type="submit" className="btn bg-login1 hover:bg-login2 hover:text-white px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all" style={{ fontSize: '19px', marginBottom: '5px' }}>Add Batch</button>
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


export default Batchmedicine ;
