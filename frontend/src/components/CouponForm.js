import React, { useState } from 'react';

const AddCouponForm = ({id, onCouponAdded}) => {
 const [expire, setExpire] = useState('');
 const [discount, setDiscount] = useState('');

  // Function to generate a unique 10-character coupon code
  const generateCouponCode = () => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 };

 const handleSubmit = async (e) => {
  e.preventDefault();
  const couponCode = generateCouponCode(); // Generate a unique coupon code
  const couponData = { expire, discount, couponCode }; // Include the coupon code in the data

  try {
      const response = await fetch(`/api/user/${id}/coupons`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(couponData),
      });

      if (!response.ok) {
          throw new Error('Failed to add coupon');
      }

      // Optionally, clear the form or show a success message
      setExpire('');
      setDiscount('');

      // Call the onCouponAdded callback to fetch the updated list of coupons
      if (onCouponAdded) {
          onCouponAdded();
      }
  } catch (error) {
      console.error('Error adding coupon:', error);
  }
};

return (
  <form className="coupon-form bg-dark-blue-2 text-white p-4 rounded-lg shadow-md" onSubmit={handleSubmit}>
    <label className="label-form block text-sm font-medium text-white">
      Expiry:
      <input
        type="date"
        value={expire}
        required
        onChange={(e) => setExpire(e.target.value)}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-button focus:ring focus:ring-blue-button focus:ring-opacity-50"
      />
    </label>
    <label className="label-form block text-sm font-medium text-white">
      Discount:
      <input
        type="number"
        value={discount}
        required
        onChange={(e) => setDiscount(Number(e.target.value))}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-button focus:ring focus:ring-blue-button focus:ring-opacity-50 text-black"
      />
    </label>
    <button className="delete-form bg-login1 hover:bg-login2 text-white font-semibold py-2 px-4 rounded mt-4" type="submit">Add Coupon</button>
  </form>
);
};

export default AddCouponForm;
