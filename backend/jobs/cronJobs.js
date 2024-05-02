import cron from 'node-cron';
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
          // If the coupon has expired, update its status to 'Expired'
          coupon.status = 'Expired';
          // Assuming you need to update the coupon in the database
          // You might need to adjust this part based on your database schema and ORM
          await User.updateOne({ _id: user._id, 'coupons._id': coupon._id }, { $set: { 'coupons.$.status': 'Expired' } });
        }
      }

      // Save the user with the updated coupons
      await user.save();
    }

    console.log('Task completed. Expired coupons have been marked as expired.');
 } catch (error) {
    console.error('An error occurred while checking for expired coupons:', error);
 }
};

const init = () => {
 // Schedule the task to run every midnight
 cron.schedule('0 0 * * *', checkExpiredCoupons);
};

export default { init };
