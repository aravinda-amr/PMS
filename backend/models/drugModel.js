import mongoose from "mongoose"; // import mongoose
import Reorder from "./reorderModel.js"; // import Reorder model
const Schema = mongoose.Schema// create schema
const drugSchema = new Schema({

    drugName :{
        type: Schema.Types.ObjectId,
        ref: 'MedicineName', // Reference to the Workout model
        required: true
    },
    batchNumber:{   
        type:String,
        required:true,
        unique: true ,
        
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

    }

},{timestamps:true})// add timestamps


//quantity update start here
drugSchema.post('save', async function () { // Post middleware to update totalquantity in medicinenameSchema after saving a new drug    
    // Calculate total quantity for the drug
    const MedicineName = mongoose.model('MedicineName'); // Retrieve the MedicineName model
   
    const drugName = this.drugName; // Retrieve the drugName from the current document
    const totalQuantity = await this.model('Drug').aggregate([ // Calculate the total quantity for the drug
        {
            $match: { drugName: drugName }  // Match documents with the same drugName
        },
        {
            $group: {
                _id: null, // Group all the documents
                total: { $sum:"$quantity" } // Calculate the total quantity
            }
        }
    ]);

    // Update totalquantity in medicinenameSchema
    await MedicineName.findByIdAndUpdate(drugName, { totalquantity: totalQuantity[0].total }); // Update totalquantity in medicinenameSchema
   
});
//quantity update end here 







export default mongoose.model('Drug', drugSchema)//export model   
