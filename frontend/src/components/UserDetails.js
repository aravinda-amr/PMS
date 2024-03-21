import React, { useState, useEffect } from "react";
import CouponTable from "./CouponTable";
import CouponForm from "./CouponForm";

const UserDetails = ({ user }) => {
    const [showCouponTable, setShowCouponTable] = useState(false);
    const [showCouponForm, setShowCouponForm] = useState(false);
    const [coupons, setCoupons] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0); // State to store total amount

    useEffect(() => {
      const fetchTotalAmount = async () => {
          try {
              const response = await fetch(`/api/user/totalAmount/${user.contact}`);
              const data = await response.json();
              // Assuming the API returns an array of objects, extract the totalAmount from the first object
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
  

   /* const handleViewButtonClick = async () => {
        setShowCouponTable(!showCouponTable);
        if (!showCouponTable) return;

        const response = await fetch(`/api/user/${user._id}/coupons`);
        const coupons = await response.json();
        setCoupons(coupons);
    };
*/
    const handleAddCouponClick = () => {
        setShowCouponForm(!showCouponForm);
        
    };

    const fetchCoupons = async () => {
      try {
          const response = await fetch(`/api/user/${user._id}/coupons`);
          const coupons = await response.json();
          setCoupons(coupons);
      } catch (error) {
          console.error('Error fetching coupons:', error);
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

    const handleEditCoupon = async (couponId, data) => {
        try {
            const response = await fetch(`/api/user/${user._id}/coupons/${couponId}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to update coupon');
            }

            const updatedCoupon = await response.json();
            setCoupons(coupons.map(coupon => coupon.id === couponId ? updatedCoupon : coupon));
        } catch (error) {
            console.error('Error updating coupon:', error);
        }
    };



    return (
        <div className="flex">
    <div className="bg-dark-blue text-white p-6">
        <h4 className="text-lg font-semibold">{user.name}</h4>
        <p className="mt-2">Total Amount: Rs.{totalAmount}</p>
        <p className="mt-2">Contact: {user.contact}</p>
        <div className="mt-4 flex justify-between">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleViewButtonClick}>View Coupons</button>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddCouponClick}>Add Coupon</button>
        </div>
        
        
    </div>
    <div className="ml-4">
            {showCouponTable && <CouponTable coupons={coupons} onDeleteCoupon={handleDeleteCoupon} onEditCoupon={handleEditCoupon}/>}
        </div>
    {showCouponForm && (
        <div className="ml-4"> {/* Adjust the margin as needed */}
            <CouponForm id={user._id} onCouponAdded={fetchCoupons}/>
        </div>
    )}
</div>


    );
};

export default UserDetails;
