const StaffRewardDetails = ({staffReward}) => {
    return (
        <div className="staffReward-Details">
            <h4>{staffReward.pharmacistID}</h4>
            <p><strong>Invoice ID :</strong>{staffReward.pharmacistID}</p>
            <p><strong>Grand Total :</strong>{staffReward.grandTotal}</p>
            <p>{staffReward.createdAt}</p>
        </div>
    )
}

export default StaffRewardDetails;