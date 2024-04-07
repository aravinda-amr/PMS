import express from 'express';


const router = express.Router();

import { getAllLeaderboards, getLeaderboard, createLeaderboardEntry ,updateLeaderboard, deleteLeaderboard, addCashPrize, getCashPrize, deleteCashPrize } from '../controllers/leaderboardController.js';


// Routes for leaderboard
router.get('/', getAllLeaderboards);
router.get('/:id', getLeaderboard);
router.post('/',  createLeaderboardEntry);
router.patch('/:id', updateLeaderboard); 
router.delete('/:id', deleteLeaderboard);
router.patch('/:id/addCashPrize', addCashPrize);
router.get('/:id/getCashPrize', getCashPrize);
router.delete('/:id/deleteCashPrize', deleteCashPrize);



export default router;