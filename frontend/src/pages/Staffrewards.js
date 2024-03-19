// import {useEffect, useState} from 'react'

// const Staffrewards = () => {

//     const [staffReward, setStaffRewards] = useState(null)

//     useEffect(() => {
//         const fetchStaffRewards =  async () => {
//             const response = await fetch('/api/staffReward')
//             const json = await response.json()

//             if (response.ok) {
//                 setStaffRewards(json)
//             }
//         } 

//         fetchStaffRewards()
//     },[])

//     return (
//         <div className="Staffrewards">
//             <div className="staffRewards">
//                 {staffReward && staffReward.map((staffReward) => (
//                     <StaffRewardDetails key={staffReward._id} staffReward = {staffReward} />
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default Staffrewards;