import React, { useState } from "react";
import { usePrescriptionContext } from "../hooks/usePrescription";
import QuotationForm from "./QuotationForm";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const PresDisplay = ({ prescription }) => {
    const { dispatch } = usePrescriptionContext();
    const [showModal, setShowModal] = useState(false);
    
    const handleQuotation = () => {
        setShowModal(true);
    };    

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div className="border border-gray-300 rounded-lg p-4 mb-4">
            <h3 className="text-lg font-semibold mb-2">Prescription Note</h3>
            <p className="text-gray-700">{prescription.note}</p>

            <h3 className="text-lg font-semibold mt-4 mb-2">Substitutes</h3>
            <p className="text-gray-700">{prescription.substitutes}</p>

            <h3 className="text-lg font-semibold mt-4 mb-2">Created At</h3>
            <p className="text-gray-700">{formatDistanceToNow(new Date(prescription.createdAt), { addSuffix: true })}</p>

            {prescription.quotation.length === 0 && (
                <button className="mt-4 bg-login1 hover:bg-login2 text-white font-bold px-4 py-2 rounded-lg" onClick={handleQuotation}>Add Quotation</button>
            )}

            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center">
                    <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

                    <div className="modal-container bg-white md:max-w-3xl mx-auto rounded shadow-lg z-50">
                        <div className="modal-content py-50 text-left px-6">
                            <div className="flex justify-between items-center pb-3">
                                <p className="text-2xl font-bold">Add Quotation</p>
                                <button className="bg-login1 hover:bg-login2 text-white font-bold px-4 py-1 rounded-lg font-jakarta cursor-pointer hover:transition-all" onClick={handleCloseModal}>Close</button>
                            </div>

                            <div className="flex">
                                <div className="w-1/3 pr-2 overflow-hidden">
                                    <img src={prescription.prescriptionImg} alt="prescription" className="w-full" />
                                </div>
                                <div className="w-2/3 pl-2 overflow-hidden">
                                    <QuotationForm id={prescription._id}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PresDisplay;
