import Drug from '../models/drugModel.js';
import MedicineName from '../models/medicineModel.js';
import Reorder from '../models/reorderModel.js';
import mongoose from 'mongoose';


// Create a new batch
const createBatch = async (req, res) => {
    try {
        const batch = new Drug(req.body);
        await batch.save();
        res.status(201).json(batch);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all batches
const getAllBatches = async (req, res) => {
    try {
        const batches = await Drug.find();
        res.status(200).json(batches);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single batch by ID
const getBatchById = async (req, res) => {
    try {
        const batch = await Drug.findById(req.params.id);
        if (!batch) {
            return res.status(404).json({ message: 'Batch not found' });
        }
        res.status(200).json(batch);
    }catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Update a batch
const updateBatch = async (req, res) => {
    try {
        const batch = await Drug.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!batch) {
            return res.status(404).json({ message: 'Batch not found' });
        }
        
        // Recalculate total quantity for the drug
        const totalQuantity = await Drug.aggregate([
            {
                $match: { drugName: batch.drugName }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$quantity" }
                }
            }
        ]);

        // Update totalquantity in MedicineName schema
        // Use the ObjectId of drugName to find the corresponding MedicineName document
        await MedicineName.findByIdAndUpdate(
            batch.drugName, // Use the ObjectId of drugName
            { totalquantity: totalQuantity[0].total },
            { new: true }
        );

        res.status(200).json(batch);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
//update batch end here


// Delete a batch
const deleteBatch = async (req, res) => {
    try {
        // Find the batch to be deleted
        const batch = await Drug.findByIdAndDelete(req.params.id);
        if (!batch) {
            return res.status(404).json({ message: 'Batch not found' });
        }

        // Recalculate total quantity for the drug
        const totalQuantityResult = await Drug.aggregate([
            {
                $match: { drugName: batch.drugName }
            },
            {
                $group: {
                    _id: null,
                    total: { $sum: "$quantity" }
                }
            }
        ]);

        // If there are no batches left for the drug, set total quantity to 0
        const totalQuantity = totalQuantityResult.length > 0 ? totalQuantityResult[0].total : 0;

        // Update total quantity in MedicineName schema
        // Use the ObjectId of drugName to find the corresponding MedicineName document
        await MedicineName.findByIdAndUpdate(
            batch.drugName, // Use the ObjectId of drugName
            { totalquantity: totalQuantity },
            { new: true }
        );

        // Send response
        res.status(200).json({ message: 'Batch deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//delete batch end here


// Delete a drug name and its related batches
const deleteDrugNameAndBatches = async (req, res) => {
    try {
        const drugNameId = req.params.id; // drugNameId is the ID of the drug name to be deleted

        // First, delete batches related to the drug name
        await Drug.deleteMany({ drugName: drugNameId });

        // Then, delete the drug name itself
        await MedicineName.findByIdAndDelete(drugNameId);

        res.status(200).json({ message: 'Drug name and associated batches deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//create a drugout
// const createDrugout = async (req, res) => {
//     const {drugName, batchNumber, manufactureDate, expireDate, quantity, price} = req.body;

//     //add document to DB
//     try {
//         const drugNameId = req.params.id;// drugNameId is the ID of the drug name to be deleted
//         // First, delete batches related to the drug name
//         await Drug.deleteMany({ drugName: drugNameId });
//         // Then, delete the drug name itself
//         await MedicineName.findByIdAndDelete(drugNameId);
//         res.status(200).json({ message: 'Drug name and associated batches deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };


// Create a new drug name
const createDrugName = async (req, res) => {
    try {
        const drugName = new MedicineName(req.body);
        await drugName.save();
        res.status(201).json(drugName);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Insert batches for a drug name
const insertBatchesForDrugName = async (req, res) => {
    try {
        const drugNameId = req.params.id;
        // Check if drugNameId exists
        const existingDrugName = await MedicineName.findById(drugNameId);
        if (!existingDrugName) {
            return res.status(404).json({ message: 'Drug name not found' });
        }
        const batchData = req.body;
        // Update drugName field in batchData to link it with the provided drugNameId
        batchData.drugName = drugNameId;
        const batch = new Drug(batchData);
        await batch.save();
        res.status(201).json(batch);
    } catch (error) {
        res.status(400).json({ message: error.message });
        
    }
    
};

 // get drug name by search
 const getDrugNamesearch = async (req, res) => {
    try {
        const drugNameId = req.params.id;

        // Find the drug name by ID
        const drugName = await MedicineName.findById(drugNameId);
        if (!drugName) {
            return res.status(404).json({ message:'Drug name not found' });
        }

        // Find all batches related to the drug name
        const batches = await Drug.find({ drugName: drugNameId });

        // Extract dates from the batches
        const dates = batches.map(batch => batch.date);

        res.status(200).json({ drugName, batches, dates });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
    // get drug name by search end here


// Get a drug name and its related batches
const getDrugNameAndBatches = async (req, res) => {
    try {
        const drugName = req.params.drugName;

        // Find the drug name by name
        const medicineName = await MedicineName.findOne({ drugName });
        if (!medicineName) {
            return res.status(404).json({ message: 'Drug name not found' });
        }

        // Find all batches related to the drug name
        const batches = await Drug.find({ drugName: medicineName._id }).sort({ createdAt: 1 });

        if (!batches.length) {
            return res.status(404).json({ message: 'No batches found for this drug' });
        }

        // Extract dates and batches
        const dates = batches.map(batch => batch.createdAt);

        res.status(200).json({ medicineName, batches, dates });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
//


 // Get all drug names along with their batches
 const getAllDrugNamesAndBatches = async (req, res) => {
    try {
        // Find all drug names
        const drugNames = await MedicineName.find();
        // Array to store drug names along with their batches
        const drugNamesWithBatches = [];

        // Iterate through each drug name
        for (const drugName of drugNames) {
            // Find all batches related to the current drug name
            const batches = await Drug.find({ drugName: drugName._id });
            // Push drug name along with its batches to the array
            drugNamesWithBatches.push({ drugName, batches });
        }

        res.status(200).json(drugNamesWithBatches);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getDrugNamesWithPrice = async (req, res) => {
    try {
        // Find all drugs with their prices and total quantity from the first batch
        const drugsWithPricesAndQuantity = await Drug.aggregate([
            {
                $group: {
                    _id: "$drugName", // Group by drugName
                    price: { $first: "$price" }, // Get the price from the first batch
                    totalQuantity: { $sum: "$quantity" } // Sum of quantity from all batches
                }
            },
            {
                $lookup: {
                    from: "medicinenames", // Lookup the drugName in the MedicineName collection
                    localField: "_id",
                    foreignField: "_id",
                    as: "drugName"
                }
            },
            {
                $project: {
                    _id: 0,
                    drugName: { $arrayElemAt: ["$drugName.drugName", 0] }, // Get the drugName from the lookup result
                    price: 1, // Include the price
                    totalQuantity: 1 // Include the total quantity
                }
            }
        ]);

        res.json(drugsWithPricesAndQuantity);
        
    } catch (error) {
        console.error('Error fetching drug names with price and quantity:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Update total price for a specific medicine by ID
const updateTotalPrice =async (req, res) => {
    try {
        const { id } = req.params;
        const { totalPrice } = req.body;

        const medicineName = await MedicineName.findByIdAndUpdate(
            id,
            { totalPrice },
            { new: true }
        );

        if (!medicineName) {
            return res.status(404).json({ message: 'Medicine not found' });
        }

        res.status(200).json(medicineName);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



export {  
    createBatch,
    getAllBatches,
    getBatchById,
    updateBatch,
    deleteBatch,
    deleteDrugNameAndBatches,
    createDrugName,
    insertBatchesForDrugName,
    getDrugNameAndBatches,
    getAllDrugNamesAndBatches,
    getDrugNamesearch,
    getDrugNamesWithPrice,
    updateTotalPrice

};

