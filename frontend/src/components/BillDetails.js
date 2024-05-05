import React, { useState } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';

const BillDetails = ({ bill, isAdmin , dispatch}) => {
    const [activeEditBillId, setActiveEditBillId] = useState(null);

    const handleDeleteMedicine = async (index) => {
        try {
            // Send a DELETE request to your backend API
            const response = await fetch(`/api/billing/${bill.invoiceID}/medicine/${index}`, {
                method: 'DELETE',
            });
    
            if (response.ok) {
                // If the deletion is successful, update the bill list in the frontend
                // Update the bill list by removing the deleted medicine
                const updatedMedicines = bill.medicines.filter((medicine, idx) => idx !== index);
                const updatedBill = { ...bill, medicines: updatedMedicines };
    
                // Update the bill list in the state
                dispatch({ type: 'UPDATE_BILL', payload: updatedBill });
            } else {
                console.error('Error deleting medicine:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting medicine:', error);
        }
    };
    

    const handleEditClick = () => {
        setActiveEditBillId(bill.invoiceID);
    };

    const formattedInvoiceDate = new Date(bill.invoiceDate).toLocaleDateString('en-US');

      // Check if discountAmount is not included and set it to 0.00
      const discountAmount = bill.discountAmount ? (typeof bill.discountAmount === 'object' ? parseFloat(bill.discountAmount.$numberDecimal).toFixed(2) : parseFloat(bill.discountAmount).toFixed(2)) : "0.00";

    return (
        <tr className="bg-blue-200 text-dark-blue">
            <td className="border px-1 py-2">{bill.invoiceID}</td>
            <td className="border px-1 py-2">{bill.pharmacistID}</td>
            <td className="border px-1 py-2">{bill.customerID}</td>
            <td className="border px-1 py-2">{formattedInvoiceDate}</td>
            <td className="border px-1 py-2">
                <table className="table-auto bg-green-200">
                    <thead>
                        <tr className="bg-blue-200 text-dark-blue">
                            <th className="px-2 py-1 text-left text-xs font-medium uppercase whitespace-nowrap w-1/3">Drug Name</th>
                            <th className="px-2 py-1 text-left text-xs font-medium uppercase whitespace-nowrap w-1/3">Purchase Quantity</th>
                            <th className="px-2 py-1 text-left text-xs font-medium uppercase whitespace-nowrap w-1/3">Unit Price</th>
                            {isAdmin && <th className="px-2 py-1 text-left text-xs font-medium uppercase whitespace-nowrap"></th>}
                        </tr>
                    </thead>
                    <tbody>
                        {bill.medicines.map((medicine, index) => (
                            <tr key={index} className="bg-blue-200 text-dark-blue">
                                <td className="border px-4 py-0.5 text-sm whitespace-nowrap">{medicine.drugName}</td>
                                <td className="border px-4 py-0.5 text-sm">{medicine.purchaseQuantity}</td>
                                <td className="border px-4 py-0.5 text-sm">{medicine.price}</td>
                                {isAdmin && activeEditBillId === bill.invoiceID && (
                                    <td className="border px-4 py-0.5 text-sm">
                                        <FaTrash
                                            className="text-red-600 cursor-pointer"
                                            onClick={() => handleDeleteMedicine(index)}
                                        />
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </td>
            <td className="border px-4 py-2">{bill.subTotal}</td>
            <td className="border px-4 py-2">{discountAmount}</td>
            <td className="border px-4 py-2">{bill.grandTotal}</td>
            <td className="border px-4 py-2">
                {isAdmin && (
                    <FaEdit
                        className="text-blue-600 cursor-pointer mr-2"
                        onClick={() => handleEditClick(bill.invoiceID)}
                    />
                )}
            </td>
        </tr>
    );
};

export default BillDetails;
