// import Drug from  '../models/drugModel.js'
// import mongoose from "mongoose"

// //get all expired drugs
// export const getabtoutofstock = async (req, res)=>{
//     const abtoutofstock = await Drug.find({$and: [
//         { $expr: { $lte: [ { $toDouble: "$quantity" }, 150.0 ] }},
//         { $expr: { $gte: [ { $toDouble: "$quantity" }, 70.0 ] }}
//       ]});
//     res.status(200).json(abtoutofstock);
// }
import Drug from  '../models/drugModel.js'
import MedicineName from '../models/medicineModel.js';
import mongoose from "mongoose"


export const getabtoutofstock = async (req, res)=>{
    const abtoutofstock = await Drug.find({$and: [
        { $expr: { $lte: [ { $toDouble: "$quantity" }, 150.0 ] }},
        { $expr: { $gte: [ { $toDouble: "$quantity" }, 70.0 ] }}
      ]});
    res.status(200).json(abtoutofstock);

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
