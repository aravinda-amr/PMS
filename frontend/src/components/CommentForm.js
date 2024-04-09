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

        const response = await fetch('/api/salesreport',{
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

        <form className="bg-dark-blue-2  p-4 rounded-lg shadow-md" onSubmit={handleSubmit}>

        <h3 className="text-white"> Verification</h3>

        <label className="label-form block text-sm font-medium text-white">Verified By:</label>
        <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            className=" focus:border-blue-button focus:ring focus:ring-blue-button focus:ring-opacity-50 text-blue" 
        />

        <label className="label-form block text-sm font-medium text-white">Special Notes:</label>
        <input
            type="text"
            onChange={(e) => setNote(e.target.value)}
            value={note}
            className=" focus:border-blue-button focus:ring focus:ring-blue-button focus:ring-opacity-50 text-blue" 

        />

        <label className="label-form block text-sm font-medium text-white">Date:</label>
        <input
            type="date"
            onChange={(e) => setDay(e.target.value)}
            value={day}
            className=" focus:border-blue-button focus:ring focus:ring-blue-button focus:ring-opacity-50 text-blue" 
        />

        <button className="btn bg-login1 hover:bg-login2 hover:text-white mr-2 px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all">Submit</button>
        {error && <div className="error">{error}</div>}

        </form>

    )
}

export default CommentForm

