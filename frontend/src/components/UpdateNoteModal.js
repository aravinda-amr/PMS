import React, { useState } from 'react';

const UpdateNoteModal = ({ onClose, onSave }) => {
    const [newNote, setNewNote] = useState('');

    const handleChange = (e) => {
        setNewNote(e.target.value);
    };

    const handleSave = () => {
        onSave(newNote);
        onClose();
    };

    return (
        <div className="modal">
            <div className="ml-8 mr-8 border-gray-300 rounded-lg px-8 py-6 mb-8 bg-update">
                <button onClick={onClose} className="bg-login1 hover:bg-login2 text-white font-bold px-4 py-1 rounded-lg font-jakarta cursor-pointer hover:transition-all mb-2">Close</button>
                <h2 className='font-semibold'>New Note</h2>
                <textarea value={newNote} onChange={handleChange} className="bg-gray-200 p-4 rounded-md w-128" /><br />
                <button onClick={handleSave} className="bg-login1 hover:bg-login2 text-white font-bold px-4 py-1 rounded-lg font-jakarta cursor-pointer hover:transition-all mt-2">Save</button>
            </div>
        </div>
    );
};

export default UpdateNoteModal;
