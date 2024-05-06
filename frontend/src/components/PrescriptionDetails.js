import React, { useState, useEffect } from "react";
import { usePrescriptionContext } from "../hooks/usePrescription";
import { Typography } from '@mui/material'
import UpdateNoteModal from "./UpdateNoteModal";
import { useAuthContext } from "../hooks/useAuthContext";
import ViewQuotation from "./ViewQuotation";

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const PrescriptionDetails = ({ prescription }) => {
    const { dispatch } = usePrescriptionContext();
    const [showModal, setShowModal] = useState(false);
    const [quotations, setQuotations] = useState([]);
    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const { user } = useAuthContext();

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
        if(!user){
            return
        }
        const response = await fetch("/api/allPres/" + prescription._id, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await response.json();

        dispatch({ type: "DELETE_PRESCRIPTION", payload: json });
    }

    // const handleUpdate = async () => {
    //     const response = await fetch("/api/allPres/" + prescription._id, {
    //         method: "PATCH",
    //     });
    //     const json = await response.json();

    //     dispatch({ type: "UPDATE_PRESCRIPTION", payload: json });
    // }

    const handleUpdate = async () => {
        setShowUpdateModal(true);
    }

    const handleCloseUpdateModal = () => {
        setShowUpdateModal(false);
    }

    const handleSaveNote = async (newNote) => {
        const response = await fetch("/api/allPres/" + prescription._id, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ note: newNote })
        });
        const json = await response.json();

        dispatch({ type: "UPDATE_PRESCRIPTION", payload: json });
    }

    return (
        <div>
            
            <div className="bg-dark-blue-2 grid grid-cols-5 items-center px-4 py-2 rounded-lg my-4 mx-4">
                
                <div className="flex items-center">
                    <Typography variant="h5" component="h4" className="text-white mr-2">
                        {prescription.note}
                    </Typography>
                </div>

                    <Typography className="text-white font-light px-4 py-2">
                        { prescription.substitutes ? "Substitutes Accepted" : "Substitutes Rejected" }
                    </Typography>
                    
                    <Typography  className="text-white font-medium px-4 py-2">
                        {formatDistanceToNow(new Date(prescription.createdAt), {addSuffix : true})}
                    </Typography>

                    <img src={prescription.prescriptionImg} alt="prescription" width={100} height={60}/>

                    {prescription.quotation.length > 0 && (
                        <button onClick={handleQuotation} className="bg-login1 hover:bg-login2 text-white font-bold px-4 py-1 
                                rounded-lg font-jakarta cursor-pointer hover:transition-all">
                            View Quotation
                        </button>
                    )}

                    {!showModal && prescription.quotation.length === 0 && (
                        <div className="flex justify-between">
                            <button onClick={handleClick} className="bg-login1 hover:bg-login2 text-white font-bold px-8 py-1 
                                rounded-lg font-jakarta cursor-pointer hover:transition-all">Delete</button>
                            <button onClick={handleUpdate} className="bg-signup1 hover:bg-signup2 text-white font-bold px-8 py-1 
                                rounded-lg font-jakarta cursor-pointer hover:transition-all">Edit Note</button>
                        </div>
            )}
                    
        </div>

            {showModal && (
                <div>
                    <button onClick={handleCloseModal} className="bg-login1 hover:bg-login2 text-white font-bold px-4 py-1 rounded-lg font-jakarta cursor-pointer hover:transition-all mx-8 mb-2">Close</button>
                    {quotations.length === 0 ? (
                    <p>No quotations available for this prescription.</p>
                    ) : (
                    quotations.map((quotation, index) => (
                    <ViewQuotation key={index} quotation={quotation} presID={prescription._id} />
                  ))
                )}
              </div>
               
            )}

{showUpdateModal && (
                <UpdateNoteModal onClose={handleCloseUpdateModal} onSave={handleSaveNote} />
            )}
            
        </div>
    );
};

export default PrescriptionDetails;