import express from 'express';


const router = express.Router();

import { getAllLeaderboards, getLeaderboard, createLeaderboardEntry ,updateLeaderboard, deleteLeaderboard, addCashPrize, getCashPrize, deleteCashPrize, updateCashPrize } from '../controllers/leaderboardController.js';


// Routes for leaderboard
router.get('/', getAllLeaderboards);
router.get('/:id', getLeaderboard);
router.post('/',  createLeaderboardEntry);
router.patch('/:id', updateLeaderboard); 
router.delete('/:id', deleteLeaderboard);

// Routes for cash prize
router.patch('/:id/addCashPrize', addCashPrize);
router.get('/:id/getCashPrize', getCashPrize);
router.delete('/:id/deleteCashPrize', deleteCashPrize);
router.patch('/:id/updateCashPrize', updateCashPrize);


export default router;