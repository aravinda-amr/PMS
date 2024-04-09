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

    }

},{timestamps:true})// add timestamps

//quantity update start here
drugSchema.post('save', async function () {
    // Calculate total quantity for the drug
    const MedicineName = mongoose.model('MedicineName');
   
    const drugName = this.drugName;
    const totalQuantity = await this.model('Drug').aggregate([
        {
            $match: { drugName: drugName }
        },
        {
            $group: {
                _id: null,
                total: { $sum: "$quantity" }
            }
        }
    ]);

    // Update totalquantity in medicinenameSchema
    await MedicineName.findByIdAndUpdate(drugName, { totalquantity: totalQuantity[0].total });
   
});
//quantity update end here 




export default mongoose.model('Drug', drugSchema)//export model   
