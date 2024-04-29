import express from 'express';


const router = express.Router();

import { getAllStaffRewards, getStaffReward, createStaffReward } from '../controllers/staffRewardController.js';


// Routes for staff rewards
router.get('/', getAllStaffRewards);
router.get('/:id', getStaffReward);
router.post('/',   createStaffReward);


export default router;

