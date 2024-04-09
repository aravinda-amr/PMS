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

        <form className="bg-dark-blue-2  p-4 rounded-lg shadow-md" onSubmit={handleSubmit}>

        <h3 className="text-white">Request A Leave</h3>

        <label className="label-form block text-sm font-medium text-white">Name:</label>
        <input
            type="text"
            onChange={(e) => setname(e.target.value)}
            value={name}
            className=" focus:border-blue-button focus:ring focus:ring-blue-button focus:ring-opacity-50 text-blue"
        />

        <label className="label-form block text-sm font-medium text-white">Date (from)</label>
        <input
            type="date"
            onChange={(e) => setdateFrom(e.target.value)}
            value={dateFrom}
            className=" focus:border-blue-button focus:ring focus:ring-blue-button focus:ring-opacity-50 text-blue"

        />

        <label className="label-form block text-sm font-medium text-white">Date(to)</label>
        <input
            type="date"
            onChange={(e) => setdateTo(e.target.value)}
            value={dateTo}
            className=" focus:border-blue-button focus:ring focus:ring-blue-button focus:ring-opacity-50 text-blue"

        />

        <label className="label-form block text-sm font-medium text-white">Reason</label>
        <input
            type="text"
            onChange={(e) => setReason(e.target.value)}
            value={reason}
            className=" focus:border-blue-button focus:ring focus:ring-blue-button focus:ring-opacity-50 text-blue"
        />

        <button className="btn bg-login1 hover:bg-login2 hover:text-white mr-2 px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all">Submit</button>
        {error && <div className="error">{error}</div>}

        </form>

    )
}

export default LeavesForm

