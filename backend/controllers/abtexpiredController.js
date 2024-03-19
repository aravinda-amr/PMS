import Drug from  '../models/drugModel.js'
import mongoose from "mongoose"

//get all expired drugs
export const getabtExpired = async (req, res)=>{
  var date = new Date();
  var date10 = new Date(date.getTime());
  date10.setDate(date10.getDate() + 10);
  const abtexpired = await Drug.find({expireDate:{$lte:new Date(date10),$gte:new Date()}});
  
  
  res.status(200).json(abtexpired);
}


