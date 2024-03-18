import { useState } from 'react';

const PrescriptionUpload = () => {
    const [note, setNote] = useState('');
    const [substitutes, setSubstitutes] = useState(null);
    // const [prescriptionImg, setPrescriptionImg] = useState('');

    return (
        <form>
            <h3>Add a New Prescription</h3>

            <label>Add a Note</label><br/>
            <textarea
                rows = "4"
                cols = "50"
                onChange={(e) => setNote(e.target.value)}
                value = {note}>
            </textarea><br/>

            <label>Substitutes</label>
            <br/>
            <input 
                type="radio"
                checked={substitutes === "Yes"} 
                value="Yes" 
                onClick={() => setSubstitutes('Yes')} />
            <label>Yes</label>
            <input 
                type ="radio" 
                checked={substitutes === 'No'} 
                value="No" 
                onClick={() => setSubstitutes('No')} />
            <label>No</label>
            <br/>

            <label>Upload Prescription</label><br/>
            <input type='file'/><br/>
            <button>Submit</button>
        </form>
    )
}


export default PrescriptionUpload;