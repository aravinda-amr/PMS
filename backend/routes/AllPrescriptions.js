import express from 'express';
import {getallPre } from '../controllers/prescriptionsallController.js';


const router = express.Router();

// //Get all reorder
router.get('/', getallPre )


export default router;