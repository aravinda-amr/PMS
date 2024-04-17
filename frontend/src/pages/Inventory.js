    import React, { useState, useEffect } from 'react';
    import { AiOutlineDelete, AiOutlineEdit ,AiFillDelete  } from 'react-icons/ai';
    import {MdClose} from "react-icons/md";
    import MedicineForm from '../components/MedicineForm';
    import Batchmedicine from '../components/Batchmedicine';
    import InventorySearch from '../components/Inventorysearch';
    import BatchUpdateForm from '../components/BatchUpdateForm'; 
    import TextField from '@mui/material/TextField';
    import CircularProgress from '@mui/material/CircularProgress';


    const Inventory = () => {
        const [medicinenames, setMedicinenames] = useState([]);
        const [loading, setLoading] = useState(true);
        const [error, setError] = useState(null);
        const [selectedBatch, setSelectedBatch] = useState(null);
        const [showUpdateForm, setShowUpdateForm] = useState(false);
        const [searchTerm, setSearchTerm] = useState('');
        

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
            return (
                <div className="flex justify-center items-center h-screen">
                    <CircularProgress />
                </div>
            );
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

            //updating a batch in the inventory
                const handleUpdateButtonClick = (batchId) => {// for updating a batch
                    setSelectedBatch(batchId);
                    setShowUpdateForm(true);
                };

                const handleCloseUpdateForm = () => { //for closing the update form
                    setSelectedBatch(null);
                    setShowUpdateForm(false);
                };
                //updating a batch in the inventory end here
                

                //searching a medicine in the inventory
                const filteredMedicines = medicinenames.filter(medicine => 
                    medicine.drugName.drugName.toLowerCase().startsWith(searchTerm.toLowerCase())
                );

                const handleSearch = (e) => {
                    setSearchTerm(e.target.value);
                };
                //searching a medicine in the inventory end here



        return (
            <div className="ml-64">
                <h1 className="text-3xl font-bold mb-4">Inventory</h1> 
                <div className="flex space-x-4 ml-5 absolute mt-4 mr-6">
                    <MedicineForm onSuccess={handleAddBatchSuccess} />
                    <Batchmedicine onSuccess={handleAddBatchSuccess} onUpdateDrugs={handleAddMedicineSuccess} />
                </div>
                <div className="relative mb-4 flex justify-end">
                <div className="flex items-center">
                        <div className="flex items-center mr-10 ">
                        <TextField
                        label="Search medicine..."
                        variant="outlined"
                        size="small"
                        value={searchTerm}
                        onChange={handleSearch} 
                        // className="border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 mr-10"
                        />

                    </div>

                    </div>

                    {searchTerm && (
                        <button 
                            onClick={() => setSearchTerm('')} 
                            className="absolute right-8 top-0 mt-2 mr-3 text-gray-500 hover:text-gray-700 bg-white rounded-full p-1 "
                        >
                          <MdClose/>
                        </button>
                    )}
                    
           
                    
            </div>
              

                    
                {filteredMedicines.map((medicine) => (
                    <div key={medicine.drugName._id} className=" ml-8 mr-8 medicine  border-gray-300 rounded-lg px-8 py-6 mb-8 bg-dark-blue text-white" >

                <h2 style={{ fontWeight: 'bold',fontSize: '23px' }}>Drug Name: {medicine.drugName.drugName}</h2>
                    <h2 className="text-lg">Total Quantity: {medicine.drugName.totalquantity}</h2>      
                    <br></br>          
                                <table className="w-full">
                                    <thead>
                                        <tr>
                                            <th >Batch Number</th>
                                            <th>Manufacture Date</th>
                                            <th>Expire Date</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                            </thead>
                            <tbody>
                                {medicine.batches.map((batch) => (
                                    <tr key={batch._id} >
                                        <td className="text-center text-lg">{batch.batchNumber}</td>
                                        <td className="text-center text-lg">{new Date(batch.manufactureDate).toLocaleDateString()}</td>
                                        <td className="text-center text-lg">{new Date(batch.expireDate).toLocaleDateString()}</td>
                                        <td className="text-center text-lg">{batch.quantity}</td>
                                        <td className="text-center text-lg">{batch.price}</td>
                                        <td className="text-center text-lg"><button onClick={() => handleDeleteBatch(batch._id)} className="text-red-600"> <AiOutlineDelete /> </button></td>
                                        <td>
                                        <button onClick={() => handleUpdateButtonClick(batch._id)} className="text-blue-600"> <AiOutlineEdit /></button>
                                        </td>
                                        
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        
                        <br></br>
                        <button onClick={() => handleDeleteMedicine(medicine.drugName._id)}className="text-red-600 "><AiFillDelete /></button>
                    </div>
                ))}
                <div className="flex space-x-4 ml-5 absolute mt-4 mr-6">
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
                </div>

                <InventorySearch  medicinenames={medicinenames}/>

            

                
            </div>
        );
    };

    export default Inventory; 