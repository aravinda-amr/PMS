import { parse } from 'dotenv';
import Bill from '../models/billingModel.js';
import mongoose from 'mongoose';
const{Types} = mongoose;



// Function to calculate item total for each medicine
const calculateItemTotal = (medicine) => {
    const itemTotal = parseFloat((medicine.purchaseQuantity * medicine.unitPrice).toFixed(2));
    return itemTotal.toFixed(2); // Ensure two decimal places are always displayed
};

// Function to calculate subtotal for the bill
const calculateSubTotal = (medicines) => {
    const subTotal = parseFloat(medicines.reduce((total, medicine) => {
        return total + parseFloat(calculateItemTotal(medicine));
    }, 0).toFixed(2));
    return subTotal.toFixed(2); // Ensure two decimal places are always displayed
};


//Validate phone number (10 digits)
const isValidPhoneNumber = (phoneNumber) => {
    return /^\d{10}$/.test(phoneNumber);
};

//get all bills
const getBills = async (req, res)=> {

    try{
        const bills = await Bill.find({}).lean();
    
            if(!bills){
                return res.status(404).json({ error: 'No such bill' });
            }
        
            //constructing the response object with _id renamed to invoiceID and excluding _id from medicines
            const response = bills.map(bill => {
                const { _id, ...billWithoutId } = bill
                const transformedMedicines = billWithoutId.medicines.map((medicine, index) => ({
                    index: index + 1, // Add auto-generated index for each medicine
                    ...medicine,
                    calculateItemTotal: calculateItemTotal(medicine) // Calculate total cost for each medicine
                    
                }));
                //Calculate subtotal for the bill
                const subTotal = calculateSubTotal(transformedMedicines);
                    return {
                        invoiceID: bill._id, // Rename _id to invoiceID
                        ...billWithoutId,
                        medicines: transformedMedicines,
                        calculateItemTotal: calculateItemTotal,
                        subTotal: subTotal
                    };
                });
                //Remove _id from each bill in the response
                response.forEach(bill => delete bill._id);
                //send the response
                res.status(200).json(response);
            } // Add closing parenthesis here
         catch (error){
            console.error('Error fetching bills:', error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
    
//get a single bill
const getBill = async(req, res) => {
    const { id } = req.params;

    try{
        //Find the bill by invoiceID
        const bill = await Bill.findById(id).lean();
    
    //chehck if the bill exists
    if(!bill){
       return  res.status(404).json({error: 'No such bill'});
    }

    // Exclude _id from each medicine object
    const medicines = bill.medicines.map(({ _id, ...medicine }, index) => ({ 
        index: index + 1,
        ...medicine, 
        calculateItemTotal: calculateItemTotal(medicine)
     }));
    const subTotal = calculateSubTotal(medicines);
    // Construct the response object with _id renamed to invoiceID and excluding _id from medicines
    const response ={
        invoiceID: bill._id,
        customerID: bill.customerID,
        invoiceDate: bill.invoiceDate,
        medicines: medicines,
        subTotal: subTotal

    };

    //Remove _id from the response
    delete response._id;
    //send the response
    res.status(200).json(response);
}catch(error){
    //handle error
    console.error('Error fetching bill:', error);
    res.status(500).json({ error: 'Internal sever error'});
}
};

//create a new bill
const createBill=async(req, res) => {
    const {customerID, invoiceDate, medicines} = req.body;

    //generate a new objectID for the invoiceID
    const invoiceID = new Types.ObjectId();

    //Validate customerID
    if(!isValidPhoneNumber(customerID)){
        return res.status(400).json({error: 'Invalid customerID.It should be a 10-digit phone number'});
    }
//Create a new bill documemt in the database
    try {
        const bill = await Bill.create({
            _id: invoiceID,
            customerID, 
            invoiceDate, 
            medicines: Array.isArray(medicines) ? medicines.map((medicine, index) => ({ 
                ...medicine, 
                index:index+1,//Add auto-generated index to each medicine
                calculateItemTotal: calculateItemTotal(medicine) //Calculate total cost for each medicine   
            })) : [] //Ensure that medicines is an array
        });

        const subTotal = calculateSubTotal(bill.medicines);

        const response = {
            invoiceID: bill._id,
            customerID,
            invoiceDate,
            medicines: bill.medicines.map(medicine => ({
                drugName: medicine.drugName,
                purchaseQuantity: medicine.purchaseQuantity,
                unitPrice: medicine.unitPrice,
                calculateItemTotal: medicine.calculateItemTotal
            })),
            subTotal:subTotal
        };
  
        //Remove _id from the response
        delete response._id;

        //Send the response
        res.status(200).json(response);
    } catch (error) {
        //Handle errors
        console.error('Error creating bill:', error);
        res.status(400).json({ error: error.message});
    }
};


//delete a medicine from a bill
const deleteMedicineFromBill = async(req, res) => {
   const { invoiceID, medicineIndex } = req.params;

   try{
        const bill= await Bill.findById(invoiceID);

        if(!bill){
        return res.status(404).json({error: 'No such bill'});
    }
    
    // Find the medicine with the specified index
    const index = parseInt(medicineIndex) - 1;

    //Check if the index is within the valid range
    if (index < 0 || index >= bill.medicines.length) {
        return res.status(404).json({ error: 'Medicine not found in the bill' });
    }
    
    //Remove the medicine from the bill's medicines array
    bill.medicines.splice(index, 1);

    //save the bill
    await bill.save();

    //Send a success response
   res.status(200).json({message:'Medicine deleted from the bill'});
} catch (error) {
    //Handle errors
    console.error('Error deleting medicine from bill:', error)
    res.status(500).json({ error: 'Internal server error' })
}
};


//update a bill
const updateBill = async(req, res) => {
    const { id } = req.params;
    
    if(!Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such bill'});
   }

  try{

    //Extract feilds to update from the request body
    const { customerID, invoiceDate, medicines } = req.body;

    //Validate customerID
    if(customerID && !isValidPhoneNumber(customerID)){
        return res.status(400).json({error: 'Invalid customerID. It should be a 10-digit phone number'});
    }

    //Find the exisiting bill in the database
    let exisitingBill = await Bill.findById(id);

     //Check if the bill exists
     if(!exisitingBill){
        return res.status(404).json({error: 'No such bill'});
    }
  
    // Update the specified fields if provided
    if(customerID){
        exisitingBill.customerID = customerID;
    }   
    if(invoiceDate){
        exisitingBill.invoiceDate = invoiceDate;
    }
    
   
    // Add new medicine to the bill
    if (medicines && Array.isArray(medicines) && medicines.length > 0) {
    for (const { drugName, purchaseQuantity, unitPrice } of medicines) {
        const existingMedicineIndex = exisitingBill.medicines.findIndex(medicine => medicine.drugName === drugName);
        if (existingMedicineIndex !== -1) {
            // If medicine already exists, update the purchase quantity
            exisitingBill.medicines[existingMedicineIndex].purchaseQuantity = purchaseQuantity;
            exisitingBill.medicines[existingMedicineIndex].calculateItemTotal = calculateItemTotal(exisitingBill.medicines[existingMedicineIndex]);
        } else {
            // If medicine does not exist, add it to the bill along with unit price
            exisitingBill.medicines.push({
                drugName,
                purchaseQuantity,
                unitPrice,
                calculateItemTotal: calculateItemTotal({ drugName, purchaseQuantity, unitPrice })
            });
        }
    }


    //Recalculate subtotal for the bill
    exisitingBill.calculateSubTotal = calculateSubTotal(exisitingBill.medicines);
    }

    //Save the updated bill
    const updatedBill = await exisitingBill.save();

     

    //Send the response
    res.status(200).json(updatedBill);

} catch (error) {
    //Handle errors
    console.error('Error updating bill:', error);
    res.status(500).json({ error: 'Internal server error' });
}
};


export{
    getBills,
    getBill,
    createBill,
    deleteMedicineFromBill,
    updateBill
}