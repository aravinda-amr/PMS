import User from '../models/userModel.js';
import Bill from '../models/billingModel.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

// generate tokens
const createTokens = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' });
}

// login user
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);

        //create a token
        const token = createTokens(user._id);

        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }

}

// signup user
export const signupUser = async (req, res) => {
    const { email, password, name, contact, coupons } = req.body;

    try {
        const user = await User.signup(email, password, name, contact, coupons);

        //create a token
        const token = createTokens(user._id);

        res.status(200).json({ email, token });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

//get all users
export const getUsers = async (req, res) => {
    const users = await User.find({}).sort({ createdAt: -1 });

    res.status(200).json(users);
}



//Coupons
//Get all coupons for a user
export const getCoupons = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'No such user' });
    }
  
    const user = await User.findById(id);
  
    if (!user) {
      return res.status(400).json({ error: 'No such user' });
    }
  
    const coupons = user.coupons; // Filter if needed for specific logic
  
    res.status(200).json(coupons);
  };

  //Add a coupon to a user
  export const createCoupon = async (req, res) => {
    const { id } = req.params;
    const { expire, discount, couponCode } = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'No such user' });
    }
  
    const user = await User.findById(id);
  
    if (!user) {
      return res.status(400).json({ error: 'No such user' });
    }
  
    user.coupons.push({ expire, discount, couponCode});
  
    await user.save();
  
    res.status(200).json(user.coupons);
  }

//Delete a coupon from a user
export const deleteCoupon = async (req, res) => {
    const { id, couponId } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'No such user' });
    }
  
    const user = await User.findById(id);
  
    if (!user) {
      return res.status(400).json({ error: 'No such user' });
    }
  
    user.coupons = user.coupons.filter((coupon) => coupon._id != couponId);
  
    await user.save();
  
    res.status(200).json(user.coupons);
  }

  //Update a coupon for a user
  export const updateCoupon = async (req, res) => {
    const { id, couponId } = req.params;
    const { expire, discount, couponCode } = req.body;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'No such user' });
    }
  
    const user = await User.findById(id);
  
    if (!user) {
      return res.status(400).json({ error: 'No such user' });
    }
  
    const coupon = user.coupons.id(couponId);
  
    if (!coupon) {
      return res.status(400).json({ error: 'No such coupon' });
    }
  
    if (expire) {
      coupon.expire = expire;
    }
  
    if (discount) {
      coupon.discount = discount;
    }
  
    if (couponCode) {
      coupon.couponCode = couponCode;
    }
  
    await user.save();
  
    res.status(200).json(coupon);
  }

  //Get total amount within six months for a user
  export const getTotalAmount = async (req, res) => {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'No such user' });
    }
  
    const user = await User.findById(id);
  
    if (!user) {
      return res.status(400).json({ error: 'No such user' });
    }
  
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);
  
    const bills = await Bill.find({ user: id, createdAt: { $gte: sixMonthsAgo } });
  
    const totalAmount = bills.reduce((total, bill) => total + bill.amount, 0);
  
    res.status(200).json({ totalAmount });
  }

  //Get all bills for a user
  export const getBills = async (req, res) => {
    const { customerID  } = req.params;
  
    /*if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'No such user' });
    }*/
  
    const bills = await Bill.find({ customerID  });
  
    res.status(200).json(bills);
  }

  // Get total of all bills for a user within a specified number of months
export const calculateTotalAmount = async (req, res) => {
  try {
     const { customerID, months = 6 } = req.params; // Default to 6 months if not provided
 
     // Calculate the date from which to start fetching the bills
     const startDate = new Date();
     startDate.setMonth(startDate.getMonth() - months);
 
     const result = await Bill.aggregate([
       {
         $match: {
           customerID: customerID, // Filter by the user ID
           invoiceDate: {
             $gte: startDate,
             $lt: new Date() // Current date
           }
         }
       },
       {
         $group: {
           _id: '$customerID',
           totalAmount: {
             $sum: '$calculateSubTotal'
           }
         }
       }
     ]);
 
     // Assuming you want to send the result back to the client
     res.status(200).json(result);
  } catch (error) {
     console.error(error);
     res.status(500).json({ message: 'An error occurred while calculating the total amount.' });
  }
 };
 

   export const getCustomerBills = async (customerId) => {
    // Ensure the customerId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(customerId)) {
        throw new Error('Invalid customer ID');
    }

    // Find all bills for the specific customer
    const bills = await Bill.find({ customerID: customerId });

    return bills;
};