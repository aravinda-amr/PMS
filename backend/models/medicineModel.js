import mongoose from "mongoose"; // import mongoose
import Reorder from './reorderModel.js'; // import Reorder model


const Schema = mongoose.Schema// create schema

const medicinenameSchema = new Schema({
    drugName: {
        type: String,
        required: true
    },
    totalquantity: {
        type: Number,
        required: true
    }

}, { timestamps: true });

medicinenameSchema.post('findOneAndUpdate', async function(doc) {
    // Update corresponding reorder documents with the new totalquantity
    await Reorder.updateMany({ drugName: doc.drugName }, { totalquantity: doc.totalquantity });
});

export default mongoose.model('MedicineName', medicinenameSchema);
