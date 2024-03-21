import Drug from  '../models/drugModel.js'
import mongoose from "mongoose"

//get all expired drugs
export const getabtExpired = async (req, res)=>{
 
 
    const now = new Date();
    const expirationThreshold = new Date(now.getTime());
    expirationThreshold.setDate(expirationThreshold.getDate() + 30);
  
    const abtexpired = await Drug.find({
      expireDate: { $lt: expirationThreshold, $gt: now } // Changed operator
    });


  res.status(200).json(abtexpired);
}


