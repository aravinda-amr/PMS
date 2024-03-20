import mongoose from "mongoose"; // import mongoose

const Schema = mongoose.Schema// create schema

const medicinenameSchema = new Schema({
    drugName: {
        type: String,
        required: true
    }
}, { timestamps: true });

export default mongoose.model('MedicineName', medicinenameSchema);