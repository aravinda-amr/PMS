import express from 'express';

import { createBatch, getAllBatches, getBatchById,
    updateBatch,
    deleteBatch,
           } from '../controllers/drugoutsController.js';


const router = express.Router();


// Get all batches
router.get('/batches', getAllBatches);

// Get single batch
router.get('/batches/:id', getBatchById);

// Post a new batch
router.post('/batches',createBatch);

// Update a batch
router.patch('/batches/:id', updateBatch);

// Delete a batch
router.delete('/batches/:id', deleteBatch);

export default router;

