import express from 'express';
import { getoutofstock} from '../controllers/outofstockControllers.js';


const router = express.Router();

// //Get all reorder
router.get('/', getoutofstock)



export default router;