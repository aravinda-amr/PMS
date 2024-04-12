import Prescriptions from '../models/prescriptionModel.js';

//get all prescriptions
const getPres = async (req, res) => {
    const prescriptions = await Prescriptions.find({});

    res.status(200).json(prescriptions);
}

export { getPres };