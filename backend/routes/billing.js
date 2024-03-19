import express from 'express';
import {     getBills, 
            getBill, 
            createBill, 
            deleteMedicineFromBill, 
            updateBill } from '../controllers/billingController.js';
const router = express.Router();

//Get all bills
router.get('/', getBills)


//Get a single bill
router.get('/:id', getBill)

//POST a new bill
router.post('/', createBill) 

//Delete a bill
router.delete('/:invoiceID/:medicineIndex', deleteMedicineFromBill)

//Update a bill
router.patch('/:id', updateBill)

export default router;