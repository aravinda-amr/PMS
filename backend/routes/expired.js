import express from 'express';
import { getExpired} from '../controllers/expiredController.js';


const router = express.Router();

// //Get all reorder
router.get('/', getExpired)


export default router;