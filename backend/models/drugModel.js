import mongoose from "mongoose"; // import mongoose

const Schema = mongoose.Schema// create schema

const drugSchema = new Schema({

    drugName :{
        type:String,
        required:true
    },
    batchNumber:{   
        type:String,
        required:true
    },   
    manufactureDate:{
        type:Date,
        required:true
    },
    expireDate:{
        type:Date,
        required:true
    },
    quantity:{  
        type:Number,
        required:true
    },
    price:{
        type:Number,
        required:true

    },

},{timestamps:true})// add timestamps

export default mongoose.model('Drug', drugSchema)//export model