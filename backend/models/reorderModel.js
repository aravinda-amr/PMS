 import mongoose from "mongoose";

const Schema = mongoose.Schema

const reorderSchema = new Scehma({
    supplierEmail:{
        type: String,
        required:true
    },
    drugID:{
        type: Number,
        required: true
    },
    drugName:{
        type: String,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    reorderLevel:{
        type: Number,
        required: true
    }
}, {timestamps: true})

export default mongoose.model('Reorder', reorderSchema)//export model

