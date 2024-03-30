import { useEffect, useState } from 'react';
import OutOfStockDetails from '../components/OutOfStockDetails';

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
            <input
                type="text"
                placeholder="Search drug names..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 text-gray-700"
            />
            <div className="expired_form">
                {filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                        <OutOfStockDetails key={item._id} outof={item} />
                    ))
                ) : (
                    <p>No Drug Found</p>
                )}
            </div>
        </div>
    );
};

export default OutOfStock;
