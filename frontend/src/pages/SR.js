import {useEffect} from 'react'
import {useCommentsContext} from '../hooks/useCommentContext'

// components
import CommentDetails from '../components/CommentDetails'
import CommentForm from '../components/CommentForm'




const SalesReport = () => {
  const {comment, dispatch} = useCommentsContext()

  useEffect(() => {

    const fetchWorkouts = async () => {
      const response= await fetch('/api/comments')
      const json = await response.json()

      if(response.ok){
        dispatch({type:'SET_COMMENTS', payload: json})
      }

    }

    fetchWorkouts()
  },[dispatch])

  

  return(
    <div>
    <div className="sr">
      <div className="workouts">
        {comment && comment.map((comments) =>(
          <CommentDetails key={comments._id} comments={comments} />
        ))}
        </div>
        <CommentForm />
    </div>
    </div>
  )
}

export default SalesReport