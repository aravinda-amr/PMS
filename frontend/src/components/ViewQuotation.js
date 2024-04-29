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
        <div className=" ml-8 mr-8 medicine  border-gray-300 rounded-lg px-8 py-6 mb-8 bg-update" >
            <div className="overflow-x-auto">
                        <table className="w-full">
                            <thread>
                                <tr className="bg-gray-200 w-full">
                                    <th className="py-2 px-4 text-center text-lg w-1/4">Drug Name</th>
                                    <th className="py-2 px-4 text-center text-lg w-1/4">Quantity</th>
                                    <th className="py-2 px-4 text-center text-lg w-1/4">Price</th>
                                    <th className="py-2 px-4 text-center text-lg w-1/4">Total</th>
                                </tr>
                            </thread>
                            <tbody>
                            {quotation.medicines.map((medicine) => (
                                <tr key={medicine.drugName}>
                                    <td className="py-2 px-4 text-center text-lg w-1/4">{medicine.drugName}</td>
                                    <td className="py-2 px-4 text-center text-lg w-1/4">{medicine.purchaseQuantity}</td>
                                    <td className="py-2 px-4 text-center text-lg w-1/4">{medicine.price}</td>
                                    <td className="py-2 px-4 text-center text-lg w-1/4">{medicine.calculateItemTotal}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
            </div>
            <div>
                <h4>Subtotal</h4>
                <p>LKR {quotation.subTotal}</p>
            </div>
            {!isActionTaken && (
                <div>
                    <button onClick={handleApprove} className="bg-login1 hover:bg-login2 text-white font-bold px-4 py-1 
                                rounded-lg font-jakarta cursor-pointer hover:transition-all">Approve</button>
                    <button onClick={handleReject} className="bg-delete hover:bg-deleteH text-white font-bold px-4 py-1 
                                rounded-lg font-jakarta cursor-pointer hover:transition-all" >Reject</button>
                </div>
            )}
        </div>
    );
};

export default ViewQuotation;
