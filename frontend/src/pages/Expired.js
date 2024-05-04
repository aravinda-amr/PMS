import { useEffect, useState } from 'react';
import ExpiredDetials from '../components/ExpiredDetails';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';

export const Expired = () => {
    const [expire, setExpired] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredItems, setFilteredItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showExpiredWithin30Days, setShowExpiredWithin30Days] = useState(false);

    useEffect(() => {
        const fetchExpired = async () => {
            setIsLoading(true);
            const response = await fetch('/api/expired');
            const json = await response.json();
            if (response.ok) {
                setExpired(json);
            }
            setIsLoading(false);
        };
        fetchExpired();
    }, []);

    useEffect(() => {
        const filterItems = async () => {
            if (!expire) return;

            const filtered = await Promise.all(expire.map(async (item) => {
                const response = await fetch(`/api/expired/medicine/${item.drugName}`);
                const data = await response.json();
                return { ...item, drugName: data.drugName };
            }));

            let filteredResults = filtered;

            // Filter based on expiry date (expired within last 30 days) if the button is clicked
            if (showExpiredWithin30Days) {
                const today = new Date();
                const thirtyDaysAgo = new Date(today);
                thirtyDaysAgo.setDate(today.getDate() - 30);

                filteredResults = filteredResults.filter((item) => {
                    const expiredDate = new Date(item.expireDate);
                    return expiredDate >= thirtyDaysAgo && expiredDate <= today;
                });
            }

            // Filter based on search term
            filteredResults = filteredResults.filter((item) => item.drugName.toLowerCase().includes(searchTerm.toLowerCase()));

            setFilteredItems(filteredResults);
        };

        filterItems();
    }, [searchTerm, expire, showExpiredWithin30Days]);


    const handleFilterExpiredWithin30DaysClick = () => {
        setShowExpiredWithin30Days(true);
    };

    return (
        <div className="px-4 py-8 ml-auto">
            <div className="flex justify-between items-center bg-gray-100 rounded-lg p-4 mb-4 ml-64"> 
                <h1 className="text-2xl font-semibold text-gray-800 ">Expired Drugs</h1>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outlined"
                        size="medium"
                        onClick={handleFilterExpiredWithin30DaysClick}
                        className="bg-blue-500 hover:bg-signup1 text-white px-6 py-3 rounded-lg font-jakarta font-semibold cursor-pointer hover:transition-all"
                        // Increase font size
                    >
                        &lt; 30
                    </Button>

                    <TextField
                        label="Search Drugs..."
                        variant="outlined"
                        size="small"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                            endAdornment: <SearchIcon />,
                        }}
                        className="w-full px-4 py-2 rounded-md border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:ring-opacity-50 text-gray-700"
                    />

                </div>
            </div>
            <div className="ml-64">
            {isLoading ? (

                <div className="flex justify-center items-center h-40">
                    <CircularProgress />
                </div>
            ) : (
                filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                        <ExpiredDetials key={item._id} expire={item} />
                    ))
                ) : (
                    <p>No Drug Found</p>
                )
            )}
            </div>
        </div>
    );           
            
}

export default Expired;