
const OutOfStockDetials = ({outof})=>{
    return (
        <div className="overflow-x-auto" style={{  marginTop:'20px' }}>
          <table className="coupon-table w-full bg-dark-blue-2 text-white border-collapse">
            <thead className="coupon-table-thead bg-dark-blue text-white">
              <tr className="coupon-table-tr">
                <th className="coupon-table-th border border-gray-300 px-4 py-2">DrugName</th>
                <th className="coupon-table-th border border-gray-300 px-4 py-2">Batch Number</th>     
                <th className="coupon-table-th border border-gray-300 px-4 py-2">Quantity</th>
              </tr>
            </thead>
            <tbody>

                <tr>
                  <td className="coupon-table-th border border-gray-300 px-4 py-2">{outof.drugName}</td>
                  <td className="coupon-table-th border border-gray-300 px-4 py-2">{outof.batchNumber}</td>
                  <td className="coupon-table-th border border-gray-300 px-4 py-2">{outof.quantity}</td>
                </tr>
              
            </tbody>
          </table>
        </div>
     );
    }
    
    export default OutOfStockDetials