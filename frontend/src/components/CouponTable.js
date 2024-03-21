const CouponTable = ({ coupons, onDeleteCoupon, onEditCoupon }) => {
  return (
     <div className="overflow-x-auto">
       <table className="coupon-table w-full bg-dark-blue-2 text-white border-collapse">
         <thead className="coupon-table-thead bg-dark-blue text-white">
           <tr className="coupon-table-tr">
             <th className="coupon-table-th border border-gray-300 px-4 py-2">Discount</th>
             <th className="coupon-table-th border border-gray-300 px-4 py-2">Expire Date</th>
             <th className="coupon-table-th border border-gray-300 px-4 py-2">Coupon Code</th>
             <th className="coupon-table-th border border-gray-300 px-4 py-2">Status</th>
             <th className="border border-gray-300 px-4 py-2"></th>
           </tr>
         </thead>
         <tbody>
           {coupons.map((coupon) => (
             <tr className="coupon-table-tr hover:bg-blue-button" key={coupon._id}>
               <td className="coupon-table-th border border-gray-300 px-4 py-2">{coupon.discount}%</td>
               <td className="coupon-table-th border border-gray-300 px-4 py-2">{coupon.expire}</td>
               <td className="coupon-table-th border border-gray-300 px-4 py-2">{coupon.couponCode}</td>
               <td className="coupon-table-th border border-gray-300 px-4 py-2">{coupon.used ? 'Used' : 'Active'}</td>
               <td className="border border-gray-300 px-4 py-2">
                 <button className="btn bg-login1 hover:bg-login2 hover:text-white mr-2 px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all" onClick={() => onDeleteCoupon(coupon._id)}>Delete</button>
                 <button className="btn bg-signup1 hover:bg-signup2 hover:text-white mr-2 px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all" onClick={() => onEditCoupon(coupon._id)}>Edit</button>
               </td>
             </tr>
           ))}
         </tbody>
       </table>
     </div>
  );
 };
 
 export default CouponTable;
 