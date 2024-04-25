import React, { useState } from "react";
import { usePrescriptionContext } from "../hooks/usePrescription";

import QuotationForm from "./QuotationForm";

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const PresDisplay = ({ prescription }) => {
    const { dispatch } = usePrescriptionContext();
    const [showModal, setShowModal] = useState(false);
    
    const handleQuotation = () => {
        setShowModal(true); // Show the modal when the button is clicked
    };    

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            <h3>Prescription Note</h3>
            <p>{prescription.note}</p>

            <h3>Substitutes</h3>
            <p>{prescription.substitutes}</p>

            <h3>Created At</h3>
            <p>{formatDistanceToNow(new Date(prescription.createdAt), {addSuffix : true})}</p>

            <button onClick={handleQuotation}>Add Quotation</button>
            
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center">
                    <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>

                    <div className="modal-container bg-white md:max-w-3xl mx-auto rounded shadow-lg z-50">

                        <div className="modal-content py-50 text-left px-6">
                            <div className="flex justify-between items-center pb-3">
                                <p className="text-2xl font-bold">Add Quotation</p>
                                <button onClick={handleCloseModal} className="bg-login1 hover:bg-login2 text-white font-bold px-4 py-1 rounded-lg font-jakarta cursor-pointer hover:transition-all">Close</button>
                            </div>

                            <div className="flex">
                                <div className="w-1/3 pr-2 overflow-hidden">
                                    <img src={prescription.prescriptionImg} alt="prescription" className="w-full" />
                                </div>
                                <div className="w-2/3 pl-2 overflow-hidden">
                                    <QuotationForm />
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