import { useEffect, useState } from "react";
import { usePrescriptionContext } from "../hooks/usePrescription";
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import { FormControl, Select, MenuItem } from '@mui/material';
// import { useAuthContext } from '../hooks/useAuthContext';

//importing the components
import PresDisplay from "../components/PresDisplay";

const Quotations = () => {
    const { prescriptions, dispatch } = usePrescriptionContext();
    const [filteredItems, setFilteredItems] = useState([]); // State to hold filtered items
    const [searchTerm, setSearchTerm] = useState("");
    // const { user } = useAuthContext();
    
    useEffect(() => {
        const fetchPrescriptions = async () => {
        const response = await fetch("/api/allPres/all");
        const json = await response.json();
        console.log(json);
        if (response.ok) {
            dispatch({ type: "SET_PRESCRIPTIONS", payload: json });
        }
        };
        fetchPrescriptions();
    }, [dispatch]);

    useEffect(() => {
        // Filter items based on search term whenever searchTerm changes
        const filtered = prescriptions?.filter(
          (item) => item.status.toLowerCase().includes(searchTerm.toLowerCase())
        ) ?? []; // Ensure filtered is always an array
        setFilteredItems(filtered);
    
      }, [searchTerm, prescriptions]);

    const handleChangeOption = (event) => {
        setSearchTerm(event.target.value);
    };
    
    return (
        <div className="ml-64">
            <div className="flex justify-between">
            <h1 className="text-2xl font-semibold text-gray-800 flex-grow my-8 mx-4">Add Quotations</h1>
                <div className="items-center my-4 mx-8">
                <h1 className="text-xl font-light text-gray-800 flex-grow">Status</h1>
                    <FormControl variant="outlined">
                        <Select
                            value={searchTerm}
                            onChange={handleChangeOption}
                        >
                        <MenuItem value="">All</MenuItem>
                        <MenuItem value="app">Approved</MenuItem>
                        <MenuItem value="pen">Pending</MenuItem>
                        <MenuItem value="reje">Rejected</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            </div>

        <div className="grid grid-cols-6 mx-4">
            <h1 className="text-2xl font-semibold text-gray-800 flex-grow mx-4">Prescription Note</h1>
            <h1 className="text-2xl font-semibold text-gray-800 flex-grow mx-4">Email</h1>
            <h1 className="text-2xl font-semibold text-gray-800 flex-grow mx-4">Substitutes</h1>
            <h1 className="text-2xl font-semibold text-gray-800 flex-grow mx-4">Created At</h1>
            <h1 className="text-2xl font-semibold text-gray-800 flex-grow mx-4">Status</h1>
            <h1 className="text-2xl font-semibold text-gray-800 flex-grow mx-4">Quotation</h1>
        </div>
            

        <div className="prescription_list">
            {filteredItems &&
            filteredItems.map((prescription) => (
                <PresDisplay
                key={prescription._id}
                prescription={prescription}
                />
            ))}
        </div>
        </div>
    );
}

export default Quotations;
