import React, { useState, useEffect } from 'react';
import LeaderboardPrizeForm from "./LeaderboardPrizeForm";
import LeaderboardPrizeDisplay from "./LeaderboardPrizeDisplay";
import { Typography, Button } from '@mui/material'; // Import Material-UI components

const LeaderboardDetails = ({ leaderboard }) => {
    const [showPrizeForm, setShowPrizeForm] = useState(false);
    const [showCashPrizesDetails, setShowCashPrizesDetails] = useState(false);
    const [cashPrize, setCashPrize] = useState([]);
    const [month, setMonth] = useState(leaderboard.month);
    const [year, setYear] = useState(leaderboard.year);

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

    const updateCashPrize = (newCashPrize) => {
        setCashPrize(newCashPrize);
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
                    Most Prescription Amount handled pharmacist: {leaderboard.mostPrescriptionHandledPid} <br />
                    Most Cash Amount handled pharmacist: {leaderboard.mostCashAmountHandledPid}
                </Typography>
                <div className="flex ml-auto">
                    <Button
                        className="hover:text-login1 text-white font-bold py-2 px-4 rounded mr-2 fixed-width-button"
                        onClick={handlePrizeClick}
                    >
                        {showPrizeForm ? "Hide Cash Prize Form" : "Add Cash Prize"}
                    </Button>
                    <Button
                        className="hover:text-login1 text-white font-bold py-2 px-4 rounded mr-2 fixed-width-button"
                        onClick={handleCashPrizesClick}
                    >
                        {showCashPrizesDetails ? "Hide Cash Prizes Details" : "Show Cash Prizes Details"}
                    </Button>
                </div>
            </div>
            {showPrizeForm && (
                <div className="mt-4">
                    <LeaderboardPrizeForm onPrizeAdded={updateCashPrize} id={leaderboard._id} />
                </div>
            )}
            {showCashPrizesDetails && (
                <div className="mt-4">
                    <LeaderboardPrizeDisplay leaderboard={leaderboard} cashPrize={cashPrize} />
                </div>
            )}


        </div>
    );
};

export default LeaderboardDetails;
