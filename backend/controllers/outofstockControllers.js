import Drug from  '../models/drugModel.js'
import mongoose from "mongoose"
import MedicineName from '../models/medicineModel.js';


export const getoutofstock = async (req, res)=>{
    const outofstock = await MedicineName.find({ $expr: { $lte: [ { $toDouble: "$totalquantity" }, 1.0 ] }});
    res.status(200).json(outofstock);
}

