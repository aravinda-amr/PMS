import React, { useState } from 'react';

//
const BatchUpdateForm = ({ batchId, onUpdate, onClose,initialData}) => {
    const [newData, setNewData] = useState({
        batchNumber: initialData.batchNumber ||'',
        manufactureDate: initialData.manufactureDate ? new Date(initialData.manufactureDate).toISOString().split('T')[0] : '', // Convert to date to string and format
        expireDate: initialData.expireDate ? new Date(initialData.expireDate).toISOString().split('T')[0] : '', // Convert to date to string and format
        quantity: initialData.quantity || '',
        price: initialData.price ||''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdate(batchId, newData);
        onClose();
    };

    return (
        <div className="batch-update-form">
            <h2>Update Batch</h2>
            <form onSubmit={handleSubmit}>
                <label>Batch Number:
                    <input type="text" name="batchNumber" value={newData.batchNumber} onChange={handleChange} />
                </label>
                <label>Manufacture Date:
                    <input type="date" name="manufactureDate" value={newData.manufactureDate} onChange={handleChange} />
                </label>
                <label>Expire Date:
                    <input type="date" name="expireDate" value={newData.expireDate} onChange={handleChange} />
                </label>
                <label>Quantity:
                    <input type="number" name="quantity" value={newData.quantity} onChange={handleChange} />
                </label>
                <label>Price:
                    <input type="number" name="price" value={newData.price} onChange={handleChange} />
                </label>
                <button type="submit">Update</button>
                <button type="button" onClick={onClose}>Cancel</button>
            </form>
        </div>
    );
};

export default BatchUpdateForm;
