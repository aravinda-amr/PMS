import mongoose from "mongoose"; // import mongoose

const Schema = mongoose.Schema// create schema

const leavechema = new Schema({

    name:{
        type:String,
        required:true
    },
 
    email:{
         type: String,
         required:true
    },
    dateFrom:{   
        type:Date,
        required:true
    },
    dateTo:{
        type:Date,
        required:true
    } , 
    reason:{
        type:String,
        required:true
    }
   

},{timestamps:true})// add timestamps

export default mongoose.model('Leave', leavechema)//export model