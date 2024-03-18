import Reorder from  '../models/reorderModel.js'

import mongoose from "mongoose"


//get all reorders
export const getReorders = async (req, res)=>{
    const reorders = await Reorder.find({}).sort({createdAt: -1})//find all the documents in the collection and sort them by the createdAt field in descending order
    res.status(200).json(reorders);
}

//get a single reorder
export const getReorder = async (req, res)=>{
    const {id} = req.params //get the id from the request parameters we use this if we need to get a single information from the database

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({msg: `No Reorder with id: ${id}`})//if the id is not a valid mongoose id, return a 404 status code and a message
    }

    const reorder = await Reorder.findById(id)

    if (!reorder){
      return res.status(404).json({msg: `No Reorder with id: ${id}`});//if no workout is found, return a 404 status code and a message
    }
    res.status(200).json(reorder);
}

//create a new Reorder
export const createReorder = async (req, res)=>{
    const { supplierEmail,  drugID, reorderLevel} = req.body;
    //add doc to the collection
    try{
        const reorder = await Reorder.create({ supplierEmail,  drugID, reorderLevel})//create a document in the collection and save it to the database
        res.status(200).json(reorder);
    }catch(error){
        res.status(400).json({error: error.message})
    }
    res.json({mssg: 'reorder created'})
}

//delete a reorder
export const deleteReorder = async (req, res)=>{
    const {id} = req.params
    
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({msg: `No Reorder with id: ${id}`})//if the id is not a valid mongoose id, return a 404 status code and a message
    }

    const reorder = await Reorder.findOneAndDelete({_id: id})

    if (!reorder){
      return res.status(404).json({msg: `No Reorder with id: ${id}`});//if no workout is found, return a 404 status code and a message
    }

    res.status(200).json({msg: 'Reorder deleted'});

}

//update a reorder
export const updateReorder = async (req, res)=>{
        const {id} = req.params
    
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({msg: `No Reorder with id: ${id}`})//if the id is not a valid mongoose id, return a 404 status code and a message
        }
        const reorder= await Reorder.findOneAndUpdate({_id: id}, {
            ...req.body //spread the request body and update the fields
        })
        if (!reorder){
            return res.status(404).json({msg: `No Reorder with id: ${id}`});//if no workout is found, return a 404 status code and a message
          }
          res.status(200).json(reorder)
    }



