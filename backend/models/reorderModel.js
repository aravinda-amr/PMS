 import mongoose from "mongoose";

const Schema = mongoose.Schema

const reorderSchema = new Schema({
    supplierName:{
        type: String,
        required: true
    },
    supplierEmail:{
        type: String,
        required:true
    },
    drugName:{
        type: String,
        required: true
    },
    reorderLevel:{
        type: Number,
        required: true
    },
    totalquantity:{
        type: Number,
        required: true
    },
    status:{
        type: Boolean,
        required: true
    }
}, {timestamps: true})


export default mongoose.model('Reorder', reorderSchema)//export model

