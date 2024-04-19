

import Drug from '../models/drugModel.js';
import MedicineName from '../models/medicineModel.js'
import mongoose from 'mongoose';

// Get all drugs that will expire in the next 30 days
export const getabtExpired = async (req, res) => {
  const now = new Date();
  const expirationThreshold = new Date(now.getTime());
  expirationThreshold.setDate(expirationThreshold.getDate() + 30);

  // Corrected query to find drugs expiring in the next 30 days
  const abtexpired = await Drug.find({
    expireDate: { $gte: now, $lt: expirationThreshold }
  });

  res.status(200).json(abtexpired);
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

