import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const learderboardSchema = new Schema({
    month: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    mostPrescriptionHandledPid: {
        type: String,
        // required: true
    },
    mostCashAmountHandledPid: {
        type: String,
        // required: true
    },
    cashPrize: {
        type: Number,
    }
}, { timestamps: true });

export default mongoose.model('leaderboard', learderboardSchema);
