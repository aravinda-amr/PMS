import React, { useState, useEffect } from 'react';
import MedicineForm from '../components/MedicineForm';
import Batchmedicine from '../components/Batchmedicine';
import InventorySearch from '../components/Inventorysearch';

const Inventory = () => {
    const [medicinenames, setMedicinenames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMedicinenames = async () => {
            try {
                const response = await fetch('/api/medicinenames/drugnames');
                if (!response.ok) {
                    throw new Error('Failed to fetch medicinenames');
                }
                const data = await response.json();
                setMedicinenames(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchMedicinenames();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }
   
    const calculateQuantitySum = (batches) => {
        return batches.reduce((total, batch) => total + batch.quantity, 0);
      };
   
    return (
        <div className="ml-64">

            <h1>Inventory</h1> 

                 <br></br>
            {medicinenames.map((medicine) => (
                <div key={medicine.drugName._id} className="medicine">

     <h1 style={{ fontWeight: 'bold' }}>Drug Name: {medicine.drugName.drugName}</h1>
                    <br></br>
                    <table>
                        <thead>
                            <tr>
                                <th>Batch Number</th>
                                <th>Manufacture Date</th>
                                <th>Expire Date</th>
                                <th>Quantity</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {medicine.batches.map((batch) => (
                                <tr key={batch._id}>
                                    <td>{batch.batchNumber}</td>
                                    <td>{new Date(batch.manufactureDate).toLocaleDateString()}</td>
                                    <td>{new Date(batch.expireDate).toLocaleDateString()}</td>
                                    <td>{batch.quantity}</td>
                                    <td>{batch.price}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <p>Total Quantity:{calculateQuantitySum(medicine.batches)}</p>
                    <br></br>
                </div>
            ))}

            <MedicineForm />
            <br></br>
            <Batchmedicine/> 
            <br></br>
            <InventorySearch/>
          
            
        </div>
    );
};

export default Inventory;
