import {useState} from "react"
import {useCommentsContext} from '../hooks/useCommentContext'


const CommentForm = () => { 
    const {dispatch} = useCommentsContext()

    const [title, setTitle] = useState('')
    const [day, setDay ]= useState('')
    const [note, setNote] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])


    const handleSubmit = async (e) => {
        e.preventDefault()

        const comment = {title, day, note}

        const response = await fetch('/api/comments/',{
            method: 'POST',
            body:JSON.stringify(comment),
            headers:{
            'Content-Type': 'application/json'
            }
        })

    const json = await response.json()

    if(!response.ok) {
        setError(json.error)
        setEmptyFields(json.emptyFields)
    }

    else{
        setTitle('')
        setDay('')
        setNote('')
        
        setEmptyFields([])
        setError(null)
        console.log('new comment added', json)
        dispatch({type: 'CREATE_COMMENTS', payload: json})
    }

}

    return (

        <form className="comment-details" onSubmit={handleSubmit}>

        <h3>Verification</h3>

        <label>Verified By:</label>
        <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
           className={emptyFields.includes('title') ? 'error' : ''}
        />

        <label>Special Notes:</label>
        <input
            type="text"
            onChange={(e) => setNote(e.target.value)}
            value={note}
          className={emptyFields.includes('note') ? 'error' : ''}

        />

        <label>Date:</label>
        <input
            type="date"
            onChange={(e) => setDay(e.target.value)}
            value={day}
          className={emptyFields.includes('day') ? 'error' : ''}

        />

        <button>Submit</button>
        {error && <div className="error">{error}</div>}

        </form>

    )
}

export default CommentForm

