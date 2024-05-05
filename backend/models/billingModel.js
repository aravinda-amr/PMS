import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const billingSchema = new Schema({
    invoiceID: {
        type: String,
        required: true,
        unique: true
    },
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
    discountAmount: Number, 
    couponCode: String,
    grandTotal: Number
}, { timestamps: true });

// Middleware to delete corresponding staff reward when a billing document is removed
billingSchema.post('remove', async function(doc, next) {
    try {
        const { pharmacistID, invoiceDate } = doc;
        const month = invoiceDate.getMonth() + 1; 
        const year = invoiceDate.getFullYear();

        await StaffReward.deleteMany({
            pharmacistID: pharmacistID,
            month: month.toString(),
            year: year.toString()
        });

        next();
    } catch (error) {
        console.error("Error deleting staff reward:", error);
        next(error);
    }
});

export default mongoose.model('Bill', billingSchema);
