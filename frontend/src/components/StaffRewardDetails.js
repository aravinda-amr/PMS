const StaffRewardDetails = ({staffreward}) => {
    return(
        <div className="staffReward-details">
            <p><strong>Pharmacist ID :</strong>{staffreward.pharmacistID}</p>
            <p><strong>Month :</strong>{staffreward.month}</p>
            <p><strong>Year :</strong>{staffreward.year}</p>
            <p><strong>Invoice Count :</strong>{staffreward.invoiceCount}</p>
            <p><strong>Total Cash Amount :</strong>{staffreward.totalCashAmount}</p>

        </div>
    )

}

export default StaffRewardDetails