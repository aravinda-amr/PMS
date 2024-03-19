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
        type: String
    },
    prescriptionImg: {
        type: String
    }
}, { timestamps: true });

export default mongoose.model('Prescriptions', prescriptionSchema)