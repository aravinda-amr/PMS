import Prescriptions from '../models/prescriptionModel.js';
import mongoose from 'mongoose';

export const getallPre = async (req, res)=>{
    const reorders = await Prescriptions.find()//find all the documents in the collection and sort them by the createdAt field in descending order
    res.status(200).json(reorders);
}