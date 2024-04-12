import React, { useState } from 'react';
import { useBillContext } from '../hooks/useBillContext';
import { FaTrash } from 'react-icons/fa';
import POSSearch from './PosSearch';

const BillForm = () => {
    const { dispatch } = useBillContext();
    const [customerID, setCustomerID] = useState('');
    const [pharmacistID, setPharmacistID] = useState('');
    const [invoiceDate, setInvoiceDate] = useState('');
    const [medicines, setMedicines] = useState([]);
    const [generatedInvoiceID, setGeneratedInvoiceID] = useState(null);
    const [subTotal, setSubTotal] = useState(0);
    const [couponCode, setCouponCode] = useState(''); 
    const [discountPercentage, setDiscountPercentage] = useState(0);
    const [error, setError] = useState('');

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

    const handleDeleteMedicine = (index) => {
        const updatedMedicines = [...medicines];
        updatedMedicines.splice(index, 1);
        setMedicines(updatedMedicines);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        const bill = {
            customerID,
            pharmacistID,
            invoiceDate,
            medicines: medicines.map(medicine => ({
                drugName: medicine.drugName,
                price: medicine.price,
                purchaseQuantity: medicine.purchaseQuantity
            })),
            couponCode
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
                setError('');
                console.log('New bill added');
                dispatch({ type: 'CREATE_BILL', payload: bill });
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

    // Function to apply coupon after checkout
    const applyCoupon = async () => {
        try {
            const couponValidationResponse = await fetch(`/api/billing/validate-coupon/${couponCode}`);
            if (couponValidationResponse.ok) {
                const couponData = await couponValidationResponse.json();
                setDiscountPercentage(parseFloat(couponData.discount) || 0);
            } else {
                setError('Invalid coupon code');
            }
        } catch (error) {
            console.error('Error applying coupon:', error);
            setError('Failed to apply coupon. Please try again later.');
        }
    };

    return (
        <div>
            <h3>Add a new Sale</h3>
            <POSSearch handleAddToBill={handleAddToBill} />

            {error && <div className="text-red-500 mt-2">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-4 gap-4 mb-4">
                    <div>
                        <label htmlFor="generatedInvoiceID" className="block">Generated Invoice ID:</label>
                        <p id="generatedInvoiceID" className="text-sm font-semibold">{generatedInvoiceID}</p>
                    </div>
                    <div>
                        <label htmlFor="customerID" className="block">Customer ID:</label>
                        <input
                            type="text"
                            id="customerID"
                            value={customerID}
                            onChange={(e) => setCustomerID(e.target.value)}
                            required
                            className="input-field"
                        />
                    </div>
                    <div>
                        <label htmlFor="pharmacistID" className="block">Pharmacist ID:</label>
                        <input
                            type="text"
                            id="pharmacistID"
                            value={pharmacistID}
                            onChange={(e) => setPharmacistID(e.target.value)}
                            required
                            className="input-field"
                        />
                    </div>
                    <div>
                        <label htmlFor="invoiceDate" className="block">Invoice Date:</label>
                        <input
                            type="date"
                            id="invoiceDate"
                            value={invoiceDate}
                            onChange={(e) => setInvoiceDate(e.target.value)}
                            required
                            className="input-field"
                        />
                    </div>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-2">Medicines</h4>
                    <table className="w-full mb-4">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Index</th>
                                <th className="px-4 py-2">Drug Name</th>
                                <th className="px-4 py-2">Unit Price</th>
                                <th className="px-4 py-2">Purchase Quantity</th>
                                <th className="px-4 py-2">Item Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {medicines.map((medicine, index) => (
                                <tr key={index}>
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">
                                        <input
                                            type="text"
                                            value={medicine.drugName}
                                            readOnly
                                            className="input-field"
                                        />
                                    </td>
                                    <td className="border px-4 py-2">
                                        <input
                                            type="number"
                                            value={medicine.price}
                                            readOnly
                                            className="input-field"
                                        />
                                    </td>
                                    <td className="border px-4 py-2">
                                        <input
                                            type="number"
                                            value={medicine.purchaseQuantity}
                                            onChange={(e) => handlePurchaseQuantityChange(e, index)}
                                            required
                                            className="input-field"
                                        />
                                    </td>
                                    <td className="border px-4 py-2">
                                        <input
                                            type="number"
                                            value={(medicine.price * medicine.purchaseQuantity).toFixed(2)}
                                            readOnly
                                            className="input-field"
                                        />
                                    </td>
                                    
                                    <button onClick={() => handleDeleteMedicine(index)}>
                                        <FaTrash />
                                    </button>
                                
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <button type="submit" className="btn-primary">Checkout</button>
            </form>
            <div>
                <h4 className="text-lg font-semibold mb-2">Subtotal: LKR{subTotal.toFixed(2)}</h4>
            </div>
            <div>
                <label htmlFor="couponCode" className="block">Coupon Code:</label>
                <input
                    type="text"
                    id="couponCode"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="input-field"
                />
                <button onClick={applyCoupon} className="btn-primary">Apply Coupon</button>
            </div>
            <div>
                <label htmlFor="discount" className="block">Discount:{discountPercentage}</label>
            </div>
        </div>

    );
};

export default BillForm;
