import Drug from  '../models/drugModel.js'
import MedicineName from '../models/medicineModel.js'
import mongoose from "mongoose"

//get all expired drugs
export const getExpired = async (req, res)=>{
    const expired = await Drug.find({expireDate:{$lte:new Date()}})//find all the documents in the collection and sort them by the createdAt field in descending order
    res.status(200).json(expired);
}

export const getDrugNameById = async (req, res) => {
    const { id } = req.params;
  
    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid medicine ID' });
    }
  
    try {
      const medicine = await MedicineName.findById(id);
      if (!medicine) {
        return res.status(404).json({ message: 'Medicine not found' });
      }
  
      res.status(200).json({ drugName: medicine.drugName });
    } catch (error) {
      console.error('Error fetching drug name by ID:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };

