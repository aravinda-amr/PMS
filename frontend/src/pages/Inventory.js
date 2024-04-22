import React, { useState, useEffect } from 'react';
import { AiOutlineDelete, AiOutlineEdit ,AiFillDelete  } from 'react-icons/ai';
import {MdClose,MdDownload} from "react-icons/md";
import MedicineForm from '../components/MedicineForm';
import Batchmedicine from '../components/Batchmedicine';
import InventorySearch from '../components/Inventorysearch';
import BatchUpdateForm from '../components/BatchUpdateForm'; 
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import  BarChart from '../components/BarChart';
import TotalPriceTable from '../components/TotalPriceTable';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const Inventory = () => {
    const [medicinenames, setMedicinenames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedBatch, setSelectedBatch] = useState(null);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [showBarChart, setShowBarChart] = useState(false); // State variable to control the visibility of the bar chart
    

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
    // Function to fetch updated medicinenames end here

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
    // Function to fetch updated medicinenames end here


    // Function to handle successful batch addition
    const handleAddBatchSuccess = () => {//
        fetchMedicinenames();
    };

    const handleAddMedicineSuccess = () => {
        fetchMedicinenames(); // Fetch updated list of medicines
    };

    const TotalPriceSuccess = () => {
        fetchMedicinenames(); // Fetch updated list of medicines
    };

    // Display loading spinner while fetching data
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
            const response = await fetch(`/api/drugouts/batches/${batchId}`,{
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

          
            // Calculate total price of a medicine   
            const calculateTotalPrice = (medicine) => {
                let totalPrice = 0;
                medicine.batches.forEach((batch) => {
                    totalPrice += batch.quantity * batch.price;
                });
                return totalPrice;
            };
            // Calculate total price of a medicine end here
            


            

            //updating total price of a medicine
            const updateTotalPrice = async (medicineId, totalPrice) => {
                        try {
                            const response = await fetch(`api/medicinenames/drugnames/updateTotalPrice/${medicineId}`, {
                            method: 'PATCH',
                            headers: {
                            'Content-Type': 'application/json',
                            },
                                body: JSON.stringify({ totalPrice }),
                            });
                                if (response.ok) {
                                    alert('Update Success.');
                                    console.log('Total price updated successfully');
                                } else {
                                    console.error('Error updating total price:', response.statusText);
                                        }
                                } catch (error) {
                                    console.error('Error updating total price:', error.message);
                                }
                            };
             // updating total price of a medicine end here


             //generating a pdf of the inventory
             const generatePDF = () => {
                const doc = new jsPDF();
                doc.setFontSize(20); 
                doc.text("Inventory Report", 14, 10,);
                let y = 20;// Initial Y position of the report contentSet the initial y-coordinate for the content
            
                filteredMedicines.forEach(medicine => {
                    doc.setFontSize(14);
                    doc.text(`Drug Name: ${medicine.drugName.drugName}`, 14, y);
                    y += 10;// Add space between lines
                    doc.text(`Total Quantity: ${medicine.drugName.totalquantity}`, 14, y);
                    y += 10;// Add space between lines Move to the next line
            
                    // Define the table headers
                    const headers = [['Batch Number', 'Manufacture Date', 'Expire Date', 'Quantity', 'Price']];
            
                    // Map batch details to table rows
                    const rows = medicine.batches.map(batch => {
                        return [batch.batchNumber, new Date(batch.manufactureDate).toLocaleDateString(), new Date(batch.expireDate).toLocaleDateString(), batch.quantity, batch.price];
                    });
            
                    // Set up the table
                    doc.autoTable({
                        startY: y,// Start Y position of the table
                        head: headers,
                        body: rows,
                        theme: 'grid',
                        columnStyles: {
                            0: { cellWidth: 40 },// Set width of Batch Number column
                            1: { cellWidth: 40 },
                            2: { cellWidth: 40 },
                            3: { cellWidth: 25 },
                            4: { cellWidth: 25 }
                        },
                        styles: {
                            fontSize: 10,
                            overflow: 'linebreak', // To handle text wrapping
                            columnWidth: 'wrap'
                        }
                    });
            
                    // Add space between medicine entries
                    y = doc.autoTable.previous.finalY + 10;
                });
            
                doc.save("inventory_report.pdf");
            };
            //generating a pdf of the inventory end here

            


            



    return (
        <div className="ml-64">
            
            <h1 className="text-3xl font-bold mb-4">Inventory</h1> 
             

             
            <div className="flex space-x-4 ml-5  mt-4 mr-6">
                <MedicineForm onSuccess={handleAddBatchSuccess} />
                <Batchmedicine onSuccess={handleAddBatchSuccess} onUpdateDrugs={handleAddMedicineSuccess}/>

                <button  className="btn bg-login1 hover:bg-login2 hover:text-white mr-2 px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all" onClick={() => setShowBarChart(!showBarChart)}>View Price</button>
                
            </div>

            <div className="relative mb-4 flex justify-end">
            <div className="flex items-center">
                    
                     
                   <button onClick={generatePDF} className="mr-6">
                    <MdDownload size={48}/>
                    </button> 
            

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
                    <button onClick={() => handleDeleteMedicine(medicine.drugName._id)}className="text-red-600 " style={{ fontSize: '24px' }}><AiFillDelete /></button>
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

      {/* Button to toggle the visibility of the bar chart */}
      
        {/* Display bar chart if showBarChart state is true */}
        {showBarChart && (
         <div className="fixed top-40 left-12  w-full h-full flex items-start justify-center bg-gray-800 bg-opacity-75">
         <div className="bg-white p-8 rounded-lg" style={{ width: '80vw', height: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
         <span className="absolute top-0 right-0 p-2 cursor-pointer"  onClick={() => setShowBarChart(!showBarChart)}><MdClose className="text-gray-500 hover:text-gray-700 text-lg" style={{ fontSize: '24px' }}/></span>
        <h2 className="text-2xl font-bold mb-4">Total Medicine Price by Bar Chart</h2>
        <BarChart
            data={medicinenames.map((medicine) => ({
                name: medicine.drugName.drugName,
                newtotalPrice: calculateTotalPrice(medicine),
                fixtotalPrice: medicine.drugName.totalPrice,
            }))}
        />
        {/* Render TotalPriceTable inside showBarChart */}
        <TotalPriceTable medicinenames={medicinenames} onUpdateTotalPrice={updateTotalPrice} onSuccess={TotalPriceSuccess} />
                {/* Total price table end here */}
      </div>
    </div>
    
     )}

        {/* Total price table */}
        {/* <TotalPriceTable medicinenames={medicinenames} onUpdateTotalPrice={updateTotalPrice} /> */}
        {/* Total price table end here */}

        

            
        </div>
    );
};

export default Inventory; 