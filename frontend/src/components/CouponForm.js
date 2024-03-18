import React, { useState } from 'react';

const AddCouponForm = ({id}) => {
 const [expire, setExpire] = useState('');
 const [discount, setDiscount] = useState('');

 const handleSubmit = async (e) => {
    e.preventDefault();
    const couponData = { expire, discount };

    try {
      const response = await fetch(`/api/user/${id}/coupons`, {
        method: 'PATCH',
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
    } catch (error) {
      console.error('Error adding coupon:', error);
    }
 };

 return (
    <form onSubmit={handleSubmit}>
      <label>
        Expiry:
        <input
          type="text"
          value={expire}
          onChange={(e) => setExpire(e.target.value)}
        />
      </label>
      <label>
        Discount:
        <input
          type="number"
          value={discount}
          onChange={(e) => setDiscount(Number(e.target.value))}
        />
      </label>
      <button type="submit">Add Coupon</button>
    </form>
 );
};

export default AddCouponForm;
