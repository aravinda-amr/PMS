
const AboutExpireDetials = ({expire})=>{
    return (
       <div className="abtexpire-details">
    <table>
        <tr>
         <th><strong>Drug Name</strong></th>
         <td>{expire.drugName}</td>
        </tr>
        <tr>
         <th><strong>Batch Number</strong></th>
         <td>{expire.batchNumber}</td>
       </tr>
       <tr>
         <th><strong>Manufacture Date</strong></th>
         <td>{expire.manufactureDate}</td>
        </tr>
        <tr>
         <th><strong>Expire Date</strong></th> 
         <td>{expire.expireDate}</td>
        </tr>
        <tr>
         <th><strong>Quantity</strong></th>
         <td>{expire.quantity}</td>
        </tr>
    </table>   
       </div>
        )
    }
    
    export default AboutExpireDetials