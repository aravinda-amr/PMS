import express from 'express';
import { createLeave, getLeave, getLeaves, deleteLeave, updateLeave } from '../controllers/leaveoutController.js'; // Import Leave controllers

const router = express.Router();

// Get all leaves
router.get('/', getLeaves);

// Get a single leave
router.get('/:id', getLeave);

// Add a new leave
router.post('/', createLeave);

// Update a leave
router.patch('/:id', updateLeave);

// Delete a leave
router.delete('/:id', deleteLeave);

export default router;