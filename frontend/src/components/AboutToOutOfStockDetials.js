
const AboutToOutOfStockDetials = ({abtoutof})=>{
    return (
       <div className="abtexpire-details">
    <table>
        <tr>
         <th><strong>Drug Name</strong></th>
         <td>{abtoutof.drugName}</td>
        </tr>
        <tr>
         <th><strong>Batch Number</strong></th>
         <td>{abtoutof.batchNumber}</td>
       </tr>
        <tr>
         <th><strong>Quantity</strong></th>
         <td>{abtoutof.quantity}</td>
        </tr>
    </table>   
       </div>
        )
    }
    
    export default AboutToOutOfStockDetials