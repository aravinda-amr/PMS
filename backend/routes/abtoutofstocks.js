import express from 'express';
import { getabtoutofstock} from '../controllers/abtoutofstockController.js';


const router = express.Router();

// //Get all reorder
router.get('/abtoutofstock', getabtoutofstock)


export default router;