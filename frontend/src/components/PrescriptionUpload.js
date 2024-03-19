import { useState } from 'react';
import { storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { v4 } from 'uuid'

const PrescriptionUpload = () => {
    const [note, setNote] = useState('');
    const [substitutes, setSubstitutes] = useState(null);
    const [imageUpload, setImageUpload] = useState(null);
    const [image, setImage] = useState(null);

    const uploadImage = async () => {
        if ( imageUpload === null ) return;

        const imageRef = ref(storage, `PMS/${imageUpload.name + v4()}`);

        //upload the file to the firebase storage
        await uploadBytes(imageRef, imageUpload).then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                //getting the url of the uloaded image
                setImage(url);
            })
        })
    }

    const handleSubmit = async () => {

        const prescription = {note, substitutes, image};

        const response = await fetch('/api/prescriptions', {
            method: 'POST',
            body: JSON.stringify(prescription),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json();

        if (!response.ok) {
            console.log(json.error);
        } else {
            console.log(json);
        }
    }

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
            <input type='file' onChange={(e) => { 
                setImageUpload(e.target.files[0])
            }}/><br/>
            <button onClick={uploadImage}>Upload</button><br/>
            <button onClick={handleSubmit}>Submit</button>
        </form>
    )
}


export default PrescriptionUpload;