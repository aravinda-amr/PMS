import express from 'express';
//import requireRole from '../middleware/requireRole.js';
import requireAuth from '../middleware/requireAuth.js';

import { getPres, getAllPres, deletePres, updatePres, createQuotation, getQuotations, rejectPrescription, approvePrescription } from '../controllers/getAllPres.js';

const router = express.Router();

// router.use(requireRole('pharmacist'));

//router.use(requireAuth);

//get all prescriptions
router.get('/', getPres)

router.get('/all', getAllPres)

router.delete('/:id', deletePres)

router.patch('/:id', updatePres)

//quotations route

router.get('/:id/quotations', getQuotations)

router.post('/:id/quotation', createQuotation)

router.patch('/:id/reject', rejectPrescription)

router.patch('/:id/approve', approvePrescription)

export default router;