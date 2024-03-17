const mongoose = require('mongoose')// import mongoose

const Schema = mongoose.Schema// create schema

const drugSchema = new Schema({

    DrugName :{
        type:String,
        required:true
    },
    Batchnumber:{   
        type:String,
        required:true
    },   
    ManufactureDate:{
        type:Date,
        required:true
    },
    ExpireDate:{
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


module.exports = mongoose.model('Drug',drugSchema)// export model