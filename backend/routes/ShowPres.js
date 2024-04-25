import express from 'express';

import { getPres, deletePres, createQuotation } from '../controllers/getAllPres.js';

const router = express.Router();

//get all prescriptions
router.get('/', getPres)

router.delete('/:id', deletePres)

//quotations route

router.patch('/:id/quotation', createQuotation)

export default router;