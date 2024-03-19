import Drug from  '../models/drugModel.js'
import mongoose from "mongoose"

//get all expired drugs
export const getExpired = async (req, res)=>{
    const expired = await Drug.find({expireDate:{$lte:new Date()}})//find all the documents in the collection and sort them by the createdAt field in descending order
    res.status(200).json(expired);
}

