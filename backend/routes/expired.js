import express from 'express';
import { getExpired} from '../controllers/expiredController.js';


const router = express.Router();

// //Get all reorder
router.get('/expired', getExpired)


export default router;