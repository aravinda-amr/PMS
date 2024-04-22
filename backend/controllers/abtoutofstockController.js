
import Drug from  '../models/drugModel.js'
import MedicineName from '../models/medicineModel.js';
import mongoose from "mongoose"


export const getabtoutofstock = async (req, res)=>{
    const abtoutofstock = await MedicineName.find({$and: [
        { $expr: { $lte: [ { $toDouble: "$totalquantity" }, 150.0 ] }},
        { $expr: { $gte: [ { $toDouble: "$totalquantity" }, 100.0 ] }}
      ]});
    res.status(200).json(abtoutofstock);

}

// export const getDrugNameById = async (req, res) => {
//   const { id } = req.params;

//   try {
//       let medicine;

//       // Check if the provided ID is a valid ObjectId
//       if (mongoose.Types.ObjectId.isValid(id)) {
//           medicine = await MedicineName.findById(id);
//       } else {
//           // If not a valid ObjectId, assume it's the drugName and find the medicine by name
//           medicine = await MedicineName.findOne({ drugName: id });
//       }

//       if (!medicine) {
//           return res.status(404).json({ message: 'Medicine not found' });
//       }

//       res.status(200).json({ drugName: medicine.drugName });
//   } catch (error) {
//       console.error('Error fetching drug name by ID:', error);
//       res.status(500).json({ message: 'Internal server error' });
//   }
// };

 
