import Drug from '../models/drugModel.js';
import MedicineName from '../models/medicineNameModel.js';

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
        res.status(200).json(batch);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
// Delete a batch
const deleteBatch = async (req, res) => {
    try {
        const batch = await Drug.findByIdAndDelete(req.params.id);
        if (!batch) {
            return res.status(404).json({ message: 'Batch not found' });
        }
        res.status(200).json({ message: 'Batch deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a drug name and its related batches
const deleteDrugNameAndBatches = async (req, res) => {
    try {
        const drugNameId = req.params.id;// drugNameId is the ID of the drug name to be deleted
        // First, delete batches related to the drug name
        await Drug.deleteMany({ drugName: drugNameId });
        // Then, delete the drug name itself
        await MedicineName.findByIdAndDelete(drugNameId);
        res.status(200).json({ message: 'Drug name and associated batches deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

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
 // Get a drug name and its related batches
 const getDrugNameAndBatches = async (req, res) => {
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
    getAllDrugNamesAndBatches
};

