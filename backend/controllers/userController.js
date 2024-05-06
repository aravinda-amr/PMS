import User from '../models/userModel.js';
import Bill from '../models/billingModel.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

// generate tokens
const createTokens = ({ _id, role }) => {
  return jwt.sign({ _id, role }, process.env.SECRET, { expiresIn: '3d' });
}

// login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    //create a token
    const token = createTokens({ _id: user._id, role: user.role });
    const userId = user._id;
    const role = user.role;

    res.status(200).json({ email, token, userId, role });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }

}

// signup user
export const signupUser = async (req, res) => {
    const { email, password, name, contact, role, coupons } = req.body;

  try {
    const user = await User.signup(email, password, name, contact, role, coupons);

    //create a token
    const token = createTokens({ _id: user._id, role: user.role });

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

// signup manager
export const signupManager = async (req, res) => {
  const { email, password, name, contact, role } = req.body; // Include role in destructuring
 
  try {
     const user = await User.signup(email, password, name, contact, role); // Pass the role to the signup method
 
     //create a token
     const token = createTokens(user._id);
 
     res.status(200).json({ email, token });
  } catch (error) {
     res.status(400).json({ message: error.message });
  }
 }
 
//get all users
// Updated getUsers function to only get users with role = 'customer'
export const getUsers = async (req, res) => {
  // Find users where role is 'customer' and sort them by creation date in descending order
  const users = await User.find({ role: 'customer' }).sort({ createdAt: -1 });

  res.status(200).json(users);
}

//need to get a single user by using the id
export const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);

  if (!user) {
    return res.status(400).json({ error: 'No such user' });
  }

  res.status(200).json(user);
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

// Add a coupon to a user
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
 
  // Find the highest accessNumber in the user's coupons
  const highestAccessNumber = user.coupons.reduce((highest, coupon) => {
     return coupon.accessNumber > highest ? coupon.accessNumber : highest;
  }, 0);
 
  // Create the new coupon with an incremented accessNumber
  const newCoupon = {
     accessNumber: highestAccessNumber + 1, // Increment the accessNumber
     expire,
     discount,
     couponCode,
    // used: false // Assuming you want to set used to false by default
  };
 
  user.coupons.push(newCoupon);
 
  await user.save();
 
  res.status(200).json(user.coupons);
 }
 

// Delete a coupon from a user
export const deleteCoupon = async (req, res) => {
  const { id, couponId } = req.params;
 
  if (!mongoose.Types.ObjectId.isValid(id)) {
     return res.status(400).json({ error: 'No such user' });
  }
 
  const user = await User.findById(id);
 
  if (!user) {
     return res.status(400).json({ error: 'No such user' });
  }
 
  // Find the index of the coupon to be deleted
  const couponIndex = user.coupons.findIndex((coupon) => coupon._id == couponId);
 
  if (couponIndex === -1) {
     return res.status(400).json({ error: 'No such coupon' });
  }
 
  // Remove the coupon from the array
  user.coupons.splice(couponIndex, 1);
 
  // Recalculate the accessNumber for all coupons that come after the deleted one
  user.coupons.forEach((coupon, index) => {
     if (index >= couponIndex) {
       coupon.accessNumber = index + 1; // Update the accessNumber
     }
  });
 
  await user.save();
 
  res.status(200).json(user.coupons);
 }
 

//Update a coupon for a user
export const updateCoupon = async (req, res) => {
  const { id, couponId } = req.params;
  const { expire, discount, status } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'No such user' });
  }

  const user = await User.findById(id);

  if (!user) {
    return res.status(400).json({ error: 'No such user' });
  }

  const coupon = user.coupons.find((coupon) => coupon._id == couponId);

  if (!coupon) {
    return res.status(400).json({ error: 'No such coupon' });
  }

  coupon.expire = expire;
  coupon.discount = discount;
  coupon.status  = status;

  await user.save();

  res.status(200).json(user.coupons);
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
  const { customerID } = req.params;
  const bills = await Bill.find({ customerID });

  res.status(200).json(bills);
}

// Get total of all bills for a user within a specified number of months
export const calculateTotalAmount = async (req, res) => {
  try {
    //const { customerID, months = 6 } = req.params; // Default to 6 months if not provided

    const { customerID } = req.params;
    const months = req.query.months ? Number(req.query.months) : 6; // Use the months query parameter or default to 6
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
            $sum: '$grandTotal'
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
