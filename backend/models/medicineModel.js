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

medicinenameSchema.post('findOneAndUpdate', async function(doc, next) {
    if (this.getUpdate().totalquantity) {
        const updatedQuantity = this.getUpdate().totalquantity;
        const drugName = doc.drugName;

        // Update all Reorder documents with the same drugName
        await Reorder.updateMany(
            { drugName: drugName },
            { totalquantity: updatedQuantity }
        );
    }
    next();
});


export default mongoose.model('MedicineName', medicinenameSchema);