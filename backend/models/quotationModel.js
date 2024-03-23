import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const quotationSchema = new Schema({
    prescriptionId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    medicines: [{
        type: Schema.Types.ObjectId,
        required: true
    }],
    totalPrice: {
        type: Number,
        required: true
    }
}, { timestamps: true });

export default mongoose.model('Quotations', quotationSchema);
