import Prescriptions from '../models/prescriptionModel.js';
import mongoose from 'mongoose';

//get all prescriptions
const getPres = async (req, res) => {
    const prescriptions = await Prescriptions.find({});

    res.status(200).json(prescriptions);
}


//delete prescription
const deletePres = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'No such prescription'});
    }

    const prescription = await Prescriptions.findOneAndDelete({_id: id});

    if(!prescription) {
        return res.status(404).json({error: 'No such prescription'});
    }

    res.status(200).json(prescription);
}

//create quotation
const createQuotation = async (req, res) => {
    const { id } = req.params;
    const { medicines, subTotal } = req.body;
  
    try {
      const prescription = await Prescriptions.findById(id);
      if (!prescription) {
        return res.status(404).json({ error: 'No such prescription' });
      }
  
      prescription.quotation.push({ medicines, subTotal });
      await prescription.save();
  
      res.status(200).json(prescription.quotation);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

//get all quotations
const getQuotations = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such prescription' });
  }

  const prescription = await Prescriptions.findById(id);

  if (!prescription) {
    return res.status(400).json({ error: 'No such prescription' });
  }

  const quotations = prescription.quotation; // Filter if needed for specific logic

  res.status(200).json(quotations);
};

// Approve prescription
const approvePrescription = async (req, res) => {
  const { id } = req.params;

  try {
      const prescription = await Prescriptions.findByIdAndUpdate(id, { status: "approved" }, { new: true });

      if (!prescription) {
          return res.status(404).json({ error: 'No such prescription' });
      }

      res.status(200).json(prescription);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

// Reject prescription
const rejectPrescription = async (req, res) => {
  const { id } = req.params;

  try {
      const prescription = await Prescriptions.findByIdAndUpdate(id, { status: "rejected" }, { new: true });

      if (!prescription) {
          return res.status(404).json({ error: 'No such prescription' });
      }

      res.status(200).json(prescription);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

export { getPres, deletePres, createQuotation, getQuotations, rejectPrescription, approvePrescription};