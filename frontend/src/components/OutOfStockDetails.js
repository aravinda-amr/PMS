
const OutOfStockDetials = ({outof})=>{
    return (
       <div className="abtexpire-details">
    <table>
        <tr>
         <th className="coupon-table-th border border-gray-300 px-4 py-2"><strong>Drug Name</strong></th>
         <td className="coupon-table-th border border-gray-300 px-4 py-2">{outof.drugName}</td>
        </tr>
        <tr>
         <th className="coupon-table-th border border-gray-300 px-4 py-2"><strong>Batch Number</strong></th>
         <td className="coupon-table-th border border-gray-300 px-4 py-2">{outof.batchNumber}</td>
       </tr>
        <tr>
         <th className="coupon-table-th border border-gray-300 px-4 py-2"><strong>Quantity</strong></th>
         <td className="coupon-table-th border border-gray-300 px-4 py-2">{outof.quantity}</td>
        </tr>
    </table>   
       </div>
        )
    }
    
    export default OutOfStockDetials