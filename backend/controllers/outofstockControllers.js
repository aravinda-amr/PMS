import Drug from  '../models/drugModel.js'
import mongoose from "mongoose"
import MedicineName from '../models/medicineModel.js';

//get all expired drugs
export const getoutofstock = async (req, res)=>{
    const outofstock = await Drug.find({ $expr: { $lte: [ { $toDouble: "$quantity" }, 1.0 ] }});
    res.status(200).json(outofstock);
}

export const getDrugNameById = async (req, res) => {
    const { id } = req.params;
  
    try {
      const medicine = await MedicineName.findById(id);
      if (!medicine) {
        return res.status(404).json({ message: 'Medicine not found' });
      }
  
      res.status(200).json({ drugName: medicine.drugName });
    } catch (error) {
      console.error('Error fetching drug name by ID:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };