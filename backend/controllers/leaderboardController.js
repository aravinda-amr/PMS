import mongoose from 'mongoose';
import StaffReward from '../models/staffRewardModel.js';
import leaderboard from '../models/leaderboardModel.js';

// Function to calculate and insert leaderboard data
const calculateLeaderboardData = async () => {
    try {
        const leaderboardData = await StaffReward.aggregate([
            {
                $group: {
                    _id: { month: "$month", year: "$year" },
                    pharmacists: {
                        $push: {
                            pharmacistID: "$pharmacistID",
                            invoiceCount: { $toInt: "$invoiceCount" },
                            totalCashAmount: { $toInt: "$totalCashAmount" }
                        }
                    }
                }
            },
            {
                $unwind: "$pharmacists"
            },
            {
                $sort: {
                    "pharmacists.invoiceCount": -1
                }
            },
            {
                $group: {
                    _id: { month: "$_id.month", year: "$_id.year" },
                    mostPrescriptionHandledPid: {
                        $first: "$pharmacists.pharmacistID"
                    },
                    mostPrescriptionHandledCount: {
                        $first: "$pharmacists.invoiceCount"
                    },
                    mostCashAmountHandledPid: {
                        $first: "$pharmacists.pharmacistID"
                    },
                    mostCashAmountHandledAmount: {
                        $first: "$pharmacists.totalCashAmount"
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    month: "$_id.month",
                    year: "$_id.year",
                    mostPrescriptionHandledPid: 1,
                    mostPrescriptionHandledCount: 1,
                    mostCashAmountHandledPid: 1,
                    mostCashAmountHandledAmount: 1

                }
            }
        ]);

        return leaderboardData;
    } catch (error) {
        console.error("Error calculating leaderboard data:", error);
    }
};





// Controller to get all leaderboards
export const getAllLeaderboards = async (req, res) => {
    try {
        const leaderboards = await leaderboard.find();
        res.json(leaderboards);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller to get a leaderboard by pharmacistID
export const getLeaderboard = async (req, res) => {
    try {
        const leaderboard = await leaderboard.findOne({ pharmacistID: req.params.pharmacistID });
        if (!leaderboard) {
            return res.status(404).json({ message: 'leaderboard not found' });
        }
        res.json(leaderboard);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};



//create new leaderboard


// Function to create or update leaderboard entries
export const createLeaderboardEntry = async (data) => {
    try {
       

        for (const item of data) {
            const existingEntry = await leaderboard.findOne({ month: item.month, year: item.year });

            if (existingEntry) {
                // Update existing document
                existingEntry.mostPrescriptionHandledPid = item.mostPrescriptionHandledPid;
                existingEntry.mostCashAmountHandledPid = item.mostCashAmountHandledPid;
                await existingEntry.save();
                // console.log(`Leaderboard data updated for month ${item.month}, year ${item.year}`);
            } else {
                // Insert new document
                const leaderboardEntry = new leaderboard({
                    month: item.month,
                    year: item.year,
                    mostPrescriptionHandledPid: item.mostPrescriptionHandledPid,
                    mostCashAmountHandledPid: item.mostCashAmountHandledPid,
                });
                await leaderboardEntry.save();
                // console.log(`New leaderboard data added for month ${item.month}, year ${item.year}`);
            }
        }
        // console.log("Leaderboard data updated/inserted successfully.");
    } catch (error) {
        console.error("Error updating/inserting leaderboard data:", error);
    }
};

// Example usage
(async () => {
    try {
        const leaderboardData = await calculateLeaderboardData();
        await createLeaderboardEntry(leaderboardData);
    } catch (error) {
        console.error("Error:", error);
    }
})();


// Controller to update a leaderboard by pharmacistID
export const updateLeaderboard = async (req, res) => {
    try {
        const updateLeaderboard = await leaderboard.findOneAndUpdate(
            { pharmacistID: req.params.pharmacistID },
            req.body,
            { new: true }
        );
        if (!updateLeaderboard) {
            return res.status(404).json({ message: 'Staff reward not found' });
        }
        res.json(updateLeaderboard);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};



// Controller to delete a leaderboard by pharmacistID
export const deleteLeaderboard = async (req, res) => {
    try {
        const result = await leaderboard.deleteOne({ pharmacistID: req.params.pharmacistID });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'leaderboard not found' });
        }
        res.json({ message: 'leaderboard deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add cash prize to leaderboard
export const addCashPrize = async (req, res) => {
    try {
        const { month, year, cashPrize } = req.body;
        const existingEntry = await leaderboard.findOne({ month, year });

        if (!existingEntry) {
            return res.status(404).json({ message: 'Leaderboard entry not found' });
        }

        existingEntry.cashPrize = cashPrize;
        await existingEntry.save();
        res.json(existingEntry);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};














































      
