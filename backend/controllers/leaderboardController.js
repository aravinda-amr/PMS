import mongoose from 'mongoose';
import StaffReward from '../models/staffRewardModel.js';
import leaderboard from '../models/leaderboardModel.js';

//calculation for most prescription handled pharmacist
const calculateMostPrescriptionHandledPharmacist = async () => {
    try {
        const result1 = await StaffReward.aggregate([
            {
                $group: {
                    _id: { month: "$month", year: "$year" },
                    pharmacists: {
                        $push: {
                            pharmacistID: "$pharmacistID",
                            invoiceCount: "$invoiceCount"
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
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    month: "$_id.month",
                    year: "$_id.year",
                    mostPrescriptionHandledPid: 1,
                    mostPrescriptionHandledCount: 1
                }
            }
        ]);

        return result1 || []; 
    } catch (error) {
        console.error("Error calculating most prescription handled pharmacist:", error);
        return []; 
    }
};


//calculation for most cash amount handled pharmacist
const calculateMostCashAmountHandledPharmacist = async () => {
    try {
        const result2 = await StaffReward.aggregate([
            {
                $group: {
                    _id: { month: "$month", year: "$year" },
                    pharmacists: {
                        $push: {
                            pharmacistID: "$pharmacistID",
                            totalCashAmount: "$totalCashAmount"
                        }
                    }
                }
            },
            {
                $unwind: "$pharmacists"
            },
            {
                $sort: {
                    "pharmacists.totalCashAmount": -1
                }
            },
            {
                $group: {
                    _id: { month: "$_id.month", year: "$_id.year" },
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
                    mostCashAmountHandledPid: 1,
                    mostCashAmountHandledAmount: 1
                }
            }
        ]);

        return result2 || []; 
    } catch (error) {
        console.error("Error calculating most cash amount handled pharmacist:", error);
        return []; 
    }
};



// Controllers for leaderboard operations
export const getAllLeaderboards = async (req, res) => {
    try {
        const leaderboards = await leaderboard.find();
        res.json(leaderboards);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

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


//create most prescription entry
export const createMostPrescriptionEntry = async (data) => {
    try {
        if (!Array.isArray(data)) {
            throw new Error("Data is not iterable");
        }

        for (const item of data) {
            const existingEntry = await leaderboard.findOne({ month: item.month, year: item.year });

            if (existingEntry) {
                // Update existing document
                existingEntry.mostPrescriptionHandledPid = item.mostPrescriptionHandledPid;


                await existingEntry.save();
            } else {
                // Insert new document
                const leaderboardEntry = new leaderboard({
                    month: item.month,
                    year: item.year,
                    mostPrescriptionHandledPid: item.mostPrescriptionHandledPid,
                });
                await leaderboardEntry.save();
            }
        }
    } catch (error) {
        console.error("Error updating/inserting leaderboard data:", error);
    }
};

(async () => {
    try {
        const result1 = await calculateMostPrescriptionHandledPharmacist();
        await createMostPrescriptionEntry(result1);

    } catch (error) {
        console.error("Error:", error);
    }
})();



//create most cash amount entry
export const createMostCashAmountEntry = async (data) => {
    try {
        if (!Array.isArray(data)) {
            throw new Error("Data is not iterable");
        }

        for (const item of data) {
            const existingEntry = await leaderboard.findOne({ month: item.month, year: item.year });

            if (existingEntry) {
                // Update existing document
                existingEntry.mostCashAmountHandledPid = item.mostCashAmountHandledPid;


                await existingEntry.save();
            } else {
                // Insert new document
                const leaderboardEntry = new leaderboard({
                    month: item.month,
                    year: item.year,
                    mostCashAmountHandledPid: item.mostCashAmountHandledPid,
                });
                await leaderboardEntry.save();
            }
        }
    } catch (error) {
        console.error("Error updating/inserting leaderboard data:", error);
    }
};

(async () => {
    try {
        const result2 = await calculateMostCashAmountHandledPharmacist();
        await createMostCashAmountEntry(result2);

    } catch (error) {
        console.error("Error:", error);
    }
})();





// Additional functions for handling cash prizes
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
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

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
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
