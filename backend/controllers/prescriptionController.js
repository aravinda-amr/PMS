import Prescriptions from '../models/prescriptionModel.js';
import mongoose from 'mongoose';

//get all prescriptions
const getPrescriptions = async (req, res) => {
    const user_id = req.user._id;
    const prescriptions = await Prescriptions.find({ user_id }).sort({createdAt: -1});

    res.status(200).json(prescriptions);
}

//get a single prescription
const getPrescription = async (req, res) => {
    const {id} = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such prescription'});
    }
    
    const prescription = await Prescriptions.findById(id);

    if(!prescription) {
        return res.status(404).json({error: 'No such prescription'});
    }

    res.status(200).json(prescription);
}

//create a prescription
const createPrescription = async (req, res) => {
    const note  = req.body.note;
    const substitutes  = req.body.substitutes;
    const prescriptionImg  = req.body.image;

//add document to DB
    try {
        const userId = req.user._id;
        const prescription = await Prescriptions.create({note, substitutes, userId, prescriptionImg});
        res.status(200).json(prescription);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

//delete a prescription
const deletePrescription = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such prescription'});
    }

    const prescription = await Prescriptions.findOneAndDelete({_id: id});

    if(!prescription) {
        return res.status(404).json({error: 'No such prescription'});
    }

    res.status(200).json(prescription);
}

export {getPrescriptions, getPrescription, createPrescription, deletePrescription}