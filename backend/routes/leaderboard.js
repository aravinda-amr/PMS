import express from 'express';


const router = express.Router();

import { getAllLeaderboards, getLeaderboard, createLeaderboardEntry ,updateLeaderboard, deleteLeaderboard } from '../controllers/leaderboardController.js';


// Routes for leaderboard
router.get('/', getAllLeaderboards);
router.get('/:id', getLeaderboard);
router.post('/',  createLeaderboardEntry);
router.patch('/:id', updateLeaderboard); 
router.delete('/:id', deleteLeaderboard);

export default router;