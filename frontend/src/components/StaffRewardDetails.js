const StaffRewardDetails = ({staffreward}) => {
  return(
    <div className="bg-gray-100 rounded-lg p-4 mb-4 flex flex-col">
    <div className="bg-dark-blue-2 flex justify-between items-center px-4 py-2 rounded-t-lg">
      <h2 className="text-lg font-medium text-white">
        Pharmacist ID: {staffreward.pharmacistID}
      </h2>      
    </div>
  
  
    <div className="bg-dark-blue-2 flex items-center px-4 py-2 rounded-b-lg">
      <h4 className="font-medium text-white mr-2">
        Year: {staffreward.year} <br/>
        Month: {staffreward.month} <br/>
        Total Invoice Count: {staffreward.invoiceCount} <br/>
        Total Cash Amount: {staffreward.totalCashAmount} <br/>
      </h4>
  
    </div>
    </div>
  
  )
}


export default StaffRewardDetails

