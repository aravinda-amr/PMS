import Drug from '../models/drugModel.js';
import MedicineName from '../models/medicineModel.js'
import mongoose from 'mongoose';

// Get all drugs that will expire in the next 30 days
export const getabtExpired = async (req, res) => {
  const now = new Date(); //
  const expirationThreshold = new Date(now.getTime());
  expirationThreshold.setDate(expirationThreshold.getDate() + 30);

  // Corrected query to find drugs expiring in the next 30 days
  const abtexpired = await Drug.find({
    expireDate: { $gte: now, $lt: expirationThreshold } //Get the drugs with expired date that is btw now and 30 days
  }); //gte => and lt <=

  res.status(200).json(abtexpired);
}

export const getDrugNameById = async (req, res) => { //provide the drug name according to the drug id

  const { id } = req.params; //id of the medicine

  // Validate the ID if it's correct drug id 
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid medicine ID' });
  }

  try {
    const medicine = await MedicineName.findById(id); //find medicine id in the mngdb
    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }

    res.status(200).json({ drugName: medicine.drugName }); //if medicine is there sends the medicine name 
  } catch (error) {
    console.error('Error fetching drug name by ID:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

