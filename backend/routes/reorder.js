import express from 'express';
// const {createReorder, getReorder, getReorders, deleteReorder, updateReorder} = import 

const router = express.Router();

//Get all workouts
router.get('/', getWorkouts)


//Get a single workout
router.get('/:id', getWorkout)


//Create a workout
router.post('/', createWorkout)


//Delete a workout
router.delete('/:id', deleteWorkout)


//Update a workout
router.patch('/:id', updateWorkout)

export default router;
