const staffRewardDetail = ({staffreward}) => {
    return (
        <div className="staffReward-Details">
            <h4>{staffreward.pharmacistID}</h4>
            <p><strong>Month :</strong>{staffreward.month}</p>
            <p><strong>Year :</strong>{staffreward.year}</p>
            <p><strong>Total Invoice Count :</strong>{staffreward.invoiceCount}</p>
            <p><strong>Total Cash Amount :</strong>{staffreward.totalCashAmount}</p>

        </div>
    )
    }

    export default staffRewardDetail