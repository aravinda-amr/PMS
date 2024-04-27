import express from 'express';

import { getPres, deletePres, createQuotation, getQuotations } from '../controllers/getAllPres.js';

const router = express.Router();

//get all prescriptions
router.get('/', getPres)

router.delete('/:id', deletePres)

//quotations route

router.get('/:id/quotations', getQuotations)

router.post('/:id/quotation', createQuotation)

export default router;