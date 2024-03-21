import User from '../models/userModel.js';
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

