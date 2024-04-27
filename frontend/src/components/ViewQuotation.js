import React, { useState } from 'react';

const ViewQuotation = ({ quotation, presID }) => {

    const [isActionTaken, setIsActionTaken] = useState(false);

    const handleApprove = async () => {
        try {
            const response = await fetch(`/api/allPres/${presID}/approve`, {
                method: 'PATCH',
            });
            if (!response.ok) {
                throw new Error('Failed to approve prescription');
            }
            const data = await response.json();
            setIsActionTaken(true);
            // Dispatch action or handle response as needed
        } catch (error) {
            console.error('Error approving prescription:', error);
        }
    };

    const handleReject = async () => {
        try {
            const response = await fetch(`/api/allPres/${presID}/reject`, {
                method: 'PATCH',
            });
            if (!response.ok) {
                throw new Error('Failed to reject prescription');
            }
            const data = await response.json();
            setIsActionTaken(true);
            // Dispatch action or handle response as needed
        } catch (error) {
            console.error('Error rejecting prescription:', error);
        }
    };


    return (
        <div>
            <h3>Quotation Details</h3>
            <div>
                <h4>Medicines</h4>
                <ul>
                    {quotation.medicines.map((medicine) => (
                        <li>
                            <strong>{medicine.drugName}</strong> - Quantity: {medicine.purchaseQuantity}, Price: {medicine.price}, Total: {medicine.calculateItemTotal}
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h4>Subtotal</h4>
                <p>LKR {quotation.subTotal}</p>
            </div>
            {!isActionTaken && (
                <div>
                    <button onClick={handleApprove}>Approve</button>
                    <button onClick={handleReject}>Reject</button>
                </div>
            )}
        </div>
    );
};

export default ViewQuotation;
