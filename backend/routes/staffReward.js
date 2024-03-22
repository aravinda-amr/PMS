import express from 'express';


const router = express.Router();

import { getAllStaffRewards, getStaffReward, createStaffReward ,updateStaffReward, deleteStaffReward } from '../controllers/staffRewardController.js';


// Routes for staff rewards
router.get('/', getAllStaffRewards);
router.get('/:id', getStaffReward);
router.post('/',   createStaffReward);
router.patch('/:id', updateStaffReward); 
router.delete('/:id', deleteStaffReward);

export default router;

