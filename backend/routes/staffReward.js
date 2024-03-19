import express from 'express';
import { 
    getstaffRewards,
    getstaffReward,
    createstaffReward } from '../controllers/staffRewardController.js';

const router = express.Router() 

//GET all staff rewards
router.get('/', getstaffRewards)

//GET a single staff reward
router.get('/:id', getstaffReward)

//post a new staffReward
router.post('/', createstaffReward)





export default router;