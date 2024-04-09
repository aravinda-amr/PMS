import express from 'express'

import {getComment, getComments, createComment, deleteComment, updateComment} from '../controllers/commentController.js'

const router = express.Router()

//get all workouts
router.get('/', getComments)
 

 //get a single workout
 router.get('/:id', getComment) 
 

 //post a new workout
    router.post('/', createComment)
    

//delete a workout
    router.delete('/:id', deleteComment)

//update a workout
    router.patch('/:id', updateComment)
    
    
 export default router