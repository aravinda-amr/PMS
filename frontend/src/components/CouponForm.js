import React, { useState } from 'react';

const AddCouponForm = ({ id, onCouponAdded }) => {
 const [expire, setExpire] = useState('');
 const [discount, setDiscount] = useState('');

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
    const couponCode = generateCouponCode();
    const couponData = { expire, discount, couponCode };

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

      setExpire('');
      setDiscount('');

      if (onCouponAdded) {
        onCouponAdded();
      }
    } catch (error) {
      console.error('Error adding coupon:', error);
    }
 };

 return (
    <form
      className="coupon-form bg-dark-blue-2 text-white p-4 rounded-lg shadow-md"
      onSubmit={handleSubmit}
    >
      <div className="flex flex-col space-y-2">
        <label className="text-sm font-medium text-white">
          Expiry:
          <input
            type="date"
            value={expire}
            required
            onChange={(e) => setExpire(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-button focus:ring focus:ring-blue-button focus:ring-opacity-50 text-dark-blue p-2"
          />
        </label>
        <label className="text-sm font-medium text-white">
          Discount:
          <input
            type="number"
            value={discount}
            required
            onChange={(e) => setDiscount(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-button focus:ring focus:ring-blue-button focus:ring-opacity-50 text-dark-blue p-2"
          />
        </label>
      </div>
      <button
        className="bg-login1 hover:bg-login2 text-white font-semibold py-2 px-4 rounded mt-4"
        type="submit"
      >
        Add Coupon
      </button>
    </form>
 );
};

export default AddCouponForm;
