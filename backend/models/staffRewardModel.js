
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const staffRewardSchema = new Schema({

    pharmacistID: {
        type: String,
        required: true
    },

    month:{
        type: String,
        required: true
    },

    year:{
        type: String,
        required: true
    },
    
    invoiceCount: {
        type: String,
        required: true
    },
    totalCashAmount: {
        type: String,
        required: true
    },
   
}, {timestamps: true});


export default mongoose.model('staffReward', staffRewardSchema)