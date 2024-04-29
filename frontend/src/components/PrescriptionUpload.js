import { useState } from 'react';
import { storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { v4 } from 'uuid'
import { useAuthContext } from '../hooks/useAuthContext';
import { usePrescriptionContext } from '../hooks/usePrescription';

const PrescriptionUpload = () => {

    const { user } = useAuthContext();
    const { dispatch } = usePrescriptionContext();

    const [note, setNote] = useState('');
    const [substitutes, setSubstitutes] = useState('');
    const [imageUpload, setImageUpload] = useState('');
    const [image, setImage] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);

    const uploadImage = async (e) => {
        e.preventDefault();


        if ( imageUpload === null ) return;

        const imageRef = ref(storage, `PMS/${imageUpload.name + v4()}`);
        const uploadTask = uploadBytesResumable(imageRef, imageUpload);

        uploadTask.on('state_changed',
            (snapshot) => {
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setUploadProgress(progress);
            },
            (error) => {
                console.error(error);
            },
            () => {
                // Upload completed successfully, now we can get the download URL
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    // Getting the URL of the uploaded image
                    console.log(url);
                    setImage(url);
                });
            }
        );

        // //upload the file to the firebase storage
        // await uploadBytes(imageRef, imageUpload).then((snapshot) => {
        //     getDownloadURL(snapshot.ref).then((url) => {
        //         //getting the url of the uloaded image
        //         console.log(url);
        //         setImage(url);
        //     })
        // })
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        const prescription = {note, substitutes, image};
        const response = await fetch('/api/prescription', {
            method: 'POST',
            body: JSON.stringify(prescription),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json();

        if (!response.ok) {
            console.log(json.error);
        } else {
            console.log(json);
            setNote('');
            setSubstitutes('');
            setImage('');
            dispatch({type: "CREATE_PRESCRIPTION", payload: json});
        }
    }


    return (
        <form className="max-w-lg mx-auto border rounded-md border-gray-300 p-6">
            <h3 className='text-2xl font-bold mb-4'>Add a New Prescription</h3>
        <div className='mb-4'>
            <label className='block text-sm font-medium text-gray-700' for="note">Add a Note</label><br/>
            <textarea
                rows = "4"
                cols = "50"
                onChange={(e) => setNote(e.target.value)}
                value = {note}
                class="px-2 py-1 text-gray-700 border rounded-lg focus:outline-none focus:ring-blue-500"
                >
                
            </textarea>
        </div>
            
        <div className='mb-4'>
            <label className='block mb-2 text-sm font-medium text-gray-700'>Substitutes</label>
            <div className='flex items-center'>  
                <input 
                type="radio"
                checked={substitutes === "true"} 
                value="true" 
                onClick={(e) => setSubstitutes(e.target.value)}
                class="mr-2" 
                />
                <label className='text-gray-700'>Yes</label>
                <input 
                    type ="radio" 
                    checked={substitutes === 'false'} 
                    value="false" 
                    onClick={(e) => setSubstitutes(e.target.value)}
                    class="ml-4 mr-2"
                    />
                <label className='text-gray-700'>No</label>
            </div>
        </div>
            
        <div className='mb-4'>
            <label className='block mb-2 text-sm font-medium text-grey-700'>Upload Prescription</label><br/>
            <input type='file' onChange={(e) => { 
                setImageUpload(e.target.files[0])
            }} class="px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-blue-500"/>
        </div>
            
        <div>
            <button onClick={uploadImage} className='px-2 py-2 rounded-2xl font-black cursor-pointer bg-update hover:bg-blue-button hover:text-white hover:shadow-lg'>Upload</button>
            <progress value={uploadProgress} max="100" className="w-full mt-4"></progress>
            <button onClick={handleSubmit} className='px-2 py-2 rounded-2xl font-black cursor-pointer bg-update hover:bg-blue-button hover:text-white hover:shadow-lg'>Submit</button>
        </div>
            
        </form>
    )
}


export default PrescriptionUpload;