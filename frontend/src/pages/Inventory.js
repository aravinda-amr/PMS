import React, { useState, useEffect } from 'react';
import { AiOutlineDelete, AiOutlineEdit ,AiFillDelete  } from 'react-icons/ai';
import {MdClose,MdDownload, MdNotifications} from "react-icons/md";
import MedicineForm from '../components/MedicineForm';
import Batchmedicine from '../components/Batchmedicine';
import BatchUpdateForm from '../components/BatchUpdateForm'; 
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import logo from '../images/logo-bw-2-nbg.png';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const Inventory = () => {
    const [medicinenames, setMedicinenames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedBatch, setSelectedBatch] = useState(null);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [notificationBatches, setNotificationBatches] = useState([]);
    const [showNotificationPopup, setShowNotificationPopup] = useState(false); 
  
    

    useEffect(() => {
        const fetchMedicinenames = async () => {
            try {
                const response = await fetch('/api/medicinenames/drugnames');//fetching medicinenames from the backend
                if (!response.ok) {
                    throw new Error('Failed to fetch medicinenames');
                }
                const data = await response.json();
                setMedicinenames(data);

                const newNotificationBatches = data
                .flatMap(medicine => medicine.batches.filter(batch => batch.quantity === 0))
                .map(batch => ({ medicine: batch.drugName, batch: batch.batchNumber }));
            setNotificationBatches(newNotificationBatches);


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

            // const newNotificationBatches = data
            //     .flatMap(medicine => medicine.batches.filter(batch => batch.quantity === 0))
            //     .map(batch => ({ medicine: batch.drugName, batch: batch.batchNumber }));
            // setNotificationBatches(newNotificationBatches);
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

            const handleDismissNotification = (batchNumber) => { //for dismissing a notification
                const updatedBatches = notificationBatches.filter(batch => batch.batch !== batchNumber);
                setNotificationBatches(updatedBatches);
            };


            

            //searching a medicine in the inventory
            const filteredMedicines = medicinenames.filter(medicine =>
                medicine.drugName.drugName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                medicine.batches.some(batch => batch.batchNumber.toLowerCase().includes(searchTerm.toLowerCase()))
            );

            const handleSearch = (e) => {
                setSearchTerm(e.target.value);
            };
            //searching a medicine in the inventory end here
             // updating total price of a medicine end here


             //generating a pdf of the inventory
           
            const generatePDF = () => {
                const doc = new jsPDF();
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(24);
            
                // Add logo at the center of the PDF
                const logoImg = new Image();
                logoImg.src = logo;
            
                // Calculate the x-coordinate to place the logo at the center
                const logoWidth = 40; // Adjust the width of the logo image as needed
                const pageWidth = doc.internal.pageSize.getWidth();
                const x = (pageWidth - logoWidth) / 2;
            
                doc.addImage(logoImg, 'PNG', x, 10, logoWidth, logoWidth * (40 / 40));
            
                // Display "Inventory Report" text under the logo
                doc.setFontSize(18);
                doc.text("Inventory Report", pageWidth / 2, 60, { align: 'center' });
            
                let y = 80; // Starting y-coordinate for drug names
            
                filteredMedicines.forEach(medicine => {
                    doc.setFontSize(18);
                    y += 10;
                    doc.text(`Drug Name: ${medicine.drugName.drugName}`, 14, y);
                    y += 8;
                    doc.setFontSize(14);
                    doc.text(`Total Quantity: ${medicine.drugName.totalquantity}`, 14, y);
            
                    const headers = [['Batch Number', 'Manufacture Date', 'Expire Date', 'Quantity', 'Price']];
                    const rows = medicine.batches.map(batch => [
                        batch.batchNumber,
                        new Date(batch.manufactureDate).toLocaleDateString(),
                        new Date(batch.expireDate).toLocaleDateString(),
                        batch.quantity,
                        batch.price
                    ]);
            
                    y += 10;
                    doc.autoTable({
                        startY: y,
                        head: headers,
                        body: rows,
                        theme: 'striped',
                        columnStyles: {
                            0: { cellWidth: 30 },
                            1: { cellWidth: 35 },
                            2: { cellWidth: 35 },
                            3: { cellWidth: 20 },
                            4: { cellWidth: 20 }
                        },
                        styles: {
                            fontSize: 12,
                            overflow: 'linebreak'
                        }
                    });
            
                    y = doc.autoTable.previous.finalY + 10;
                });
            
                const pageCount = doc.internal.getNumberOfPages();
                for (let i = 1; i <= pageCount; i++) {
                    doc.setPage(i);
                    doc.setFontSize(10);
                    doc.text(190, 10, `Page ${i} of ${pageCount}`, null, null, 'right');
                }
            
                const date = new Date().toLocaleDateString();
                const time = new Date().toLocaleTimeString();
                doc.setFontSize(10);
                doc.text(`Generated on: ${date} at ${time}`, 14, doc.internal.pageSize.height - 10);
            
                doc.save("inventory_report.pdf");
            };

            //generating a pdf of the inventory end here

    return (
        <div className="ml-64">
            
            <h1 className="text-3xl font-bold mb-4">Inventory</h1> 
             

             
            <div className="flex space-x-4 ml-5  mt-4 mr-6">
                <MedicineForm onSuccess={handleAddBatchSuccess} />
                <Batchmedicine onSuccess={handleAddBatchSuccess} onUpdateDrugs={handleAddMedicineSuccess}/>


                
            </div>

            <div className="relative mb-4 flex justify-end">
            <div className="flex items-center">


                <div className="mr-8" onClick={() => setShowNotificationPopup(!showNotificationPopup)}>
                        <MdNotifications size={38} className="text-yellow-500" />
                        <span className="text-yellow-500 text-sm">{notificationBatches.length}</span>
                    </div>
                    
                     
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


                {showNotificationPopup && notificationBatches.length > 0 && (
                     <div className="fixed top-40 left-80 w-full h-full flex items-start justify-center bg-gray-800 bg-opacity-75">
                     <div className="bg-white p-8 rounded-xl w-96 relative border-4 border-black" >
                    {notificationBatches.map((notification, index) => (
                        <div key={index}>
                            <p className="font-semibold text-lg">Batch {notification.batch}</p>
                            <p className="text-sm">Quantity is 0</p>
                            <button onClick={() => handleDismissNotification(notification.batch)} className="btn bg-signup1 hover:bg-signup2 hover:text-white mr-2 px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all">Dismiss</button>
                        </div>
                    ))}
                </div>
            </div>
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
                                    <td className="text-center text-lg">{parseFloat(batch.price).toFixed(2)}</td>
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

        
        </div>
    );
};

export default Inventory; 