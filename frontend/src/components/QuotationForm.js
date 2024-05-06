import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import POSSearch from './PosSearch';

const QuotationForm = ({id}) => {
    // const [prescriptionID, setPrescriptionID] = useState('');
    const [medicines, setMedicines] = useState([]);
    const [subTotal, setSubTotal] = useState(0);
    const [quotationSent, setQuotationSent] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        // Calculate subtotal whenever medicines or their quantities change
        const total = medicines.reduce((acc, curr) => acc + (curr.price * curr.purchaseQuantity), 0);
        setSubTotal(total);
    }, [medicines]);

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

    const handlePurchaseQuantityChange = (e, index) => {
        const updatedMedicines = [...medicines];
        const newQuantity = parseInt(e.target.value);

        if (!isNaN(newQuantity) && newQuantity >= 1) {
            updatedMedicines[index].purchaseQuantity = newQuantity;
            setMedicines(updatedMedicines);
        }
    };

    const sendQuotation = async () => {

        console.log('Sending quotation:', medicines, 'sub', subTotal);

        // Calculate calculateItemTotal for each medicine
        const medicinesWithTotal = medicines.map(medicine => ({
        ...medicine,
        calculateItemTotal: medicine.price * medicine.purchaseQuantity
    }));

        try {
          const response = await fetch(`/api/allPres/${id}/quotation`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              medicines: medicinesWithTotal,
              subTotal,
            }),
          });
    
          if (!response.ok) {
            throw new Error('Failed to create quotation');
          }
    
          const data = await response.json();
          console.log('Quotation created:', data);
          setQuotationSent(true);
          setSuccessMessage('Quotation sent successfully');
        } catch (error) {
          console.error('Error creating quotation:', error);
        }
      };

    return (
        <div className="w-full p-6 bg-white">
            <h3 className="text-2xl font-semibold mb-4 text-gray-800">Create Quotation</h3>
            <POSSearch handleAddToBill={handleAddToBill} />

            <div>
                <h4 className="text-lg font-semibold mb-2 text-gray-800">Medicines</h4>
                <table className="w-full mb-4">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 text-gray-800">Index</th>
                            <th className="px-4 py-2 text-gray-800">Drug Name</th>
                            <th className="px-4 py-2 text-gray-800">Unit Price</th>
                            <th className="px-4 py-2 text-gray-800">Purchase Quantity</th>
                            <th className="px-4 py-2 text-gray-800">Item Total</th>
                            <th className="px-4 py-2 text-gray-800">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicines.map((medicine, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{index + 1}</td>
                                <td className="border px-4 py-2">{medicine.drugName}</td>
                                <td className="border px-4 py-2">{medicine.price}</td>
                                <td className="border px-4 py-2">
                                    <input
                                        type="number"
                                        value={medicine.purchaseQuantity}
                                        onChange={(e) => handlePurchaseQuantityChange(e, index)}
                                        required
                                        className="input-field"
                                    />
                                </td>
                                <td className="border px-4 py-2">{(medicine.price * medicine.purchaseQuantity).toFixed(2)}</td>
                                <td className="border px-4 py-2">
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
                <h4 className="text-lg font-semibold mb-2 text-gray-800">Subtotal: LKR{subTotal.toFixed(2)}</h4>
            </div>
            {quotationSent ? ( <div className="text-success">{successMessage}</div> ) : (
                subTotal > 0 && (
                    <button
                        onClick={sendQuotation}
                        className="bg-login1 hover:bg-login2 text-white font-bold px-4 py-1 rounded-lg font-jakarta cursor-pointer hover:transition-all"
                    >
                        Send Quotation
                    </button>
        )
      )}
        </div>
    );
};

export default QuotationForm;