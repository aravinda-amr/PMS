

import { useEffect, useState } from 'react';
import AboutToOutOfStockDetials from '../components/AboutToOutOfStockDetials';

export const AboutToOutOfStock = () => {
    const [abouttooutofstock, setabouttooutofstock] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredItems, setFilteredItems] = useState([]); // State to hold filtered items

    useEffect(() => {
        const fetchOutOfStock = async () => {
            const response = await fetch('/api/abtoutofstock'); // Corrected URL
            const json = await response.json();
            if (response.ok) {
                setabouttooutofstock(json);
            }
        };
        fetchOutOfStock();
    }, []);

    useEffect(() => {
        // Filter items based on search term whenever searchTerm changes
        const filtered = abouttooutofstock?.filter(
            (item) => item.drugName.toLowerCase().includes(searchTerm.toLowerCase())
        ) ?? []; // Ensure filtered is always an array
        setFilteredItems(filtered);
    }, [searchTerm, abouttooutofstock]);

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
                        <AboutToOutOfStockDetials key={item._id} abtoutof={item} />
                    ))
                ) : (
                    <p>No Drug Found</p>
                )}
            </div>
        </div>
    );
};

export default AboutToOutOfStock;
