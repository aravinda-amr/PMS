const CouponTable = ({ coupons, onDeleteCoupon }) => {
    return (
      <table >
        <thead>
          <tr>
            <th>Discount</th>
            <th>Expire Date</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon) => (
            <tr key={coupon._id}>
              <td>{coupon.discount}%</td>
              <td>{coupon.expire}</td>
              <td><button className="btn" onClick={() => onDeleteCoupon(coupon._id)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  
  export default CouponTable;
  