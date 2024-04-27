import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const quotationSchema = new Schema({
    medicines: [{
        drugName: String, 
        purchaseQuantity: Number,
        price: Number,
        calculateItemTotal: Number
    }],
    subTotal: {
        type: Number,
        required: true
    },
});

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
    
    },
    quotation: [quotationSchema],
    status: {
        type: String,
        default: "pending"
    }
}, { timestamps: true });

export default mongoose.model('Prescriptions', prescriptionSchema)