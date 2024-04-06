import React, { useState } from 'react';
import LeaderboardPrizeForm from "./LeaderboardPrizeForm";
import { Typography, Button } from '@mui/material'; // Import Material-UI components

// Rename the component to start with an uppercase letter
const LeaderboardDetails = ({ leaderboard }) => {
    const [showPrizeForm, setShowPrizeForm] = useState(false);

    const handlePrizeClick = () => {
        setShowPrizeForm(!showPrizeForm);
    };

    return (
        <div className="bg-gray-100 rounded-lg p-4 mb-4 flex flex-col">
            <div className="bg-dark-blue-2 flex justify-between items-center px-4 py-2 rounded-t-lg">
                <Typography variant="h6" component="h2" className="text-white">
                    Year: {leaderboard.year}
                </Typography>
                <Typography variant="h5" component="h4" className="text-white font-medium px-4 py-2">
                    Month: {leaderboard.month}
                </Typography>
            </div>
            <div className="bg-dark-blue-2 flex items-center px-4 py-2 rounded-b-lg">
                <Typography variant="subtitle1" component="h4" className="text-white font-medium mr-2">
                    Most Prescription Amount handled pharmacist: {leaderboard.mostPrescriptionHandledPid} <br/>
                    Most Cash Amount handled pharmacist: {leaderboard.mostCashAmountHandledPid}
                </Typography>
                <div className="flex ml-auto">
                    <Button
                        className="hover:text-login1 text-white font-bold py-2 px-4 rounded mr-2 fixed-width-button"
                        onClick={handlePrizeClick}
                    >
                        {showPrizeForm ? "Hide Cash Prize Form" : "Add Cash Prize"}
                    </Button>
                </div>
            </div>
            {showPrizeForm && (
                <div className="mt-4">
                    <LeaderboardPrizeForm />
                </div>
            )}
        </div>
    );
};

export default LeaderboardDetails;
