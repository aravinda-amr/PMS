import React, { useState} from "react";
import CouponTable from "./CouponTable";
import CouponForm from "./CouponForm";

const UserDetails = ({ user }) => {
    const [showCouponTable, setShowCouponTable] = useState(false);
    const [showCouponForm, setShowCouponForm] = useState(false);
    const [coupons, setCoupons] = useState([]);
   
    const handleViewButtonClick = async () => {
       setShowCouponTable(!showCouponTable);
       if (!showCouponTable) return;
   
       const response = await fetch(`/api/user/${user._id}/coupons`);
       const coupons = await response.json();
       setCoupons(coupons);
    };
   
    const handleAddCouponClick = () => {
       setShowCouponForm(!showCouponForm);
    };
   
    const handleDeleteCoupon = async (couponId) => {
       try {
         const response = await fetch(`/api/user/${user._id}/coupons/${couponId}`, {
           method: 'DELETE',
         });
   
         if (!response.ok) {
           throw new Error('Failed to delete coupon');
         }
   
         setCoupons(coupons.filter(coupon => coupon.id !== couponId));
       } catch (error) {
         console.error('Error deleting coupon:', error);
       }
    };

  return (
    <div className="workout-details">
      <h4>{user.name}</h4>
      <div>
        <button className="btn" onClick={handleViewButtonClick}>View Coupons</button>
        <button className="btn" onClick={handleAddCouponClick}>Add Coupon</button>
        {showCouponTable && <CouponTable coupons={coupons} onDeleteCoupon={handleDeleteCoupon} />}
        {showCouponForm && <CouponForm id={user._id} />}
      </div>
    </div>
  );
};

export default UserDetails;