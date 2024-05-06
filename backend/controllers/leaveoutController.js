import mongoose from "mongoose";
import Leave from "../models/leaveoutModel.js"; // Import the Leave model

// Get all leaves
export const getLeaves = async (req, res) => {
    try {
        const leaves = await Leave.find({}).sort({ createdAt: -1 });
        res.status(200).json(leaves);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a single leave
export const getLeave = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such leave' });
    }

    try {
        const leave = await Leave.findById(id);
        if (!leave) {
            return res.status(404).json({ error: 'No such leave' });
        }
        res.status(200).json(leave);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a leave
export const createLeave = async (req, res) => {
    const { name, email,  dateFrom, dateTo, reason } = req.body;

    try {
        const leave = await Leave.create({ name, email, dateFrom, dateTo, reason });
        res.status(201).json(leave);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Delete a leave
export const deleteLeave = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such leave' });
    }

    try {
        const leave = await Leave.findOneAndDelete({ _id: id });
        if (!leave) {
            return res.status(404).json({ error: 'No such leave' });
        }
        res.status(200).json({ message: 'Leave deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update a leave
export const updateLeave = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such leave' });
    }

    try {
        const leave = await Leave.findByIdAndUpdate(id, req.body, { new: true });
        if (!leave) {
            return res.status(404).json({ error: 'No such leave' });
        }
        res.status(200).json({ message: 'Leave updated successfully', leave });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};