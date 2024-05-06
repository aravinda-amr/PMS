import React, { useState, useEffect } from 'react';
import { useBillContext } from '../hooks/useBillContext';
import { FaTrash } from 'react-icons/fa';
import POSSearch from './PosSearch';
import BillTemplate from './BillTemplate';
import html2pdf from 'html2pdf.js';

const BillForm = () => {
    const { dispatch } = useBillContext();
    const [customerID, setCustomerID] = useState('');
    const [pharmacistID, setPharmacistID] = useState('');
    const [invoiceDate, setInvoiceDate] = useState('');
    const [medicines, setMedicines] = useState([]);
    const [generatedInvoiceID, setGeneratedInvoiceID] = useState();
    const [discountAmount, setDiscountAmount] = useState(0);
    const [subTotal, setSubTotal] = useState(0);
    const [grandTotal, setGrandTotal] = useState(0);
    const [showBillPopup, setShowBillPopup] = useState(false);
    const [error, setError] = useState('');
    const[customerIDError,setCustomerIDError]=useState('');
    const[pharmacistIDError,setPharmacistIDError]=useState('');
    
    useEffect(() => {
        // Calculate subtotal whenever medicines or their quantities change
        const total = medicines.reduce((acc, curr) => acc + (curr.price * curr.purchaseQuantity), 0);
        setSubTotal(total);
    }, [medicines]);

    useEffect(() => {
        // Set invoiceDate to today's date
        setInvoiceDate(new Date().toISOString().split('T')[0]);
    }, []);

    const handleAddToBill = (drug) => {
        const existingMedicineIndex = medicines.findIndex(item => item.drugName === drug.drugName);
    
        if (existingMedicineIndex !== -1) {
            const updatedMedicines = [...medicines];
            updatedMedicines[existingMedicineIndex].purchaseQuantity += 1;
            setMedicines(updatedMedicines);
        } else {
            const medicine = { drugName: drug.drugName, price: drug.price, purchaseQuantity: 1 };
            setMedicines([...medicines, medicine]);
        }
    };

    const handleGenerateBill = () => {
        setShowBillPopup(true);
    };

    const handleDeleteMedicine = (index) => {
        const updatedMedicines = [...medicines];
        updatedMedicines.splice(index, 1);
        setMedicines(updatedMedicines);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // const pharmacistIDRegex = /^AP\d{3}$/; // Regular expression to match "AP" followed by 3 digits
        // if (!pharmacistIDRegex.test(pharmacistID)) {
        //     setError('Pharmacist ID should start with "AP" followed by 3 digits.');
        //     return;
        // }
    
        // Validate customerID format (10 digits)
        const customerIDRegex = /^\d{10}$/;
        if (!customerIDRegex.test(customerID)) {
            setError('Customer ID should be a 10-digit phone number.');
            return;
        }
    
        const bill = {
            customerID,
            pharmacistID,
            invoiceDate,
            medicines: medicines.map(medicine => ({
                drugName: medicine.drugName,
                price: medicine.price,
                purchaseQuantity: medicine.purchaseQuantity
            })) 
        };

        try {
            const response = await fetch('/api/billing', {
                method: 'POST',
                body: JSON.stringify(bill),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                const json = await response.json();
                setError(json.error);
            } else {
                const data = await response.json();
                setGeneratedInvoiceID(data.invoiceID);
                setSubTotal(parseFloat(data.subTotal) || 0);
                setDiscountAmount(parseFloat(data.discountAmount) || 0);
                setGrandTotal(parseFloat(data.grandTotal) || 0);
                setError('');
                console.log('New bill added');
                dispatch({ type: 'CREATE_BILL', payload: bill });

                //Reduce quantity from the first batch in the drug schema/drugnames/:id/batches
            // Reduce quantity for each medicine in the list
            for (const medicine of medicines) {
                const responseBatch = await fetch(`/api/medicinenames/drugnames/${medicine.drugName}/batches`);
                if (responseBatch.ok) {
                    const batchData = await responseBatch.json();
                    if (batchData && batchData.batches && batchData.batches.length > 0) {
                        let remainingQuantity = medicine.purchaseQuantity;
                        for (const batch of batchData.batches) {
                            if (remainingQuantity > 0) {
                                const updatedQuantity = Math.max(0, batch.quantity - remainingQuantity);
                                remainingQuantity -= batch.quantity;
                                await fetch(`/api/drugouts/batches/${batch._id}`, {
                                    method: 'PATCH',
                                    body: JSON.stringify({ quantity: updatedQuantity }),
                                    headers: {
                                        'Content-Type': 'application/json'
                                    }
                                });
                                console.log(`Quantity updated for ${medicine.drugName}`);
                            } else {
                                break;
                            }
                        }
                    }
                }
            }
            }


        } catch (error) {
            console.error('Error:', error);
            setError('Failed to submit the form. Please try again later.');
        }
    };

    const handlePurchaseQuantityChange = (e, index) => {
        const updatedMedicines = [...medicines];
        const newQuantity = parseInt(e.target.value);

        if (!isNaN(newQuantity) && newQuantity >= 1) {
            updatedMedicines[index].purchaseQuantity = newQuantity;
            setMedicines(updatedMedicines);
        }
    };
    
    const handlePrintBillTemplate = () => {
        const printContents = document.getElementById('bill-content').innerHTML;
        const printWindow = window.open('', '_blank', 'height=600,width=800');
        
        printWindow.document.write('<html><head><title>Print</title>');
        printWindow.document.write('<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css">');
        printWindow.document.write('</head><body>');
        printWindow.document.write('<div class="max-w-custom mx-auto p-6 bg-white shadow-md rounded-lg">');
        printWindow.document.write(printContents);
        printWindow.document.write('</div>');
        printWindow.document.write('</body></html>');
        
        printWindow.document.close();
        
        setTimeout(() => {
            printWindow.print();
            }, 100);
        
        // Close the print window after 3 seconds even if print is canceled
        setTimeout(() => {
            printWindow.close();
        }, 3000);
    };
    
    
    

const handleDownload = () => {
        const content = document.getElementById('bill-content').innerHTML;
        const containerStyle = 'border: 2px; padding: 20px;';
        const options = {
            filename: `invoice_${generatedInvoiceID}.pdf`, 
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2 },
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };

        const printableContent = `<div style="${containerStyle}">${content}</div>`;
    
        html2pdf().from(printableContent).set(options).save();
    };

    const handleCloseBillPopup = () => {
        setShowBillPopup(false);
    };
 
    return (
        <div className="max-w-600 mx-50 p-6 bg-dark-blue shadow-md rounded-lg border-4 border-black">
            <h3 className="text-2xl font-semibold mb-4 text-white">Add a new Sale</h3>
            <POSSearch handleAddToBill={handleAddToBill} />

            {error && <div className="text-red-500 mt-2">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-4 gap-4 mb-4">
                    <div>
                        <label htmlFor="generatedInvoiceID" className="block text-sm font-semibold text-white">Generated Invoice ID:</label>
                        <p id="generatedInvoiceID" className="text-sm text-white">{generatedInvoiceID}</p>
                    </div>
                    <div>
                        <label htmlFor="customerID" className="block text-sm font-semibold text-white">Customer ID:</label>
                        <input
                            type="text"
                            id="customerID"
                            value={customerID}
                            onChange={(e) => {
                                setCustomerID(e.target.value);
                                if (e.target.value.length > 10) {
                                    setCustomerIDError('Customer ID should be a 10-digit phone number.');
                                } else {
                                    setCustomerIDError('');
                                }
                            }}
                            required
                            className={`input-field ${customerIDError && 'border-red-500'}`}
                        />
                        {customerIDError && <p className="text-red-500 text-sm mt-1">{customerIDError}</p>}
                    </div>
                    <div>
                        <label htmlFor="pharmacistID" className="block text-sm font-semibold text-white">Pharmacist Name:</label>
                        <input
                            type="text"
                            id="pharmacistID"
                            value={pharmacistID}
                            onChange={(e) => {
                                setPharmacistID(e.target.value);
                                // const pharmacistIDRegex = /^AP\d{3}$/;
                                // if (!pharmacistIDRegex.test(e.target.value)) {
                                //     setPharmacistIDError('Pharmacist ID should start with "AP" followed by 3 digits.');
                                // } else {
                                //     setPharmacistIDError('');
                                // }
                            }}
                            required
                            className={`input-field ${pharmacistIDError && 'border-red-500'}`}
                        />
                        {pharmacistIDError && <p className="text-red-500 text-sm mt-1">{pharmacistIDError}</p>}
                    </div>
                    <div>
                        <label htmlFor="invoiceDate" className="block text-sm font-semibold text-white">Invoice Date:</label>
                        <input
                            type="date"
                            id="invoiceDate"
                            value={invoiceDate}
                            onChange={(e) => setInvoiceDate(e.target.value)}
                            required
                            className="input-field"
                            min={new Date().toISOString().split('T')[0]}
                            max={new Date().toISOString().split('T')[0]} // Set max attribute to today's date
                        />
                    </div>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-2 text-white">Medicines</h4>
                    <table className="w-full mb-4">
                        <thead>
                            <tr>
                                <th className="px-4 py-2 text-white">Index</th>
                                <th className="px-4 py-2 text-white">Drug Name</th>
                                <th className="px-4 py-2 text-white">Unit Price</th>
                                <th className="px-4 py-2 text-white">Purchase Quantity</th>
                                <th className="px-4 py-2 text-white">Item Total</th>
                                <th className="px-4 py-2 text-white">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {medicines.map((medicine, index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2 text-white"style={{ width: "7%" }}>{index + 1}</td>
                                    <td className="border px-4 py-2 text-white"style={{ width: "16.67%" }}>{medicine.drugName}</td>
                                    <td className="border px-4 py-2 text-white"style={{ width: "16.67%" }}>{medicine.price.toFixed(2)}</td>
                                    <td className="border px-4 py-2 border-white"style={{ width: "16.67%" }}>
                                        <input
                                            type="number"
                                            value={medicine.purchaseQuantity}
                                            onChange={(e) => handlePurchaseQuantityChange(e, index)}
                                            required
                                            className="input-field w-full"
                                        />
                                    </td>
                                    <td className="border px-4 py-2 text-white"style={{ width: "16.67%" }}>{(medicine.price * medicine.purchaseQuantity).toFixed(2)}</td>
                                    <td className="border px-4 py-2 text-white"style={{ width: "7%" }}>
                                        <button onClick={() => handleDeleteMedicine(index)} className="text-red-500">
                                            <FaTrash />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-2 text-white">Subtotal: LKR{subTotal.toFixed(2)}</h4>
                </div>
                <button type="submit" className="bg-login1 hover:bg-login2 text-black font-bold px-4 py-1 rounded-lg font-jakarta cursor-pointer hover:transition-all">Checkout</button>
            </form>
            
            <div>
                <h4 className="text-lg font-semibold mb-2 text-white">Discount Amount: LKR{discountAmount.toFixed(2)}</h4>
            </div>
            <div>
                <h4 className="text-lg font-semibold mb-2 text-white">Grand Total: LKR{grandTotal.toFixed(2)}</h4>
            </div>
            <button onClick={handleGenerateBill} className="bg-login1 hover:bg-login2 text-black font-bold px-4 py-1 rounded-lg font-jakarta cursor-pointer hover:transition-all mt-4">
                Generate Bill
            </button>

            {showBillPopup && (
                <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-6 rounded-lg shadow-md w-1/4">
                        <BillTemplate
                            customerID={customerID}
                            pharmacistID={pharmacistID}
                            invoiceDate={invoiceDate}
                            medicines={medicines}
                            subTotal={subTotal}
                            discountAmount={discountAmount}
                            grandTotal={grandTotal}
                            generatedInvoiceID={generatedInvoiceID}
                        />
                        <div className="flex justify-between">
                            <button onClick={handlePrintBillTemplate} className="bg-login1 hover:bg-login2 text-white font-bold px-4 py-1 rounded-lg font-jakarta cursor-pointer hover:transition-all">Print</button>
                            <button onClick={handleDownload} className="bg-login1 hover:bg-login2 text-white font-bold px-4 py-1 rounded-lg font-jakarta cursor-pointer hover:transition-all">Download PDF</button>
                            <button onClick={handleCloseBillPopup} className="bg-login1 hover:bg-login2 text-white font-bold px-4 py-1 rounded-lg font-jakarta cursor-pointer hover:transition-all">Close</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BillForm;








