
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const billingSchema = new Schema({
    
    customerID: {
        type: String,
        required: true
    },
    invoiceDate: {
        type: Date,
        required: true
    },
    medicines:[{
        drugName: String,
        purchaseQuantity: Number,
        unitPrice: Number,
        calculateItemTotal: Number,
    
    }],

    calculateSubTotal: Number
   
   
}, {timestamps: true});


export default mongoose.model('Bill', billingSchema)
