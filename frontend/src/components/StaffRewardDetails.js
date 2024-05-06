
    // Function to convert month number to month name
    const getMonthName = (monthNumber) => {
      const date = new Date(0, monthNumber - 1); // Note: JavaScript months are 0-indexed
      return date.toLocaleString('default', { month: 'long' });
  };




const StaffRewardDetails = ({staffreward}) => {
  return(
    <div className="bg-gray-100 rounded-lg p-4 mb-4 mx-4 flex flex-col">
    <div className="bg-dark-blue-2 flex justify-between items-center px-4 py-2 rounded-t-lg">
      <h2 className="text-lg font-medium text-white">
        Pharmacist ID: {staffreward.pharmacistID}
      </h2>      
    </div>
  
  
    <div className="bg-dark-blue-2 flex items-center px-4 py-2 rounded-b-lg">
      <h4 className="font-medium text-white mr-2">
        Year: {staffreward.year} <br/>
        Month: {getMonthName(staffreward.month)} <br/>
        Total Invoice Count: {staffreward.invoiceCount} <br/>
        Total Cash Amount: {staffreward.totalCashAmount} <br/>
      </h4>
  
    </div>
    </div>
  
  )
}


export default StaffRewardDetails

