import mongoose from "mongoose"; // import mongoose
import Reorder from './reorderModel.js'; // import Reorder model


const Schema = mongoose.Schema// create schema

const medicinenameSchema = new Schema({
    drugName: {
        type: String,
        required: true,
        unique: true 
    },
    totalquantity: {
        type: Number,
        required: true,
        min: 0
    },
    totalPrice: {
        type: Number,
        default: 0 
    }

}, { timestamps: true });

medicinenameSchema.post('findOneAndUpdate', async function(doc) {
    // Update corresponding reorder documents with the new totalquantity
    await Reorder.updateMany({ drugName: doc.drugName }, { totalquantity: doc.totalquantity });

       // Retrieve the reorderLevel for the drug
    const reorder = await Reorder.findOne({ drugName: doc.drugName });
    const reorderLevel = reorder ? reorder.reorderLevel : 0; // Default to 0 if reorder level not found

    // Update status in Reorder model based on the updated totalquantity and reorderLevel
    await Reorder.updateMany(
        { drugName: doc.drugName }, 
        { $set: { status: doc.totalquantity <= reorderLevel } }
    );
    
});

export default mongoose.model('MedicineName', medicinenameSchema);
