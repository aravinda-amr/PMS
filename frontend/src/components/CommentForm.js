import { useState } from "react"
import { useCommentsContext } from '../hooks/useCommentContext'

const CommentForm = () => {
    const { dispatch } = useCommentsContext()

    const [title, setTitle] = useState('')
    const [day, setDay] = useState('')
    const [note, setNote] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    const [showPopup, setShowPopup] = useState(false) // State to manage popup visibility

    const handleSubmit = async (e) => {
        e.preventDefault()

        const comment = { title, day, note }

        const response = await fetch('/api/salesreport', {
            method: 'POST',
            body: JSON.stringify(comment),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        } else {
            setTitle('')
            setDay('')
            setNote('')

            setEmptyFields([])
            setError(null)
            console.log('new comment added', json)
            dispatch({ type: 'CREATE_COMMENTS', payload: json })
            setShowPopup(false) // Close the popup after successfully adding the comment
        }
    }

    const togglePopup = () => {
        setShowPopup(!showPopup)
    }

    const handleCancel = () => {
        setShowPopup(false);
    }

    return (
        <>
            <button onClick={togglePopup} className="btn bg-login1 hover:bg-login2 hover:text-white mr-2 px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all">Add a Comment</button>
            {showPopup && (
                <div className="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
                        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                                    Add a Comment
                                </h3>
                                <div className="mt-2">
                                    <form onSubmit={handleSubmit} className="bg-dark-blue-2 p-4 rounded-lg shadow-md">
                                        <label className="label-form block text-sm font-medium text-white">Verified By:</label>
                                        <input
                                            type="text"
                                            onChange={(e) => setTitle(e.target.value)}
                                            value={title}
                                            className="focus:border-blue-button focus:ring focus:ring-blue-button focus:ring-opacity-50 text-blue"
                                        />

                                        <label className="label-form block text-sm font-medium text-white">Special Notes:</label>
                                        <input
                                            type="text"
                                            onChange={(e) => setNote(e.target.value)}
                                            value={note}
                                            className="focus:border-blue-button focus:ring focus:ring-blue-button focus:ring-opacity-50 text-blue"
                                        />

                                        <label className="label-form block text-sm font-medium text-white">Date:</label>
                                        <input
                                            type="date"
                                            onChange={(e) => setDay(e.target.value)}
                                            value={day}
                                            className="focus:border-blue-button focus:ring focus:ring-blue-button focus:ring-opacity-50 text-blue"
                                        />

                                        <button className="btn bg-login1 hover:bg-login2 hover:text-white mr-2 px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all">Submit</button>
                                        <button type="button" onClick={handleCancel} className="btn bg-login1 hover:bg-login2 hover:text-white mr-2 px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all">Cancel</button>
                                        {error && <div className="error">{error}</div>}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default CommentForm
