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
            <div className="fixed top-0 left-32 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
                 <div className="bg-white p-8 rounded-lg w-96 relative">
                
                <h2 className="text-2xl font-bold mb-4">Update Batch</h2>
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <label className="block">Batch Number:
                        <input type="text" name="batchNumber" value={newData.batchNumber} onChange={handleChange}   className="input"/>
                    </label>
                    <label className="block">Manufacture Date:
                        <input type="date" name="manufactureDate" value={newData.manufactureDate} onChange={handleChange}  className="input"/>
                    </label>
                    <label className="block">Expire Date:
                        <input type="date" name="expireDate" value={newData.expireDate} onChange={handleChange}  className="input"/>
                    </label>
                    <label className="block">Quantity:
                        <input type="number" name="quantity" value={newData.quantity} onChange={handleChange}  className="input"/>
                    </label>
                    <label className="block">Price:
                        <input type="number" name="price" value={newData.price} onChange={handleChange}  className="input"/>
                    </label>
                    <button type="submit"className="btn bg-login1 hover:bg-login2 hover:text-white px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all">Update</button>   <tb></tb> 
                    <button type="button" onClick={onClose} className="btn bg-signup1 hover:bg-signup2 hover:text-white mr-2 px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all">Cancel</button>
                </form>
            </div>
        </div>
        );
    };

    export default BatchUpdateForm;
