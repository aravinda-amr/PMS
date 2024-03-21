import Drug from '../models/drugModel.js';
import mongoose from 'mongoose';


//get all drugouts
const getDrugouts = async (req, res) => {
        const drugouts = await Drug.find({}).sort({createdAt: -1});
       
        res.status(200).json(drugouts);
}

//get a single drugout
const getDrugout = async (req, res) => {
    const {id} = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such drugout'});
    }

    const drugout = await Drug.findById(id);

    if(!drugout) {
        return res.status(404).json({error: 'No such drugout'});
    }

    res.status(200).json(drugout);
}

//create a drugout
const createDrugout = async (req, res) => {
    const {drugName, batchNumber, manufactureDate, expireDate, quantity, price} = req.body;

    //add document to DB
    try {
        const drugout = await Drug.create({drugName, batchNumber, manufactureDate, expireDate, quantity, price});
        res.status(200).json(drugout);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}


//delete a drugout
const deleteDrugout = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such drugout'});
    }

    const drugout = await Drug.findOneAndDelete({_id: id});
    
    if(!drugout) {
        return res.status(404).json({error: 'No such drugout'});
    }

    res.status(200).json({message: 'Drugout deleted successfully'});
   
}

//update a drugout
   const updateDrugout = async (req, res) => {
    const {id} = req.params
   

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such drugout'});
    }

    const drugout = await Drug.findOneAndUpdate({_id: id}, 
        {
            ...req.body,
            
        });
        if(!drugout) {
            return res.status(404).json({error: 'No such drugout'});
        }

        res.status(200).json({message: 'Drugout updated successfully'});

    }
   


export {createDrugout, getDrugouts, getDrugout, deleteDrugout, updateDrugout}

