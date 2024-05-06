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
        <div className="ml-8 mr-8 border-gray-300 rounded-lg px-8 py-6 mb-8 bg-update" >
            <div>
                        <table className='w-full mb-4'>
                            <thread>
                                <tr className='grid grid-cols-4 items-center'>
                                    <th className="py-2 px-4 text-center text-lg">Drug Name</th>
                                    <th className="py-2 px-4 text-center text-lg">Quantity</th>
                                    <th className="py-2 px-4 text-center text-lg">Price</th>
                                    <th className="py-2 px-4 text-center text-lg">Total</th>
                                </tr>
                            </thread>
                            <tbody>
                            {quotation.medicines.map((medicine) => (
                                <tr key={medicine.drugName} className='grid grid-cols-4 items-center'>
                                    <td className="text-center text-lg">{medicine.drugName}</td>
                                    <td className="text-center text-lg">{medicine.purchaseQuantity}</td>
                                    <td className="text-center text-lg">{medicine.price}</td>
                                    <td className="text-center text-lg">{medicine.calculateItemTotal}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
            </div>
            <div>
                <h4 className='mt-4 text-2xl'>Subtotal</h4>
                <p className='font-extrabold'>LKR {quotation.subTotal} /=</p>
            </div>
            {!isActionTaken && (
                <div>
                    <button onClick={handleApprove} className="bg-login1 hover:bg-login2 text-white font-bold px-4 py-1 
                                rounded-lg font-jakarta cursor-pointer hover:transition-all mx-4 my-4">Approve</button>
                    <button onClick={handleReject} className="bg-delete hover:bg-deleteH text-white font-bold px-4 py-1 
                                rounded-lg font-jakarta cursor-pointer hover:transition-all" >Reject</button>
                </div>
            )}
        </div>
    );
};

export default ViewQuotation;
