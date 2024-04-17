

import Drug from '../models/drugModel.js';
import MedicineName from '../models/medicineModel.js'

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

// import Drug from '../models/drugModel.js';
// import MedicineName from '../models/medicineModel.js';

// // Get all drugs that will expire in the next 30 days
// export const getabtExpired = async (req, res) => {
//     const now = new Date();
//     const expirationThreshold = new Date(now.getTime());
//     expirationThreshold.setDate(expirationThreshold.getDate() + 30);

//     // Query to find drugs expiring in the next 30 days and populate the drugName field
//     const abtexpired = await Drug.find({
//         expireDate: { $gte: now, $lt: expirationThreshold }
//     }).populate('drugName'); // This populates the drugName field with the actual document from the MedicineName model

//     res.status(200).json(abtexpired);

