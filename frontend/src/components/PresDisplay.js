import React, { useState } from "react";
import { usePrescriptionContext } from "../hooks/usePrescription";

import QuotationForm from "./QuotationForm";

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const PresDisplay = ({ prescription }) => {
    const { dispatch } = usePrescriptionContext();
    const [showForm, setShowForm] = useState(false);
    const [showModal, setShowModal] = useState(false)
    
    const handleQuotation = () => {
        setShowForm(prevState => !prevState); // Toggle the state of showForm
        setShowModal(true); // Always show the modal when the button is clicked
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

            {/* <h3>Prescription Image</h3> */}
            {/* <img src={prescription.prescriptionImg} alt="prescription" width={100} height={60}/> */}

            <h3>Created At</h3>
            {/* <p>{prescription.createdAt}</p> */}
            <p>{formatDistanceToNow(new Date(prescription.createdAt), {addSuffix : true})}</p>

            <button onClick={handleQuotation}>Add Quotation</button>
            
            {showForm && <QuotationForm />}

            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCloseModal}>&times;</span>
                        <img src={prescription.prescriptionImg} alt="prescription" width={400} height={240}/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PresDisplay;