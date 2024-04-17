import Drug from  '../models/drugModel.js'
import mongoose from "mongoose"

//get all expired drugs
export const getabtoutofstock = async (req, res)=>{
    const abtoutofstock = await Drug.find({$and: [
        { $expr: { $lte: [ { $toDouble: "$quantity" }, 150.0 ] }},
        { $expr: { $gte: [ { $toDouble: "$quantity" }, 70.0 ] }}
      ]});
    res.status(200).json(abtoutofstock);
}