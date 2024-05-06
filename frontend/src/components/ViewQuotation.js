import React, { useState } from 'react';
import logo from '../images/logo-bw-2-nbg.png';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

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

    const generatePDF = () => {
                const doc = new jsPDF();
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(24);
            
                // Add logo at the center of the PDF
                const logoImg = new Image();
                logoImg.src = logo;
            
                // Calculate the x-coordinate to place the logo at the center
                const logoWidth = 40; // Adjust the width of the logo image as needed
                const pageWidth = doc.internal.pageSize.getWidth();
                const x = (pageWidth - logoWidth) / 2;
            
                doc.addImage(logoImg, 'PNG', x, 10, logoWidth, logoWidth * (40 / 40));
            
                // Display "Inventory Report" text under the logo
                doc.setFontSize(18);
                doc.text("Quotation", pageWidth / 2, 60, { align: 'center' });

        // Add table to the PDF
        doc.autoTable({
            head: [['Drug Name', 'Quantity', 'Price', 'Total']],
            body: quotation.medicines.map(medicine => [medicine.drugName, medicine.purchaseQuantity, medicine.price, medicine.calculateItemTotal]),
            startY: 70 // Adjust as needed
        });

        // Add subtotal to the PDF
        doc.text(`Subtotal: LKR ${quotation.subTotal} /=`, 10, doc.autoTable.previous.finalY + 10);

        // Save the PDF
        doc.save("quotation.pdf");
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
                                rounded-lg font-jakarta cursor-pointer hover:transition-all mr-4 my-4">Approve</button>
                    <button onClick={handleReject} className="bg-delete hover:bg-deleteH text-white font-bold px-4 py-1 
                                rounded-lg font-jakarta cursor-pointer hover:transition-all" >Reject</button>
                </div>
            )}

            <button onClick={generatePDF} className="mr-6">
                    <FileDownloadIcon fontSize='large'/>
            </button> 
        </div>
    );
};

export default ViewQuotation;
