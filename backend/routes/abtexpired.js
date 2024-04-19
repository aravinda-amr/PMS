import express from 'express';
import {getabtExpired, getDrugNameById } from '../controllers/abtexpiredController.js';


const router = express.Router();

// //Get all reorder
router.get('/', getabtExpired )

router.get('/medicine/:id', getDrugNameById);


export default router;