// jobs/cronJobs.js

import cron from 'node-cron';
import mongoose from 'mongoose';
import User from '../models/userModel.js';


const checkExpiredCoupons = async () => {
 console.log('Running a task to check for expired coupons...');

 try {
    // Find all users
    const users = await User.find({});

    // Iterate over each user
    for (const user of users) {
      // Iterate over each coupon
      for (const coupon of user.coupons) {
        // Check if the coupon has expired
        const expireDate = new Date(coupon.expire);
        if (expireDate < new Date()) {
          // If the coupon has expired, set it to used
          coupon.used = true;
        }
      }

      // Save the user with the updated coupons
      await user.save();
    }

    console.log('Task completed. Expired coupons have been marked as used.');
 } catch (error) {
    console.error('An error occurred while checking for expired coupons:', error);
 }
};

const init = () => {
 cron.schedule('0 0 * * *', checkExpiredCoupons);
};

export default { init };
