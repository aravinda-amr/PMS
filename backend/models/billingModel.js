import mongoose from 'mongoose';


const Schema = mongoose.Schema;

const billingSchema = new Schema({
    pharmacistID: {
        type: String,
        required: true
    },
    customerID: {
        type: String,
        required: true
    },
    invoiceDate: {
        type: Date,
        required: true
    },
    medicines: [{
        drugName: String, 
        purchaseQuantity: Number,
        price: Number,
        calculateItemTotal: Number
    }],
    subTotal: Number,
    discount: {
        type: Number,
        default: 0
    },
    couponCode: String,
    grandTotal: Number
}, { timestamps: true });

export default mongoose.model('Bill', billingSchema);

