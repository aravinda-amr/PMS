import express from 'express';
import requireAuth from '../middleware/requireAuth.js';
import { 
    getPrescriptions,
    getPrescription,
    createPrescription, 
    deletePrescription } from '../controllers/prescriptionController.js';

const router = express.Router();

router.use(requireAuth);

//get all prescriptions
router.get('/', getPrescriptions)

//get a single prescription
router.get('/:id', getPrescription)

//create a prescription
router.post('/', createPrescription)

//delete a prescription
router.delete('/:id', deletePrescription)

//update a prescription
// router.patch('/:id', updatePrescription)

export default router;