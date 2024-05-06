import express from 'express';

// Controller Functions
import { loginUser, getUser, signupUser,getUsers,createCoupon,getCoupons,deleteCoupon, updateCoupon, getBills, calculateTotalAmount, signupManager } from '../controllers/userController.js';

const router = express.Router();

// login route
router.post('/login', loginUser)

// signup route
router.post('/signup', signupUser)

// signup manager route
router.post('/signupManager', signupManager)

//get all users
router.get('/', getUsers)

//get a single user
router.get('/:id', getUser)


//Coupons
//Get all coupons for a user
router.get('/:id/coupons', getCoupons)

//Add a coupon to a user
router.post('/:id/coupons', createCoupon)

//Delete a coupon from a user
router.delete('/:id/coupons/:couponId', deleteCoupon)

//Update a coupon from a user
router.patch('/:id/coupons/:couponId', updateCoupon)

//Bills
//Get customers bills
router.get('/:customerID/bills', getBills)

//Calculate total amount for a user within a date range
router.get('/totalAmount/:customerID', calculateTotalAmount);

export default router;