import React, { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
//components
import StaffRewardDetails from '../components/StaffRewardDetails';

export const StaffReward = () => {
    const [staff, setStaff] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredItems, setFilteredItems] = useState([]); 
    useEffect(() => {
        const fetchReward = async () => {
            const response = await fetch('/api/staffReward');
            const json = await response.json();
            if (response.ok) {
                setStaff(json);
            }
        };
        fetchReward();
    }, []);
    
    useEffect(() => {
        const filtered = staff?.filter(
            (item) => item && item.pharmacistID && item.pharmacistID.toLowerCase().includes(searchTerm.toLowerCase())
        ) ?? [];
        setFilteredItems(filtered);
    }, [searchTerm, staff]);
    

    return (
        <div className="ml-64">
            <div className="flex justify-between items-center bg-gray-100 rounded-lg p-4 mb-4"> 
                <h1 className="text-2xl font-semibold text-gray-800 ml-64">Handled Order Details</h1>
                <div className="flex items-center">
                    <TextField
                        label="Search pharmacists..."
                        variant="outlined"
                        size="small"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 text-gray-700 field"
                    />
                </div> 
            </div>

            {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                    // Ensure item is not undefined before rendering StaffRewardDetails
                    item && <StaffRewardDetails key={item._id} staffreward={item} />
                ))
            ) : (
                <p>No pharmacist Found</p>
            )}
        </div>
    );
};

export default StaffReward;
