import React, { useState, useEffect } from 'react';
import { format, addWeeks, differenceInDays } from 'date-fns';



// Define the generateCouponCode function before using it
const generateCouponCode = () => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const AddCouponForm = ({ id, onCouponAdded, coupon, isEditing, onFormSubmit, onReset }) => {
  const [expire, setExpire] = useState('');
  const [discount, setDiscount] = useState(1);
  const [used, setUsed] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [expiryDifference, setExpiryDifference] = useState(''); // New state to hold the formatted difference

  useEffect(() => {
    if (coupon) {
      setExpire(format(new Date(coupon.expire), 'yyyy-MM-dd'));
      setDiscount(coupon.discount);
      setUsed(coupon.used);
      setCouponCode(coupon.couponCode);
    } else {
      const twoWeeksFromToday = addWeeks(new Date(), 2);
      setExpire(format(twoWeeksFromToday, 'yyyy-MM-dd'));
      setDiscount(1);
      setUsed(false);
      setCouponCode(generateCouponCode());
    }
  }, [coupon]);

  // Calculate and set the expiry difference whenever the expire state changes
  useEffect(() => {
    if (expire) {
       const expiryDate = new Date(expire);
       const now = new Date();
       const daysDifference = differenceInDays(expiryDate, now);
   
       let differenceText = '';
       if (daysDifference > 0) {
         differenceText = `${daysDifference} day(s) from now`;
       } else {
         differenceText = 'Expired';
       }
   
       setExpiryDifference(differenceText);
    }
   }, [expire]);
   

  const handleSubmit = async (e) => {
    e.preventDefault();
    const couponData = { expire, discount, used, couponCode };

    try {
      let response;
      if (isEditing) {
        response = await fetch(`/api/user/${id}/coupons/${coupon._id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(couponData),
        });
      } else {
        response = await fetch(`/api/user/${id}/coupons`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(couponData),
        });
      }

      if (!response.ok) {
        throw new Error('Failed to update coupon');
      }

      // Reset form fields or close the form
      setExpire('');
      setDiscount('');

      if (onCouponAdded) {
        onCouponAdded();
      }

      if (onReset) {
        onReset();
      }

      // Call the onFormSubmit function to hide the form
      if (onFormSubmit) {
        onFormSubmit();
      }
      onCouponAdded();
    } catch (error) {
      console.error('Error updating coupon:', error);
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
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50 text-dark-blue p-2"
          />
          <p className="text-xs text-gray-400">{expiryDifference}</p>
        </label>
        <label className="text-sm font-medium text-white">
          Discount:
          <input
            type="number"
            value={discount}
            required
            min="1"
            max="100"
            onChange={(e) => setDiscount(Number(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-button focus:ring focus:ring-blue-button focus:ring-opacity-50 text-dark-blue p-2"
          />
        </label>
        <label className="text-sm font-medium text-white">
          Status:
          <select
            value={used ? 'used' : 'active'}
            onChange={(e) => {
              const newStatus = e.target.value === "used";
              setUsed(newStatus);
            }}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-button focus:ring focus:ring-blue-button focus:ring-opacity-50 text-dark-blue p-2"
          >
            <option value="active">Active</option>
            <option value="used">Used</option>
          </select>
        </label>

      </div>
      <button
        className="bg-login1 hover:bg-login2 text-white font-semibold py-2 px-4 rounded mt-4"
        type="submit"
      >
        {isEditing ? "Update Coupon" : "Add Coupon"}
      </button>
    </form>
  );
};

export default AddCouponForm;