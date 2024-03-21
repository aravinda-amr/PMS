import { useLeavesContext } from "../hooks/useLeavesContext"

//date fns
import  formatDistanceToNow  from 'date-fns/formatDistanceToNow'

const LeaveDetails = ({leave}) => { 

  const {dispatch} = useLeavesContext()

const handleClick = async () => {
  const response = await fetch('/api/leaves/' + leave._id,{
    method: 'DELETE'
  })
  const json = await response.json()

  if(response.ok) {
    dispatch({type: 'DELETE_WORKOUT', payload: json})
  }
}

  return (
    <div>
      <h4>{leave.name}</h4>
      <p><strong>Date From: </strong>{leave.dateFrom}</p>
      <p><strong>DateTo : </strong>{leave.dateTo}</p>
      <p><strong>Reasons: </strong>{leave.reason}</p>
      <p>{formatDistanceToNow(new Date(leave.createdAt),{addSuffix: true})}</p>
      <span onClick={handleClick}>delete</span>
    </div>
    
  )
}

export default LeaveDetails