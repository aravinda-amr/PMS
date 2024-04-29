import express from 'express';
import requireRole from '../middleware/requireRole.js';

import { getPres, deletePres, createQuotation, getQuotations, rejectPrescription, approvePrescription } from '../controllers/getAllPres.js';

const router = express.Router();

// router.use(requireRole('pharmacist'));

//get all prescriptions
router.get('/', getPres)

router.delete('/:id', deletePres)

//quotations route

router.get('/:id/quotations', getQuotations)

router.post('/:id/quotation', createQuotation)

router.patch('/:id/reject', rejectPrescription)

router.patch('/:id/approve', approvePrescription)

export default router;