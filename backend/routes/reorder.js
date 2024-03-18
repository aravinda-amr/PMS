import express from 'express';
import { createReorder, getReorders, getReorder, deleteReorder, updateReorder} from '../controllers/reorderController.js';


const router = express.Router();

// //Get all workouts
router.get('/', getReorders)


// //Get a single workout
 router.get('/:id', getReorder)

//Create a workout
router.post('/', createReorder)

// //Delete a workout
 router.delete('/:id', deleteReorder)

// //Update a workout
router.patch('/:id', updateReorder)

export default router;
