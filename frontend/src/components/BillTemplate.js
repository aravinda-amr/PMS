import React from 'react';
import logo from '../images/logo-bw-2-nbg.png';
import styled from 'styled-components';



const BillContent = styled.div`
  width: 100%;
  
`;

const BillTemplate = ({ customerID, pharmacistID, invoiceDate, medicines, subTotal, discountAmount, grandTotal, generatedInvoiceID }) => {

    
    return (
            <BillContent className="text-gray-800 bill-content" id="bill-content">
                <img src={logo} alt="Logo" className='w-44 py-8 mx-auto print-logo'/>
                <div className="mb-4">
                <p><span className="font-semibold">Invoice ID:</span> {generatedInvoiceID}</p>
                    <p><span className="font-semibold">Customer ID:</span> {customerID}</p>
                    <p><span className="font-semibold">Pharmacist ID:</span> {pharmacistID}</p>
                    <p><span className="font-semibold">Invoice Date:</span> {invoiceDate}</p>
                </div>
                <hr className="my-4" />
                <div className="mb-4">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="py-2 w-1/5">Medicine</th>
                                <th className="py-2 w-1/5">UP</th>
                                <th className="py-2 w-1/5">Qty</th>
                                <th className="py-2 w-1/5">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            {medicines.map((medicine, index) => (
                                <tr key={index}>
                                    <td className="py-2">{medicine.drugName}</td>
                                    <td className="py-2 text-center">{(medicine.price).toFixed(2)}</td>
                                    <td className="py-2 text-center">{medicine.purchaseQuantity}</td>
                                    <td className="py-2 text-center">{(medicine.purchaseQuantity * medicine.price).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <hr className="my-4" />
                <div className="flex justify-between mb-4">
                    <div>
                        <p><span className="font-semibold">Subtotal:</span> LKR {subTotal.toFixed(2)}</p>
                        <p><span className="font-semibold">Discount Amount:</span> LKR {discountAmount.toFixed(2)}</p>
                        <p><span className="font-semibold">Grand Total:</span> LKR {grandTotal.toFixed(2)}</p>
                    </div>
                </div>
               
            </BillContent>
    );
};

export default BillTemplate;
