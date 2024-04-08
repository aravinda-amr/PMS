import React, { useState, useEffect } from "react";
import CouponTable from "./CouponTable";
import CouponForm from "./CouponForm";
import { Typography } from '@mui/material'; // Import Material-UI components

const UserDetails = ({ user }) => {
  const [showCouponTable, setShowCouponTable] = useState(false);
  const [showCouponForm, setShowCouponForm] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isLoadingCoupons, setIsLoadingCoupons] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  const handleEditCoupon = (couponId) => {
    const coupon = coupons.find(c => c._id === couponId);
    setSelectedCoupon(coupon);
    setIsEditing(true);
    setShowCouponForm(true);
  };

  useEffect(() => {
    const fetchTotalAmount = async () => {
      try {
        const response = await fetch(`/api/user/totalAmount/${user.contact}`);
        const data = await response.json();

        if (data.length > 0) {
          setTotalAmount(data[0].totalAmount);

        } else {
          console.log('No data found');
        }
      } catch (error) {
        console.error('Error fetching total amount:', error);
      }
    };

    fetchTotalAmount();
  }, [user.contact]); // Depend on user.contact to refetch if it changes

  const handleAddCouponClick = () => {
    setShowCouponForm(!showCouponForm);
  };

  const fetchCoupons = async () => {
    setIsLoadingCoupons(true); // Set loading state to true
    try {
      const response = await fetch(`/api/user/${user._id}/coupons`);
      const coupons = await response.json();
      setCoupons(coupons);
    } catch (error) {
      console.error('Error fetching coupons:', error);
    } finally {
      setIsLoadingCoupons(false); // Set loading state to false
    }
  };


  const handleViewButtonClick = async () => {

    setShowCouponTable(!showCouponTable);
    if (!showCouponTable) {
      await fetchCoupons(); // Fetch coupons when view button is clicked
    }
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
      await fetchCoupons(); // Fetch coupons after deleting a coupon
    } catch (error) {
      console.error('Error deleting coupon:', error);
    }
  };

  return (
    <div className="bg-gray-100 rounded-lg p-4 mb-4 flex flex-col">
      <div className="bg-dark-blue-2 flex justify-between items-center px-4 py-2 rounded-t-lg">
        <Typography variant="h6" component="h2" className="text-white">
          {user.name}
        </Typography>
        <Typography variant="h5" component="h4" className="text-white font-medium px-4 py-2">
          Rs.{totalAmount}
        </Typography>
      </div>
      <div className="bg-dark-blue-2 flex items-center px-4 py-2 rounded-b-lg">
        <Typography variant="subtitle1" component="h4" className="text-white font-medium mr-2">
          Contact: {user.contact}
        </Typography>
        <div className="flex ml-auto">
          <button
            className="hover:text-login1 text-white font-bold py-2 px-4 rounded mr-2 fixed-width-button"
            onClick={handleViewButtonClick}
          >
            {showCouponTable ? "Hide Coupons" : "View Coupons"}
          </button>
          <button
            className="hover:text-login1 text-white font-bold py-2 px-4 rounded fixed-width-button"
            onClick={handleAddCouponClick}
          >
            {showCouponForm ? "Hide Form" : "Add Coupon"}
          </button>
        </div>
      </div>
      {showCouponTable && (
        <div className="mt-4">
          <CouponTable coupons={coupons} onDeleteCoupon={handleDeleteCoupon} onEditCoupon={handleEditCoupon} isLoading={isLoadingCoupons} />
        </div>
      )}

      {showCouponForm && (
        <div className="mt-4">
          <CouponForm id={user._id} onCouponAdded={fetchCoupons} coupon={selectedCoupon} isEditing={isEditing} onFormSubmit={handleAddCouponClick} />
        </div>
      )}
    </div>
  );
};

export default UserDetails;