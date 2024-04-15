import User from '../models/userModel.js';
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

// Function to calculate discount
const calculateDiscount = (subtotal, discountPercentage) => {
    return subtotal * (discountPercentage / 100);
};

//Function to calculate grand total for the bill
const calculateGrandTotal = (subTotal, discount) => {
    // Parse the discount as a number, or default to 0 if it's null
    const parsedDiscount = discount !== null ? parseFloat(discount) : 0;

    //Check if discount is a valid number
    if(isNaN(parsedDiscount)){
        throw new Error('Invalid discount');
    }
    //Subtract discount from the subtotal to get the grand total
    const grandTotal = subTotal - parsedDiscount;
    return grandTotal.toFixed(2); // Ensure two decimal places are always displayed 
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
                const {_id, pharmacistID,customerID, invoiceDate, medicines, discount } = bill;

                const transformedMedicines = medicines.map((medicine, index) => ({
                    index: index + 1, // Add auto-generated index for each medicine
                    ...medicine,
                    calculateItemTotal: calculateItemTotal(medicine)
                }));// Calculate total cost for each medicine
                    
                        //Calculate subtotal for the bill
                        const subTotal = calculateSubTotal(transformedMedicines);

                        //Calculate grand total for the bill
                        const grandTotal = calculateGrandTotal(subTotal, discount || 0);

                return {
                        invoiceID: _id, // Rename _id to invoiceID
                        pharmacistID,
                        customerID,
                        invoiceDate,
                        medicines: transformedMedicines,
                        subTotal: subTotal, // Ensure two decimal places are always displayed
                        discount: discount || 0, //Include discount if it exists
                        grandTotal: grandTotal 

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
    };
    
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

    //Calculate grand total for the bill
    const grandTotal = calculateGrandTotal(subTotal, bill.discount || 0);

    // Construct the response object with _id renamed to invoiceID and excluding _id from medicines
    const response ={
        invoiceID: bill._id,
        pharmacistID: bill.pharmacistID,
        customerID: bill.customerID,
        invoiceDate: bill.invoiceDate,
        medicines: medicines,
        subTotal: subTotal,
        discount: bill.discount || 0, // Include discount if it exists
        grandTotal: grandTotal

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
    const {pharmacistID,customerID, invoiceDate, medicines, discount} = req.body;

    //generate a new objectID for the invoiceID
    const invoiceID = new Types.ObjectId();


//Create a new bill documemt in the database
    try {

        // Retrieve discount for the customer
        const customerDiscount = await getDiscountForCustomer({ params: { customerID } });
       
        // Calculate subtotal
        const subTotal = calculateSubTotal(medicines);

          // Calculate discount based on subtotal and customer discount
          const calculatedDiscount = calculateDiscount(subTotal, customerDiscount || discount || 0);

        // Calculate grand total for the bill
        const grandTotal = calculateGrandTotal(subTotal, calculatedDiscount);

        const bill = await Bill.create({
            _id: invoiceID,
            pharmacistID,
            customerID, 
            invoiceDate, 
            medicines: Array.isArray(medicines) ? medicines.map((medicine, index) => ({ 
                ...medicine, 
                index:index+1,//Add auto-generated index to each medicine
                calculateItemTotal: calculateItemTotal(medicine) //Calculate total cost for each medicine   
            })) : [] //Ensure that medicines is an array
        });

        

        const response = {
            invoiceID: bill._id,
            pharmacistID,
            customerID,
            invoiceDate,
            medicines: bill.medicines.map(medicine => ({
                drugName: medicine.drugName,
                purchaseQuantity: medicine.purchaseQuantity,
                unitPrice: medicine.unitPrice,
                calculateItemTotal: medicine.calculateItemTotal
            })),
            subTotal:subTotal,
            discount: calculatedDiscount,
            grandTotal: grandTotal
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
    let existingBill = await Bill.findById(id);

     //Check if the bill exists
     if(!existingBill){
        return res.status(404).json({error: 'No such bill'});
    }
  
    // Update the specified fields if provided
    if(customerID){
        existingBill.customerID = customerID;
    }   
    if(invoiceDate){
        existingBill.invoiceDate = invoiceDate;
    }

     // Retrieve discount for the customer
     const customerDiscount = await getDiscountForCustomer(customerID || existingBill.customerID);

    
   
    // Add new medicine to the bill
    if (medicines && Array.isArray(medicines) && medicines.length > 0) {
    for (const { drugName, purchaseQuantity, unitPrice } of medicines) {
        const existingMedicineIndex = existingBill.medicines.findIndex(medicine => medicine.drugName === drugName);
        if (existingMedicineIndex !== -1) {
            // If medicine already exists, update the purchase quantity
            existingBill.medicines[existingMedicineIndex].purchaseQuantity = purchaseQuantity;
            existingBill.medicines[existingMedicineIndex].calculateItemTotal = calculateItemTotal(existingBill.medicines[existingMedicineIndex]);
        } else {
            // If medicine does not exist, add it to the bill along with unit price
            existingBill.medicines.push({
                drugName,
                purchaseQuantity,
                unitPrice,
                calculateItemTotal: calculateItemTotal({ drugName, purchaseQuantity, unitPrice })
            });
        }
    }
}

    //update the bill with the calculated subtotal 
    existingBill.calculateSubTotal = calculateSubTotal(existingBill.medicines);

    //Retrive the discount from the existing bill
    const discount = existingBill.discount || 0;

    //Update grand total for the bill
    existingBill.grandTotal = calculateGrandTotal(existingBill.calculateSubTotal, discount);

    //Save the updated bill
    await existingBill.save();

    //Send the response
    res.status(200).json(existingBill);

} catch (error) {
    //Handle errors
    console.error('Error updating bill:', error);
    res.status(500).json({ error: 'Internal server error' });
}
};

const getDiscountForCustomer = async (req, res) => {
    try {
        const { customerID } = req.params;
        
        const user = await User.findOne({ contact: customerID });


        if (!user) {
            return res.status(404).json({ error: 'No such user' });
        }

        // Assuming you want to use the first coupon available
        const discount = user.coupons.length > 0 ? user.coupons[0].discount : 0;

        res.status(200).json({ discount });
    } catch (error) {
        console.error('Error retrieving discount:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};




export{
    getBills,
    getBill,
    createBill,
    deleteMedicineFromBill,
    updateBill,
    getDiscountForCustomer
}