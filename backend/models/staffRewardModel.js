import mongoose from 'mongoose';
import Leaderboard from '../models/leaderboardModel.js'; // Adjust the import path as necessary

const Schema = mongoose.Schema;

const staffRewardSchema = new Schema({
    pharmacistID: {
        type: String,
        required: true
    },
    month: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    invoiceCount: {
        type: Number,
        required: true
    },
    totalCashAmount: {
        type: Number,
        required: true
    },
}, { timestamps: true });

// Middleware to delete corresponding leaderboard entry when a staff reward document is removed
staffRewardSchema.post('remove', async function(doc, next) {
    try {
        const { month, year } = doc;

        await Leaderboard.deleteMany({
            month: month,
            year: year
        });

        next();
    } catch (error) {
        console.error("Error deleting leaderboard entry:", error);
        next(error);
    }
});

export default mongoose.model('staffReward', staffRewardSchema);
