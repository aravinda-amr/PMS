import React, { useState, useEffect } from "react";
import { usePrescriptionContext } from "../hooks/usePrescription";

import ViewQuotation from "./ViewQuotation";

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const PrescriptionDetails = ({ prescription }) => {
    const { dispatch } = usePrescriptionContext();
    const [showModal, setShowModal] = useState(false);
    const [quotations, setQuotations] = useState([]);

    const handleQuotation = () => {
        setShowModal(true); // Show the modal when the button is clicked
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
    }

    const handleUpdate = async () => {
        const response = await fetch("/api/allPres/" + prescription._id, {
            method: "PUT",
        });
        const json = await response.json();

        dispatch({ type: "UPDATE_PRESCRIPTION", payload: json });
    }

    return (
        <div>
            <h3>Prescription Note</h3>
            <p>{prescription.note}</p>

            <h3>Substitutes</h3>
            <p>{prescription.substitutes}</p>

            <h3>Prescription Image</h3>
            <img src={prescription.prescriptionImg} alt="prescription" width={100} height={60}/>

            <h3>Created At</h3>
            {/* <p>{prescription.createdAt}</p> */}
            <p>{formatDistanceToNow(new Date(prescription.createdAt), {addSuffix : true})}</p>

            {prescription.quotation.length > 0 && (
                <button onClick={handleQuotation}>View Quotation</button>
            )}


            {showModal && (
                <div>
                    <h3>Quotations for Prescription</h3>
                    {quotations.length === 0 ? (
                    <p>No quotations available for this prescription.</p>
                    ) : (
                    quotations.map((quotation, index) => (
                    <ViewQuotation key={index} quotation={quotation} />
                  ))
                )}
              </div>
               
            )}

            <button onClick={handleClick}>Delete</button>
            <button onClick={handleUpdate}>Update</button>
        </div>
    );
};

export default PrescriptionDetails;