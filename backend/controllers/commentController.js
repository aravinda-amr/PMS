import Comment from '../models/CommentModel.js'
import mongoose from 'mongoose'

//get all workouts
export const getComments = async (req, res) => {
    
        const comment = await Comment.find({})
        res.status(200).json(comment)
 
}

//get a single workout
export const getComment = async (req, res) => {
    
        const {id} = req.params

        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({err:"No such comment"})
        }

        const comment = await Comment.findById(id)
    
    if(!comment){
       return res.status(404).json({err:" No such comment"})
    }
    res.status(200).json(comment)
}


//create new workout
export const createComment = async (req, res) => {
    const{title, note, day} = req.body

    let emptyFields = []  
    
    if(!title){
        emptyFields.push('title')
    }

    if(!note){ 
        emptyFields.push('note')
    }

    if(!day){
        emptyFields.push('day')
    }

    if(emptyFields.length > 0){
        return res.status(400).json({error:'Please fill in all the fields', emptyFields})
    }

    //add doc to DB
    try{
        const comment = await Comment.create({title, note, day})
        res.status(200).json(comment)
    }catch(error)
    {
        res.status(400).json({error: error.message})
    }
}


//delete a workout
export const deleteComment = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({err:"No such comment"})
    }

    const comment = await Comment.findOneAndDelete({_id: id})

    if(!comment){
        return res.status(404).json({err:" No such Comment"})
     }

    res.status(200).json(comment)
} 


//update a workout
export const updateComment = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({err:"No such comment"})
    }

    const comment= await Comment.findOneAndUpdate({_id: id},{
        ...req.body
    })

    if(!comment){
        return res.status(404).json({err:" No such comment"})
     }

    res.status(200).json(comment)
}


