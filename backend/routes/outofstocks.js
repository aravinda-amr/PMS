import express from 'express';
import { getoutofstock, getDrugNameById} from '../controllers/outofstockControllers.js';


const router = express.Router();

// //Get all reorder
router.get('/', getoutofstock)

router.get('/medicine/:id', getDrugNameById);


export default router;