import React from 'react';

const CouponTable = ({ coupons, onDeleteCoupon, onEditCoupon }) => {
  return (
    <div className="overflow-x-auto rounded-lg shadow-md mt-4">
      <table className="w-full min-w-full divide-y divide-gray-200">
  <thead className="bg-dark-blue text-white">
    <tr className="text-left">
      <th className="p-4 font-medium">Discount</th>
      <th className="p-4 font-medium">Expire Date</th>
      <th className="p-4 font-medium">Coupon Code</th>
      <th className="p-4 font-medium">Status</th>
      <th className="p-4 font-medium">Actions</th>
    </tr>
  </thead>
  <tbody className="text-white-700">
          {coupons.length === 0 ? (
            <tr className="text-center py-4">
              <td colSpan="5">No coupons available</td>
            </tr>
          ) : (
            coupons.map((coupon) => (
              <tr key={coupon._id} className="hover:bg-gray-100">
                <td className="p-4">{coupon.discount}%</td>
                <td className="p-4">{coupon.expire}</td>
                <td className="p-4">{coupon.couponCode}</td>
                <td className="p-4">{coupon.used ? 'Used' : 'Active'}</td>
                <td className="p-4 flex space-x-2">
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center rounded-md bg-red-500 hover:bg-red-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                    onClick={() => onDeleteCoupon(coupon._id)}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center rounded-md bg-green-500 hover:bg-green-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
                    onClick={() => onEditCoupon(coupon._id)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CouponTable;
