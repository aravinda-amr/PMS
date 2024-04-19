import express from 'express';
import { getExpired, getDrugNameById} from '../controllers/expiredController.js';


const router = express.Router();

// //Get all reorder
router.get('/', getExpired)

router.get('/medicine/:id', getDrugNameById);

export default router;