const CouponTable = ({ coupons, onDeleteCoupon, onEditCoupon }) => {
    return (
      <table className="coupon-table">
        <thead className="coupon-table-thead">
          <tr className="coupon-table-tr">
            <th className="coupon-table-th">Discount</th>
            <th className="coupon-table-th">Expire Date</th>
            <th className="coupon-table-th">Coupon Code</th>
            <th className="coupon-table-th">Status</th>
            <th>  </th>
          </tr>
        </thead>
        <tbody >
          {coupons.map((coupon) => (
            <tr className="coupon-table-tr" key={coupon._id}>
              <td className="coupon-table-th">{coupon.discount}%</td>
              <td className="coupon-table-th">{coupon.expire}</td>
              <td className="coupon-table-th">{coupon.couponCode}</td>
              <td className="coupon-table-th">{coupon.used ? 'Used' : 'Active'}</td>
              <td className="coupon-table-th">
                <button className="btn" onClick={() => onDeleteCoupon(coupon._id)}>Delete</button>
                <button className="btn" onClick={() => onEditCoupon(coupon._id)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default CouponTable;
  