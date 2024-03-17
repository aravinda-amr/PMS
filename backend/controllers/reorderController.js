import Reorder from  '../models/reorderModel.js';
import Drug from  '../models/drugModel.js';
import mongoose from "mongoose"

//create a new Reorder
const createReorder = async (req, res)=>{
    const {title, reps, load} = req.body;
    //add doc to the collection

    let emptyFields = [];

    if(!title){
        emptyFields.push('title');
    }
     if(!reps){
        emptyFields.push('reps');
    }
     if(!load){
        emptyFields.push('load');
    }

    if(emptyFields.length > 0){
        return res.status(400).json({error: 'The following fields are required', emptyFields})
    }

    try{
        const workout = await Workout.create({title, reps, load})//create a document in the collection and save it to the database
        res.status(201).json(workout);
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

