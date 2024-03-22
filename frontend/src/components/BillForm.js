// BillForm.js
import { useState } from 'react';
import { useBillContext } from '../hooks/useBillContext';

const BillForm = () => {
    const{dispatch} = useBillContext();
    const [customerID, setCustomerID] = useState('');
    const [pharmacistID, setPharmacistID] = useState('');
    const [invoiceDate, setInvoiceDate] = useState('');
    const [medicines, setMedicines] = useState([]);
    const [drugName, setDrugName] = useState('');
    const [unitPrice, setUnitPrice] = useState('');
    const [purchaseQuantity, setPurchaseQuantity] = useState('');
    const [discount, setDiscount] = useState('');
    const [error, setError] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [generatedInvoiceID, setGeneratedInvoiceID] = useState(null);

    
    


    const handleSubmit = async (e) => {
        e.preventDefault();

        const bill = { customerID, pharmacistID, invoiceDate, medicines, discount };

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

                // Reset form fields on successful submission
                
                setCustomerID('');
                setPharmacistID('');
                setInvoiceDate('');
                setMedicines([]);
                setDrugName('');
                setUnitPrice('');
                setPurchaseQuantity('');
                setDiscount('');
                setError('');
                console.log('New bill added');
                dispatch({ type: 'CREATE_BILL', payload: bill });
            }
        } catch (error) {
            console.error('Error:', error);
            setError('Failed to submit the form. Please try again later.');
        }
    };

    
    return (
        <div className="p-4 ">
            <h3 className="text-lg font-semibold mb-4">Add a new Sale</h3>
            <div className="relative mb-4">
            <input
                type="text"
                placeholder="Search for medicine..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-1 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
           
            </div>
            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-4 gap-1 mb-4">
                    <div>
                    <label className="block">Generated Invoice ID:</label>
                    <p className="text-sm font-semibold">{generatedInvoiceID}</p>
                    </div>
                    <div>
                        <label htmlFor="customerID" className="block">Customer ID</label>
                        <input
                            type="text"
                            id="customerID"
                            value={customerID}
                            onChange={(e) => setCustomerID(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="pharmacistID" className="block">Pharmacist ID</label>
                        <input
                            type="text"
                            id="pharmacistID"
                            value={pharmacistID}
                            onChange={(e) => setPharmacistID(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label htmlFor="invoiceDate" className="block">Invoice Date</label>
                        <input
                            type="date"
                            id="invoiceDate"
                            value={invoiceDate}
                            onChange={(e) => setInvoiceDate(e.target.value)}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                        />
                    </div>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-2">Medicines</h4>
                    <table className="w-full mb-4">
                    <thead>
                            <tr>
                                <th className="px-4 py-2">Drug Name</th>
                                <th className="px-4 py-2">Unit Price</th>
                                <th className="px-4 py-2">Purchase Quantity</th>
                                <th className="px-4 py-2">Item Total</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
            <td className="border px-4 py-2">
                <input
                    type="text"
                    value={drugName}
                    onChange={(e) => setDrugName(e.target.value)}
                    required
                    className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
            </td>
            <td className="border px-4 py-2">
                <input
                    type="number"
                    value={unitPrice}
                    onChange={(e) => setUnitPrice(e.target.value)}
                    required
                    className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
            </td>
            <td className="border px-4 py-2">
                <input
                    type="number"
                    value={purchaseQuantity}
                    onChange={(e) => setPurchaseQuantity(e.target.value)}
                    required
                    className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
            </td>
            <td className="border px-4 py-2">
                <input
                    type="number"
                    value={unitPrice * purchaseQuantity}
                    readOnly
                    className="w-full px-3 py-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                />
            </td>
        </tr>
    </tbody>
                    </table>
                </div>
                <button type="submit" className="bg-blue-500 text-blue px-4 py-2 rounded-md">Checkout</button>
                {error && <div className="text-red-500 mt-2">{error}</div>}
            </form>
        </div>
    );
};

export default BillForm;
