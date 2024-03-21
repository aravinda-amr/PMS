import mongoose from "mongoose"; // import mongoose
import Reorder from "./reorderModel.js"; // import Reorder model

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

// drugSchema.post('findOneAndUpdate', async function(doc, next) {
//     if (doc) {
//        // Assuming the batchNumber is unique and can be used to find the corresponding Reorder documents
//        await Reorder.updateMany(
//          { batchNumber: doc.batchNumber },
//          { $set: { quantity: doc.quantity } }
//        );
//     }
//     next();
//    });
drugSchema.pre('save', async function(next) {
    const drug = this; // refers to the current Drug being saved
  
    try {
      await Reorder.updateMany(
        { batchNumber: drug.batchNumber },
        { $set: { quantity: drug.quantity } }
      );
      next();
    } catch (error) {
      console.error("Error updating Reorder:", error);
      next(error); // Pass the error to the main error handling logic
    }
  });

   export default mongoose.model('Drug', drugSchema)//export model   
