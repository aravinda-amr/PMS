import express from 'express';

import { 
    createDrugout,getDrugout,getDrugouts,deleteDrugout,updateDrugout} from '../controllers/drugoutsController.js';


const router = express.Router();



// Import the drugout model
router.get('/', getDrugouts)

// Get a single drugout
router.get('/:id', getDrugout)

// Add a new drugout
router.post('/',createDrugout)

// Update a drugout
router.patch('/:id', updateDrugout)

// Delete a drugout
router.delete('/:id', deleteDrugout)

export default router;

