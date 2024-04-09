import { useCommentsContext } from "../hooks/useCommentContext"

//date fns
import  formatDistanceToNow  from 'date-fns/formatDistanceToNow'

const CommentDetails = ({comments}) => { 

  const {dispatch} = useCommentsContext()

const handleClick = async () => {
  const response = await fetch('/api/comments/' + comments._id,{
    method: 'DELETE'
  })
  const json = await response.json()

  if(response.ok) {
    dispatch({type: 'DELETE_COMMENTS', payload: json})
  }
}

  return (
    <div className ="comment-details">
      <h4>{comments.title}</h4>
      <p><strong>Date : </strong>{comments.day}</p>
      <p><strong>Special Notes: </strong>{comments.note}</p>
      <p>{formatDistanceToNow(new Date(comments.createdAt),{addSuffix: true})}</p>
      <span className="material-symbols-outlined" onClick={handleClick}>delete</span>

    </div>
  )
}

export default CommentDetails