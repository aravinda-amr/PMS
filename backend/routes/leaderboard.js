import express from 'express';


const router = express.Router();

import { getAllLeaderboards, getLeaderboard, createLeaderboardEntry ,addCashPrize, getCashPrize, deleteCashPrize, updateCashPrize } from '../controllers/leaderboardController.js';


// Routes for leaderboard
router.get('/', getAllLeaderboards);
router.get('/:id', getLeaderboard);
router.post('/',  createLeaderboardEntry);


// Routes for cash prize
router.post('/:id/addCashPrize', addCashPrize);
router.get('/:id/getCashPrize', getCashPrize);
router.delete('/:id/deleteCashPrize', deleteCashPrize);
router.patch('/:id/updateCashPrize', updateCashPrize);


export default router;