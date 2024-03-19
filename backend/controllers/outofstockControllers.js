import Drug from  '../models/drugModel.js'
import mongoose from "mongoose"

//get all expired drugs
export const getoutofstock = async (req, res)=>{
    const outofstock = await Drug.find({ $expr: { $lte: [ { $toDouble: "$quantity" }, 1.0 ] }});
    res.status(200).json(outofstock);
}