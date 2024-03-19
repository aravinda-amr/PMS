import express from 'express';
import { createReorder, getReorders, getReorder, deleteReorder, updateReorder} from '../controllers/reorderController.js';


const router = express.Router();

// //Get all reorder
router.get('/', getReorders)


// //Get a single reorder
 router.get('/:id', getReorder)

//Create a reorder
router.post('/', createReorder)

// //Delete a reorder
 router.delete('/:id', deleteReorder)

// //Update a reorder
router.patch('/:id', updateReorder)

export default router;
