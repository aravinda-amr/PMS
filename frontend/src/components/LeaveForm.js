import {useState} from "react"
import {useLeavesContext} from '../hooks/useLeavesContext'


const LeavesForm = () => { 
    const {dispatch} = useLeavesContext()

    const [name, setname] = useState('')
    const [dateFrom, setdateFrom] = useState('')
    const [dateTo, setdateTo] = useState('')
    const [reason, setReason] = useState('')
    const [error, setError] = useState('')
    const [emptyFields, setEmptyFields] = useState([])


    const handleSubmit = async (e) => {
        e.preventDefault()

        const leave = { name, dateFrom, dateTo, reason}

        const response = await fetch('/api/leaves',{
            method: 'POST',
            body:JSON.stringify(leave),
            headers:{
            'Content-Type': 'application/json'
            }
        })

    const json = await response.json()

    if(!response.ok) {
        setError(json.error)
        setEmptyFields(json.emptyFields)
    }

    if(response.ok) {
        setname('')
        setdateFrom('')
        setdateTo('')
        setReason('')
        setError(null)
        setEmptyFields([])
        console.log('new workout added', json)
        dispatch({type: 'CREATE_WORKOUT', payload: json})
    }

}

    return (

        <form className="create" onSubmit={handleSubmit}>

        <h3>Request A Leave</h3>

        <label>Name:</label>
        <input
            type="text"
            onChange={(e) => setname(e.target.value)}
            value={name}
            className={emptyFields.includes('name') ? 'error' : ''}
        />

        <label>Date (from)</label>
        <input
            type="date"
            onChange={(e) => setdateFrom(e.target.value)}
            value={dateFrom}
            className={emptyFields.includes('dateFrom') ? 'error' : ''}

        />

        <label>Date(to)</label>
        <input
            type="date"
            onChange={(e) => setdateTo(e.target.value)}
            value={dateTo}
            className={emptyFields.includes('dateTo') ? 'error' : ''}

        />

        <label>Reason</label>
        <input
            type="text"
            onChange={(e) => setReason(e.target.value)}
            value={reason}
            className={emptyFields.includes('reason') ? 'error' : ''}

        />

        <button>Submite</button>
        {error && <div className="error">{error}</div>}

        </form>

    )
}

export default LeavesForm

