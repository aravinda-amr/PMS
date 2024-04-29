import React, { useState, useEffect } from "react";
import { usePrescriptionContext } from "../hooks/usePrescription";
import ViewQuotation from "./ViewQuotation";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';

const PrescriptionDetails = ({ prescription }) => {
    const { dispatch } = usePrescriptionContext();
    const [showModal, setShowModal] = useState(false);
    const [quotations, setQuotations] = useState([]);

    const handleQuotation = () => {
        setShowModal(true);
    };    

    const handleCloseModal = () => {
        setShowModal(false);
    };

    useEffect(() => {
        const fetchQuotations = async () => {
            try {
                const response = await fetch(`/api/allPres/${ prescription._id }/quotations`);
                if (!response.ok) {
                    throw new Error('Failed to fetch quotations');
                }
                const data = await response.json();
                setQuotations(data);
            } catch (error) {
                console.error('Error fetching quotations:', error);
            }
        };
        fetchQuotations();
    }, [prescription._id]);

    const handleClick = async () => {
        const response = await fetch("/api/allPres/" + prescription._id, {
            method: "DELETE",
        });
        const json = await response.json();
        dispatch({ type: "DELETE_PRESCRIPTION", payload: json });
    };

    const handleUpdate = async () => {
        const response = await fetch("/api/allPres/" + prescription._id, {
            method: "PUT",
        });
        const json = await response.json();
        dispatch({ type: "UPDATE_PRESCRIPTION", payload: json });
    };

    return (
        <div className="rounded-lg p-4 mb-4 flex flex-col bg-dark-blue-2 text-white">
            <h3 className="text-lg font-semibold mb-2">Prescription Note</h3>
            <p>{prescription.note}</p>

            <h3 className="text-lg font-semibold mt-4 mb-2">Substitutes</h3>
            <p>{prescription.substitutes}</p>

            <h3 className="text-lg font-semibold mt-4 mb-2">Prescription Image</h3>
            <img src={prescription.prescriptionImg} alt="prescription" width={100} height={60}/>

            <h3 className="text-lg font-semibold mt-4 mb-2">Created At</h3>
            <p>{formatDistanceToNow(new Date(prescription.createdAt), {addSuffix : true})}</p>

            {prescription.quotation.length > 0 && (
                <button 
                    onClick={handleQuotation} 
                    className="bg-login1 hover:bg-login2 text-white font-bold px-4 py-2 mt-4 rounded-md cursor-pointer"
                >
                    View Quotation
                </button>
            )}

            {showModal && (
                <div>
                    <h3 className="text-lg font-semibold mt-4 mb-2">Quotations for Prescription</h3>
                    <button 
                        onClick={handleCloseModal} 
                        className="bg-login1 hover:bg-login2 text-white font-bold px-4 py-2 rounded-md cursor-pointer"
                    >
                        Close
                    </button>
                    {quotations.length === 0 ? (
                        <p>No quotations available for this prescription.</p>
                    ) : (
                        quotations.map((quotation, index) => (
                            <ViewQuotation key={index} quotation={quotation} presID={prescription._id} />
                        ))
                    )}
                </div>
            )}

            {!showModal && prescription.quotation.length === 0 && (
                <div>
                    <button 
                        onClick={handleClick} 
                        className="bg-login1 hover:bg-login2 text-white font-bold px-4 py-2 rounded-md mr-2 cursor-pointer"
                    >
                        Delete
                    </button>
                    <button 
                        onClick={handleUpdate} 
                        className="bg-login1 hover:bg-login2 text-white font-bold px-4 py-2 rounded-md cursor-pointer"
                    >
                        Update
                    </button>
                </div>
            )}
        </div>
    );
};

export default PrescriptionDetails;
