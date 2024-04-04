import React, { useState, useEffect } from 'react';
import { AiOutlineDelete, AiOutlineEdit ,AiFillDelete  } from 'react-icons/ai';
import MedicineForm from '../components/MedicineForm';
import Batchmedicine from '../components/Batchmedicine';
import InventorySearch from '../components/Inventorysearch';
import BatchUpdateForm from '../components/BatchUpdateForm'; 


const Inventory = () => {
    const [medicinenames, setMedicinenames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedBatch, setSelectedBatch] = useState(null);
    const [showUpdateForm, setShowUpdateForm] = useState(false);

    useEffect(() => {
        const fetchMedicinenames = async () => {
            try {
                const response = await fetch('/api/medicinenames/drugnames');//fetching medicinenames from the backend
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

     // Function to fetch updated medicinenames after adding a batch
     const fetchMedicinenames = async () => {
        try {
            const response = await fetch('/api/medicinenames/drugnames');//fetching updated medicinenames from the backend
            if (!response.ok) {
                throw new Error('Failed to fetch updated medicinenames');
            }
            const data = await response.json();
            setMedicinenames(data);
        } catch (error) {
            console.error('Error fetching updated medicinenames:', error.message);
        }
    };

    const handleAddBatchSuccess = () => {
        fetchMedicinenames();
    };

    const handleAddMedicineSuccess = () => {
        fetchMedicinenames(); // Fetch updated list of medicines
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

     //deleting a medicine from the inventory
     const handleDeleteMedicine = async (medicineId) => {
        try {
            const response = await fetch(`/api/medicinenames/drugnames/${medicineId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchMedicinenames(); 
                console.log('Medicine deleted successfully');
            } else {
                console.error('Error deleting medicine:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting medicine:', error.message);
        }
    };
    //deleting a batch from the inventory


    //deleting a batch from the inventory
    const handleDeleteBatch = async (batchId) => {
        try {
            const response = await fetch(`/api/drugouts/batches/${batchId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                fetchMedicinenames(); 
                console.log('Batch deleted successfully');
            } else {
                console.error('Error deleting batch:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting batch:', error.message);
        }
    };
    //deleting a batch from the inventory


    //updating a batch in the inventory
   
    const updateBatch = async (batchId, newData) => {
        try {
            const response = await fetch(`/api/drugouts/batches/${batchId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newData),
            });
            if (response.ok) {
                fetchMedicinenames();
                console.log('Batch updated successfully');
            } else {
                console.error('Error updating batch:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating batch:', error.message);
        }
    };
    //updating a batch in the inventory end here
    const handleUpdateButtonClick = (batchId) => {// for updating a batch
        setSelectedBatch(batchId);
        setShowUpdateForm(true);
    };

    const handleCloseUpdateForm = () => { //for closing the update form
        setSelectedBatch(null);
        setShowUpdateForm(false);
    };
    //updating a batch in the inventory end here



   
    return (
        <div className="ml-64">

            <h1>Inventory</h1> 
                 <br></br>
            {medicinenames.map((medicine) => (
                <div key={medicine.drugName._id} className="medicine">

     <h1 style={{ fontWeight: 'bold' }}>Drug Name: {medicine.drugName.drugName}</h1>
        <h2>Total Quantity: {medicine.drugName.totalquantity}</h2> 
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
                                    <td><button onClick={() => handleDeleteBatch(batch._id)}> <AiOutlineDelete /> </button></td>
                                    <td>
                                    <button onClick={() => handleUpdateButtonClick(batch._id)}>  <AiOutlineEdit /></button>
                                    </td>
                                    
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    <br></br>
                    <button onClick={() => handleDeleteMedicine(medicine.drugName._id)}><AiFillDelete /></button>
                </div>
            ))}

{showUpdateForm && (
    <BatchUpdateForm
        batchId={selectedBatch}
        onUpdate={updateBatch}
        onClose={handleCloseUpdateForm}
        initialData={medicinenames.reduce((acc, currMedicine) => {
            const batchToUpdate = currMedicine.batches.find(batch => batch._id === selectedBatch);
            if (batchToUpdate) {
                acc = {
                    batchNumber: batchToUpdate.batchNumber,
                    manufactureDate: batchToUpdate.manufactureDate,
                    expireDate: batchToUpdate.expireDate,
                    quantity: batchToUpdate.quantity,
                    price: batchToUpdate.price
                };
            }
            return acc;
        }, {})}
    />
)}


            <MedicineForm onSuccess={handleAddBatchSuccess}/>
            <br></br>
            <Batchmedicine onSuccess={handleAddBatchSuccess} onUpdateDrugs={handleAddMedicineSuccess}/> 
            <br></br>
            <InventorySearch  medicinenames={medicinenames}/>

          

            
        </div>
    );
};

export default Inventory;