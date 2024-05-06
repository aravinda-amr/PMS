import React, { useState, useEffect } from 'react';
import LeaderboardPrizeForm from "./LeaderboardPrizeForm";
import LeaderboardPrizeDisplay from "./LeaderboardPrizeDisplay";
import { Typography, Button } from '@mui/material'; // Import Material-UI components
import logo from '../images/logo-bw-2-nbg.png';
import jsPDF from 'jspdf';
import 'jspdf-autotable';


const LeaderboardDetails = ({ leaderboard }) => {
    const [showPrizeForm, setShowPrizeForm] = useState(false);
    const [showCashPrizesDetails, setShowCashPrizesDetails] = useState(false);
    const [cashPrize, setCashPrize] = useState([]);
    const [month, setMonth] = useState(leaderboard.month);
    const [year, setYear] = useState(leaderboard.year);
    const [editMode, setEditMode] = useState(false);
    const [editingCashPrize, setEditingCashPrize] = useState(null);


    // Function to convert month number to month name
    const getMonthName = (monthNumber) => {
        const date = new Date(0, monthNumber - 1); // Note: JavaScript months are 0-indexed
        return date.toLocaleString('default', { month: 'long' });
    };

    const fetchCashPrize = async () => {
        try {
            const response = await fetch(`/api/leaderboard/${leaderboard._id}/getCashPrize`);
            const cashPrize = await response.json();
            setCashPrize(cashPrize);
            console.log(cashPrize);
        } catch (error) {
            console.error('Error fetching cash prize:', error);
        }
    };

    useEffect(() => {
        fetchCashPrize();
    }, [month, year]);

    const handlePrizeClick = () => {
        setShowPrizeForm(!showPrizeForm);
    };

    const handleCashPrizesClick = async () => {
        setShowCashPrizesDetails(!showCashPrizesDetails);
        if (!showCashPrizesDetails) {
            await fetchCashPrize();
        }
    };

    const handleEditCashPrize = (cashPrizeToEdit) => {
        setEditingCashPrize(cashPrizeToEdit);
        setEditMode(true); // Enable edit mode
        setShowPrizeForm(true); // Show the form for editing
    };

    const updateCashPrize = (newCashPrize) => {
        setCashPrize(newCashPrize);
        setEditMode(false); // Reset edit mode
        setEditingCashPrize(null); // Reset the cash prize being edited
    };

    //function for download pdf
    const handleDownloadPDF = () => {
        const doc = new jsPDF();
                doc.setFont('helvetica', 'bold');
                doc.setFontSize(24);
            
                // Add logo at the center of the PDF
                const logoImg = new Image();
                logoImg.src = logo;
            
                const logoWidth = 40; // Adjust the width of the logo
                const pageWidth = doc.internal.pageSize.getWidth();
                const x = (pageWidth - logoWidth) / 2;
            
                doc.addImage(logoImg, 'PNG', x, 10, logoWidth, logoWidth * (40 / 40));
        doc.setFontSize(18);
        doc.text(`Leaderboard Details - ${getMonthName(leaderboard.month)} ${leaderboard.year}`, 10, 55);
    
        // Content
        const content = [
            [`Year: ${leaderboard.year}`],
            [`Month: ${getMonthName(leaderboard.month)}`],
            [`Most Prescription Amount handled pharmacist: ${leaderboard.mostPrescriptionHandledPid}`],
            [`Most Cash Amount handled pharmacist: ${leaderboard.mostCashAmountHandledPid}`]
        ];

        doc.autoTable({
            startY: 60,
            head: [['Details']],
            body: content,
        });

        // Save the PDF
        doc.save(`Leaderboard_Details_${leaderboard.year}_${leaderboard.month}.pdf`)
    }



    return (
        <div className="bg-gray-100 rounded-lg p-4 mb-4 flex flex-col">
            <div className="bg-dark-blue-2 flex justify-between items-center px-4 py-2 rounded-t-lg">
                <Typography variant="h6" component="h2" className="text-white">
                    Year: {leaderboard.year}
                </Typography>
                <Typography variant="h5" component="h4" className="text-white font-medium px-4 py-2">
                    Month: {getMonthName(leaderboard.month)}
                </Typography>
                <Button variant="contained" color="primary" onClick={handleDownloadPDF}>
                    Download PDF
                </Button>
            </div>

            <div className="bg-dark-blue-2 flex items-center px-4 py-2 rounded-b-lg">
                <Typography variant="subtitle1" component="h4" className="text-white font-medium mr-2">
                    Most Prescription Amount handled pharmacist: {leaderboard.mostPrescriptionHandledPid} <br />
                    Most Cash Amount handled pharmacist: {leaderboard.mostCashAmountHandledPid}
                </Typography>
                <div className="flex ml-auto">
                    <button
                        className="hover:text-login1 text-white font-bold py-2 px-4 rounded mr-2 fixed-width-button"
                        onClick={handlePrizeClick}
                    >
                        {showPrizeForm ? "Hide Cash Prize Form" : "Add Cash Prize"}
                    </button>
                    <button
                        className="hover:text-login1 text-white font-bold py-2 px-4 rounded mr-2 fixed-width-button"
                        onClick={handleCashPrizesClick}
                    >
                        {showCashPrizesDetails ? "Hide Cash Prizes Details" : "Show Cash Prizes Details"}
                    </button>
                </div>
            </div>
            {showPrizeForm && (
                <div className="mt-4">
                    <LeaderboardPrizeForm
                        onPrizeAdded={updateCashPrize}
                        id={leaderboard._id}
                        initialCashPrize={editingCashPrize}
                        editMode={editMode}
                    />
                </div>
            )}
            {showCashPrizesDetails && (
                <div className="mt-4">
                    <LeaderboardPrizeDisplay leaderboard={leaderboard} cashPrize={cashPrize} onEditCashPrize={handleEditCashPrize} />
                </div>
            )}


        </div>
    );
};

export default LeaderboardDetails;
