import {useEffect} from 'react'
import {useCommentsContext} from '../hooks/useCommentContext'

// components
import CommentDetails from '../components/CommentDetails'
import CommentForm from '../components/CommentForm'




const SalesReport = () => {
  const {comment, dispatch} = useCommentsContext()

  useEffect(() => {

    const fetchWorkouts = async () => {
      const response= await fetch('/api/salesreport')
      const json = await response.json()

      if(response.ok){
        dispatch({type:'SET_COMMENTS', payload: json})
      }

    }

    fetchWorkouts()
  },[dispatch])

  

  return(
    <div className='ml-64'>
       
    <h1 className="text-2xl font-semibold text-gray-800 ml-64">Sales Report</h1>
      <CommentForm />
        {comment && comment.map((comments) =>(
          <CommentDetails key={comments._id} comments={comments} />
        ))}
        </div>
    
  
  )
}

export default SalesReport