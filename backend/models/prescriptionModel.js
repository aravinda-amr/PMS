import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const prescriptionSchema = new Schema({
    note: {
        type: String
    },
    substitutes: {
        type: Boolean,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    prescriptionImg: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model('Prescriptions', prescriptionSchema)