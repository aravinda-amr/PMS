import { useEffect, useState } from 'react';
import OutOfStockDetails from '../components/OutOfStockDetails';
import TextField from '@mui/material/TextField';

export const OutOfStock = () => {
    const [outofstock, setoutofstock] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredItems, setFilteredItems] = useState([]); // State to hold filtered items

    useEffect(() => {
        const fetchOutOfStock = async () => {
            const response = await fetch('/api/outofstock');
            const json = await response.json();
            if (response.ok) {
                setoutofstock(json);
            }
        };
        fetchOutOfStock();
    }, []);

    useEffect(() => {
        // Filter items based on search term whenever searchTerm changes
        const filtered = outofstock?.filter(
            (item) => item.drugName.toLowerCase().includes(searchTerm.toLowerCase())
        ) ?? []; // Ensure filtered is always an array
        setFilteredItems(filtered);
    }, [searchTerm, outofstock]);

    return (
        <div className="ml-64">
             <div className="flex justify-between items-center bg-gray-100 rounded-lg p-4 mb-4"> 
            <h1 className="text-2xl font-semibold text-gray-800 ml-64">Out Of Stock</h1>
       
        <div className="flex items-center">
            <TextField
              label="Search users..."
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
                        <OutOfStockDetails key={item._id} outof={item} />
                    ))
                ) : (
                    <p>No Drug Found</p>
                )}
            </div>
      
    );
};

export default OutOfStock;
