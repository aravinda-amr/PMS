import express from 'express';
import {     getBills, 
            getBill, 
            createBill, 
            deleteMedicineFromBill, 
            updateBill,
            retrieveDiscountForUser,
            } from '../controllers/billingController.js';
        

const router = express.Router();

//Get all bills
router.get('/', getBills)


//Get a single bill
router.get('/', getBill)

//POST a new bill
router.post('/', createBill) 

//Delete a medicine from bill
router.delete('/:invoiceID/medicine/:medicineIndex', deleteMedicineFromBill)

//Update a bill
router.patch('/:id', updateBill)

//Retrieve discount for user
router.get('/discount/:customerID', async (req, res) => {
    const { customerID } = req.params;

    try {
        // Retrieve the discount for the user
        const discount = await retrieveDiscountForUser(customerID);

        // Send the discount as a response
        res.status(200).json({ discount });
    } catch (error) {
        // Handle errors
        console.error('Error retrieving discount for user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


export default router;