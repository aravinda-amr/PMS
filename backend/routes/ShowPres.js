import express from 'express';

import { getPres, deletePres } from '../controllers/getAllPres.js';

const router = express.Router();

//get all prescriptions
router.get('/', getPres)

router.delete('/:id', deletePres)

export default router;