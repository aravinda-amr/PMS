import { useEffect, useState } from 'react';
import OutOfStockDetails from '../components/OutOfStockDetails';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from '@mui/icons-material/Search';

export const OutOfStock = () => {
    const [outofstock, setoutofstock] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredItems, setFilteredItems] = useState([]); // State to hold filtered items
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchOutOfStock = async () => {
            setIsLoading(true);
            const response = await fetch('/api/outofstock');
            const json = await response.json();
            if (response.ok) {
                setoutofstock(json);
            }
            setIsLoading(false);
        };
        fetchOutOfStock();
    }, []);
    
    useEffect(() => {
        const filterItems = () => {
            // Wait for outofstock to be set before filtering
            if (!outofstock) return;

            const filteredResults = outofstock.filter(item =>
                item.drugName.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredItems(filteredResults);
        };

        filterItems();
    }, [searchTerm, outofstock]);
    
    return (
        <div className="px-4 py-8 ml-auto">
               <div className="flex justify-between items-center bg-gray-100 rounded-lg p-4 mb-4 ml-64"> 
                <h1 className="text-2xl font-semibold text-gray-800 ">Out Of Stock</h1>

                <div className="flex items-center">
                    <TextField
                        label="Search Drugs..."
                        variant="outlined"
                        size="small"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            endAdornment: <SearchIcon />,
                        }}
                        className="w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 text-gray-700 field"
                    />
                </div>
            </div>
            {isLoading ? (
                <div className="flex justify-center items-center h-40">
                    <CircularProgress />
                </div>
            ) : (
                filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                        <div className="ml-64">
                        <OutOfStockDetails key={item._id} outof={item} />
                        </div>
                    ))
                ) : (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '30vh', fontSize: '24pt' }}>
                        <p>No Drug Found</p>
                    </div>


                )
            )}
        </div>

    );
};

export default OutOfStock;
