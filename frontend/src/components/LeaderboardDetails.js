const leaderboardDetails = ({leaderboard}) => {
    return(
        <div className="bg-gray-100 rounded-lg p-4 mb-4 flex flex-col">
            <div className="bg-dark-blue-2 flex justify-between items-center px-4 py-2 rounded-t-lg">

                <h2 className="text-lg font-medium text-white">
                    Year: {leaderboard.year}
                </h2>

                <h4 className=" text-xl text-white font-medium px-4 py-2">
                     Month:{leaderboard.month}
                </h4> 
            </div>


            <div className="bg-dark-blue-2 flex items-center px-4 py-2 rounded-b-lg">

                <h4 className="font-medium text-white mr-2">
                    Most Prescription Amount handled pharmacist :  {leaderboard.mostPrescriptionHandledPid} <br/>
                     Most Cash Amount handled pharmacist :  {leaderboard.mostCashAmountHandledPid}
                </h4>

            </div>

        </div>
 
    )

}

export default leaderboardDetails



