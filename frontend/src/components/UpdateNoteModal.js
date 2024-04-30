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
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Update Note</h2>
                <textarea value={newNote} onChange={handleChange} />
                <button onClick={handleSave}>Save</button>
            </div>
        </div>
    );
};

export default UpdateNoteModal;
