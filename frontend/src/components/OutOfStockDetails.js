
const OutOfStockDetials = ({outof})=>{
    return (
       <div className="abtexpire-details">
    <table>
        <tr>
         <th><strong>Drug Name</strong></th>
         <td>{outof.drugName}</td>
        </tr>
        <tr>
         <th><strong>Batch Number</strong></th>
         <td>{outof.batchNumber}</td>
       </tr>
        <tr>
         <th><strong>Quantity</strong></th>
         <td>{outof.quantity}</td>
        </tr>
    </table>   
       </div>
        )
    }
    
    export default OutOfStockDetials