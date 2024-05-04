
import { useEffect, useState } from 'react';
import AboutToOutOfStockDetials from '../components/AboutToOutOfStockDetials';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from '@mui/icons-material/Search';

export const AboutToOutOfStock = () => {
    const [abouttooutofstock, setabouttooutofstock] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredItems, setFilteredItems] = useState([]); // State to hold filtered items
    const [isLoading, setIsLoading] = useState(true); 
    // const [abouttooutofstock, setAboutToOutOfStock] = useState([]);



    useEffect(() => {
        const fetchOutOfStock = async () => {
            setIsLoading(true);
            const response = await fetch('/api/abtoutofstock'); // Corrected URL
            const json = await response.json();
            if (response.ok) {
                setabouttooutofstock(json);
            }
            setIsLoading(false);
        };
        fetchOutOfStock();
    }, []);


    useEffect(() => {
        const filteredResults = abouttooutofstock.filter(item =>
            item.drugName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredItems(filteredResults);
    }, [searchTerm, abouttooutofstock]);
    // useEffect(() => {
    //     const filterItems = async () => {
    //         // Wait for abouttooutofstock to be set before filtering
    //         if (!abouttooutofstock) return;
            
    //         const filtered = await Promise.all(abouttooutofstock.map(async (item) => {
    //             const response = await fetch(`/api/abtoutofstock/medicine/${item.drugName}`);
    //             const data = await response.json();
    //             return { ...item, drugName: data.drugName };
    //         }));
            
    //         // Now filter based on the updated drugName
    //         const filteredResults = filtered.filter((item) => item.drugName.toLowerCase().includes(searchTerm.toLowerCase()));
    //         setFilteredItems(filteredResults);
    //     };

    //     filterItems();
    // }, [searchTerm, abouttooutofstock]);
 
    return (
        <div className="px-4 py-8 ml-auto">
               <div className="flex justify-between items-center bg-gray-100 rounded-lg p-4 mb-4 ml-64"> 
            <h1 className="text-2xl font-semibold text-gray-800 ">About To Out Of Stock</h1>
       
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
                <div className="flex justify-center items-center h-40 ml-64">
                    <CircularProgress />
                </div>
            ) : (
                
                filteredItems.length > 0 ? (
                    filteredItems.map((item) => (
                        <div className="ml-64">
                        <AboutToOutOfStockDetials key={item._id} abtoutof={item} />
                        </div>
                    ))
                ) : (
                    <p>No Drug Found</p>
                )
            )}
            </div>
      
    );
};

export default AboutToOutOfStock;
