import express from 'express';

// Controller Functions
import { loginUser, signupUser,getUsers,createCoupon,getCoupons,deleteCoupon } from '../controllers/userController.js';

const router = express.Router();

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

//get all users
router.get('/', getUsers)


//Coupons
//Get all coupons for a user
router.get('/:id/coupons', getCoupons)

//Add a coupon to a user
router.patch('/:id/coupons', createCoupon)

//Delete a coupon from a user
router.delete('/:id/coupons/:couponId', deleteCoupon)


export default router;