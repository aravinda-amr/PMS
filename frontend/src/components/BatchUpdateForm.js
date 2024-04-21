    import React, { useState } from 'react';
    import CircularProgress from '@mui/material/CircularProgress';

    //
    const BatchUpdateForm = ({ batchId, onUpdate, onClose,initialData}) => {
        const [newData, setNewData] = useState({
            batchNumber: initialData.batchNumber ||'',
            manufactureDate: initialData.manufactureDate ? new Date(initialData.manufactureDate).toISOString().split('T')[0] : '', // Convert to date to string and format
            expireDate: initialData.expireDate ? new Date(initialData.expireDate).toISOString().split('T')[0] : '', // Convert to date to string and format
            quantity: initialData.quantity || '',
            price: initialData.price ||''
        });
        const [loading, setLoading] = useState(false); 

        const handleChange = (e) => {
            const { name, value } = e.target;
            setNewData(prevData => ({
                ...prevData,
                [name]: value
            }));
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            setLoading(true);
            setTimeout(async () => {
                await onUpdate(batchId, newData);
                setLoading(false);
                onClose();
            }, 1000);
        };

        return (
            <div className="fixed top-0 left-32 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75">
                <div className="bg-white p-8 rounded-lg w-96 relative" style={{ width: '35vw', height: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
                 
                
                <h2 className="text-2xl font-bold mb-4">Update Batch</h2>
                <form className="space-y-4 flex-grow" onSubmit={handleSubmit}>
                    <label className="flex flex-col text-left">Batch Number:
                        <input type="text" name="batchNumber" value={newData.batchNumber} onChange={handleChange}   className="appearance-none border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    style={{ fontSize: '18px' }}/>
                    </label>
                    <label className="flex flex-col text-left">Manufacture Date:
                        <input type="date" name="manufactureDate" value={newData.manufactureDate} onChange={handleChange}  className="appearance-none border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    style={{ fontSize: '18px' }}/>
                    </label>
                    <label className="flex flex-col text-left">Expire Date:
                        <input type="date" name="expireDate" value={newData.expireDate} onChange={handleChange}  className="appearance-none border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    style={{ fontSize: '18px' }}/>
                    </label>
                    <label className="flex flex-col text-left">Quantity:
                        <input type="number" name="quantity" value={newData.quantity} onChange={handleChange}  className="appearance-none border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    style={{ fontSize: '18px' }}/>
                    </label>
                    <label className="flex flex-col text-left">Price:
                        <input type="number" name="price" value={newData.price} onChange={handleChange}  className="appearance-none border border-gray-300 rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    style={{ fontSize: '18px' }}/>
                    </label>


                    {loading ? (
                        <div className="flex justify-center">
                            <CircularProgress />
                        </div>
                    ) : (
                        <div className="flex justify-between">
                            <button type="submit" className="btn bg-login1 hover:bg-login2 hover:text-white px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all">Update</button>
                            <button type="button" onClick={onClose} className="btn bg-signup1 hover:bg-signup2 hover:text-white mr-2 px-4 py-1 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all">Cancel</button>
                        </div>
                    )}
                     </form>
            </div>
            </div>

        );
    };

    export default BatchUpdateForm;
