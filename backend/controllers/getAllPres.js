import Prescriptions from '../models/prescriptionModel.js';
import mongoose from 'mongoose';

//get all prescriptions
const getPres = async (req, res) => {
    const prescriptions = await Prescriptions.find({});

    res.status(200).json(prescriptions);
}


//delete prescription
const deletePres = async (req, res) => {
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

export { getPres, deletePres };