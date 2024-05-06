import React, { useState, useEffect } from "react";
import { usePrescriptionContext } from "../hooks/usePrescription";
import { Typography } from '@mui/material'
import EmailModal from "../pages/emailleave";


import QuotationForm from "./QuotationForm";

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const PresDisplay = ({ prescription }) => {
    const { dispatch } = usePrescriptionContext();
    const [userEmail, setUserEmail] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [emailModalOpen, setEmailModalOpen] = useState(false);

    const fetchUserEmail = async () => {
        try {
            const response = await fetch(`/api/user/${prescription.userId}`);
            if (response.ok) {
                const userData = await response.json();
                console.log(userData);
                setUserEmail(userData.email);
            } else {
                console.error('Failed to fetch user email');
            }
        } catch (error) {
            console.error('Error fetching user email:', error);
        }
    };
    
    useEffect(() => {
        fetchUserEmail();
    }, [prescription.userId]);

    const handleQuotation = () => {
        setShowModal(true); // Show the modal when the button is clicked
    };    

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleEmailModalClose = () => {
        setEmailModalOpen(false);
      };

    const handleEmailModalSubmit = async (emailDetails) => {
        try {
          const response = await fetch('/api/email/send-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(emailDetails),
          });
    
          if (response.ok) {
            alert('Email sent successfully');
          } else {
            alert('Failed to send email');
          }
        } catch (error) {
          console.error('Error sending email:', error);
          alert('Failed to send email');
        }
      };

    return (
        <div className="bg-dark-blue-2 grid grid-cols-6 items-center px-4 py-2 rounded-lg my-4 mx-4">
            <div className="flex items-center">
                    <Typography variant="h6" component="h4" className="text-white mr-2">
                        {prescription.note}
                    </Typography>
            </div>
                    <Typography className="text-white">
                        {userEmail}
                    </Typography>

                    <Typography className="text-white font-light px-4 py-2">
                        { prescription.substitutes ? "Substitutes Accepted" : "Substitutes Rejected" }
                    </Typography>

                    <Typography  className="text-white font-medium px-4 py-2">
                        {formatDistanceToNow(new Date(prescription.createdAt), {addSuffix : true})}
                    </Typography>

                    <Typography className={`text-white font-medium px-4 py-2 ${prescription.status === 'approved' ? 'text-green-500' : 'text-red-500'}`}>
                        {prescription.status.charAt(0).toUpperCase() + prescription.status.slice(1)}
                    </Typography>

            {prescription.quotation.length === 0 && (
                <button onClick={handleQuotation} className="bg-login1 hover:bg-login2 text-white font-bold px-4 py-1 
                rounded-lg font-jakarta cursor-pointer hover:transition-all">Add Quotation</button>
            )}

            {prescription.status === 'approved' && (
                <button onClick={() => setEmailModalOpen(true)} className="bg-green-500 hover:bg-green-600 text-white font-bold px-4 py-1 
                rounded-lg font-jakarta cursor-pointer hover:transition-all">Pick Up</button>
            )}

            <EmailModal
            open={emailModalOpen}
            handleClose={handleEmailModalClose}
            handleSubmit={handleEmailModalSubmit}
            />
            
            
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center">
                    <div className="modal-container bg-white md:max-w-3xl mx-auto rounded shadow-lg z-50 border-4 border-gray-300">

                        <div className="modal-content py-50 text-left px-6">
                            <div className="flex justify-between items-center pb-3">
                                <p className="text-2xl font-bold">Add Quotation</p>
                                <button onClick={handleCloseModal} className="bg-login1 hover:bg-login2 text-white font-bold px-4 py-1 rounded-lg font-jakarta cursor-pointer hover:transition-all my-4">Close</button>
                            </div>

                            <div className="">
                                <div className="w-1/3 pr-2">
                                    <img src={prescription.prescriptionImg} alt="prescription" className="w-full" />
                                </div>
                                <div className="w-full pl-2">
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