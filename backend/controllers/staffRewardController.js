import mongoose from 'mongoose';
import Bill from '../models/billingModel.js'; 
import StaffReward from '../models/staffRewardModel.js';

const calculateInvoiceHandledData = async () => {
    try {
        const result = await Bill.aggregate([
            {
                $group: {
                    _id: {
                        pharmacistID: "$pharmacistID", // Group by pharmacistID
                        month: { $month: "$invoiceDate" }, // Extract month from invoiceDate
                        year: { $year: "$invoiceDate" } // Extract year from invoiceDate
                    },
                    invoiceCount: { $sum: 1 } , // Sum of grandTotal for each pharmacist per month
                    totalCashAmount: { $sum: "$grandTotal" } // Sum of grandTotal for each pharmacist per month
                }
            },
            {
                $project: {
                    _id: 0,
                    pharmacistID: "$_id.pharmacistID",
                    month: { $toString: "$_id.month" },
                    year: { $toString: "$_id.year" },
                    invoiceCount: 1,
                    totalCashAmount: 1,
                   
                }
            }
        ]);

     
        return result;
    } catch (error) {
        console.error("Error calculating monthly total invoice amount:", error);
    }
};



// Controller to get all staff rewards
export const getAllStaffRewards = async (req, res) => {
    try {
        const staffRewards = await StaffReward.find();
        res.json(staffRewards);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Controller to get a staff reward by pharmacistID
export const getStaffReward = async (req, res) => {
    try {
        const staffReward = await StaffReward.findOne({ pharmacistID: req.params.pharmacistID });
        if (!staffReward) {
            return res.status(404).json({ message: 'Staff reward not found' });
        }
        res.json(staffReward);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


//create new staff reward
export const createStaffReward = async (data) => {
    try {
        for (const item of data) {
            const existingReward = await StaffReward.findOne({ pharmacistID: item.pharmacistID, month: item.month, year: item.year });

            if (existingReward) {
                // Update existing document
                existingReward.invoiceCount = item.invoiceCount.toString();
                existingReward.totalCashAmount = item.totalCashAmount.toString();
                await existingReward.save();
               // console.log(`Data updated for pharmacist ${item.pharmacistID} for month ${item.month}, year ${item.year}`);
            } else {
                // Insert new document
                const staffReward = new StaffReward({
                    pharmacistID: item.pharmacistID,
                    month: item.month,
                    year: item.year,
                    invoiceCount: item.invoiceCount.toString(), // Convert to string as per schema
                    totalCashAmount: item.totalCashAmount.toString() // Convert to string as per schema
                });
                await staffReward.save();
              //  console.log(`New data added for pharmacist ${item.pharmacistID} for month ${item.month}, year ${item.year}`);
            }
        }
       // console.log("Data updated/inserted into staffReward collection.");
    } catch (error) {
        console.error("Error updating/inserting data into staffReward collection:", error);
    }
};

(async () => {
    try {
        const invoiceHandledData = await calculateInvoiceHandledData();
        await createStaffReward(invoiceHandledData);
    } catch (error) {
        console.error("Error:", error);
    }
})();



