import React from 'react';

const ViewQuotation = ({ quotation }) => {
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
        </div>
    );
};

export default ViewQuotation;
