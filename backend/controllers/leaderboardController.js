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
                            totalCashAmount: { $toDouble: "$totalCashAmount" }
                        }
                    }
                }
            },
            {
                $unwind: "$pharmacists"
            },
            {
                $sort: {
                    "pharmacists.invoiceCount": -1,
                    "pharmacists.totalCashAmount": -1,
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

        return leaderboardData || []; // Ensure an array is returned
    } catch (error) {
        console.error("Error calculating leaderboard data:", error);
        return []; // Return an empty array in case of error
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

// Function to create or update leaderboard entries
export const createLeaderboardEntry = async (data) => {
    try {
        if (!Array.isArray(data)) {
            throw new Error("Data is not iterable");
        }

        for (const item of data) {
            const existingEntry = await leaderboard.findOne({ month: item.month, year: item.year });

            if (existingEntry) {
                // Update existing document
                existingEntry.mostPrescriptionHandledPid = item.mostPrescriptionHandledPid;
                existingEntry.mostCashAmountHandledPid = item.mostCashAmountHandledPid;
                await existingEntry.save();
            } else {
                // Insert new document
                const leaderboardEntry = new leaderboard({
                    month: item.month,
                    year: item.year,
                    mostPrescriptionHandledPid: item.mostPrescriptionHandledPid,
                    mostCashAmountHandledPid: item.mostCashAmountHandledPid,
                });
                await leaderboardEntry.save();
            }
        }
    } catch (error) {
        console.error("Error updating/inserting leaderboard data:", error);
    }
};




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



// Get cash prize from leaderboard
export const getCashPrize = async (req, res) => {
    try {
        const leaderboardEntry = await leaderboard.findById(req.params.id).select('cashPrize -_id');
        if (!leaderboardEntry) {
            return res.status(404).json({ message: 'Leaderboard entry not found' });
        }
        res.json({ cashPrize: leaderboardEntry.cashPrize });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
  
   


// Add cash prize to leaderboard
export const addCashPrize = async (req, res) => {
    try {
        const updateLeaderboard = await leaderboard.findOneAndUpdate(
            { _id: req.params.id }, // Use _id from URL parameters
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


//Delete cash prize from leaderboard
export const deleteCashPrize = async (req, res) => {
    try {
        const result = await leaderboard.findByIdAndUpdate(
            req.params.id,
            { $unset: { cashPrize: "" } },
            { new: true }
        );
        if (!result) {
            return res.status(404).json({ message: 'Leaderboard entry not found' });
        }
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}


//Update cash prize from leaderboard
export const updateCashPrize = async (req, res) => {
    try {
        const result = await leaderboard.findByIdAndUpdate(
            req.params.id,
            { cashPrize: req.body.cashPrize },
            { new: true }
        );
        if (!result) {
            return res.status(404).json({ message: 'Leaderboard entry not found' });
        }
        res.json(result);
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}