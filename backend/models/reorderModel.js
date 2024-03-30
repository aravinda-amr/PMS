 import mongoose from "mongoose";

const Schema = mongoose.Schema

const reorderSchema = new Schema({
    supplierEmail:{
        type: String,
        required:true
    },
    batchNumber:{
        type: String,
        required: true
    },
    drugName:{
        type: String,
        required: true
    },
    reorderLevel:{
        type: Number,
        required: true
    },
    quantity:{
        type: Number,
        // type: mongoose.Schema.Types.ObjectId, ref:'Drug',
        required: true
    }
}, {timestamps: true})

export default mongoose.model('Reorder', reorderSchema)//export model

