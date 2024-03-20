import {useEffect} from 'react'
import {useLeavesContext} from '../hooks/useLeavesContext'

// components
import LeaveDetails from '../components/LeaveDetails'
import LeavesForm from '../components/LeaveForm'

const Leave = () => {
  const {leaves, dispatch} = useLeavesContext()

  useEffect(() => {

    const fetchLeaves = async () => {
      const response= await fetch('/api/leaves')
      const json = await response.json()

      if(response.ok){
        dispatch({type: 'SET_WORKOUTS', payload: json})
      }

    }

    fetchLeaves()
  },[dispatch])

  return(
    <div className="home">
      <div className="workouts">
        {leaves && leaves.map((leave) =>(
          <LeaveDetails key={leave._id} leave={leave} />
        ))}
        </div>
        <LeavesForm />
    </div>
  )
}

export default Leave