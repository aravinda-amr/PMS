import mongoose from 'mongoose';

const Schema = mongoose.Schema
const staffRewardSchema = new Schema({
   
    pharmacistId: {
        type: String,
        required: true
    },
   
}, { timestamps: true})

export default mongoose.model('StaffRewards', staffRewardSchema)
