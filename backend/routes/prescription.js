import express from 'express';
import { 
    getPrescriptions,
    getPrescription,
    createPrescription, 
    deletePrescription } from '../controllers/prescriptionController.js';

const router = express.Router();

//get all prescriptions
router.get('/', getPrescriptions)

//get a single prescription
router.get('/:id', getPrescription)

//create a prescription
router.post('/', createPrescription)

//delete a prescription
router.delete('/:id', deletePrescription)

export default router;